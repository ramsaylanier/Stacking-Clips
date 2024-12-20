import React from "react";

interface HStackProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  justify?: "flex-start" | "center" | "flex-end" | "space-between";
  align?: "flex-start" | "center" | "flex-end";
  gap?: number | string;
  as?: React.ElementType;
}

export default function HStack(props: HStackProps) {
  const Component = props.as || "div";
  return (
    <Component
      className={`h-stack ${props.className || ""} `}
      style={{
        justifyContent: props.justify,
        alignItems: props.align,
        gap: props.gap,
        ...props.style,
      }}
    >
      {props.children}
    </Component>
  );
}
