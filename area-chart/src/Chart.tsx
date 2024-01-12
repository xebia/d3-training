import { ReactNode } from "react";

interface ChartProps {
  children: ReactNode;
  margin: { top: number; right: number; bottom: number; left: number };
  width: number;
  height: number;
}

export function Chart({ children, height, margin, width }: ChartProps) {
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>{children}</g>
    </svg>
  );
}
