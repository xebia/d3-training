import { useEffect, useMemo, useRef, useState } from "react";
import {
  axisBottom,
  axisLeft,
  easeCubic,
  interpolate,
  scaleLinear,
  select,
  area,
  line,
  timer,
} from "d3";

const MARGIN = { top: 25, right: 25, bottom: 25, left: 25 };
const ANIMATION_MS = 1000;

interface AreaChartProps {
  chartData: number[];
  height: number;
  width: number;
}

function usePrevious(value: unknown) {
  const ref = useRef<unknown>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function AreaChart({ chartData, width, height }: AreaChartProps) {
  const areaWidth = width - MARGIN.left - MARGIN.right;
  const areaHeight = height - MARGIN.top - MARGIN.bottom;

  const [data, setData] = useState(chartData.slice());

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

  const prevChartData = usePrevious(chartData);
  useEffect(() => {
    const interpolator = interpolate(prevChartData, chartData);
    const t = timer((elapsed) => {
      setData(interpolator(easeCubic(elapsed / ANIMATION_MS)).slice());

      if (elapsed > ANIMATION_MS) {
        t.stop();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

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
