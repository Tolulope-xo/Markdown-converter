'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import MarkdownPreview from '@/components/MarkdownPreview';
import FormatSelector from '@/components/FormatSelector';
import DownloadButton from '@/components/DownloadButton';
import { ConversionFormat } from '@/types';

export default function Home() {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<ConversionFormat>('pdf');

  const handleFileSelect = (content: string, name: string) => {
    setMarkdownContent(content);
    setFileName(name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Markdown Converter
          </h1>
          <p className="text-xl text-gray-600">
            Convert your Markdown files to PDF, Word, or PowerPoint
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Upload Section */}
          <div className="mb-8">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>

          {/* Preview and Options Section */}
          {markdownContent && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Preview */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Preview
                </h2>
                <div className="h-[600px]">
                  <MarkdownPreview content={markdownContent} />
                </div>
              </div>

              {/* Conversion Options */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Convert
                  </h2>
                  <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">File:</p>
                      <p className="font-medium text-gray-800 truncate">{fileName}</p>
                    </div>

                    <FormatSelector
                      selectedFormat={selectedFormat}
                      onFormatChange={setSelectedFormat}
                    />

                    <DownloadButton
                      content={markdownContent}
                      fileName={fileName}
                      format={selectedFormat}
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
                  <ol className="text-sm text-blue-800 space-y-2">
                    <li>1. Upload your markdown file</li>
                    <li>2. Preview the content</li>
                    <li>3. Select output format</li>
                    <li>4. Click download</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!markdownContent && (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No file uploaded yet
              </h3>
              <p className="text-gray-600">
                Upload a markdown file to get started
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 text-sm">
          <p>Built with Next.js and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
