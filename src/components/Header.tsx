"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/useCart'

export default function Header() {
  const { cart } = useCart()
  return (
    <header className="sticky top-0 z-50 bg-bb-paper/90 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl h-20 px-4 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link href="/" aria-label="Boulevard Burger home" className="flex items-center">
          {/* subtle curve + proper clipping */}
          <div className="inline-flex overflow-hidden rounded-[8px]"> 
            <Image
              src="/brand/logo.jpg"     // or .jpg
              alt="BLVD Burger & Grill"
              width={240}
              height={72}
              priority
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>
        </Link>

        <nav className="hidden md:flex justify-center items-center gap-9 heading-smash text-base md:text-[17px] lg:text-[18px]">
          <Link href="/menu" className="hover:text-bb-fire">Menu</Link>
          <Link href="/order" className="hover:text-bb-fire">Order</Link>
          <Link href="/catering" className="hover:text-bb-fire">Catering</Link>
          <Link href="/about" className="hover:text-bb-fire">About</Link>
          <Link href="/contact" className="hover:text-bb-fire">Contact</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-7 h-7 text-bb-fire hover:text-orange-600 transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-bb-fire text-white text-xs font-bold rounded-full px-1.5">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Order Now Button */}
          <Link
            href="/order"
            className="heading-smash tracking-[.06em] rounded-full px-6 py-3 text-base md:text-lg bg-bb-fire text-white hover:opacity-90"
          >
            Order Now
          </Link>
        </div>

      </div>
    </header>
  );
}
