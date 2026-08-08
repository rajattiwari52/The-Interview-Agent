import React from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText } from 'lucide-react';

const ResumeDropzone = ({ onFileSelect }) => {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileSelect({
        fileObj: file,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-5 md:p-6 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-blue-500 bg-blue-50/50'
          : 'border-gray-200 bg-gray-50/40 hover:bg-gray-50'
      }`}
    >
      <input {...getInputProps()} />
      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2 text-gray-400">
        <FileText className="w-4 h-4 stroke-[1.75]" />
      </div>
      <p className="font-medium text-xs md:text-sm text-gray-800 mb-0.5">
        Drag and drop your resume here
      </p>
      <p className="text-[11px] text-gray-400 mb-2">or click to browse</p>
      <p className="text-[10px] font-geist text-gray-400">
        Supported: PDF, DOC, DOCX • Max size: 10MB
      </p>
    </div>
  );
};

export default ResumeDropzone;
