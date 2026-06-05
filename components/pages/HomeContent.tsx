"use client";
/* ============================================================
   STRIDE — HOME (claro · editorial · foto-led)
   ============================================================ */
import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { PROD_URL, DIV_URL } from "@/lib/routes";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Mark } from "@/components/Brand";
import { useReveal, CountUp } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { ImageSlot } from "@/components/ImageSlot";
import { IMG, DIV_IMG } from "@/lib/images";
import { unitPrice } from "@/lib/catalog";

function Hero() {
  const { t } = useStore();
  return (
    <section className="hero">
      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="eyebrow reveal">
            {t("Running recovery", "Running recovery")} · {t("Hecho en México", "Made in Mexico")}
          </p>
          <h1 className="display h-xl hero-title reveal" style={{ "--delay": "60ms" } as React.CSSProperties}>
            {t("Recupera", "Recover")}
            <br />
            {t("como compites", "like you race")}
          </h1>
          <p className="lede reveal" style={{ "--delay": "130ms", maxWidth: "40ch", marginTop: 24 } as React.CSSProperties}>
            {t(
              "La fórmula 3:2 de carbohidratos y proteína que la ciencia recomienda para reponer glucógeno y reparar músculo. Limpia, sin relleno.",
              "The 3:2 carb-to-protein formula science recommends to refuel glycogen and rebuild muscle. Clean, no fillers."
            )}
          </p>
          <div className="hero-cta reveal" style={{ "--delay": "200ms" } as React.CSSProperties}>
            <Link href={PROD_URL} className="btn btn-primary btn-lg">
              {t("Comprar Recovery Mix", "Shop Recovery Mix")} <span className="arrow">→</span>
            </Link>
            <a href="#ciencia" className="btn btn-ghost btn-lg">
              {t("La ciencia", "The science")}
            </a>
          </div>
          <dl className="hero-specs reveal" style={{ "--delay": "270ms" } as React.CSSProperties}>
            <div>
              <dt>3:2</dt>
              <dd>{t("carbs : proteína", "carbs : protein")}</dd>
            </div>
            <div>
              <dt>20g</dt>
              <dd>{t("proteína / porción", "protein / serving")}</dd>
            </div>
            <div>
              <dt>16</dt>
              <dd>{t("porciones · 1 kg", "servings · 1 kg")}</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual reveal" style={{ "--delay": "150ms" } as React.CSSProperties}>
          <div className="hero-frame">
            <ImageSlot
              className="hero-slot"
              shape="rounded"
              radius={20}
              src={IMG.recoveryFront}
              alt={t("Stride Recovery Mix", "Stride Recovery Mix")}
            />
            <div className="anno anno--1">
              <span className="mono">{t("ratio", "ratio")}</span>
              <strong>3:2</strong>
            </div>
            <div className="anno anno--2">
              <span className="mono">{t("por porción", "per serving")}</span>
              <strong>
                240<small>kcal</small>
              </strong>
            </div>
            <span className="hero-lot mono">LOT · STR—001 · RECOVERY MIX</span>
          </div>
        </div>
      </div>
      <a href="#valor" className="scroll-hint mono" aria-hidden="true">
        {t("Desliza", "Scroll")} ↓
      </a>
    </section>
  );
}

