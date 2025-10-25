"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/useCart'

export default function Header() {
  const { cart } = useCart()
  return (
    <header className="sticky top-0 z-50 bg-bb-paper/95 backdrop-blur border-b border-neutral-200 shadow-sm">
      <div className="mx-auto max-w-7xl h-20 px-4 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link href="/" aria-label="Boulevard Burger home" className="flex items-center">
          {/* subtle curve + proper clipping */}
          <div className="inline-flex overflow-hidden rounded-[8px]"> 
            <Image
              src="/brand/logo.jpg"     // or .jpg
              alt="BLVD Burger & Grill"
              width={260}
              height={80}
              priority
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>
        </Link>

        <nav className="hidden md:flex justify-center items-center gap-9 heading-smash text-base md:text-[17px] lg:text-[18px]">
          <Link href="/menu" className="font-semibold tracking-wide hover:text-bb-fire transition-colors">Menu</Link>
          <Link href="/order" className="font-semibold tracking-wide hover:text-bb-fire transition-colors">Order</Link>
          <Link href="/catering" className="font-semibold tracking-wide hover:text-bb-fire transition-colors">Catering</Link>
          <Link href="/about" className="font-semibold tracking-wide hover:text-bb-fire transition-colorshover:text-bb-fire">About</Link>
          <Link href="/contact" className="font-semibold tracking-wide hover:text-bb-fire transition-colors:text-bb-fire">Contact</Link>
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
            className="heading-smash font-bold tracking-wide rounded-full px-7 py-3.5 text-base md:text-lg bg-bb-fire text-white hover:scale-105 hover:shadow-md transition-transform duration-200"
          >
            Order Now
          </Link>
        </div>

      </div>
    </header>
  );
}
