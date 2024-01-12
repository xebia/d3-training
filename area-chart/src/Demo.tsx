import { AreaChart } from "./AreaChart";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateData(size: number, min: number, max: number) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

export function Demo() {
  const [itemCount, setItemCount] = useState(25);
  const [min, setMin] = useState(10);
  const [max, setMax] = useState(100);

  return (
    <div>
      <h1>Example Area Chart</h1>
      <AreaChart />
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
