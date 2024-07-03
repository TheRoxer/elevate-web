import React from "react";
import classNames from "classnames";

interface ButtonProps {
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  unstyled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  href,
  icon,
  children,
  className,
  style,
  unstyled,
}) => {
  const buttonClasses = classNames(
    {
      "inline-flex items-center gap-2.5 p-3 justify-center rounded-lg bg-custom-gradient shadow-custom-shadow":
        !unstyled,
    },
    className
  );

  if (href) {
    return (
      <a href={href} className={buttonClasses} style={style}>
        {icon && <span>{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses} style={style}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
