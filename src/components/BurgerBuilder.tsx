'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { Beef, Croissant, Pizza , Flame, Utensils } from 'lucide-react'
import { useCart } from '@/lib/useCart'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { menu } from '@/data/menu'
import { computeUnitPrice, computeTotal } from '@/lib/pricing'
import { useSearchParams } from 'next/navigation'

const buns = ['Brioche', 'Potato', 'Pretzel', 'Gluten Free']
const patties = ['Beef', 'Vegan', 'Blended', 'Rib Eye']
const cheeses = ['American', 'Cheddar', 'Provolone', 'Mozzarella']
const sauces = ['House Made', 'Hot', 'BBQ', 'Ranch', 'Blue Cheese']
const addons = [
  'Pickles', 'Mushrooms', 'Caramelized Onions', 'Fried Onions',
  'Long Hot Peppers', 'Pulled Pork', 'Bacon', 'Truffle Oil'
]

const presetMap: Record<string, Partial<{ patty: string; sauce: string; cheese: string; addons: string[] }>> = {
  'Classic': {},
  'Classic Cheese': { cheese: 'American' },
  'The Italian': { addons: ['Long Hot Peppers'] },
  'The Buffalo Burger': { sauce: 'Hot' },
  'The Jersey Burger': {},
  'Spud Burger': { cheese: 'Cheddar' },
  'BBQ Burger': { sauce: 'BBQ', addons: ['Pulled Pork', 'Caramelized Onions'] },
  'Three Alarm Burger': { sauce: 'Hot', addons: ['Long Hot Peppers'] },
  'Vegan Burger': { patty: 'Vegan' },
  'Blended Burger': { patty: 'Blended' },
}

