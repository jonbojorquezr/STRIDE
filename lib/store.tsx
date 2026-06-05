"use client";
/* ============================================================
   STRIDE — Store compartido: i18n + carrito (React Context)
   Reemplaza el Store global del export de Claude Design.
   ============================================================ */
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ProductKey } from "./catalog";

export type Lang = "es" | "en";

export type CartItem = {
  id: string;
  key: ProductKey;
  name: string;
  flavor: string;
  mode: "sub" | "once";
  price: number;
  qty: number;
  color?: string;
  tint?: string;
};

type StoreValue = {
  lang: Lang;
  cart: CartItem[];
  hydrated: boolean;
  setLang: (l: Lang) => void;
  addToCart: (item: CartItem) => void;
  setQty: (idx: number, qty: number) => void;
  clearCart: () => void;
  cartCount: () => number;
  cartTotal: () => number;
  /** Traducción reactiva al idioma actual */
  t: (es: string, en: string) => string;
  /** Formato de precio MXN */
  money: (n: number) => string;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hidratar desde localStorage tras el montaje (evita mismatch SSR)
  useEffect(() => {
    try {
      const l = (localStorage.getItem("stride_lang") as Lang) || "es";
      const c = JSON.parse(localStorage.getItem("stride_cart") || "[]") as CartItem[];
      setLangState(l);
      setCart(Array.isArray(c) ? c : []);
      document.documentElement.lang = l;
    } catch {
      /* noop */
    }
    setHydrated(true);

    // Sincronizar entre pestañas
    const onStorage = (e: StorageEvent) => {
      if (e.key === "stride_lang") setLangState((localStorage.getItem("stride_lang") as Lang) || "es");
      if (e.key === "stride_cart") setCart(JSON.parse(localStorage.getItem("stride_cart") || "[]"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("stride_lang", l);
    document.documentElement.lang = l;
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const next = [...prev];
      const found = next.find(
        (c) => c.id === item.id && c.flavor === item.flavor && c.mode === item.mode
      );
      if (found) found.qty += item.qty;
      else next.push({ ...item });
      localStorage.setItem("stride_cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const setQty = useCallback((idx: number, qty: number) => {
    setCart((prev) => {
      const next = [...prev];
      if (qty <= 0) next.splice(idx, 1);
      else next[idx] = { ...next[idx], qty };
      localStorage.setItem("stride_cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.setItem("stride_cart", JSON.stringify([]));
  }, []);

  const cartCount = useCallback(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);
  const cartTotal = useCallback(() => cart.reduce((s, c) => s + c.qty * c.price, 0), [cart]);
  const t = useCallback((es: string, en: string) => (lang === "es" ? es : en), [lang]);
  const money = useCallback((n: number) => "$" + n.toLocaleString("es-MX") + " MXN", []);

  const value: StoreValue = {
    lang,
    cart,
    hydrated,
    setLang,
    addToCart,
    setQty,
    clearCart,
    cartCount,
    cartTotal,
    t,
    money,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore debe usarse dentro de <StoreProvider>");
  return ctx;
}
