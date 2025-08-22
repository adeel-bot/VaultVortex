import React from 'react'
import getPasswordStrength from './PasswordStrength';

const StrengthBar = ({password,theme}) => {
  const { label, percentage, color } = getPasswordStrength(password);

  return (
    <div
      className="strength-bar justify-center items-center flex flex-col w-14 px-1 py-0.5 md:px-1.5 md:py-1 rounded-lg backdrop-blur-sm bg-transparent"
    >
      {/* Progress Bar */}
      <div className={`h-2 w-full rounded-full overflow-hidden
                ${theme?'bg-[#383838cf]':'bg-[#cfcfcfcf]'}
        `}>
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: color, 
          }}
        ></div>
      </div>

      {/* Label */}
      <span className="text-xs font-medium mt-1">{label}</span>
    </div>
  );
};

export default StrengthBar