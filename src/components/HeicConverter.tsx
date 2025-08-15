'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ConvertedFile {
  name: string;
  url: string;
  blob: Blob;
}

export default function HeicConverter() {
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const convertHeicToPng = async (file: File): Promise<ConvertedFile> => {
    const heic2any = (await import('heic2any')).default;
    
    const result = await heic2any({
      blob: file,
      toType: 'image/png',
      quality: 1,
    });
    
    const convertedBlob = Array.isArray(result) ? result[0] : result;
    const url = URL.createObjectURL(convertedBlob as Blob);
    const name = file.name.replace(/\.heic?$/i, '.png');
    
    return {
      name,
      url,
      blob: convertedBlob as Blob,
    };
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsConverting(true);
    
    try {
      const convertedFiles = await Promise.all(
        acceptedFiles.map(convertHeicToPng)
      );
      setConvertedFiles(prev => [...prev, ...convertedFiles]);
    } catch (error) {
      console.error('Error converting files:', error);
      alert('Error converting files. Please try again.');
    } finally {
      setIsConverting(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/heic': ['.heic', '.HEIC'],
      'image/heif': ['.heif', '.HEIF'],
    },
    multiple: true,
  });

  const downloadFile = (file: ConvertedFile) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearFiles = () => {
    convertedFiles.forEach(file => URL.revokeObjectURL(file.url));
    setConvertedFiles([]);
  };

  const downloadAll = () => {
    convertedFiles.forEach(file => {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          HEIC to PNG Converter
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Convert your HEIC/HEIF images to PNG format instantly. Upload single or multiple files at once.
        </p>
        <div className="mt-4 text-sm text-gray-500">
          ✅ Free • ✅ Fast • ✅ No file size limits • ✅ Privacy focused
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer ${
          isDragActive
            ? 'border-blue-500 bg-blue-50 scale-105'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        } ${isConverting ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="text-4xl sm:text-6xl mb-4">📱➡️🖼️</div>
        {isDragActive ? (
          <p className="text-lg sm:text-xl text-blue-600 font-medium">Drop your HEIC files here...</p>
        ) : (
          <div>
            <p className="text-lg sm:text-xl text-gray-700 mb-2 font-medium">
              Drag & drop HEIC files here, or click to browse
            </p>
            <p className="text-sm sm:text-base text-gray-500 mb-4">
              Upload single or multiple files • Supports .heic and .heif formats
            </p>
            <button 
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Choose Files
            </button>
          </div>
        )}
      </div>

      {isConverting && (
        <div className="mt-8 text-center bg-blue-50 rounded-lg p-6">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
          <p className="mt-4 text-lg text-blue-700 font-medium">Converting your files...</p>
          <p className="text-sm text-blue-600">This may take a moment for larger files</p>
        </div>
      )}

      {convertedFiles.length > 0 && (
        <div className="mt-8 sm:mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              ✅ Converted Files ({convertedFiles.length})
            </h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={downloadAll}
                className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Download All
              </button>
              <button
                onClick={clearFiles}
                className="flex-1 sm:flex-none px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {convertedFiles.map((file, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-xl p-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={file.url}
                    alt={file.name}
                    width={400}
                    height={256}
                    className="w-full h-48 sm:h-56 object-cover"
                    unoptimized
                  />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-3 truncate" title={file.name}>
                  {file.name}
                </p>
                <button
                  onClick={() => downloadFile(file)}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <span>📥</span>
                  Download PNG
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isConverting && convertedFiles.length === 0 && (
        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Convert HEIC to PNG?</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
              <div className="bg-white p-4 rounded-lg">
                <span className="text-2xl mb-2 block">🌐</span>
                <h4 className="font-medium text-gray-900 mb-1">Universal Compatibility</h4>
                <p className="text-sm text-gray-600">PNG works on all devices and platforms</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <span className="text-2xl mb-2 block">🚀</span>
                <h4 className="font-medium text-gray-900 mb-1">Web Friendly</h4>
                <p className="text-sm text-gray-600">Perfect for websites and social media</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <span className="text-2xl mb-2 block">🔒</span>
                <h4 className="font-medium text-gray-900 mb-1">Privacy First</h4>
                <p className="text-sm text-gray-600">All processing happens in your browser</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}