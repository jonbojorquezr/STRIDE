import type { Metadata } from "next";
import "./home.css";
import HomeContent from "@/components/pages/HomeContent";

export const metadata: Metadata = {
  title: "Stride — Recovery Mix · Running Recovery",
  description:
    "Stride: recuperación para atletas de resistencia. La fórmula 3:2 de carbohidratos y proteína, respaldada por la ciencia. Hecho en México.",
};

export default function Page() {
  return <HomeContent />;
}
