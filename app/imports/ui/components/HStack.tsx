import React from "react";

export default function HStack(props: React.PropsWithChildren) {
  return <div className="h-stack">{props.children}</div>;
}