function ValueStrip() {
  const { t } = useStore();
  const items = [
    t("Formulado con evidencia", "Evidence-based formula"),
    t("Sin relleno ni azúcares ocultos", "No fillers, no hidden sugars"),
    t("Para atletas de resistencia", "Built for endurance athletes"),
    t("Hecho en México", "Made in Mexico"),
  ];
  const seq = [...items, ...items];
  return (
    <div className="vstrip dark" id="valor">
      <div className="vstrip-track">
        {seq.map((x, i) => (
          <span key={i} className="vstrip-item">
            <Mark size={14} color="var(--aqua)" />
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function Science() {
  const { t } = useStore();
  const points = [
    {
      n: "01",
      t: t("Repón el glucógeno", "Refuel glycogen"),
      d: t(
        "Los carbohidratos de absorción rápida rellenan tus reservas de energía antes del próximo entrenamiento.",
        "Fast-absorbing carbs top up your energy stores before your next session."
      ),
    },
    {
      n: "02",
      t: t("Repara la fibra", "Rebuild muscle"),
      d: t(
        "La proteína entrega los aminoácidos que reconstruyen el músculo — más fuerte que antes.",
        "Protein delivers the amino acids that rebuild muscle — stronger than before."
      ),
    },
    {
      n: "03",
      t: t("La ventana de 30 min", "The 30-minute window"),
      d: t(
        "Tu cuerpo absorbe nutrientes como esponja justo después de correr. Stride está hecho para ese momento.",
        "Your body soaks up nutrients right after a run. Stride is built for that window."
      ),
    },
  ];
  return (
    <section className="section science" id="ciencia">
      <div className="wrap">
        <div className="sci-head">
          <p className="eyebrow reveal">{t("La ciencia, simple", "The science, simplified")}</p>
          <h2 className="display h-lg reveal" style={{ "--delay": "60ms", marginTop: 16 } as React.CSSProperties}>
            {t("Por qué funciona", "Why")}
            <br />
            {t("el 3:2", "3:2 works")}
          </h2>
          <div className="ratio-viz reveal" style={{ "--delay": "120ms" } as React.CSSProperties}>
            <div className="ratio-bar">
              <span className="ratio-c" style={{ flex: 3 }}>
                {t("Carbohidratos", "Carbs")}
              </span>
              <span className="ratio-p" style={{ flex: 2 }}>
                {t("Proteína", "Protein")}
              </span>
            </div>
            <div className="ratio-keys mono">
              <span>3 {t("partes carbo", "parts carb")}</span>
              <span>2 {t("partes proteína", "parts protein")}</span>
            </div>
          </div>
        </div>
        <div className="sci-grid">
          {points.map((p, i) => (
            <article className="sci-card reveal" key={p.n} style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
              <span className="sci-n mono">{p.n}</span>
              <h3>{p.t}</h3>
              <p className="lede">{p.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductFeature() {
  const { t, money } = useStore();
  const macros: [string, string][] = [
    [t("Carbohidratos", "Carbs"), "30 g"],
    [t("Proteína", "Protein"), "20 g"],
    [t("Electrolitos", "Electrolytes"), t("6 tipos", "6 types")],
    [t("Azúcar añadido", "Added sugar"), "0 g"],
  ];
  return (
    <section className="section product-feat">
      <div className="wrap pf-in">
        <div className="pf-visual reveal">
          <ImageSlot
            className="pf-slot"
            shape="rounded"
            radius={20}
            src={IMG.recoveryAngle}
            alt={t("Stride Recovery Mix", "Stride Recovery Mix")}
          />
        </div>
        <div className="pf-copy">
          <p className="eyebrow reveal">{t("El producto", "The product")}</p>
          <h2 className="display h-md reveal" style={{ "--delay": "60ms", marginTop: 14 } as React.CSSProperties}>
            Recovery Mix
          </h2>
          <p className="lede reveal" style={{ "--delay": "110ms", marginTop: 18 } as React.CSSProperties}>
            {t(
              "Una mezcla post-entrenamiento que se disuelve limpio, sin texturas raras. Tres sabores, cero culpa.",
              "A post-workout mix that dissolves clean, no weird textures. Three flavors, zero guilt."
            )}
          </p>
          <ul className="pf-macros reveal" style={{ "--delay": "160ms" } as React.CSSProperties}>
            {macros.map(([k, v]) => (
              <li key={k}>
                <span>{k}</span>
                <strong className="mono">{v}</strong>
              </li>
            ))}
          </ul>
          <div className="pf-cta reveal" style={{ "--delay": "210ms" } as React.CSSProperties}>
            <Link href={PROD_URL} className="btn btn-primary btn-lg">
              {t("Ver producto", "View product")} <span className="arrow">→</span>
            </Link>
            <span className="mono">
              {t("desde", "from")} {money(unitPrice("recovery-mix", "sub"))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const DIVS = [
  {
    id: "recover" as const,
    name: "Recover",
    tag: { es: "Encuentra tu calma", en: "Find your calm" },
    mood: { es: "Meditación · Sabiduría · Zen", en: "Meditation · Wisdom · Zen" },
    d: {
      es: "Recovery Mix: carbohidratos y proteína 3:2. En bolsa de 1 kg y en sachets.",
      en: "Recovery Mix: carbs and protein in a 3:2 ratio. In a 1 kg bag and sachets.",
    },
    var: "--recover",
    tint: "--recover-tint",
  },
  {
    id: "endure" as const,
    name: "Endure",
    tag: { es: "Domina el juego", en: "Own the game" },
    mood: { es: "Intelectual · Intenso · Durabilidad", en: "Intellectual · Intense · Durability" },
    d: {
      es: "Creatina monohidratada pura para fuerza, potencia y resistencia muscular.",
      en: "Pure creatine monohydrate for strength, power and muscular endurance.",
    },
    var: "--endure",
    tint: "--endure-tint",
  },
  {
    id: "hydrate" as const,
    name: "Hydrate",
    tag: { es: "Refresca tu flow", en: "Refresh your flow" },
    mood: { es: "Risa · Vitalidad · Fresco", en: "Laughter · Vitality · Fresh" },
    d: { es: "Bote de electrolitos sin azúcar para una hidratación inteligente.", en: "Sugar-free electrolyte tub for smart hydration." },
    var: "--hydrate",
    tint: "--hydrate-tint",
  },
];

function Divisions() {
  const { t, lang } = useStore();
  return (
    <section className="section divisions" id="divisiones">
      <div className="wrap">
        <div className="div-head">
          <div>
            <p className="eyebrow reveal">{t("Una marca, tres estados", "One brand, three states")}</p>
            <h2 className="display h-lg reveal" style={{ "--delay": "60ms", marginTop: 14 } as React.CSSProperties}>
              {t("Divisiones", "Divisions")}
            </h2>
          </div>
          <p className="lede reveal" style={{ "--delay": "100ms", maxWidth: "38ch" } as React.CSSProperties}>
            {t(
              "Cada fórmula acompaña una etapa distinta de tu vida como atleta. Mismo rigor, distinto propósito.",
              "Each formula meets a different stage of your athletic life. Same rigor, different purpose."
            )}
          </p>
        </div>
        <div className="div-grid">
          {DIVS.map((d, i) => (
            <article
              className="div-card reveal"
              key={d.id}
              style={{ "--c": `var(${d.var})`, "--c-ink": `var(--${d.id}-ink)`, "--tint": `var(${d.tint})`, "--delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className="div-photo">
                <ImageSlot
                  className="div-slot"
                  shape="rect"
                  src={DIV_IMG[d.id].card}
                  alt={"Stride " + d.name}
                />
                <span className="div-badge mono">{d.name}</span>
              </div>
              <div className="div-body">
                <span className="mono div-mood">{d.mood[lang]}</span>
                <h3 className="display">{d.tag[lang]}</h3>
                <p className="lede">{d.d[lang]}</p>
                <Link href={DIV_URL[d.id]} className="div-link">
                  {t("Ver línea", "View line")} <span className="arrow">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Community() {
  const { t, lang } = useStore();
  const QUOTES = [
    {
      q: {
        es: "Antes, después de una carrera larga, me sentía cansadísimo todo el día. Con Stride, mi cuerpo se recupera mucho más rápido y me siento con más energía.",
        en: "After a long run I used to feel wiped out all day. With Stride my body recovers much faster and I feel more energized.",
      },
      n: "Braulio Macías",
      r: { es: "Corredor · México", en: "Runner · Mexico" },
    },
    {
      q: {
        es: "Lo que más me gusta es que ya no siento tanta fatiga después de una carrera larga. Puedo entrenar sin esa sensación de cansancio extremo.",
        en: "What I like most is that I no longer feel so much fatigue after a long run. I can train without that extreme tiredness.",
      },
      n: "Guillermo Armenta",
      r: { es: "Ciudad de México", en: "Mexico City" },
    },
    {
      q: {
        es: "Después de las carreras siempre sufría de calambres, pero desde que empecé con Stride Recovery mi cuerpo se siente más fuerte y ya no tengo esos problemas.",
        en: "I always cramped after races, but since I started with Stride Recovery my body feels stronger and I don't have those problems anymore.",
      },
      n: "Omar Gameros",
      r: { es: "Monterrey, México", en: "Monterrey, Mexico" },
    },
  ];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6000);
    return () => clearInterval(x);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const go = (n: number) => setI((n + QUOTES.length) % QUOTES.length);
  return (
    <section className="section community dark" id="comunidad">
      <div className="wrap comm-in">
        <div className="comm-visual reveal">
          <ImageSlot
            className="comm-slot"
            shape="rounded"
            radius={20}
            src={IMG.athletePortrait}
            alt={t("Atleta Stride", "Stride athlete")}
          />
          <div className="comm-stats">
            <div>
              <strong className="display">
                <CountUp to={2400} suffix="+" />
              </strong>
              <span className="mono">{t("atletas en la lista", "athletes on the list")}</span>
            </div>
            <div>
              <strong className="display">
                <CountUp to={18} />
              </strong>
              <span className="mono">{t("ciudades de México", "cities in Mexico")}</span>
            </div>
          </div>
        </div>
        <div className="comm-copy">
          <p className="eyebrow reveal">{t("La comunidad Stride", "The Stride community")}</p>
          <h2 className="display h-lg reveal" style={{ "--delay": "60ms", marginTop: 14 } as React.CSSProperties}>
            {t("Corredores como tú", "Runners like you")}
          </h2>
          <div className="quote reveal" style={{ "--delay": "110ms" } as React.CSSProperties}>
            <blockquote key={i}>&quot;{QUOTES[i].q[lang]}&quot;</blockquote>
            <div className="quote-by">
              <strong>{QUOTES[i].n}</strong>
              <span className="mono">{QUOTES[i].r[lang]}</span>
            </div>
            <div className="quote-nav">
              <button onClick={() => go(i - 1)} aria-label="prev">
                ←
              </button>
              <div className="dots">
                {QUOTES.map((_, k) => (
                  <button key={k} className={k === i ? "on" : ""} onClick={() => go(k)}></button>
                ))}
              </div>
              <button onClick={() => go(i + 1)} aria-label="next">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const { t } = useStore();
  const [email, setEmail] = React.useState("");
  const [s, setS] = React.useState<"idle" | "ok" | "err">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setS(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? "ok" : "err");
  };
  return (
    <section className="section news">
      <div className="wrap news-card reveal">
        <Mark size={34} color="var(--teal)" />
        <h2 className="display h-md" style={{ marginTop: 16 }}>
          {t("Tu mejor versión empieza ahora", "Your best self starts now")}
        </h2>
        <p className="lede" style={{ maxWidth: "46ch", margin: "16px auto 28px" }}>
          {t(
            "Únete a la lista: lanzamientos, guías de recuperación y un descuento de bienvenida.",
            "Join the list: drops, recovery guides and a welcome discount."
          )}
        </p>
        {s === "ok" ? (
          <div className="news-ok">
            <span>✓</span> {t("¡Listo! Revisa tu correo.", "Done! Check your inbox.")}
          </div>
        ) : (
          <form className="news-form" onSubmit={submit} noValidate>
            <input
              type="email"
              placeholder={t("tu@correo.com", "you@email.com")}
              value={email}
              className={s === "err" ? "err" : ""}
              onChange={(e) => {
                setEmail(e.target.value);
                if (s === "err") setS("idle");
              }}
            />
            <button className="btn btn-accent btn-lg" type="submit">
              {t("Unirme", "Join")} <span className="arrow">→</span>
            </button>
          </form>
        )}
        {s === "err" && (
          <p className="mono" style={{ color: "#d23", marginTop: 10 }}>
            {t("Ingresa un correo válido", "Enter a valid email")}
          </p>
        )}
      </div>
    </section>
  );
}

export default function HomeContent() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ValueStrip />
        <Science />
        <ProductFeature />
        <Divisions />
        <Community />
        <Faq />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
