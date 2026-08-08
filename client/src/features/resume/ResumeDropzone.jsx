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
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40'
          : 'border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 hover:bg-gray-100/60 dark:hover:bg-slate-800/60'
      }`}
    >
      <input {...getInputProps()} />
      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200/80 dark:border-slate-700 flex items-center justify-center mx-auto mb-2 text-gray-500 dark:text-gray-300">
        <FileText className="w-4 h-4 stroke-[1.75]" />
      </div>
      <p className="font-semibold text-xs md:text-sm text-gray-900 dark:text-white mb-0.5 font-sans">
        Drag and drop your resume here
      </p>
      <p className="text-[11px] text-gray-500 dark:text-slate-400 mb-2 font-geist">or click to browse</p>
      <p className="text-[10px] font-geist text-gray-400 dark:text-slate-500">
        Supported: PDF, DOC, DOCX • Max size: 10MB
      </p>
    </div>
  );
};

export default ResumeDropzone;
