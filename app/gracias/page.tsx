import type { Metadata } from "next";
import GraciasContent from "@/components/pages/GraciasContent";

export const metadata: Metadata = {
  title: "Gracias — Stride",
  robots: { index: false },
};

export default function Page() {
  return <GraciasContent />;
}
