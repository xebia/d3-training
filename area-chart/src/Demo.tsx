import { interval, now } from "d3-timer";
import { AreaChart } from "./AreaChart";
import { useEffect, useState } from "react";
import { ScatterPlot } from "./ScatterPlot";

const REFRESH_RATE = 2000;

function generateData(size: number, min: number, max: number) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

export function Demo() {
  const [data, setData] = useState<number[]>([]);
  const [scatterData, setScatterData] = useState<[number, number][]>([]);
  const [itemCount, setItemCount] = useState(25);
  const [min, setMin] = useState(10);
  const [max, setMax] = useState(100);

  useEffect(() => {
    const int = interval(
      () => {
        // For area chart
        setData(generateData(itemCount, min, max));

        // For scatter plot
        const scatterX = generateData(itemCount, min, max);
        const scatterY = generateData(itemCount, min, max);
        setScatterData(scatterX.map((x, i) => [x, scatterY[i]]));
      },
      REFRESH_RATE,
      now() - REFRESH_RATE
    );
    return () => int.stop();
  }, [itemCount, min, max]);

  return (
    <div>
      <h1>Example Area Chart</h1>
      <AreaChart data={data} width={300} height={300} />
      <ScatterPlot data={scatterData} width={300} height={300} />
      <div className="content">
        <div>
          <label htmlFor="itemCount">Record Count: </label>
          <input
            id="itemCount"
            value={itemCount}
            onChange={(e) =>
              setItemCount(+(e.target as HTMLInputElement).value)
            }
          />
        </div>
        <div>
          <label htmlFor="min">Min Value: </label>
          <input
            id="min"
            value={min}
            onChange={(e) => setMin(+(e.target as HTMLInputElement).value)}
          />
        </div>
        <div>
          <label htmlFor="max">Max Value: </label>
          <input
            id="max"
            value={max}
            onChange={(e) => setMax(+(e.target as HTMLInputElement).value)}
          />
        </div>
      </div>
    </div>
  );
}
