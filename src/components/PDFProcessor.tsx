import React, { useState, useCallback } from 'react';
import { FileText, Download, Loader2, Search } from 'lucide-react';
import { PDFProcessor } from '../lib/pdfProcessor';
import { LlamaIndexProcessor } from '../lib/llamaIndexProcessor'; 

export function PDFProcessorComponent() {
  const [processing, setProcessing] = useState(false);
  const [chunks, setChunks] = useState<{ text: string; startIndex: number; endIndex: number; }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState<{ answer: string; sources: typeof chunks }>(); 
  const [querying, setQuerying] = useState(false);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setProcessing(true);
      setError(null);
      
      // Process the PDF
      const processedChunks = await PDFProcessor.processPDF(file);
      setChunks(processedChunks);

      // Send to LlamaIndex cloud
      await LlamaIndexProcessor.processWithLlamaIndex(processedChunks);
      
    } catch (err) {
      console.error('Error processing file:', err);
      setError('Error processing file. Please try again.');
    } finally {
      setProcessing(false);
    }
  }, []);

  const handleDownload = useCallback(async () => {
    if (!chunks.length) return;

    try {
      const zipBlob = await PDFProcessor.saveChunksToZip(chunks);
      
      // Create download link
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'text_chunks.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading chunks:', err);
      setError('Error downloading chunks. Please try again.');
    }
  }, [chunks]);

  const handleQuery = useCallback(async () => {
    if (!query.trim() || !chunks.length) return;

    try {
      setQuerying(true);
      setError(null);

      const result = await LlamaIndexProcessor.queryVectorStore(query);
      setQueryResult(result);
    } catch (err) {
      console.error('Error querying:', err);
      setError('Error processing query. Please try again.');
    } finally {
      setQuerying(false);
    }
  }, [query, chunks]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-display font-bold text-nexius-navy mb-6">
          PDF Text Processor
        </h2>

        {/* Upload Section */}
        <div className="mb-8">
          <label 
            htmlFor="pdf-upload"
            className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-nexius-teal transition-colors cursor-pointer"
          >
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <span className="text-gray-600">
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                'Drop your PDF here or click to upload'
              )}
            </span>
          </label>
          <input
            type="file"
            id="pdf-upload"
            accept=".pdf,.txt"
            onChange={handleFileUpload}
            className="hidden"
            disabled={processing}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Results Section */}
        {chunks.length > 0 && (
          <div className="space-y-6">
            {/* Query Section */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a question about the document..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                />
                <button
                  onClick={handleQuery}
                  disabled={querying || !query.trim()}
                  className="px-4 py-2 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
                >
                  {querying ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </button>
              </div>

              {queryResult && (
                <div className="space-y-4">
                  <div className="p-4 bg-nexius-teal/10 rounded-lg">
                    <h4 className="font-semibold text-nexius-navy mb-2">Answer:</h4>
                    <p className="text-gray-700">{queryResult.answer}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-nexius-navy mb-2">Sources:</h4>
                    <div className="space-y-2">
                      {queryResult.sources.map((source, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                          <div className="text-sm text-gray-500 mb-1">
                            Page {source.metadata.pageNumber}
                          </div>
                          <p className="text-gray-700 line-clamp-2">{source.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Processed Chunks ({chunks.length})
              </h3>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Download All
              </button>
            </div>

            <div className="space-y-4">
              {chunks.map((chunk, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="text-sm text-gray-500 mb-2">
                    Chunk {index + 1} (Characters {chunk.startIndex} - {chunk.endIndex})
                  </div>
                  <div className="text-gray-700 line-clamp-3">
                    {chunk.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}