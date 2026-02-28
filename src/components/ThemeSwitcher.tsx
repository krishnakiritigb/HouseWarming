"use client";

import { useState } from "react";

export interface CustomColors {
  background: string;
  cardBackground: string;
  primaryText: string;
  secondaryText: string;
  accentColor: string;
  headingColor: string;
}

interface ThemeSwitcherProps {
  colors: CustomColors;
  onColorChange: (colors: CustomColors) => void;
}

const presets = [
  {
    name: "Warm Sunset",
    colors: {
      background: "#fff7ed",
      cardBackground: "#ffffff",
      primaryText: "#1f2937",
      secondaryText: "#6b7280",
      accentColor: "#f97316",
      headingColor: "#ea580c",
    },
  },
  {
    name: "Elegant Rose",
    colors: {
      background: "#fdf2f8",
      cardBackground: "#ffffff",
      primaryText: "#1f2937",
      secondaryText: "#6b7280",
      accentColor: "#ec4899",
      headingColor: "#db2777",
    },
  },
  {
    name: "Ocean Blue",
    colors: {
      background: "#eff6ff",
      cardBackground: "#ffffff",
      primaryText: "#1f2937",
      secondaryText: "#6b7280",
      accentColor: "#3b82f6",
      headingColor: "#2563eb",
    },
  },
  {
    name: "Forest Green",
    colors: {
      background: "#f0fdf4",
      cardBackground: "#ffffff",
      primaryText: "#1f2937",
      secondaryText: "#6b7280",
      accentColor: "#22c55e",
      headingColor: "#16a34a",
    },
  },
  {
    name: "Royal Purple",
    colors: {
      background: "#faf5ff",
      cardBackground: "#ffffff",
      primaryText: "#1f2937",
      secondaryText: "#6b7280",
      accentColor: "#a855f7",
      headingColor: "#9333ea",
    },
  },
  {
    name: "Dark Mode",
    colors: {
      background: "#1f2937",
      cardBackground: "#374151",
      primaryText: "#f9fafb",
      secondaryText: "#d1d5db",
      accentColor: "#fbbf24",
      headingColor: "#f59e0b",
    },
  },
];

export default function ThemeSwitcher({ colors, onColorChange }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (key: keyof CustomColors, value: string) => {
    onColorChange({ ...colors, [key]: value });
  };

  const applyPreset = (preset: typeof presets[0]) => {
    onColorChange(preset.colors);
  };

  const copyToClipboard = () => {
    const code = `// Paste this in your config or component:
const customColors = ${JSON.stringify(colors, null, 2)};`;
    navigator.clipboard.writeText(code);
    alert("Colors copied to clipboard!");
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-110 active:scale-95 border-2 border-white"
        style={{ backgroundColor: colors.accentColor }}
        title="Customize Colors"
      >
        🎨
      </button>

      {/* Color Panel */}
      {isOpen && (
        <div className="absolute bottom-18 left-0 bg-white rounded-2xl shadow-2xl p-5 w-80 max-h-[80vh] overflow-y-auto animate-pop-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg">Customize Colors</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Presets */}
          <div className="mb-5">
            <p className="text-sm font-medium text-gray-600 mb-2">Quick Presets</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border hover:shadow-md transition-shadow"
                  style={{
                    backgroundColor: preset.colors.background,
                    color: preset.colors.headingColor,
                    borderColor: preset.colors.accentColor,
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: preset.colors.accentColor }}
                  />
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <hr className="my-4" />

          {/* Individual Color Pickers */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-600">Custom Colors</p>

            {/* Background Color */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Page Background</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.background}
                  onChange={(e) => handleColorChange("background", e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={colors.background}
                  onChange={(e) => handleColorChange("background", e.target.value)}
                  className="w-20 text-xs px-2 py-1 border rounded font-mono"
                />
              </div>
            </div>

            {/* Card Background */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Card Background</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.cardBackground}
                  onChange={(e) => handleColorChange("cardBackground", e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={colors.cardBackground}
                  onChange={(e) => handleColorChange("cardBackground", e.target.value)}
                  className="w-20 text-xs px-2 py-1 border rounded font-mono"
                />
              </div>
            </div>

            {/* Heading Color */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Heading Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.headingColor}
                  onChange={(e) => handleColorChange("headingColor", e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={colors.headingColor}
                  onChange={(e) => handleColorChange("headingColor", e.target.value)}
                  className="w-20 text-xs px-2 py-1 border rounded font-mono"
                />
              </div>
            </div>

            {/* Primary Text */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Primary Text</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.primaryText}
                  onChange={(e) => handleColorChange("primaryText", e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={colors.primaryText}
                  onChange={(e) => handleColorChange("primaryText", e.target.value)}
                  className="w-20 text-xs px-2 py-1 border rounded font-mono"
                />
              </div>
            </div>

            {/* Secondary Text */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Secondary Text</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.secondaryText}
                  onChange={(e) => handleColorChange("secondaryText", e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={colors.secondaryText}
                  onChange={(e) => handleColorChange("secondaryText", e.target.value)}
                  className="w-20 text-xs px-2 py-1 border rounded font-mono"
                />
              </div>
            </div>

            {/* Accent Color */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700">Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colors.accentColor}
                  onChange={(e) => handleColorChange("accentColor", e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-200"
                />
                <input
                  type="text"
                  value={colors.accentColor}
                  onChange={(e) => handleColorChange("accentColor", e.target.value)}
                  className="w-20 text-xs px-2 py-1 border rounded font-mono"
                />
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="w-full mt-5 py-2 px-4 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.accentColor }}
          >
            📋 Copy Color Config
          </button>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Remove this panel before deploying
          </p>
        </div>
      )}
    </div>
  );
}
