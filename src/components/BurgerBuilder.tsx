'use client'

import React, { useState } from 'react'
import Image from 'next/image'
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

const buns = ['Brioche', 'Potato', 'Pretzel', 'Gluten Free']
const patties = ['Beef', 'Vegan', 'Blended', 'Rib Eye']
const cheeses = ['American', 'Cheddar', 'Provolone', 'Mozzarella']
const sauces = ['House Made', 'Hot', 'BBQ', 'Ranch', 'Blue Cheese']
const addons = [
  'Pickles', 'Mushrooms', 'Caramelized Onions', 'Fried Onions',
  'Long Hot Peppers', 'Pulled Pork', 'Bacon', 'Truffle Oil'
]

export default function BurgerBuilder() {
  const [bun, setBun] = useState(buns[0])
  const [patty, setPatty] = useState(patties[0])
  const [cheese, setCheese] = useState(cheeses[0])
  const [sauce, setSauce] = useState(sauces[0])
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon)
        ? prev.filter(a => a !== addon)
        : [...prev, addon]
    )
  }
  const { addItem } = useCart()

  const handleAddToCart = () => {
    const item = {
      id: uuidv4(),
      bun,
      patty,
      cheese,
      sauce,
      addons: selectedAddons,
      quantity: 1,
      price: 9 + selectedAddons.length * 1
    }
    addItem(item)
    toast.success('🍔 Added to cart!', {
    description: 'Your burger has been added to the cart.',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 p-6 md:p-10">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center text-orange-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🍔 Build Your Own Burger
      </motion.h1>

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

              <Button onClick={handleAddToCart} className="w-full mt-6 text-lg bg-orange-700 hover:bg-orange-800 text-white py-3 rounded-xl">
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )


}

// 🔹 Reusable Subcomponents
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
