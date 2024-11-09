import React from "react";

interface HStackProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  justify?: "flex-start" | "center" | "flex-end";
  align?: "flex-start" | "center" | "flex-end";
}

export default function HStack(props: HStackProps) {
  return (
    <div
      className={`h-stack ${props.className || ""} `}
      style={{
        justifyContent: props.justify,
        alignItems: props.align,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
}
