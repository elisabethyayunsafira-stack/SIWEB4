"use client";

import { useState } from "react";

interface SearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export default function Search({
  placeholder = "COMMAND SEARCH...",
  onSearch,
}: SearchProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 34,
        padding: "0 14px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 4,
        transition: "border-color 0.2s",
        minWidth: 240,
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4b5563"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          background: "none",
          border: "none",
          outline: "none",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10,
          color: "#9ca3af",
          letterSpacing: "0.12em",
          width: "100%",
        }}
      />
      {value && (
        <button
          onClick={() => { setValue(""); onSearch?.(""); }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#4b5563",
            display: "flex",
            alignItems: "center",
            padding: 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
