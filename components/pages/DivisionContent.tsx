"use client";
/* ============================================================
   STRIDE — Páginas de LÍNEA (Recover / Endure / Hydrate)
   Data-driven · contenido del manual de marca · bilingüe
   ============================================================ */
import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { DIV_URL, type DivisionId } from "@/lib/routes";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Mark } from "@/components/Brand";
import { useReveal } from "@/components/Reveal";
import { ImageSlot } from "@/components/ImageSlot";
import { DIV_IMG } from "@/lib/images";

export type { DivisionId };

type Bi = { es: string; en: string };
type BiArr = { es: string[]; en: string[] };
type DivEntry = {
  name: string;
  c: string;
  tint: string;
  btnInk: string;
  mood: BiArr;
  tagline: Bi;
  tagline2: Bi;
  kicker: Bi;
  lede: Bi;
  moodCopy: BiArr;
  product: {
    id: string;
    name: string;
    price: number;
    sub: Bi;
    flavors: { es: string; en: string; color: string }[];
  };
  benefits: BiArr;
  specs: [string, string][];
  lifestyle: Bi;
};

const DIVDATA: Record<DivisionId, DivEntry> = {
  recover: {
    name: "Recover",
    c: "#8AE02F",
    tint: "#eef9df",
    btnInk: "#00111E",
    mood: { es: ["Meditación", "Sabiduría", "Zen"], en: ["Meditation", "Wisdom", "Zen"] },
    tagline: { es: "Encuentra tu calma", en: "Find your calm" },
    tagline2: { es: "Recupera tu fuerza", en: "Reclaim your strength" },
    kicker: { es: "Recovery Mix · Carbohidratos + proteína", en: "Recovery Mix · Carbs + protein" },
    lede: {
      es: "Recovery Mix: carbohidratos y proteína de suero en proporción 3:2, con 18 aminoácidos y 16 vitaminas y minerales. Disponible en bolsa de 1 kg y en sachets para llevar. Repon glucógeno, repara músculo y vuelve más fuerte.",
      en: "Recovery Mix: carbs and whey protein in a 3:2 ratio, with 18 amino acids and 16 vitamins & minerals. Available in a 1 kg bag and grab-and-go sachets. Refuel glycogen, rebuild muscle, come back stronger.",
    },
    moodCopy: {
      es: [
        "El descanso es entrenamiento. Cada noche es una sesión.",
        "Escucha a tu cuerpo: la paciencia construye récords.",
        "Baja revoluciones para subir de nivel.",
      ],
      en: [
        "Rest is training. Every night is a session.",
        "Listen to your body — patience builds records.",
        "Slow down to level up.",
      ],
    },
    product: {
      id: "recover",
      name: "Recovery Mix",
      price: 699,
      sub: { es: "Bolsa 1 kg (16 porciones) · también en sachets", en: "1 kg bag (16 servings) · also in sachets" },
      flavors: [
        { es: "Vainilla", en: "Vanilla", color: "#caa85a" },
        { es: "Cacao", en: "Cacao", color: "#7a4a32" },
      ],
    },
    benefits: {
      es: [
        "20 g de proteína de suero por porción",
        "30 g de carbohidratos para reponer glucógeno",
        "Perfil completo de 18 aminoácidos",
        "16 vitaminas y minerales",
      ],
      en: [
        "20 g whey protein per serving",
        "30 g carbs to refuel glycogen",
        "Complete 18-amino-acid profile",
        "16 vitamins & minerals",
      ],
    },
    specs: [
      ["Proteína", "20 g"],
      ["Carbohidratos", "30 g"],
      ["Energía", "250 kcal"],
      ["Aminoácidos", "18"],
    ],
    lifestyle: { es: "El día termina, la recuperación empieza.", en: "The day ends, recovery begins." },
  },
  endure: {
    name: "Endure",
    c: "#E20031",
    tint: "#fde4ea",
    btnInk: "#ffffff",
    mood: { es: ["Intelectual", "Intenso", "Durabilidad"], en: ["Intellectual", "Intense", "Durability"] },
    tagline: { es: "Domina el juego", en: "Own the game" },
    tagline2: { es: "Rompe tus límites", en: "Unleash new limits" },
    kicker: { es: "Creatina · Fuerza y potencia", en: "Creatine · Strength & power" },
    lede: {
      es: "Creatina monohidratada pura: el suplemento más estudiado para fuerza, potencia y resistencia muscular. 5 g por porción, sin rellenos. Para entrenar más fuerte y recuperarte mejor.",
      en: "Pure creatine monohydrate: the most-studied supplement for strength, power and muscular endurance. 5 g per serving, no fillers. Train harder and recover better.",
    },
    moodCopy: {
      es: ["La fuerza se construye con consistencia.", "Cada repetición suma.", "Potencia para el esfuerzo que decide."],
      en: ["Strength is built through consistency.", "Every rep counts.", "Power for the effort that decides."],
    },
    product: {
      id: "endure",
      name: "Creatina",
      price: 549,
      sub: { es: "Creatina monohidratada · 70 porciones · 350 g", en: "Creatine monohydrate · 70 servings · 350 g" },
      flavors: [{ es: "Sin sabor", en: "Unflavored", color: "#c9ccd1" }],
    },
    benefits: {
      es: [
        "5 g de creatina monohidratada por porción",
        "Aumenta fuerza, potencia y resistencia muscular",
        "Mejora la recuperación entre series",
        "Pureza 99.9% · sin rellenos ni aditivos",
      ],
      en: [
        "5 g creatine monohydrate per serving",
        "Boosts strength, power and muscular endurance",
        "Improves recovery between sets",
        "99.9% purity · no fillers or additives",
      ],
    },
    specs: [
      ["Creatina", "5 g"],
      ["Porciones", "70"],
      ["Pureza", "99.9%"],
      ["Azúcar", "0 g"],
    ],
    lifestyle: { es: "Cuando los demás bajan, tú aceleras.", en: "When others fade, you accelerate." },
  },
  hydrate: {
    name: "Hydrate",
    c: "#009EFF",
    tint: "#e1f3ff",
    btnInk: "#ffffff",
    mood: { es: ["Risa", "Vitalidad", "Fresco"], en: ["Laughter", "Vitality", "Fresh"] },
    tagline: { es: "Tu flow", en: "Your flow" },
    tagline2: { es: "Refresca", en: "Refresh" },
    kicker: { es: "Hidratación · Todo el día", en: "Hydration · All day" },
    lede: {
      es: "Hidratación inteligente que se siente viva. Sodio, potasio y magnesio con cítricos naturales — ligera, fresca y sin azúcar, para entrenar y para vivir.",
      en: "Smart hydration that feels alive. Sodium, potassium and magnesium with natural citrus — light, fresh and sugar-free, for training and for living.",
    },
    moodCopy: {
      es: ["Lo ligero también rinde.", "Hidratación que se siente viva.", "Cítrico, limpio, sin azúcar."],
      en: ["Light still performs.", "Hydration that feels alive.", "Citrus, clean, zero sugar."],
    },
    product: {
      id: "hydrate",
      name: "Electrolitos",
      price: 599,
      sub: { es: "Bote 180 g (36 porciones) · sin azúcar", en: "180 g tub (36 servings) · sugar-free" },
      flavors: [{ es: "Mora azul", en: "Blueberry", color: "#5b6fc0" }],
    },
    benefits: {
      es: [
        "1000 mg de sodio para reponer lo que sudas",
        "Potasio y magnesio para evitar calambres",
        "Cero azúcar · endulzado con estevia",
        "Ácido cítrico y málico para un sabor fresco",
      ],
      en: [
        "1000 mg sodium to replace what you sweat",
        "Potassium and magnesium to prevent cramps",
        "Zero sugar · sweetened with stevia",
        "Citric and malic acid for a fresh taste",
      ],
    },
    specs: [
      ["Sodio", "1000 mg"],
      ["Potasio", "200 mg"],
      ["Magnesio", "60 mg"],
      ["Azúcar", "0 g"],
    ],
    lifestyle: { es: "La vida no espera. Hidrátate y fluye.", en: "Life won't wait. Hydrate and flow." },
  },
};

