import { useRef } from "react";
import {
  useScaleX,
  useScaleY,
  useAxisBottom,
  useAxisLeft,
  chartArea,
} from "./chartHelpers";
import { Chart } from "./Chart";

interface AreaChartProps {
  data: number[];
  height: number;
  width: number;
}

const MARGIN = { top: 25, right: 25, bottom: 25, left: 25 };

export function AreaChart({ data, width, height }: AreaChartProps) {
  const areaWidth = width - MARGIN.left - MARGIN.right;
  const areaHeight = height - MARGIN.top - MARGIN.bottom;

  const scaleX = useScaleX(data, areaWidth);
  const scaleY = useScaleY(data, areaHeight);

  const [areaPath, linePath] = chartArea(scaleX, scaleY);

  const axisBottomRef = useRef<SVGGElement>(null);
  const axisLeftRef = useRef<SVGGElement>(null);

  useAxisBottom(axisBottomRef.current, scaleX);
  useAxisLeft(axisLeftRef.current, scaleY);

  return (
    <Chart width={width} height={height} margin={MARGIN}>
      <path className="line" d={linePath(data) ?? undefined} />
      <path className="area" d={areaPath(data) ?? undefined} />
      <g ref={axisLeftRef}></g>
      <g ref={axisBottomRef} transform={`translate(0, ${areaHeight})`}></g>
    </Chart>
  );
}
