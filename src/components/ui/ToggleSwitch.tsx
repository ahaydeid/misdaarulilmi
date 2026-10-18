"use client";

import { useEffect, useRef, useState } from "react";

export type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked?: boolean) => void;
  disabled?: boolean;
  labels?: [string, string];
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  labels,
  size = "md",
  className = "",
}: ToggleSwitchProps) {
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);
  const [sliderStyle, setSliderStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (!labels) return;
    const activeBtn = checked ? leftRef.current : rightRef.current;
    if (activeBtn) {
      setSliderStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
    }
  }, [checked, labels]);

  if (labels) {
    const [leftLabel, rightLabel] = labels;

    const sizePillContainerClasses = {
      sm: "text-[11px]",
      md: "text-xs",
      lg: "text-sm",
    }[size];

    const sizePillButtonClasses = {
      sm: "px-3 py-1 font-medium",
      md: "px-4 py-1.5 font-medium",
      lg: "px-5 py-2 font-medium",
    }[size];

    const insetVerticalClasses =
      size === "lg" ? "top-1 bottom-1" : "top-0.5 bottom-0.5";
    const paddingClasses = size === "lg" ? "p-1" : "p-0.5";

    return (
      <div
        className={`relative inline-flex items-center rounded-full bg-zinc-100 p-0.5 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 ${paddingClasses} ${sizePillContainerClasses} ${className}`}
      >
        {sliderStyle.width > 0 && (
          <div
            className={`absolute ${insetVerticalClasses} rounded-full bg-emerald-600 transition-all duration-200 ease-out`}
            style={{
              left: `${sliderStyle.left}px`,
              width: `${sliderStyle.width}px`,
            }}
          />
        )}
        <button
          ref={leftRef}
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            if (!disabled && !checked) onChange(true);
          }}
          className={`relative z-10 text-center whitespace-nowrap transition-colors duration-200 cursor-pointer rounded-full ${sizePillButtonClasses} ${
            checked
              ? "text-white font-medium"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          }`}
        >
          {leftLabel}
        </button>
        <button
          ref={rightRef}
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            if (!disabled && checked) onChange(false);
          }}
          className={`relative z-10 text-center whitespace-nowrap transition-colors duration-200 cursor-pointer rounded-full ${sizePillButtonClasses} ${
            !checked
              ? "text-white font-medium"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          }`}
        >
          {rightLabel}
        </button>
      </div>
    );
  }

  const sizeTrackClasses = {
    sm: "h-5 w-9",
    md: "h-6 w-11",
    lg: "h-7 w-14",
  }[size];

  const sizeKnobClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }[size];

  const sizeTranslateClasses = {
    sm: checked ? "translate-x-4" : "translate-x-0.5",
    md: checked ? "translate-x-5" : "translate-x-0.5",
    lg: checked ? "translate-x-7" : "translate-x-0.5",
  }[size];

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        if (!disabled) onChange(!checked);
      }}
      disabled={disabled}
      className={`relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${sizeTrackClasses} ${
        checked ? "bg-emerald-600" : "bg-zinc-200 dark:bg-zinc-700"
      } ${className}`}
    >
      <span
        className={`pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${sizeKnobClasses} ${sizeTranslateClasses}`}
      />
    </button>
  );
}

export default ToggleSwitch;
