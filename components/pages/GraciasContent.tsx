"use client";
import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { PROD_URL, HOME_URL } from "@/lib/routes";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Mark } from "@/components/Brand";

export default function GraciasContent() {
  const { t, clearCart } = useStore();
  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Nav />
      <main>
        <section className="section" style={{ textAlign: "center", paddingTop: 96, paddingBottom: 96 }}>
          <div className="wrap" style={{ maxWidth: 560 }}>
            <Mark size={40} color="var(--teal)" />
            <h1 className="display h-lg" style={{ marginTop: 20 }}>
              {t("¡Gracias por tu compra!", "Thank you for your order!")}
            </h1>
            <p className="lede" style={{ marginTop: 16 }}>
              {t(
                "Recibimos tu pedido. Te enviaremos la confirmación y el seguimiento por correo.",
                "We received your order. We'll email you the confirmation and tracking."
              )}
            </p>
            <div className="hero-cta" style={{ justifyContent: "center", marginTop: 28 }}>
              <Link href={PROD_URL} className="btn btn-primary btn-lg">
                {t("Seguir comprando", "Keep shopping")} <span className="arrow">→</span>
              </Link>
              <Link href={HOME_URL} className="btn btn-ghost btn-lg">
                {t("Volver al inicio", "Back home")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
