'use client';

import React, { useState } from 'react';
import { ConversionFormat } from '@/types';
import { saveAs } from 'file-saver';
import { convertToPdf } from '@/lib/converters/toPdf';
import { convertToDocx } from '@/lib/converters/toDocx';
import { convertToPptx } from '@/lib/converters/toPptx';

interface DownloadButtonProps {
  content: string;
  fileName: string;
  format: ConversionFormat;
}

export default function DownloadButton({ content, fileName, format }: DownloadButtonProps) {
  const [isConverting, setIsConverting] = useState(false);

  const handleConvert = async () => {
    setIsConverting(true);
    try {
      let blob: Blob;
      let outputFileName: string;

      switch (format) {
        case 'pdf':
          blob = await convertToPdf(content, fileName);
          outputFileName = fileName.replace(/\.(md|markdown|txt)$/, '.pdf');
          break;
        case 'docx':
          blob = await convertToDocx(content, fileName);
          outputFileName = fileName.replace(/\.(md|markdown|txt)$/, '.docx');
          break;
        case 'pptx':
          blob = await convertToPptx(content, fileName);
          outputFileName = fileName.replace(/\.(md|markdown|txt)$/, '.pptx');
          break;
        default:
          throw new Error('Invalid format');
      }

      saveAs(blob, outputFileName);
    } catch (error) {
      console.error('Conversion error:', error);
      alert('Error converting file. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <button
      onClick={handleConvert}
      disabled={isConverting}
      className={`w-full px-6 py-4 rounded-lg font-medium text-lg shadow-lg transition-all ${
        isConverting
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-green-600 hover:bg-green-700 hover:shadow-xl text-white'
      }`}
    >
      {isConverting ? 'Converting...' : `Download as ${format.toUpperCase()}`}
    </button>
  );
}