function Toast({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div className={"toast" + (show ? " show" : "")} role="status">
      {children}
    </div>
  );
}

function DivHero({ D, division }: { D: DivEntry; division: DivisionId }) {
  const { t, lang } = useStore();
  return (
    <section className="dh">
      <div className="wrap dh-in">
        <div className="dh-copy">
          <p className="eyebrow reveal" style={{ color: "var(--c)" }}>
            Stride · {D.name} — {D.kicker[lang]}
          </p>
          <h1 className="display h-xl dh-title reveal" style={{ "--delay": "60ms" } as React.CSSProperties}>
            {D.tagline[lang]}
          </h1>
          <div className="dh-mood reveal" style={{ "--delay": "120ms" } as React.CSSProperties}>
            {D.mood[lang].map((m, i) => (
              <span key={i} className="dh-chip">
                {m}
              </span>
            ))}
          </div>
          <p className="lede reveal" style={{ "--delay": "180ms", maxWidth: "42ch", marginTop: 24 } as React.CSSProperties}>
            {D.lede[lang]}
          </p>
          <div className="dh-cta reveal" style={{ "--delay": "240ms" } as React.CSSProperties}>
            <a href="#producto" className="btn btn-themed btn-lg">
              {t("Comprar", "Shop")} {D.name} <span className="arrow">→</span>
            </a>
            <a href="#filosofia" className="btn btn-ghost btn-lg">
              {t("La filosofía", "The philosophy")}
            </a>
          </div>
        </div>
        <div className="dh-visual reveal" style={{ "--delay": "150ms" } as React.CSSProperties}>
          <div className="dh-frame">
            <ImageSlot
              className="dh-slot"
              shape="rounded"
              radius={22}
              src={DIV_IMG[division].hero}
              alt={"Stride " + D.name}
            />
            <span className="dh-badge">{D.name}</span>
            <span className="dh-lot mono">STRIDE · {D.name.toUpperCase()} · MX</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DivPhilosophy({ D }: { D: DivEntry }) {
  const { t, lang } = useStore();
  return (
    <section className="section dphil" id="filosofia">
      <div className="wrap">
        <p className="eyebrow reveal" style={{ color: "var(--c)" }}>
          {t("La filosofía", "The philosophy")}
        </p>
        <div className="dphil-grid">
          {D.mood[lang].map((m, i) => (
            <article className="dphil-card reveal" key={i} style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}>
              <span className="dphil-n mono">0{i + 1}</span>
              <h3 className="display">{m}</h3>
              <p className="lede">{D.moodCopy[lang][i]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DivProduct({ D, division }: { D: DivEntry; division: DivisionId }) {
  const { t, lang, money, addToCart, cartCount } = useStore();
  const [flavor, setFlavor] = React.useState(0);
  const [mode, setMode] = React.useState<"sub" | "once">("sub");
  const [qty, setQty] = React.useState(1);
  const [toast, setToast] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const f = D.product.flavors[flavor];
  const unit = mode === "sub" ? Math.round(D.product.price * 0.85) : D.product.price;
  const add = () => {
    addToCart({
      id: D.product.id + "-" + flavor,
      name: D.product.name,
      flavor: f[lang],
      mode,
      qty,
      price: unit,
      color: f.color,
      tint: "var(--tint)",
    });
    setToast(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(false), 2200);
  };
  return (
    <section className="section dprod" id="producto">
      <div className="wrap dprod-in">
        <div className="dprod-visual reveal">
          <div className="dprod-stage">
            <ImageSlot
              className="dprod-slot"
              shape="rounded"
              radius={20}
              src={DIV_IMG[division].product}
              alt={"Stride " + D.product.name}
            />
          </div>
          <div className="dprod-specs">
            {D.specs.map(([k, v]) => (
              <div key={k}>
                <strong className="mono">{v}</strong>
                <span>{k}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="dprod-buy">
          <p className="eyebrow" style={{ color: "var(--c)" }}>
            {t("El producto", "The product")}
          </p>
          <h2 className="display h-md dprod-title">{D.product.name}</h2>
          <p className="mono dprod-sub">{D.product.sub[lang]}</p>
          <ul className="dprod-benefits">
            {D.benefits[lang].map((b, i) => (
              <li key={i}>
                <Mark size={14} color="var(--c)" />
                {b}
              </li>
            ))}
          </ul>
          <div className="opt">
            <span className="opt-label mono">
              {t("Sabor", "Flavor")}: <strong>{f[lang]}</strong>
            </span>
            <div className="flavor-row">
              {D.product.flavors.map((fl, i) => (
                <button
                  key={i}
                  className={"flavor" + (i === flavor ? " on" : "")}
                  onClick={() => setFlavor(i)}
                  style={{ "--fc": fl.color } as React.CSSProperties}
                >
                  <span className="flavor-dot"></span>
                  {fl[lang]}
                </button>
              ))}
            </div>
          </div>
          <div className="mode-row">
            <button className={"mode" + (mode === "sub" ? " on" : "")} onClick={() => setMode("sub")}>
              <span className="mode-top">
                <strong>{t("Suscripción", "Subscribe")}</strong>
                <em className="save" style={{ background: "var(--c)", color: "var(--btn-ink)" }}>
                  -15%
                </em>
              </span>
              <span className="mode-sub mono">{t("Cada 30 días", "Every 30 days")}</span>
            </button>
            <button className={"mode" + (mode === "once" ? " on" : "")} onClick={() => setMode("once")}>
              <span className="mode-top">
                <strong>{t("Compra única", "One-time")}</strong>
              </span>
              <span className="mode-sub mono">{t("Sin compromiso", "No commitment")}</span>
            </button>
          </div>
          <div className="buy-row">
            <div className="stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>–</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(9, q + 1))}>+</button>
            </div>
            <button className="btn btn-themed btn-lg buy-btn" onClick={add}>
              {t("Agregar", "Add")} — {money(unit * qty)}
            </button>
          </div>
        </div>
      </div>
      <Toast show={toast}>
        <Mark size={16} color="var(--paper)" /> {t("Agregado al carrito", "Added to cart")} · {cartCount()}
      </Toast>
    </section>
  );
}

function DivLifestyle({ D, division }: { D: DivEntry; division: DivisionId }) {
  const { lang } = useStore();
  return (
    <section className="dlife">
      <ImageSlot
        className="dlife-slot"
        shape="rect"
        src={DIV_IMG[division].life}
        alt={"Stride " + D.name}
      />
      <div className="dlife-overlay">
        <div className="wrap">
          <p className="eyebrow reveal" style={{ color: "#fff" }}>
            {D.name}
          </p>
          <h2 className="display h-lg dlife-title reveal" style={{ "--delay": "60ms" } as React.CSSProperties}>
            {D.tagline2[lang]}
          </h2>
          <p className="dlife-line reveal" style={{ "--delay": "120ms" } as React.CSSProperties}>
            {D.lifestyle[lang]}
          </p>
        </div>
      </div>
    </section>
  );
}

function DivCross({ current }: { current: DivisionId }) {
  const { t, lang } = useStore();
  const others = (Object.keys(DIVDATA) as DivisionId[]).filter((k) => k !== current);
  return (
    <section className="section--tight dcross">
      <div className="wrap">
        <h2 className="display h-md reveal" style={{ marginBottom: 26 }}>
          {t("Explora las otras líneas", "Explore the other lines")}
        </h2>
        <div className="dcross-grid">
          {others.map((k, i) => {
            const o = DIVDATA[k];
            return (
              <Link
                href={DIV_URL[k]}
                key={k}
                className="dcross-card reveal"
                style={{ "--oc": o.c, "--delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <ImageSlot className="dcross-slot" shape="rounded" radius={14} src={DIV_IMG[k].card} alt={"Stride " + o.name} />
                <div className="dcross-meta">
                  <span className="mono dcross-mood">{o.mood[lang].join(" · ")}</span>
                  <strong>{o.name}</strong>
                  <span className="dcross-tag">{o.tagline[lang]}</span>
                </div>
                <span className="dcross-arrow">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function DivisionContent({ division }: { division: DivisionId }) {
  useReveal();
  const D = DIVDATA[division];
  return (
    <div
      className="division"
      style={{ "--c": D.c, "--tint": D.tint, "--btn-ink": D.btnInk } as React.CSSProperties}
    >
      <Nav />
      <main>
        <DivHero D={D} division={division} />
        <DivPhilosophy D={D} />
        <DivProduct D={D} division={division} />
        <DivLifestyle D={D} division={division} />
        <DivCross current={division} />
      </main>
      <Footer />
    </div>
  );
}
