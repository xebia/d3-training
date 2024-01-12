import { useRef } from "react";
import { useScaleY, useAxisBottom, useAxisLeft } from "./chartHelpers";
import { Chart } from "./Chart";

interface ScatterPlot {
  data: [number, number][];
  height: number;
  width: number;
}

const MARGIN = { top: 25, right: 25, bottom: 25, left: 25 };

export function ScatterPlot({ data, width, height }: ScatterPlot) {
  const areaWidth = width - MARGIN.left - MARGIN.right;
  const areaHeight = height - MARGIN.top - MARGIN.bottom;

  const scaleX = useScaleY(
    data.map(([x]) => x),
    areaWidth
  );
  scaleX.range([0, areaWidth]);

  const scaleY = useScaleY(
    data.map(([, y]) => y),
    areaHeight
  );

  const axisBottomRef = useRef<SVGGElement>(null);
  const axisLeftRef = useRef<SVGGElement>(null);

  useAxisBottom(axisBottomRef.current, scaleX);
  useAxisLeft(axisLeftRef.current, scaleY);

  return (
    <Chart width={width} height={height} margin={MARGIN}>
      {data.map((d) => (
        <circle cx={scaleX(d[0])} cy={scaleY(d[1])} r={4} />
      ))}
      <g ref={axisLeftRef}></g>
      <g ref={axisBottomRef} transform={`translate(0, ${areaHeight})`}></g>
    </Chart>
  );
}
