import type { Metadata } from "next";
import "../division.css";
import DivisionContent from "@/components/pages/DivisionContent";

export const metadata: Metadata = {
  title: "Stride — Recover",
  description:
    "Recover: Recovery Mix con proporción 3:2 de carbohidratos y proteína, 18 aminoácidos y 16 vitaminas y minerales. Encuentra tu calma, recupera tu fuerza.",
};

export default function Page() {
  return <DivisionContent division="recover" />;
}
