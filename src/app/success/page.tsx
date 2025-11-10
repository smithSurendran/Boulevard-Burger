import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-extrabold">Thank you!</h1>
      <p className="mt-2 text-neutral-700">
        Your order has been received. A receipt was sent to your email.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/menu" className="rounded-2xl border px-4 py-2 hover:bg-white">Back to Menu</Link>
        <Link href="/" className="rounded-2xl bg-black text-white px-4 py-2 hover:bg-neutral-800">Home</Link>
      </div>
    </main>
  );
}

