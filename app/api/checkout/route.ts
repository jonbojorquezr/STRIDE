import { NextResponse } from "next/server";
import Stripe from "stripe";
import { priceCheckout, CheckoutError } from "@/lib/checkout";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Pago no configurado" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const items = (body as { items?: unknown }).items;
  let priced;
  try {
    priced = priceCheckout(items as never);
  } catch (e) {
    if (e instanceof CheckoutError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
  }

  const stripe = new Stripe(secret);
  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: priced.lineItems,
      shipping_address_collection: { allowed_countries: ["MX"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: priced.shipping.amount, currency: "mxn" },
            display_name: priced.shipping.label,
          },
        },
      ],
      success_url: `${origin}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/producto`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Stripe error:", e);
    return NextResponse.json({ error: "No se pudo iniciar el pago" }, { status: 502 });
  }
}
