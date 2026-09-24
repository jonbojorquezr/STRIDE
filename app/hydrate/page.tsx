import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Electrolitos | Stride",
};

export default function Page() {
  redirect("/electrolitos");
}
