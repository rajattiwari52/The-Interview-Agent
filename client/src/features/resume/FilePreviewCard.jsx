import React from 'react';

const FilePreviewCard = ({ fileName = 'resume.pdf', fileSize = '2.4 MB', onRemove }) => {
  const extension = fileName.split('.').pop().toUpperCase();

  return (
    <div className="border border-gray-200/70 rounded-xl p-3.5 flex items-center justify-between mt-4 bg-white shadow-2xs w-full overflow-hidden">
      <div className="flex items-center space-x-3 min-w-0 flex-1 mr-3">
        <div className="w-9 h-9 rounded bg-red-100/70 text-red-600 font-bold text-[10px] font-geist flex items-center justify-center shrink-0 uppercase">
          {extension}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-geist font-medium text-gray-800 truncate" title={fileName}>
            {fileName}
          </p>
          <p className="text-[11px] font-geist text-gray-400">{fileSize}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-xs font-medium text-gray-500 hover:text-gray-700 px-2 py-1 transition-colors shrink-0 ml-auto"
      >
        Remove
      </button>
    </div>
  );
};

export default FilePreviewCard;
