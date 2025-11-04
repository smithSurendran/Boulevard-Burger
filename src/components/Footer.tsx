"use client";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Music2 } from "lucide-react"; // TikTok substitute

export default function Footer() {
  return (
    <footer className="bg-[#C94C4C] text-white mt-20">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-3 text-center md:text-left">
        
        {/* Left Section */}
        <div>
          <div className="inline-flex h-12 overflow-hidden rounded-lg mb-4">
            <Image
              src="/brand/logo.jpg"
              alt="Boulevard Burger"
              width={180}
              height={45}
              className="h-12 w-auto object-contain"
            />
          </div>
          <p className="text-white/80">Stacked high. Smashed right.</p>
        </div>

        {/* Middle Section */}
        <div>
          <h4 className="font-semibold mb-3 uppercase tracking-widest text-sm">Visit Us</h4>
          <p className="text-white/80">Mon-Sun: 11am-10pm</p>
          <p className="text-white/80 mt-2">hello@boulevardburger.com</p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <Link
            href="/order"
            className="bg-black hover:bg-neutral-800 text-white font-semibold rounded-full px-8 py-3 transition"
          >
            ORDER NOW
          </Link>

          <div className="flex space-x-5">
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
              <Instagram size={22} />
            </Link>
            <Link href="https://tiktok.com" target="_blank" aria-label="TikTok">
              <Music2 size={22} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20 py-4 text-center text-xs text-white/70">
        {"\u00A9"} {new Date().getFullYear()} Boulevard Burger \u2014 All rights reserved.
      </div>
    </footer>
  );
}

