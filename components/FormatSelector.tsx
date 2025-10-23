'use client';

import React from 'react';
import { ConversionFormat } from '@/types';

interface FormatSelectorProps {
  selectedFormat: ConversionFormat;
  onFormatChange: (format: ConversionFormat) => void;
}

export default function FormatSelector({ selectedFormat, onFormatChange }: FormatSelectorProps) {
  const formats: Array<{ value: ConversionFormat; label: string; icon: string }> = [
    { value: 'pdf', label: 'PDF', icon: '📄' },
    { value: 'docx', label: 'Word', icon: '📝' },
    { value: 'pptx', label: 'PowerPoint', icon: '📊' },
  ];

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Select Output Format:</h3>
      <div className="grid grid-cols-3 gap-4">
        {formats.map((format) => (
          <button
            key={format.value}
            onClick={() => onFormatChange(format.value)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedFormat === format.value
                ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
            }`}
          >
            <div className="text-3xl mb-2">{format.icon}</div>
            <div className="font-medium">{format.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
