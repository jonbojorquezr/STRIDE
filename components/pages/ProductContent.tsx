"use client";
/* ============================================================
   STRIDE — PÁGINA DE PRODUCTO (Recovery Mix)
   ============================================================ */
import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { HOME_URL, DIV_URL } from "@/lib/routes";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Mark } from "@/components/Brand";
import { useReveal } from "@/components/Reveal";
import { ImageSlot } from "@/components/ImageSlot";
import { IMG, DIV_IMG } from "@/lib/images";
import { CATALOG, unitPrice, SUBSCRIPTIONS_ENABLED } from "@/lib/catalog";
import { PRODUCT_ARTICLES } from "@/lib/product-copy";

const FLAVORS = [
  { id: "chocolate", name: { es: "Chocolate", en: "Chocolate" }, color: "#7a4a32", tint: "#efe6df" },
  { id: "vainilla", name: { es: "Vainilla", en: "Vanilla" }, color: "#caa85a", tint: "#f3ecdb" },
];

const PRESENTATIONS = [
  { id: "bolsa", key: "recovery-mix" as const, name: { es: "Bolsa 1 kg", en: "1 kg bag" }, note: { es: "16 porciones", en: "16 servings" }, img: IMG.recoveryFront },
  { id: "sachets", key: "recovery-mix-sachets" as const, name: { es: "Caja de sachets", en: "Sachet box" }, note: { es: "para llevar", en: "grab & go" }, img: IMG.recoverySachets },
];

