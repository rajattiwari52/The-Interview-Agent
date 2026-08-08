import React from 'react';

const FilePreviewCard = ({ fileName = 'resume.pdf', fileSize = '2.4 MB', onRemove }) => {
  const extension = fileName.split('.').pop().toUpperCase();

  return (
    <div className="border border-gray-200/70 dark:border-slate-800 rounded-xl p-3.5 flex items-center justify-between mt-4 bg-white dark:bg-slate-900 shadow-2xs w-full overflow-hidden transition-colors">
      <div className="flex items-center space-x-3 min-w-0 flex-1 mr-3">
        <div className="w-9 h-9 rounded bg-red-100/70 dark:bg-red-950/60 border dark:border-red-900/60 text-red-600 dark:text-red-400 font-bold text-[10px] font-geist flex items-center justify-center shrink-0 uppercase">
          {extension}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-geist font-medium text-gray-800 dark:text-white truncate" title={fileName}>
            {fileName}
          </p>
          <p className="text-[11px] font-geist text-gray-400 dark:text-slate-400">{fileSize}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-xs font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-red-400 px-2 py-1 transition-colors shrink-0 ml-auto"
      >
        Remove
      </button>
    </div>
  );
};

export default FilePreviewCard;
