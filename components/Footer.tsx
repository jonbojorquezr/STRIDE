"use client";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { HOME_URL, PROD_URL, DIV_URL } from "@/lib/routes";

export function Footer() {
  const { t } = useStore();
  const cols: [string, [string, string][]][] = [
    [
      t("Tienda", "Shop"),
      [
        [t("Recovery Mix", "Recovery Mix"), PROD_URL],
        ["Recover", DIV_URL.recover],
        ["Endure", DIV_URL.endure],
        ["Hydrate", DIV_URL.hydrate],
      ],
    ],
    [
      t("Marca", "Brand"),
      [
        [t("Historia", "Story"), HOME_URL],
        [t("Ciencia", "Science"), HOME_URL + "#ciencia"],
        [t("Comunidad", "Community"), HOME_URL + "#comunidad"],
      ],
    ],
    [
      t("Soporte", "Support"),
      [
        [t("Envíos", "Shipping"), HOME_URL + "#faq"],
        [t("Contacto", "Contact"), "mailto:contacto@strideforathletes.com"],
      ],
    ],
  ];
  return (
    <footer className="footer dark">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href={HOME_URL} className="row gap-s" aria-label="Stride">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/stride-logo-white.png" alt="Stride" style={{ height: 34, width: "auto" }} />
            </Link>
            <p className="lede" style={{ maxWidth: "32ch", marginTop: 18 }}>
              {t(
                "Suplementos mexicanos para atletas de resistencia. Performance made simple.",
                "Mexican supplements for endurance athletes. Performance made simple."
              )}
            </p>
          </div>
          <div className="footer-cols">
            {cols.map(([h, items]) => (
              <div key={h}>
                <h4 className="mono">{h}</h4>
                <ul>
                  {items.map(([l, href]) => (
                    <li key={l}>
                      {href.startsWith("/") ? (
                        <Link href={href}>{l}</Link>
                      ) : (
                        <a href={href}>{l}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="mono">{t("Síguenos", "Follow")}</h4>
              <ul>
                {/* Strava/TikTok vuelven cuando existan los perfiles; links muertos restan confianza */}
                <li>
                  <a href="https://www.instagram.com/strideforathletes/" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="mono">© 2026 Stride® · {t("Hecho en México", "Made in Mexico")}</span>
          <span className="mono">{t("Aviso de privacidad · Términos", "Privacy · Terms")}</span>
        </div>
      </div>
    </footer>
  );
}