export default function BurgerBuilder() {
  const [bun, setBun] = useState(buns[0])
  const [patty, setPatty] = useState(patties[0])
  const [cheese, setCheese] = useState(cheeses[0])
  const [sauce, setSauce] = useState(sauces[0])
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [checkingOut, setCheckingOut] = useState(false)
  const burgers = useMemo(
    () => menu.categories.find(c => c.id === 'burgers')?.items ?? [],
    []
  )
  const [preset, setPreset] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const params = useSearchParams()

  const applyPreset = useCallback((name: string) => {
    setPreset(name)
    const p = presetMap[name]
    if (!p) return
    if (p.patty) setPatty(p.patty)
    if (p.sauce) setSauce(p.sauce)
    if (p.cheese) setCheese(p.cheese)
    if (p.addons) setSelectedAddons(p.addons)
  }, [])
  // Apply deep-linked preset via ?item=<slug>
  useEffect(() => {
    const slug = params?.get('item')
    if (slug) {
      const found = burgers.find(b => b.slug === slug)
      if (found) applyPreset(found.name)
    }
  }, [params, burgers, applyPreset])

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon)
        ? prev.filter(a => a !== addon)
        : [...prev, addon]
    )
  }
  const { addItem } = useCart()
  const active = useMemo(
    () => burgers.find(b => b.name === (preset ?? burgers[0]?.name)) || burgers[0],
    [preset, burgers]
  )
  const unitPrice = useMemo(() => {
    const pricedAddOns = active?.options?.addOns ?? []
    return computeUnitPrice(active?.basePrice, selectedAddons, pricedAddOns)
  }, [active, selectedAddons])
  const total = useMemo(() => computeTotal(unitPrice, qty), [unitPrice, qty])

  const handleAddToCart = () => {
    const item = {
      id: uuidv4(),
      bun,
      patty,
      cheese,
      sauce,
      addons: selectedAddons,
      quantity: qty,
      price: unitPrice
    }
    addItem(item)
    toast.success('Added to cart!', {
      description: 'Your burger has been added to the cart.',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 p-6 md:p-10">
      <div className="mx-auto max-w-5xl px-1 mb-4">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center text-orange-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Build Your Own Burger
      </motion.h1>

      {/* Preset gallery pulled from menu (with images) */}
      <div className="max-w-5xl mx-auto px-1 mb-6">
        <h2 className="text-xl font-bold text-orange-800 mb-3">Popular Burgers</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {burgers.map((b) => (
            <button
              key={b.name}
              onClick={() => applyPreset(b.name)}
              className={`relative min-w-[180px] h-[140px] rounded-xl overflow-hidden border bg-white shadow-[3px_3px_0_#000] text-left ${preset === b.name ? 'ring-2 ring-orange-700' : ''}`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={b.image || '/brand/hero.png'}
                  alt={b.name}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-sm px-3 py-1">
                  {b.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left Column - Options */}
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="space-y-8 p-6">
            {/* Bun */}
            <Section title="Choose Your Bun" icon={<Croissant />}>
              <RadioGroup value={bun} onValueChange={setBun} className="grid grid-cols-2 gap-3">
                {buns.map(b => (
                  <Option key={b} value={b} label={b} />
                ))}
              </RadioGroup>
            </Section>

            {/* Patty */}
            <Section title="Choose Your Patty" icon={<Beef />}>
              <RadioGroup value={patty} onValueChange={setPatty} className="grid grid-cols-2 gap-3">
                {patties.map(p => (
                  <Option key={p} value={p} label={p} />
                ))}
              </RadioGroup>
            </Section>

            {/* Cheese */}
            <Section title="Choose Your Cheese" icon={<Pizza />}>
              <RadioGroup value={cheese} onValueChange={setCheese} className="grid grid-cols-2 gap-3">
                {cheeses.map(c => (
                  <Option key={c} value={c} label={c} />
                ))}
              </RadioGroup>
            </Section>

            {/* Sauce */}
            <Section title="Choose Your Sauce" icon={<Flame />}>
              <RadioGroup value={sauce} onValueChange={setSauce} className="grid grid-cols-2 gap-3">
                {sauces.map(s => (
                  <Option key={s} value={s} label={s} />
                ))}
              </RadioGroup>
            </Section>

            {/* Add-ons */}
            <Section title="Add-Ons" icon={<Utensils />}>
              <div className="grid grid-cols-2 gap-2">
                {addons.map(a => (
                  <div key={a} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedAddons.includes(a)}
                      onCheckedChange={() => toggleAddon(a)}
                      id={a}
                    />
                    <Label htmlFor={a}>{a}</Label>
                  </div>
                ))}
              </div>
            </Section>
          </CardContent>
        </Card>

        {/* Right Column - Summary */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6 space-y-4 text-center">
              <Image
                src="/burger.png"
                alt="Custom Burger"
                width={300}
                height={300}
                className="mx-auto rounded-xl"
              />
              <h2 className="text-2xl font-bold text-orange-700">Your Creation</h2>
              <p className="text-gray-800">
                <strong>{patty}</strong> burger on a <strong>{bun}</strong> bun,<br />
                topped with <strong>{cheese}</strong> cheese and <strong>{sauce}</strong> sauce.
              </p>
              <p className="text-gray-700">
                <strong>Add-ons:</strong>{' '}
                {selectedAddons.length ? selectedAddons.join(', ') : 'None'}
              </p>
              <div className="mt-2 flex items-center justify-center gap-3">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-1.5 rounded border">-</button>
                <span className="min-w-6 text-center">{qty}</span>
                <button onClick={() => setQty(q => Math.min(10, q + 1))} className="px-3 py-1.5 rounded border">+</button>
              </div>
              <div className="text-sm text-neutral-700">Total: ${total.toFixed(2)} ( ${unitPrice.toFixed(2)} each )</div>

              <Button onClick={handleAddToCart} className="w-full mt-6 text-lg bg-orange-700 hover:bg-orange-800 text-white py-3 rounded-xl">
                Add to Cart  ${total.toFixed(2)}
              </Button>

              <Button
                onClick={async () => {
                  const item = { id: uuidv4(), bun, patty, cheese, sauce, addons: selectedAddons, quantity: qty, price: unitPrice }
                  try {
                    setCheckingOut(true)
                    const res = await fetch('/api/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ items: [item] }),
                    })
                    if (!res.ok) {
                      const msg = await res.text()
                      console.error('Checkout failed', msg)
                      ;(await import('sonner')).toast.error('Checkout failed', {
                        description: 'Please try again.',
                        action: {
                          label: 'Retry',
                          onClick: async () => {
                            const retry = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [item] }) })
                            const data = await retry.json()
                            if (data?.url) window.location.href = data.url
                          },
                        },
                      })
                      return
                    }
                    const data = await res.json()
                    if (data.url) window.location.href = data.url
                  } catch (e) {
                    console.error(e)
                    ;(await import('sonner')).toast.error('Checkout error', { description: 'Network issue. Please try again.' })
                  } finally {
                    setCheckingOut(false)
                  }
                }}
                disabled={checkingOut}
                className="w-full mt-3 text-lg bg-black hover:bg-neutral-800 text-white py-3 rounded-xl"
              >
                {checkingOut ? 'Redirecting…' : `Checkout Now — $${total.toFixed(2)}`}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )


}

// Reusable Subcomponents
const Section = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center space-x-2 mb-2 text-orange-700">
      {icon}
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
    {children}
  </div>
)

const Option = ({ value, label }: { value: string; label: string }) => (
  <div className="flex items-center space-x-2">
    <RadioGroupItem value={value} id={value} />
    <Label htmlFor={value}>{label}</Label>
  </div>
)




