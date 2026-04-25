"use client";

import { useEffect, useState } from "react";

export default function InteractiveGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{
        backgroundImage: `
          linear-gradient(rgba(203, 213, 225, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(203, 213, 225, 0.2) 1px, transparent 1px)
        `,
        backgroundSize: "30px 30px",
        maskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
        WebkitMaskImage: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
      }}
    />
  );
}