import React from "react";

export const GlassCard = ({
  children,
  className = "",
  hoverGlow = false,
  ...props
}) => {
  return (
    <div
      className={`relative backdrop-blur-xl bg-surface-base border border-surface-border rounded-2xl p-6 transition-all duration-300 ${
        hoverGlow
          ? "hover:border-electric-blue/50 hover:shadow-[0_0_30px_rgba(0,210,255,0.15)]"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
