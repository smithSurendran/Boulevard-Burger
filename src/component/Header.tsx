"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
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

        <nav className="hidden md:flex justify-center items-center gap-8 text-[15px]">
          <Link href="/menu" className="hover:text-bb-fire">Menu</Link>
          <Link href="/order" className="hover:text-bb-fire">Order</Link>
          <Link href="/catering" className="hover:text-bb-fire">Catering</Link>
          <Link href="/about" className="hover:text-bb-fire">About</Link>
          <Link href="/contact" className="hover:text-bb-fire">Contact</Link>
        </nav>

        <Link href="/order" className="justify-self-end rounded-full px-5 py-2.5 bg-bb-fire text-white hover:opacity-90">
          Order Now
        </Link>
      </div>
    </header>
  );
}
