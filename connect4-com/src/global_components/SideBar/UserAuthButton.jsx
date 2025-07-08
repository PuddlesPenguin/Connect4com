import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderUserAuthButton = ({
  text,
  to,
  onClick, // allow custom onClick
  bg_color = 'bg-[#60a7b1]',
  hover_color = 'hover:bg-[#36393f]',
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);       // call passed onClick if exists
    if (to) navigate(to);          // navigate if 'to' is provided
  };

  return (
    <div className="flex justify-center ml-3 my-3">
      <button
        className={`w-[200px] h-[50px] flex items-center justify-center px-4 py-3 rounded-[4px] transition-colors duration-150 ${bg_color} ${hover_color}`}
        onClick={handleClick}
        {...props}
      >
        <span className="text-white text-lg font-bold font-nunito">
          {text}
        </span>
      </button>
    </div>
  );
};

export default HeaderUserAuthButton;
