import { spacing } from "@/styles/design-tokens";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`${spacing.container.maxWidth} ${spacing.container.padding} mx-auto ${className}`}>
      {children}
    </div>
  );
}
