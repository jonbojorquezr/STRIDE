"use client";
import React from "react";

/* Reemplaza el web component <image-slot> del export.
   - Si recibe `src`, muestra la imagen (object-fit cover).
   - Si no, muestra un placeholder limpio con la leyenda.
   El tamaño/forma viene de la clase CSS (.hero-slot, .pf-slot, etc.). */
export function ImageSlot({
  className = "",
  shape = "rounded",
  radius = 16,
  src,
  alt = "",
  placeholder = "",
  fit = "cover",
  style,
}: {
  className?: string;
  shape?: "rect" | "rounded" | "circle" | "pill";
  radius?: number;
  src?: string;
  alt?: string;
  placeholder?: string;
  fit?: "cover" | "contain" | "fill";
  style?: React.CSSProperties;
}) {
  const borderRadius =
    shape === "circle"
      ? "50%"
      : shape === "pill"
        ? "999px"
        : shape === "rect"
          ? 0
          : radius;

  return (
    <div
      className={"img-slot" + (className ? " " + className : "")}
      data-empty={src ? undefined : "true"}
      style={{ borderRadius, ...style }}
    >
      {src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={src} alt={alt} style={{ objectFit: fit, borderRadius }} />
      ) : (
        <span className="img-slot-ph mono">{placeholder}</span>
      )}
    </div>
  );
}
