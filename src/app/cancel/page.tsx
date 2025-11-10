import Link from "next/link";

export const metadata = {
  title: "Checkout canceled — Boulevard Burger",
  description: "You canceled checkout. You can return to your cart or keep building.",
};

export default function CancelPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-extrabold">Checkout Canceled</h1>
      <p className="mt-2 text-neutral-700">
        No worries — your cart is still saved on this device. You can continue editing or try checkout again.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/cart" className="rounded-2xl border px-4 py-2 hover:bg-white">Back to Cart</Link>
        <Link href="/builder" className="rounded-2xl bg-black text-white px-4 py-2 hover:bg-neutral-800">Build Another Burger</Link>
      </div>
    </main>
  );
}

