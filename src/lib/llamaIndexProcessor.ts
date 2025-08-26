import { TextChunk } from './pdfProcessor';

export class LlamaIndexProcessor {
  private static readonly LLAMA_INDEX_ENDPOINT = 'https://api.cloud.llamaindex.ai/api/pipeline/9a7bd0d3-59ec-4b89-be9f-a6216f536cb7/retrieve';

  /**
   * Process PDF chunks with LlamaIndex
   */
  static async processWithLlamaIndex(chunks: TextChunk[]): Promise<{
    success: boolean;
  }> {
    try {
      // Send chunks to LlamaIndex cloud endpoint
      const response = await fetch(this.LLAMA_INDEX_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documents: chunks.map(chunk => ({
            text: chunk.text,
            metadata: {
              ...chunk.metadata,
              startIndex: chunk.startIndex,
              endIndex: chunk.endIndex
            }
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to process documents with LlamaIndex');
      }

      return {
        success: true
      };
    } catch (error) {
      console.error('Error processing with LlamaIndex:', error);
      throw error;
    }
  }

  /**
   * Query the vector store
   */
  static async queryVectorStore(
    query: string,
    topK: number = 3
  ): Promise<{
    answer: string;
    sources: TextChunk[];
  }> {
    try {
      // Query LlamaIndex cloud endpoint
      const response = await fetch(this.LLAMA_INDEX_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          topK
        })
      });

      if (!response.ok) {
        throw new Error('Failed to query LlamaIndex');
      }

      const result = await response.json();
      // Extract source chunks
      const sources = result.sourceNodes.map(node => ({
        text: node.text,
        startIndex: node.metadata.startIndex,
        endIndex: node.metadata.endIndex,
        metadata: {
          pageNumber: node.metadata.pageNumber,
          sentenceCount: node.metadata.sentenceCount,
          keywords: node.metadata.keywords
        }
      }));

      return {
        answer: result.response,
        sources
      };
    } catch (error) {
      console.error('Error querying vector store:', error);
      throw error;
    }
  }
}