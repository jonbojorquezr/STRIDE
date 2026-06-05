"use client";
import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { HOME_URL, PROD_URL } from "@/lib/routes";
import { Logo, Mark } from "./Brand";

export function Nav({ dark = false }: { dark?: boolean }) {
  const { t, lang, setLang, cartCount } = useStore();
  const [open, setOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [solid, setSolid] = React.useState(false);

  React.useEffect(() => {
    const f = () => setSolid(window.scrollY > 16);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const links: [string, string][] = [
    [t("Tienda", "Shop"), PROD_URL],
    [t("Ciencia", "Science"), HOME_URL + "#ciencia"],
    [t("Divisiones", "Divisions"), HOME_URL + "#divisiones"],
    [t("Comunidad", "Community"), HOME_URL + "#comunidad"],
  ];
  const count = cartCount();

  return (
    <header className={"nav" + (solid ? " nav--solid" : "") + (dark ? " nav--dark" : "")}>
      <div className="wrap nav-in">
        <Logo light={dark} />
        <nav className="nav-links">
          {links.map(([l, h]) => (
            <Link key={l} href={h}>
              {l}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="lang" role="group" aria-label="Idioma">
            <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>
              ES
            </button>
            <span>/</span>
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
              EN
            </button>
          </div>
          <button className="icon-btn" aria-label="Cart" onClick={() => setCartOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path
                d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 8H6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9.5" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
              <circle cx="18" cy="20.5" r="1.3" fill="currentColor" stroke="none" />
            </svg>
            {count > 0 && <span className="cart-count">{count}</span>}
          </button>
          <Link href={PROD_URL} className="btn btn-primary nav-cta">
            {t("Comprar", "Shop now")}
          </Link>
          <button
            className={"burger" + (open ? " is-open" : "")}
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div className={"nav-drawer" + (open ? " open" : "")}>
        {links.map(([l, h]) => (
          <Link key={l} href={h} onClick={() => setOpen(false)}>
            {l}
          </Link>
        ))}
        <Link href={PROD_URL} className="btn btn-primary" onClick={() => setOpen(false)}>
          {t("Comprar", "Shop now")}
        </Link>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, cart, money, cartTotal, setQty } = useStore();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const checkout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((c) => ({ key: c.key, flavor: c.flavor, mode: c.mode, qty: c.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Error");
      window.location.href = data.url;
    } catch {
      setError(t("No se pudo iniciar el pago. Intenta de nuevo.", "Couldn't start payment. Try again."));
      setLoading(false);
    }
  };
  return (
    <div className={"cart-scrim" + (open ? " open" : "")} onClick={onClose}>
      <aside className="cart-panel" onClick={(e) => e.stopPropagation()} aria-hidden={!open}>
        <div className="cart-head">
          <strong className="display" style={{ fontSize: 22 }}>
            {t("Tu carrito", "Your cart")}
          </strong>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <Mark size={28} color="var(--ink-3)" />
            <p className="lede">{t("Tu carrito está vacío.", "Your cart is empty.")}</p>
            <Link href={PROD_URL} className="btn btn-ghost" onClick={onClose}>
              {t("Ir a la tienda", "Go to shop")}
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((it, i) => (
                <div className="cart-item" key={i}>
                  <div className="cart-thumb" style={{ background: it.tint || "var(--paper)" }}>
                    <Mark size={18} color={it.color || "var(--teal)"} />
                  </div>
                  <div className="cart-meta">
                    <strong>{it.name}</strong>
                    <span className="mono">
                      {it.flavor} · {it.mode === "sub" ? t("Suscripción", "Subscribe") : t("Única", "One-time")}
                    </span>
                    <div className="cart-qty">
                      <button onClick={() => setQty(i, it.qty - 1)}>–</button>
                      <span>{it.qty}</span>
                      <button onClick={() => setQty(i, it.qty + 1)}>+</button>
                    </div>
                  </div>
                  <span className="cart-price">{money(it.price * it.qty)}</span>
                </div>
              ))}
            </div>
            <div className="cart-foot">
              <div className="cart-total">
                <span className="mono">{t("Subtotal", "Subtotal")}</span>
                <strong>{money(cartTotal())}</strong>
              </div>
              <button
                className="btn btn-accent btn-lg"
                style={{ width: "100%" }}
                onClick={checkout}
                disabled={loading}
              >
                {loading ? t("Redirigiendo…", "Redirecting…") : t("Finalizar compra", "Checkout")}
              </button>
              {error && (
                <p className="mono" style={{ color: "#d23", textAlign: "center", marginTop: 10 }}>
                  {error}
                </p>
              )}
              <p className="mono" style={{ textAlign: "center", marginTop: 10 }}>
                {t("Envío calculado al pagar", "Shipping at checkout")}
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
