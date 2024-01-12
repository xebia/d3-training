import { useEffect, useMemo, useRef } from "react";
import { axisBottom, axisLeft, scaleLinear, select, area, line } from "d3";

const MARGIN = { top: 25, right: 25, bottom: 25, left: 25 };

interface AreaChartProps {
  data: number[];
  height: number;
  width: number;
}

export function AreaChart({ data, width, height }: AreaChartProps) {
  const areaWidth = width - MARGIN.left - MARGIN.right;
  const areaHeight = height - MARGIN.top - MARGIN.bottom;

  const scaleX = useMemo(
    () =>
      scaleLinear()
        .domain([0, data.length - 1])
        .range([0, areaWidth]),
    [data, areaWidth]
  );
  const scaleY = useMemo(
    () =>
      scaleLinear()
        .domain([0, data.length ? Math.max.apply(null, data) : 0])
        .range([areaHeight, 0]),
    [data, areaHeight]
  );

  const areaPath = area<number>()
    .x((_, i) => scaleX(i))
    .y0(scaleY(0))
    .y1((d) => scaleY(d));

  const linePath = line<number>()
    .x((_, i) => scaleX(i))
    .y((d) => scaleY(d));

  const axisBottomRef = useRef<SVGGElement>(null);
  const axisLeftRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (axisBottomRef.current) {
      select(axisBottomRef.current).call(axisBottom(scaleX));
    }
  }, [scaleX]);

  useEffect(() => {
    if (axisLeftRef.current) {
      select(axisLeftRef.current).call(axisLeft(scaleY));
    }
  }, [scaleY]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        <path className="line" d={linePath(data) ?? undefined} />
        <path className="area" d={areaPath(data) ?? undefined} />
        <g ref={axisLeftRef}></g>
        <g ref={axisBottomRef} transform={`translate(0, ${areaHeight})`}></g>
      </g>
    </svg>
  );
}
