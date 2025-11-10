"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu as MenuIcon, X } from "lucide-react";
import { useCart } from "@/lib/useCart";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Header() {
  const { cart } = useCart();
  const subtotal = useMemo(() => cart.reduce((s, i) => s + (i.price * (i.quantity || 1)), 0), [cart]);
  const totalItems = useMemo(() => cart.reduce((s, i) => s + (i.quantity || 1), 0), [cart]);
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-bb-paper/95 backdrop-blur border-b border-neutral-200 shadow-sm">
        <div className="mx-auto max-w-7xl h-30 px-6 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <Link href="/" aria-label="Boulevard Burger home" className="flex items-center">
            <div className="inline-flex overflow-hidden rounded-[8px]">
              <Image
                src="/brand/new_logo.jpg"
                alt="BLVD Burger & Grill"
                width={280}
                height={100}
                priority
                className="h-16 md:h-30 w-auto object-contain"
              />
            </div>
          </Link>

          <nav className="hidden md:flex justify-center items-center gap-9 heading-smash text-base md:text-[17px] lg:text-[18px]">
            <Link href="/menu" className="font-semibold tracking-wide hover:text-[var(--color-bb-red)] transition-colors">Menu</Link>
            <Link href="/builder" className="font-semibold tracking-wide hover:text-[var(--color-bb-red)] transition-colors">Order</Link>
            <Link href="/catering" className="font-semibold tracking-wide hover:text-[var(--color-bb-red)] transition-colors">Catering</Link>
            <Link href="/about" className="font-semibold tracking-wide hover:text-[var(--color-bb-red)] transition-colors">About</Link>
            <Link href="/contact" className="font-semibold tracking-wide hover:text-[var(--color-bb-red)] transition-colors">Contact</Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden justify-self-end rounded-lg border px-3 py-2 hover:bg-white"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>

          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-7 h-7 text-[var(--color-bb-red)] hover:text-red-600 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-bb-red)] text-white text-xs font-bold rounded-full px-1.5">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mini summary */}
            <Link href="/cart" className="text-sm text-neutral-700 hover:underline">
              {totalItems} item{totalItems !== 1 ? "s" : ""} {"\u00B7"} ${subtotal.toFixed(2)}
            </Link>

            {/* Order Now Button */}
            <Link
              href="/builder"
              className="bg-black text-white px-5 py-2.5 rounded-full text-[15px] font-semibold hover:bg-[var(--color-bb-red)] transition"
            >
              Order Now
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-bold">Menu</span>
              <button ref={closeBtnRef} aria-label="Close menu" onClick={() => setOpen(false)} className="rounded p-1 hover:bg-neutral-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <Link href="/menu" onClick={() => setOpen(false)} className="py-2">Menu</Link>
            <Link href="/builder" onClick={() => setOpen(false)} className="py-2">Order</Link>
            <Link href="/catering" onClick={() => setOpen(false)} className="py-2">Catering</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="py-2">About</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="py-2">Contact</Link>
            <div className="mt-auto pt-4 border-t">
            <Link href="/cart" onClick={() => setOpen(false)} className="flex items-center justify-between">
              <span>Cart</span>
              <span className="text-sm text-neutral-600">{totalItems} {"\u00B7"} ${subtotal.toFixed(2)}</span>
            </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
