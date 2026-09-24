import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Creatina | Stride",
};

export default function Page() {
  redirect("/creatina");
}
