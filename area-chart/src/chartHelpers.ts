import { AxisScale, axisBottom, axisLeft } from "d3-axis";
import { scaleLinear, ScaleLinear, NumberValue } from "d3-scale";
import { select } from "d3-selection";
import { area, line } from "d3-shape";
import { useMemo, useEffect } from "react";

export const useScaleX = (data: number[], areaWidth: number) =>
  useMemo(
    () =>
      scaleLinear()
        .domain([0, data.length - 1])
        .range([0, areaWidth]),
    [data, areaWidth]
  );

export const useScaleY = (data: number[], areaHeight: number) =>
  useMemo(
    () =>
      scaleLinear()
        .domain([0, data.length ? Math.max.apply(null, data) : 0])
        .range([areaHeight, 0]),
    [data, areaHeight]
  );

export const chartArea = (
  scaleX: ScaleLinear<number, number>,
  scaleY: ScaleLinear<number, number>
) => {
  const areaPath = area<number>()
    .x((_, i) => scaleX(i))
    .y0(scaleY(0))
    .y1((d) => scaleY(d));

  const linePath = line<number>()
    .x((_, i) => scaleX(i))
    .y((d) => scaleY(d));

  return [areaPath, linePath];
};

export const useAxisBottom = (
  ref: SVGGElement | null,
  scaleX: AxisScale<NumberValue>
) =>
  useEffect(() => {
    if (ref) {
      select(ref).call(axisBottom(scaleX));
    }
  }, [ref, scaleX]);

export const useAxisLeft = (
  ref: SVGGElement | null,
  scaleY: AxisScale<NumberValue>
) =>
  useEffect(() => {
    if (ref) {
      select(ref).call(axisLeft(scaleY));
    }
  }, [ref, scaleY]);
