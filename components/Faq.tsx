"use client";
import React from "react";
import { useStore } from "@/lib/store";

/* Acordeón de preguntas frecuentes. Accesible (button + aria-expanded),
   una abierta a la vez, con animación de altura que respeta reduced-motion. */
export function Faq() {
  const { t } = useStore();
  const [open, setOpen] = React.useState<number | null>(0);

  const items: { q: string; a: string }[] = [
    {
      q: t("¿Dónde se fabrican sus productos?", "Where are your products made?"),
      a: t("Todos nuestros productos se fabrican 100% en México.", "All our products are made 100% in Mexico."),
    },
    {
      q: t("¿Hacen envíos a todo el mundo?", "Do you ship worldwide?"),
      a: t(
        "Por ahora enviamos únicamente dentro de México. Esperamos abrir envíos a más países muy pronto.",
        "For now we ship only within Mexico. We hope to open shipping to more countries soon."
      ),
    },
    {
      q: t("¿Estos productos son solo para corredores?", "Are these products only for runners?"),
      a: t(
        "Stride está enfocado en atletas de resistencia. El Recovery Mix, con su proporción 3:2 de carbohidratos y proteína, ayuda a reponer glucógeno y recuperarte tras sesiones exigentes — pero cualquier persona activa puede beneficiarse.",
        "Stride is built for endurance athletes. Recovery Mix, with its 3:2 carb-to-protein ratio, helps refuel glycogen and recover after demanding sessions — but any active person can benefit."
      ),
    },
    {
      q: t("¿Cómo pido factura?", "How do I request an invoice?"),
      a: t(
        "Envía tu constancia de situación fiscal (no mayor a 3 meses) y tu comprobante de pago a contacto@strideforathletes.com.",
        "Send your tax status certificate (no older than 3 months) and your payment receipt to contacto@strideforathletes.com."
      ),
    },
    {
      q: t("¿Dónde puedo comprar Stride?", "Where can I buy Stride?"),
      a: t(
        "Aquí en nuestra tienda en línea, y también en Amazon y Mercado Libre. Estamos trabajando para llegar a más tiendas deportivas.",
        "Here in our online store, and also on Amazon and Mercado Libre. We're working to reach more sports retailers."
      ),
    },
    {
      q: t("¿Qué métodos de pago aceptan?", "What payment methods do you accept?"),
      a: t(
        "El pago es seguro a través de Stripe: aceptamos tarjetas de crédito y débito.",
        "Payment is secure through Stripe: we accept credit and debit cards."
      ),
    },
  ];

  return (
    <section className="section faq" id="faq">
      <div className="wrap">
        <p className="eyebrow reveal">{t("Dudas", "Questions")}</p>
        <h2 className="display h-lg reveal" style={{ "--delay": "60ms", marginTop: 14 } as React.CSSProperties}>
          {t("Preguntas frecuentes", "Frequently asked")}
        </h2>
        <div className="faq-list reveal" style={{ "--delay": "100ms" } as React.CSSProperties}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div className={"faq-item" + (isOpen ? " open" : "")} key={i}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{it.q}</span>
                  <span className="faq-icon" aria-hidden="true"></span>
                </button>
                <div className="faq-a" id={`faq-a-${i}`} role="region">
                  <div>
                    <p className="lede">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
