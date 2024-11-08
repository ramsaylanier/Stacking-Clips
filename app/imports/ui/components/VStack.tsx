import React from "react";

interface VStackProps extends React.PropsWithChildren {
  className?: string;
}

export default function VStack(props: VStackProps) {
  return (
    <div className={`v-stack ${props.className || ""} `}>{props.children}</div>
  );
}
