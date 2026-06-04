"use client";
import Link from "next/link";
import { HOME_URL } from "@/lib/routes";

/* Isotipo oficial. variant 'white' para fondos oscuros; si recibe un color
   claro (aqua/paper/white) elige blanco automáticamente. */
export function Mark({
  size = 26,
  color = "",
  variant,
}: {
  size?: number;
  color?: string;
  variant?: "white";
}) {
  const light = variant === "white" || /aqua|paper|#fff|white|255/i.test(color);
  const src = light ? "/logos/stride-mark-white.png" : "/logos/stride-mark.png";
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt=""
      aria-hidden="true"
      style={{ height: size, width: "auto", display: "block", flex: "0 0 auto" }}
    />
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href={HOME_URL} className="logo" aria-label="Stride">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={light ? "/logos/stride-logo-white.png" : "/logos/stride-logo.png"}
        alt="Stride"
        className="logo-img"
      />
    </Link>
  );
}
