import { NextResponse } from "next/server";
import Stripe from "stripe";

// Minimal cart item shape expected from the client
type CartItem = {
  id: string;
  bun: string;
  patty: string;
  cheese: string;
  sauce: string;
  addons: string[];
  quantity: number;
  price: number; // per-item total in dollars
};

export async function POST(req: Request) {
  try {
    const { items } = (await req.json()) as { items: CartItem[] };
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }

    const stripe = new Stripe(secret);

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const line_items = items.map((item) => {
      const name = `${item.patty} Burger (${item.bun} Bun)`;
      const descParts = [item.cheese, item.sauce, item.addons?.length ? `Add-ons: ${item.addons.join(", ")}` : undefined].filter(Boolean);
      const description = descParts.join(" | ");
      const unitAmount = Math.max(0, Math.round((item.price || 0) * 100));
      return {
        quantity: Math.max(1, item.quantity || 1),
        price_data: {
          currency: "usd",
          unit_amount: unitAmount,
          product_data: {
            name,
            description,
          },
        },
      } as Stripe.Checkout.SessionCreateParams.LineItem;
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
