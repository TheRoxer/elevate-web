import PropTypes from "prop-types";
import { motion } from "framer-motion";
import React from "react";

interface TextWriteProps {
  children: React.ReactNode;
  className?: string;
}

export function TextWrite({ children, className }: TextWriteProps) {
  const renderChildren = (
    child: React.ReactNode,
    index: number,
    baseDelay: number
  ): React.ReactNode => {
    if (typeof child === "string") {
      const totalDuration = child.length * 0.05; // Calculate total duration for initial text
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
    } else if (React.isValidElement(child)) {
      const totalDuration = React.Children.count(child.props.children) * 1; // Calculate total duration for nested content
      return React.cloneElement(child, {
        key: index,
        children: React.Children.map(
          child.props.children,
          (nestedChild, nestedIndex) =>
            renderChildren(nestedChild, nestedIndex, baseDelay + totalDuration)
        ),
      });
    }
    return null;
  };

  return (
    <h1 className={className}>
      {React.Children.map(children, (child, index) =>
        renderChildren(child, index, 0)
      )}
    </h1>
  );
}
