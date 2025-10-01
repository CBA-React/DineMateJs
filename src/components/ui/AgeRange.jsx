import { useController } from "react-hook-form";
import { NumberInput } from "/src/components/ui/NumberInput";

export const AgeRange = ({
  control,
  min = 18,
  max = 100,
  step = 1,
  label = "AGE RANGE",
}) => {
  const { field: minField } = useController({ name: "age_from", control, defaultValue: min });
  const { field: maxField } = useController({ name: "age_to", control, defaultValue: min + 10 });

  const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
  const pct = (v) => ((v - min) / (max - min)) * 100;

  const minVal = clamp(Number(minField.value ?? min), min, max);
  const maxVal = clamp(Number(maxField.value ?? max), min, max);

  const setMin = (v) => minField.onChange(clamp(v, min, maxVal - step));
  const setMax = (v) => maxField.onChange(clamp(v, minVal + step, max));

  return (
    <div className="space-y-3">
      <div className="block text-sm font-medium text-primary-text">{label}</div>

      <div className="relative h-7 select-none">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200 rounded-full" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-red-500 rounded-full"
          style={{ left: `${pct(minVal)}%`, right: `${100 - pct(maxVal)}%` }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => setMin(Number(e.target.value))}
          className="dual-range absolute left-0 right-0 top-1/2 -translate-y-1/2 z-20"
          aria-label="Minimum age"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => setMax(Number(e.target.value))}
          className="dual-range absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10"
          aria-label="Maximum age"
        />

        <style>{`
          .dual-range {
            -webkit-appearance: none;
            appearance: none;
            background: none;
            width: 100%;
            height: 24px;             /* hit area */
            outline: none;
            pointer-events: none;
          }
          .dual-range::-webkit-slider-runnable-track {
            height: 24px;
            background: transparent;
          }
          .dual-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 24px;
            width: 24px;
            border-radius: 9999px;
            background: #fff;
            border: 1px solid #ef4444;
            box-shadow: 0 1px 2px rgba(0,0,0,0.06);
            cursor: pointer;
            pointer-events: auto;
          }
          .dual-range::-moz-range-track {
            height: 28px;
            background: transparent;
          }
          .dual-range::-moz-range-thumb {
            height: 24px;
            width: 24px;
            border-radius: 9999px;
            background: #fff;
            border: 2px solid #ef4444;
            box-shadow: 0 1px 2px rgba(0,0,0,0.06);
            cursor: pointer;
            pointer-events: auto;
          }
        `}</style>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label=""
          value={String(minVal)}
          placeholder=""
          onChange={(val) => {
            const n = Number(val);
            if (!Number.isNaN(n)) setMin(n);
          }}
          min={min}
          max={maxVal - step}
          inputProps={{ name: "ageMin" }}
        />
        <NumberInput
          label=""
          placeholder=""
          value={String(maxVal)}
          onChange={(val) => {
            const n = Number(val);
            if (!Number.isNaN(n)) setMax(n);
          }}
          min={minVal + step}
          max={max}
          inputProps={{ name: "ageMax" }}
        />
      </div>
    </div>
  );
}
