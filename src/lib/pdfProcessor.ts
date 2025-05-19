import pdfParse from 'pdf-parse';
import natural from 'natural';
import AdmZip from 'adm-zip';

const tokenizer = new natural.SentenceTokenizer();
const TfIdf = natural.TfIdf;

export interface TextChunk {
  text: string;
  startIndex: number;
  endIndex: number;
  metadata: {
    pageNumber: number;
    sentenceCount: number;
    keywords: string[];
  };
}

export class PDFProcessor {
  /**
   * Convert PDF to text while preserving structure
   */
  static async pdfToText(pdfBuffer: ArrayBuffer): Promise<{
    text: string;
    numPages: number;
    info: any;
  }> {
    try {
      const data = await pdfParse(Buffer.from(pdfBuffer));
      return {
        text: data.text,
        numPages: data.numpages,
        info: data.info
      };
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw new Error('Failed to parse PDF file. Please ensure it is a valid PDF.');
    }
  }

  /**
   * Extract keywords from text using TF-IDF
   */
  static extractKeywords(text: string, maxKeywords: number = 5): string[] {
    const tfidf = new TfIdf();
    tfidf.addDocument(text);
    
    return tfidf
      .listTerms(0)
      .slice(0, maxKeywords)
      .map(item => item.term);
  }

  /**
   * Split text into semantic chunks based on sentences
   */
  static createSemanticChunks(
    text: string,
    targetChunkSize: number = 1000,
    minOverlap: number = 2
  ): TextChunk[] {
    // Split text into sentences
    const sentences = tokenizer.tokenize(text);
    const chunks: TextChunk[] = [];
    let currentChunk: string[] = [];
    let currentSize = 0;
    let startIndex = 0;

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      
      // Add sentence to current chunk
      if (currentSize + sentence.length <= targetChunkSize || currentChunk.length === 0) {
        currentChunk.push(sentence);
        currentSize += sentence.length;
      } else {
        // Create new chunk
        const chunkText = currentChunk.join(' ');
        chunks.push({
          text: chunkText,
          startIndex,
          endIndex: startIndex + chunkText.length,
          metadata: {
            pageNumber: Math.floor(startIndex / 4000) + 1, // Rough estimate
            sentenceCount: currentChunk.length,
            keywords: this.extractKeywords(chunkText)
          }
        });

        // Start new chunk with overlap
        const overlapSentences = currentChunk.slice(-minOverlap);
        currentChunk = [...overlapSentences, sentence];
        startIndex = startIndex + chunkText.length - overlapSentences.join(' ').length;
        currentSize = currentChunk.join(' ').length;
      }
    }

    // Add final chunk if needed
    if (currentChunk.length > 0) {
      const chunkText = currentChunk.join(' ');
      chunks.push({
        text: chunkText,
        startIndex,
        endIndex: startIndex + chunkText.length,
        metadata: {
          pageNumber: Math.floor(startIndex / 4000) + 1,
          sentenceCount: currentChunk.length,
          keywords: this.extractKeywords(chunkText)
        }
      });
    }

    return chunks;
  }

  /**
   * Process a PDF file with error handling and validation
   */
  static async processPDF(file: File): Promise<TextChunk[]> {
    try {
      // Validate file
      if (!file.type.includes('pdf')) {
        throw new Error('Please upload a valid PDF file');
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('File size too large. Please upload a smaller PDF.');
      }

      // Read and parse PDF
      const buffer = await file.arrayBuffer();
      const { text, numPages } = await this.pdfToText(buffer);

      if (!text.trim()) {
        throw new Error('No text content found in PDF');
      }

      // Create semantic chunks
      const chunks = this.createSemanticChunks(text);

      // Validate chunks
      if (chunks.length === 0) {
        throw new Error('Failed to process PDF content');
      }

      return chunks;
    } catch (error) {
      console.error('Error processing PDF:', error);
      throw error;
    }
  }

  /**
   * Save chunks with metadata to zip archive
   */
  static async saveChunksToZip(chunks: TextChunk[]): Promise<Blob> {
    const zip = new AdmZip();

    // Add metadata file
    const metadata = {
      totalChunks: chunks.length,
      processingDate: new Date().toISOString(),
      chunkSummaries: chunks.map(chunk => ({
        sentenceCount: chunk.metadata.sentenceCount,
        pageNumber: chunk.metadata.pageNumber,
        keywords: chunk.metadata.keywords,
        charLength: chunk.text.length
      }))
    };

    zip.addFile('metadata.json', Buffer.from(JSON.stringify(metadata, null, 2)));

    // Add each chunk with its metadata
    chunks.forEach((chunk, index) => {
      const fileName = `chunk_${index + 1}.txt`;
      const content = `METADATA:
Page: ${chunk.metadata.pageNumber}
Sentences: ${chunk.metadata.sentenceCount}
Keywords: ${chunk.metadata.keywords.join(', ')}
Character Range: ${chunk.startIndex}-${chunk.endIndex}

CONTENT:
${chunk.text}`;

      zip.addFile(fileName, Buffer.from(content, 'utf8'));
    });

    return new Blob([zip.toBuffer()], { type: 'application/zip' });
  }
}