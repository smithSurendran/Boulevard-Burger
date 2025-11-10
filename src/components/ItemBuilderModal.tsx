"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/lib/useCart";
import { v4 as uuidv4 } from "uuid";
import { computeUnitPrice, computeTotal, getOptionSets } from "@/lib/pricing";

type Props = {
  open: boolean;
  onClose: () => void;
  item: MenuItem | null;
};

export default function ItemBuilderModal({ open, onClose, item }: Props) {
  const data = item;
  const { buns, patties, cheeses, sauces, pricedAddOns } = getOptionSets(data ?? undefined);

  const [bun, setBun] = useState(buns[0]);
  const [patty, setPatty] = useState(patties[0]);
  const [cheese, setCheese] = useState(cheeses[0]);
  const [sauce, setSauce] = useState(sauces[0]);
  const [addons, setAddons] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (open) {
      // Reset selection when opening a new item
      setBun(buns[0]);
      setPatty(patties[0]);
      setCheese(cheeses[0]);
      setSauce(sauces[0]);
      setAddons([]);
      setQty(1);
    }
  }, [open, data]);

  const unitPrice = useMemo(
    () => computeUnitPrice(data?.basePrice, addons, pricedAddOns),
    [data?.basePrice, addons, pricedAddOns]
  );
  const total = useMemo(() => computeTotal(unitPrice, qty), [unitPrice, qty]);

  const { addItem } = useCart();

  const toggleAddon = (name: string) =>
    setAddons((prev) => (prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]));

  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 top-10 mx-auto max-w-2xl px-4">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {/* Header */}
            <div className="flex items-start gap-4 p-4">
              <div className="relative h-28 w-36 overflow-hidden rounded-lg bg-neutral-100">
                {data.image && (
                  <Image src={data.image} alt={data.name} fill className="object-cover" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{data.name}</h2>
                {data.desc && <p className="text-sm text-neutral-700 mt-1">{data.desc}</p>}
              </div>
              <button onClick={onClose} className="rounded px-2 py-1 text-sm border">Close</button>
            </div>

            {/* Options */}
            <div className="grid gap-5 p-4 md:grid-cols-2">
              <Section title="Choose Your Bun">
                <RadioGroup value={bun} onValueChange={setBun} className="grid grid-cols-2 gap-2">
                  {buns.map((v) => (
                    <Option key={v} value={v} label={v} />
                  ))}
                </RadioGroup>
              </Section>
              <Section title="Choose Your Patty">
                <RadioGroup value={patty} onValueChange={setPatty} className="grid grid-cols-2 gap-2">
                  {patties.map((v) => (
                    <Option key={v} value={v} label={v} />
                  ))}
                </RadioGroup>
              </Section>
              <Section title="Choose Your Cheese">
                <RadioGroup value={cheese} onValueChange={setCheese} className="grid grid-cols-2 gap-2">
                  {cheeses.map((v) => (
                    <Option key={v} value={v} label={v} />
                  ))}
                </RadioGroup>
              </Section>
              <Section title="Choose Your Sauce">
                <RadioGroup value={sauce} onValueChange={setSauce} className="grid grid-cols-2 gap-2">
                  {sauces.map((v) => (
                    <Option key={v} value={v} label={v} />
                  ))}
                </RadioGroup>
              </Section>
              {!!pricedAddOns.length && (
                <Section title="Extras">
                  <div className="grid grid-cols-2 gap-2">
                    {pricedAddOns.map((a) => (
                      <label key={a.name} className="flex items-center gap-2 text-sm">
                        <Checkbox id={a.name} checked={addons.includes(a.name)} onCheckedChange={() => toggleAddon(a.name)} />
                        <span>{a.name} {a.price ? <>+${a.price.toFixed(2)}</> : null}</span>
                      </label>
                    ))}
                  </div>
                </Section>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t p-4">
              <div className="flex items-center gap-3">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1.5 rounded border">-</button>
                <span className="min-w-6 text-center">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(10, q + 1))} className="px-3 py-1.5 rounded border">+</button>
                <span className="ml-3 text-sm text-neutral-700">Each: ${unitPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    const itemToAdd = { id: uuidv4(), bun, patty, cheese, sauce, addons, quantity: qty, price: unitPrice } as any;
                    addItem(itemToAdd);
                    onClose();
                  }}
                  className="bg-orange-700 hover:bg-orange-800 text-white"
                >
                  Add — ${total.toFixed(2)}
                </Button>
                <Button
                  onClick={async () => {
                    const itemToBuy = { id: uuidv4(), bun, patty, cheese, sauce, addons, quantity: qty, price: unitPrice };
                    const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [itemToBuy] }) });
                    const data = await res.json();
                    if (data?.url) window.location.href = data.url;
                  }}
                  className="bg-black text-white hover:bg-neutral-800"
                >
                  Checkout — ${total.toFixed(2)}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-semibold mb-2">{title}</div>
      {children}
    </div>
  );
}

function Option({ value, label }: { value: string; label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <RadioGroupItem value={value} id={value} />
      <span>{label}</span>
    </label>
  );
}
