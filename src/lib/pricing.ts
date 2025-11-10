import type { MenuItem } from "@/data/menu";

export type PricedAddOn = { name: string; price?: number };

export const DEFAULT_BASE_PRICE = 9;

export function computeUnitPrice(
  basePrice: number | undefined,
  selectedAddOns: string[],
  pricedAddOns: PricedAddOn[] = []
): number {
  const base = typeof basePrice === "number" ? basePrice : DEFAULT_BASE_PRICE;
  const addOnTotal = selectedAddOns.reduce(
    (sum, a) => sum + (pricedAddOns.find((x) => x.name === a)?.price ?? 0),
    0
  );
  return base + addOnTotal;
}

export function computeTotal(unitPrice: number, qty: number): number {
  const safeQty = Math.max(1, qty || 1);
  return unitPrice * safeQty;
}

export const defaultOptionSets = {
  buns: ["Brioche", "Potato", "Pretzel", "Gluten Free"],
  patties: ["Beef", "Vegan", "Blended", "Rib Eye"],
  cheeses: ["American", "Cheddar", "Provolone", "Mozzarella"],
  sauces: ["House Made", "Hot", "BBQ", "Ranch", "Blue Cheese"],
};

export function getOptionSets(item?: MenuItem) {
  return {
    buns: item?.options?.buns ?? defaultOptionSets.buns,
    patties: item?.options?.patties ?? defaultOptionSets.patties,
    cheeses: item?.options?.cheeses ?? defaultOptionSets.cheeses,
    sauces: item?.options?.sauces ?? defaultOptionSets.sauces,
    pricedAddOns: item?.options?.addOns ?? ([] as PricedAddOn[]),
  };
}

