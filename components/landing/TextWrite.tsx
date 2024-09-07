import { motion } from "framer-motion";
import React from "react";

interface TextWriteProps {
  children: React.ReactNode;
  className?: string;
}

interface TextWithLineBreaksProps {
  text: string;
}

const TextWithLineBreaks: React.FC<TextWithLineBreaksProps> = ({ text }) => {
  const textWithBreaks = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line.split("").map((char, charIndex) => (
        <motion.span
          key={char + "-" + index + "-" + charIndex}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          className="inline-block"
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.5 + charIndex * 0.05 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <br />
    </React.Fragment>
  ));

  return <>{textWithBreaks}</>;
};

export function TextWrite({ children, className }: TextWriteProps) {
  const renderChildren = (
    child: React.ReactNode,
    index: number,
    baseDelay: number
  ): React.ReactNode => {
    if (typeof child === "string") {
      return child.split("").map((char, charIndex) => (
        <motion.span
          key={char + "-" + index + "-" + charIndex}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          className="inline-block"
          initial="hidden"
          animate="visible"
          transition={{ delay: baseDelay + charIndex * 0.05 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ));
    } else if (React.isValidElement(child) && child.type === "span") {
      return (
        <span key={index} className={child.props.className}>
          {React.Children.map(
            child.props.children,
            (nestedChild, nestedIndex) =>
              renderChildren(nestedChild, nestedIndex, baseDelay + 1)
          )}
        </span>
      );
    }
    return null;
  };

  return (
    <h1 className={className} id="h1">
      {React.Children.map(children, (child, index) =>
        typeof child === "string" ? (
          <TextWithLineBreaks key={index} text={child} />
        ) : (
          renderChildren(child, index, 0)
        )
      )}
    </h1>
  );
}
