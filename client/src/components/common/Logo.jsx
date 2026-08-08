import React from 'react';

const Logo = ({ className = '', iconOnly = false, textClassName = '' }) => {
  return (
    <div className={`inline-flex items-center space-x-2.5 ${className}`}>
      {/* Exact Blue Squircle Icon Container */}
      <div className="w-[34px] h-[34px] rounded-[10px] bg-[#1E65FF] flex items-center justify-center text-white shrink-0 shadow-2xs transition-transform group-hover:scale-105">
        <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bottom-left solid white dot */}
          <circle cx="6.2" cy="17.8" r="1.75" fill="white" />

          {/* Central main 4-point sparkle */}
          <path
            d="M12 4C12 7.7 13.3 9 17 9C13.3 9 12 10.3 12 14C12 10.3 10.7 9 7 9C10.7 9 12 7.7 12 4Z"
            fill="white"
          />

          {/* Top-right small 4-point sparkle */}
          <path
            d="M17.5 3.5C17.5 4.6 18.2 5.2 19.3 5.2C18.2 5.2 17.5 5.8 17.5 6.9C17.5 5.8 16.8 5.2 15.7 5.2C16.8 5.2 17.5 4.6 17.5 3.5Z"
            fill="white"
          />
        </svg>
      </div>

      {!iconOnly && (
        <span className={`text-[21px] font-bold tracking-[-0.03em] text-[#0F172A] dark:text-white font-sans leading-none ${textClassName}`}>
          IntervueAI
        </span>
      )}
    </div>
  );
};

export default Logo;