function ShopCatalog() {
  const { t, lang, money } = useStore();
  const products = [
    {
      id: "recovery-mix",
      name: "Recovery Mix",
      detail: { es: "Bolsa 1 kg · 16 porciones", en: "1 kg bag · 16 servings" },
      price: CATALOG["recovery-mix"].price,
      href: "#producto",
      image: IMG.recoveryFront,
      color: "var(--recover)",
    },
    {
      id: "creatina",
      name: "Creatina",
      detail: { es: "350 g · 70 porciones", en: "350 g · 70 servings" },
      price: CATALOG.creatina.price,
      href: DIV_URL.endure,
      image: DIV_IMG.endure.product,
      color: "var(--endure)",
    },
    {
      id: "electrolitos",
      name: "Electrolitos",
      detail: { es: "180 g · sin azúcar", en: "180 g · sugar-free" },
      price: CATALOG.electrolitos.price,
      href: DIV_URL.hydrate,
      image: DIV_IMG.hydrate.product,
      color: "var(--hydrate)",
    },
  ];

  return (
    <section className="shop-catalog">
      <div className="wrap">
        <div className="shop-catalog-head">
          <div>
            <p className="eyebrow reveal">{t("Tienda", "Shop")}</p>
            <h1 className="display h-lg reveal" style={{ "--delay": "60ms" } as React.CSSProperties}>
              {t("Todo para seguir", "Everything to keep")}
              <br />
              <span>{t("en movimiento", "moving")}</span>
            </h1>
          </div>
          <p className="lede reveal" style={{ "--delay": "120ms" } as React.CSSProperties}>
            {t("Fórmulas simples para recuperar, resistir e hidratarte.", "Simple formulas to recover, endure and stay hydrated.")}
          </p>
        </div>
        <div className="shop-grid">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={product.href}
              className="shop-card reveal"
              style={{ "--product-color": product.color, "--delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <div className="shop-card-image">
                <ImageSlot className="shop-card-slot" shape="rounded" radius={16} src={product.image} alt={product.name} />
                <span className="shop-card-arrow">→</span>
              </div>
              <div className="shop-card-meta">
                <div>
                  <h2>{product.name}</h2>
                  <p className="mono">{product.detail[lang]}</p>
                </div>
                <strong>{money(product.price)}</strong>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Toast({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div className={"toast" + (show ? " show" : "")} role="status">
      {children}
    </div>
  );
}

function PDP() {
  const { t, lang, money, addToCart, cartCount } = useStore();
  const [flavor, setFlavor] = React.useState(0);
  const [pres, setPres] = React.useState(0);
  const [mode, setMode] = React.useState<"sub" | "once">("once");
  const [qty, setQty] = React.useState(1);
  const [toast, setToast] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const f = FLAVORS[flavor];
  const p = PRESENTATIONS[pres];
  const unit = unitPrice(p.key, mode);

  const add = () => {
    addToCart({
      id: p.id + "-" + f.id,
      key: p.key,
      name: "Recovery Mix · " + p.name[lang],
      flavor: f.name[lang],
      mode,
      qty,
      price: unit,
      color: f.color,
      tint: f.tint,
    });
    setToast(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(false), 2200);
  };

  return (
    <section className="pdp">
      <div className="wrap pdp-in">
        {/* Galería */}
        <div className="gallery">
          <div className="gallery-main" style={{ "--tint": f.tint } as React.CSSProperties}>
            <ImageSlot
              className="gmain-slot"
              shape="rounded"
              radius={20}
              eager
              src={p.img}
              alt={"Recovery Mix " + p.name[lang] + " " + f.name[lang]}
            />
            <span className="g-lot mono">RECOVERY MIX · {p.name[lang].toUpperCase()}</span>
          </div>
          <div className="gallery-thumbs">
            {[IMG.recoveryAngle, IMG.recoveryPouch, IMG.recoverySachets].map((src, k) => (
              <ImageSlot key={k} className="gthumb-slot" shape="rounded" radius={12} src={src} alt={t("Recovery Mix detalle", "Recovery Mix detail")} />
            ))}
          </div>
        </div>

        {/* Panel de compra */}
        <div className="buy-panel">
          <Link href={HOME_URL + "#divisiones"} className="mono pdp-crumb">
            {t("Inicio", "Home")} / {t("Tienda", "Shop")} / Recovery Mix
          </Link>
          <h1 className="display h-md pdp-title">Recovery Mix</h1>
          <p className="lede pdp-desc">
            {t(
              "Mezcla post-entrenamiento con proporción 3:2 de carbohidratos y proteína para reponer glucógeno y reparar fibra muscular. Se disuelve limpio.",
              "Post-workout mix with a 3:2 carb-to-protein ratio to refuel glycogen and rebuild muscle. Dissolves clean."
            )}
          </p>

          <div className="opt">
            <span className="opt-label mono">{t("Presentación", "Format")}</span>
            <div className="mode-row">
              {PRESENTATIONS.map((pr, i) => (
                <button
                  key={pr.id}
                  className={"mode" + (i === pres ? " on" : "")}
                  onClick={() => setPres(i)}
                >
                  <span className="mode-top">
                    <strong>{pr.name[lang]}</strong>
                    <span className="mono">{money(unitPrice(pr.key, mode))}</span>
                  </span>
                  <span className="mode-sub mono">{pr.note[lang]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="opt">
            <span className="opt-label mono">
              {t("Sabor", "Flavor")}: <strong>{f.name[lang]}</strong>
            </span>
            <div className="flavor-row">
              {FLAVORS.map((fl, i) => (
                <button
                  key={fl.id}
                  className={"flavor" + (i === flavor ? " on" : "")}
                  onClick={() => setFlavor(i)}
                  style={{ "--fc": fl.color } as React.CSSProperties}
                  aria-label={fl.name[lang]}
                >
                  <span className="flavor-dot"></span>
                  {fl.name[lang]}
                </button>
              ))}
            </div>
          </div>

          {SUBSCRIPTIONS_ENABLED && (
            <div className="opt">
              <span className="opt-label mono">{t("Plan", "Plan")}</span>
              <div className="mode-row">
                <button className={"mode" + (mode === "sub" ? " on" : "")} onClick={() => setMode("sub")}>
                  <span className="mode-top">
                    <strong>{t("Suscripción", "Subscribe")}</strong>
                    <em className="save">-15%</em>
                  </span>
                  <span className="mode-sub mono">
                    {t("Cada 30 días · cancela cuando quieras", "Every 30 days · cancel anytime")}
                  </span>
                </button>
                <button className={"mode" + (mode === "once" ? " on" : "")} onClick={() => setMode("once")}>
                  <span className="mode-top">
                    <strong>{t("Compra única", "One-time")}</strong>
                  </span>
                  <span className="mode-sub mono">{t("Sin compromiso", "No commitment")}</span>
                </button>
              </div>
            </div>
          )}

          <div className="buy-row">
            <div className="stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="−">
                –
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="+">
                +
              </button>
            </div>
            <button className="btn btn-accent btn-lg buy-btn" onClick={add}>
              {t("Agregar", "Add")} — {money(unit * qty)}
            </button>
          </div>
          <p className="mono buy-note">
            {mode === "sub"
              ? t("Suscripción · pausa o cancela en un clic", "Subscription · pause or cancel in one click")
              : t("Pago único · envío en 2–4 días", "One-time · ships in 2–4 days")}
          </p>

          <ul className="pdp-trust">
            {[
              t("Formulado con evidencia", "Evidence-based"),
              t("Sin azúcar añadido", "No added sugar"),
              t("Envío gratis +$900", "Free shipping +$900"),
              t("Hecho en México", "Made in Mexico"),
            ].map((x) => (
              <li key={x}>
                <Mark size={14} color="var(--teal)" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Toast show={toast}>
        <Mark size={16} color="var(--paper)" /> {t("Agregado al carrito", "Added to cart")} · {cartCount()}
      </Toast>
    </section>
  );
}

function Nutrition() {
  const { t } = useStore();
  const rows: [string, string, string][] = [
    [t("Energía", "Energy"), "250 kcal", ""],
    [t("Proteína", "Protein"), "20 g", "40%"],
    [t("Carbohidratos", "Carbs"), "30 g", ""],
    [t("Grasa", "Fat"), "5.6 g", ""],
    [t("Sodio", "Sodium"), "315 mg", "16%"],
    [t("Vitaminas y minerales", "Vitamins & minerals"), "16", ""],
    [t("Aminoácidos", "Amino acids"), "18", ""],
  ];
  return (
    <section className="section--tight nutri dark">
      <div className="wrap nutri-in">
        <div className="nutri-copy">
          <p className="eyebrow reveal">{t("Información nutrimental", "Nutrition facts")}</p>
          <h2 className="display h-md reveal" style={{ "--delay": "60ms", marginTop: 14 } as React.CSSProperties}>
            {t("Todo lo que entra,\na la vista", "Everything in,\nin plain sight")}
          </h2>
          <p className="lede reveal" style={{ "--delay": "110ms", marginTop: 16, maxWidth: "34ch" } as React.CSSProperties}>
            {t(
              "Sin mezclas propietarias ni letra chica. Cada porción de 62.5 g (2 scoops) entrega exactamente esto. 16 porciones por envase de 1 kg.",
              "No proprietary blends, no fine print. Each 62.5 g serving (2 scoops) delivers exactly this. 16 servings per 1 kg tub."
            )}
          </p>
        </div>
        <div className="nutri-table reveal">
          <div className="nutri-head">
            <span className="mono">{t("Por porción · 62.5 g (2 scoops)", "Per serving · 62.5 g (2 scoops)")}</span>
            <span className="mono">VRN*</span>
          </div>
          {rows.map(([k, v, p]) => (
            <div className="nutri-row" key={k}>
              <span>{k}</span>
              <span className="nutri-v mono">{v}</span>
              <span className="nutri-p mono">{p}</span>
            </div>
          ))}
          <p className="mono nutri-foot">*{t("Valor de referencia de nutrimentos", "Nutrient reference value")}</p>
        </div>
      </div>
    </section>
  );
}

function Tabs() {
  const { lang } = useStore();
  const TAB = [
    {
      k: "ben",
      label: { es: "Beneficios", en: "Benefits" },
      body: {
        es: [
          "Reposición de glucógeno post-entrenamiento",
          "Reparación muscular con 20 g de proteína de suero",
          "Perfil completo de 18 aminoácidos",
          "16 vitaminas y minerales en cada porción",
        ],
        en: [
          "Post-workout glycogen replenishment",
          "Muscle repair with 20 g whey protein",
          "Complete 18-amino-acid profile",
          "16 vitamins & minerals per serving",
        ],
      },
    },
    {
      k: "ing",
      label: { es: "Ingredientes", en: "Ingredients" },
      body: {
        es: [
          "Maltodextrina y dextrosa (carbohidratos)",
          "Concentrado de proteína de suero",
          "Leche entera en polvo",
          "Complejo de 16 vitaminas y minerales",
          "Saborizantes naturales y artificiales",
          "Alérgenos: contiene leche, trigo y soya",
        ],
        en: [
          "Maltodextrin & dextrose (carbs)",
          "Whey protein concentrate",
          "Whole milk powder",
          "16-vitamin & mineral complex",
          "Natural & artificial flavors",
          "Allergens: contains milk, wheat, soy",
        ],
      },
    },
    {
      k: "uso",
      label: { es: "Cómo usar", en: "How to use" },
      body: {
        es: [
          "Mezcla 2 scoops (62.5 g) con 300 ml de agua",
          "Agita bien hasta disolver",
          "1 porción por sesión de entrenamiento",
          "Tómalo después de tu carrera · no excedas 1 porción al día",
        ],
        en: [
          "Mix 2 scoops (62.5 g) with 300 ml water",
          "Shake well until dissolved",
          "1 serving per training session",
          "Take after your run · don’t exceed 1 serving/day",
        ],
      },
    },
    {
      k: "sci",
      label: { es: "Ciencia", en: "Science" },
      body: {
        es: [
          "La proporción 3:2 optimiza la resíntesis de glucógeno",
          "20–40 g de proteína maximizan la síntesis proteica",
          "La primera hora después del esfuerzo ayuda a reconstruir mejor",
          "Respaldado por literatura de nutrición deportiva",
        ],
        en: [
          "The 3:2 ratio optimizes glycogen resynthesis",
          "20–40 g protein maximizes protein synthesis",
          "The first hour after effort helps recovery more effectively",
          "Backed by sports-nutrition literature",
        ],
      },
    },
  ];
  const [tab, setTab] = React.useState(0);
  return (
    <section className="section tabs-sec">
      <div className="wrap">
        <div className="tabs-bar reveal">
          {TAB.map((x, i) => (
            <button key={x.k} className={"tab" + (i === tab ? " on" : "")} onClick={() => setTab(i)}>
              {x.label[lang]}
            </button>
          ))}
        </div>
        <div className="tabs-body reveal" key={tab}>
          <ul className="tabs-list">
            {TAB[tab].body[lang].map((li, i) => (
              <li key={i}>
                <span className="tabs-n mono">0{i + 1}</span>
                {li}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const { t, lang } = useStore();
  const R = [
    {
      n: "Braulio Macías",
      r: { es: "Corredor · México", en: "Runner · Mexico" },
      q: {
        es: "Antes me sentía cansadísimo todo el día tras una carrera larga. Con Stride mi cuerpo se recupera mucho más rápido.",
        en: "I used to feel wiped out all day after a long run. With Stride my body recovers much faster.",
      },
    },
    {
      n: "Guillermo Armenta",
      r: { es: "Ciudad de México", en: "Mexico City" },
      q: {
        es: "Ya no siento tanta fatiga después de una carrera larga. Puedo entrenar sin ese cansancio extremo.",
        en: "I no longer feel so much fatigue after a long run. I can train without that extreme tiredness.",
      },
    },
    {
      n: "Omar Gameros",
      r: { es: "Monterrey, México", en: "Monterrey, Mexico" },
      q: {
        es: "Desde que tomo Stride Recovery, el cansancio acumulado después de las carreras se siente mucho mejor y puedo volver a entrenar con más confianza.",
        en: "Since taking Stride Recovery, the accumulated fatigue after races feels much better and I can return to training with more confidence.",
      },
    },
  ];
  return (
    <section className="section reviews">
      <div className="wrap">
        <div className="rev-head">
          <p className="eyebrow reveal">{t("Reseñas", "Reviews")}</p>
          <h2 className="display h-lg reveal" style={{ "--delay": "60ms", marginTop: 12 } as React.CSSProperties}>
            {t("Lo que dicen los corredores", "What runners say")}
          </h2>
        </div>
        <div className="rev-grid">
          {R.map((rv, i) => (
            <article className="rev-card reveal" key={rv.n} style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
              <p>&quot;{rv.q[lang]}&quot;</p>
              <div className="rev-by">
                <strong>{rv.n}</strong>
                <span className="mono">{rv.r[lang]}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductDetailSection() {
  const article = PRODUCT_ARTICLES.recover;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="section product-detail" aria-labelledby="product-recovery-info">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="wrap">
        <div className="product-detail-head">
          <p className="eyebrow reveal">{article.subhead}</p>
          <h2 id="product-recovery-info" className="display h-lg reveal" style={{ marginTop: 12 }}>
            {article.headline}
          </h2>
        </div>
        <div className="product-detail-grid">
          <div className="product-detail-copy reveal">
            <p className="lede">{article.intro}</p>
            <div style={{ marginTop: 18 }}>
              <Link href="/ciencia#referencias" className="mono" style={{ color: "var(--teal)" }}>
                Ver referencias
              </Link>
            </div>
          </div>
          <div className="product-detail-panel reveal">
            <h3 className="display h-sm">Cuándo tomarlo</h3>
            <p className="lede">{article.when}</p>
          </div>
        </div>

        <div className="product-detail-bullets reveal" style={{ marginTop: 30 }}>
          <ul className="dprod-benefits">
            {article.bullets.map((bullet, i) => (
              <li key={i}>
                <Mark size={14} color="var(--teal)" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="product-faq reveal" style={{ marginTop: 44 }}>
          <h3 className="display h-md">FAQ</h3>
          <div className="faq-list">
            {article.faq.map((item, index) => (
              <div className="faq-item open" key={index}>
                <div className="faq-q" aria-expanded="true">
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden="true"></span>
                </div>
                <div className="faq-a" role="region">
                  <div>
                    <p className="lede">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Related() {
  const { t, lang } = useStore();
  // Esta página ES Recovery Mix (línea Recover): recomendar solo las otras dos.
  const items = [
    { id: "endure" as const, name: "Endure", c: "--endure", tint: "--endure-tint", d: { es: "Creatina monohidratada", en: "Creatine monohydrate" } },
    { id: "hydrate" as const, name: "Hydrate", c: "--hydrate", tint: "--hydrate-tint", d: { es: "Electrolitos sin azúcar", en: "Sugar-free electrolytes" } },
  ];
  return (
    <section className="section--tight related">
      <div className="wrap">
        <h2 className="display h-md reveal" style={{ marginBottom: 28 }}>
          {t("Completa tu rutina", "Complete your routine")}
        </h2>
        <div className="rel-grid">
          {items.map((it, i) => (
            <Link
              href={DIV_URL[it.id]}
              key={it.id}
              className="rel-card reveal"
              style={{ "--c": `var(${it.c})`, "--c-ink": `var(--${it.id}-ink)`, "--delay": `${i * 70}ms` } as React.CSSProperties}
            >
              <ImageSlot className="rel-slot" shape="rounded" radius={14} src={DIV_IMG[it.id].card} alt={"Stride " + it.name} />
              <div className="rel-meta">
                <strong>{it.name}</strong>
                <span className="mono">{it.d[lang]}</span>
              </div>
              <span className="rel-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProductContent() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <ShopCatalog />
        <PDP />
        <ProductDetailSection />
        <Nutrition />
        <Tabs />
        <Reviews />
        <Related />
      </main>
      <Footer />
    </>
  );
}
