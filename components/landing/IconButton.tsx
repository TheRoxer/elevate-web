import React from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  href,
  target,
}) => {
  const buttonClasses =
    "flex w-[48px] h-[48px] p-3 gap-10 justify-center items-center rounded-lg bg-opacity-70 bg-gray-800 shadow-inner";
  const buttonStyle = {
    background: "rgba(32, 29, 44, 0.70)",
    boxShadow: "0px 0px 4px 0px rgba(111, 111, 111, 0.25) inset",
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={`${buttonClasses}`}
        style={buttonStyle}
      >
        {icon}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${buttonClasses}`}
      style={buttonStyle}
    >
      {icon}
    </button>
  );
};

export default IconButton;
