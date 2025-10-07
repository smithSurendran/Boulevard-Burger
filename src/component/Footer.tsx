import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="inline-flex h-10 overflow-hidden rounded-[8px] mb-4">
            <Image src="/brand/logo.jpg" alt="Boulevard Burger" width={160} height={40} className="h-10 w-auto object-contain" />
          </div>
          <p className="text-neutral-600">Stacked high. Smashed right.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Hours</h4>
          <p>Mon–Sun: 11am–10pm</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p>hello@boulevardburger.com</p>
        </div>
      </div>
      <div className="text-center text-xs text-neutral-500 py-4">
        © {new Date().getFullYear()} Boulevard Burger
      </div>
    </footer>
  );
}
