import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Recovery Mix | Stride",
};

export default function Page() {
  redirect("/producto");
}
