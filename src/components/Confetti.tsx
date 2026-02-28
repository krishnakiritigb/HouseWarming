"use client";

import { useEffect, useState } from "react";

interface ConfettiProps {
  big?: boolean;
  onComplete: () => void;
}

const colors = [
  "#e74c3c",
  "#3498db",
  "#2ecc71",
  "#f39c12",
  "#9b59b6",
  "#1abc9c",
  "#e91e63",
  "#00bcd4",
];

export default function Confetti({ big = false, onComplete }: ConfettiProps) {
  const [style, setStyle] = useState({
    left: "0px",
    backgroundColor: colors[0],
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    animationDuration: "3s",
  });

  useEffect(() => {
    const left = Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = big ? Math.random() * 15 + 5 : Math.random() * 10 + 5;
    const duration = big ? Math.random() * 2 + 2 : 3;
    const isCircle = Math.random() > 0.5;

    setStyle({
      left: `${left}px`,
      backgroundColor: color,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: isCircle ? "50%" : "0",
      animationDuration: `${duration}s`,
    });

    const timeout = setTimeout(onComplete, duration * 1000);
    return () => clearTimeout(timeout);
  }, [big, onComplete]);

  return (
    <div
      className="fixed top-0 pointer-events-none z-[999] animate-confetti-fall"
      style={style}
    />
  );
}
