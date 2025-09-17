import * as React from "react";
import { Controller } from "react-hook-form";

export const DistanceSlider = ({
  control,
  name = "distance",
  min = 1,
  max = 80,
  step = 1,
  label = "Distance preference",
  helper = "Use the slider to set the maximum distance range for searching",
  hideHelper = false,
  showSectionHeader = true, 
  showInlineLabel = true,    
}) => {
  return (
    <div className="space-y-3">
      {showSectionHeader && (
        <div>
          <div className="mb-2 block text-sm font-medium text-primary-text">DISTANCE</div>
          {!hideHelper && <p className="text-fade-text">{helper}</p>}
        </div>
      )}

      <Controller
        name={name}
        control={control}
        rules={{ min, max }}
        render={({ field }) => {
          const v = Number(field.value ?? min);
          const pct = ((v - min) / (max - min)) * 100;
          return (
            <div>
              {showInlineLabel && (
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm text-primary-text">{label}</label>
                  <div className="text-sm text-primary-text">{v} mi</div>
                </div>
              )}

              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={v}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                className="range w-full"
                style={{
                  background: `linear-gradient(to right, #ef4444 ${pct}%, #e5e7eb ${pct}%)`,
                  "--accent": "#ef4444",
                }}
              />

              <style>{`
                .range {
                  appearance: none;
                  height: 2px;
                  border-radius: 9999px;
                  outline: none;
                }
                .range::-webkit-slider-runnable-track {
                  height: 2px;
                  background: transparent;
                  border-radius: 9999px;
                }
                .range::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  height: 24px;
                  width: 24px;
                  margin-top: -10px; /* center thumb on 6px track */
                  border-radius: 9999px;
                  background: #fff;
                  border: 1px solid var(--accent);
                  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
                  cursor: pointer;
                }
                .range::-moz-range-track {
                  height: 2px;
                  background: transparent;
                  border: none;
                }
                .range::-moz-range-thumb {
                  height: 24px;
                  width: 24px;
                  border-radius: 9999px;
                  background: #fff;
                  border: 1px solid var(--accent);
                  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
                  cursor: pointer;
                }
              `}</style>
            </div>
          );
        }}
      />
    </div>
  );
}
