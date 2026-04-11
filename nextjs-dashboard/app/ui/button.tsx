import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.18em",
    border: "none",
    borderRadius: 4,
    cursor: disabled ? "default" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    position: "relative",
    overflow: "hidden",
    transition: "opacity 0.2s, transform 0.1s",
    opacity: disabled ? 0.6 : 1,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)",
      color: "#fff",
    },
    secondary: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(168,85,247,0.3)",
      color: "#a855f7",
    },
    danger: {
      background: "rgba(248,113,113,0.1)",
      border: "1px solid rgba(248,113,113,0.4)",
      color: "#f87171",
    },
  };

  const sizes: Record<string, React.CSSProperties> = {
    sm: { height: 32, padding: "0 14px", fontSize: 9 },
    md: { height: 42, padding: "0 20px", fontSize: 10 },
    lg: { height: 50, padding: "0 28px", fontSize: 11 },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={{ ...baseStyle, ...variants[variant], ...sizes[size] }}
    >
      {children}
    </button>
  );
}
