import React from "react";

interface VStackProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  gap?: number | string;
  as?: React.ElementType;
  onClick?: () => void;
}

export default function VStack(props: VStackProps) {
  const Component = props.as || "div";

  return (
    <Component
      className={`v-stack ${props.className || ""} `}
      style={{
        justifyContent: props.justify,
        alignItems: props.align,
        gap: props.gap,
        ...props.style,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Component>
  );
}
