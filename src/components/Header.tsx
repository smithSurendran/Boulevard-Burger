"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/useCart'

export default function Header() {
  const { cart } = useCart()
  return (
    <header className="sticky top-0 z-50 bg-bb-paper/95 backdrop-blur border-b border-neutral-200 shadow-sm">
      <div className="mx-auto max-w-7xl h-30 px-6 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link href="/" aria-label="Boulevard Burger home" className="flex items-center">
          {/* subtle curve + proper clipping */}
          <div className="inline-flex overflow-hidden rounded-[8px]"> 
            <Image
              src="/brand/new_logo.jpg"     // or .jpg
              alt="BLVD Burger & Grill"
              width={280}
              height={100}
              priority
              className="h-16 md:h-30 w-auto object-contain"
            />
          </div>
        </Link>

        <nav className="hidden md:flex justify-center items-center gap-9 heading-smash text-base md:text-[17px] lg:text-[18px]">
          <Link href="/menu" className="font-semibold tracking-wide hover:text-bb-red transition-colors">Menu</Link>
          <Link href="/order" className="font-semibold tracking-wide hover:text-bb-red transition-colors">Order</Link>
          <Link href="/catering" className="font-semibold tracking-wide hover:text-bb-red transition-colors">Catering</Link>
          <Link href="/about" className="font-semibold tracking-wide hover:text-bb-red transition-colorshover:text-bb-fire">About</Link>
          <Link href="/contact" className="font-semibold tracking-wide hover:text-bb-red transition-colors:text-bb-fire">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-7 h-7 text-bb-red hover:text-red-600 transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-bb-red text-white text-xs font-bold rounded-full px-1.5">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Order Now Button */}
          <Link
            href="/order"
            className="bg-black text-white px-5 py-2.5 rounded-full text-[15px] font-semibold hover:bg-[var(--color-bb-red)] transition"
          >
            Order Now
          </Link>
        </div>

      </div>
    </header>
  );
}
