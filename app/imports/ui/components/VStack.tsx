import React from "react";

interface VStackProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
}

export default function VStack(props: VStackProps) {
  return (
    <div className={`v-stack ${props.className || ""} `} style={props.style}>
      {props.children}
    </div>
  );
}
