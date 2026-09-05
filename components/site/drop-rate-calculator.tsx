"use client";

import { useMemo, useState } from "react";

function parseCount(value: string) {
  if (value.trim() === "") return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

export function DropRateCalculator() {
  const [runs, setRuns] = useState("100");
  const [drops, setDrops] = useState("2");

  const result = useMemo(() => {
    const runCount = parseCount(runs);
    const dropCount = parseCount(drops);
    if (runCount === null || dropCount === null || runCount <= 0 || dropCount < 0) return null;
    return (dropCount / runCount) * 100;
  }, [runs, drops]);

  const display = result === null ? "Enter valid run and drop counts" : `${Number.isInteger(result) ? result.toFixed(0) : result.toFixed(2)}%`;

  return (
    <form className="content-card mt-7 max-w-xl" onSubmit={(event) => event.preventDefault()}>
      <p className="font-black text-foreground">Observed Drop Rate = Target Drops / Runs × 100%</p>
      <p className="mt-2 text-sm leading-6">Example: 100 runs and 2 target drops equals 2%.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-bold text-foreground">
          Number of Runs
          <input
            className="mt-2 w-full rounded-[calc(var(--radius)*.65)] border border-border bg-secondary px-4 py-3 font-bold text-foreground"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            value={runs}
            onChange={(event) => setRuns(event.target.value)}
          />
        </label>
        <label className="block text-sm font-bold text-foreground">
          Number of Target Drops
          <input
            className="mt-2 w-full rounded-[calc(var(--radius)*.65)] border border-border bg-secondary px-4 py-3 font-bold text-foreground"
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            value={drops}
            onChange={(event) => setDrops(event.target.value)}
          />
        </label>
      </div>
      <p className="mt-5 text-lg font-black text-foreground" aria-live="polite">Observed drop rate: {display}</p>
      <p className="mt-3 text-sm leading-6">This is your observed sample rate, not an official global drop rate.</p>
    </form>
  );
}
