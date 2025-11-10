'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/useCart'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function CartPage() {
  const { cart, saved, removeItem, removeSaved, clearSaved, clearCart, setItemQuantity, saveForLater, moveToCart, moveAllSavedToCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  const subtotal = useMemo(() => cart.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0), [cart])
  const estTaxRate = 0.08
  const estTax = useMemo(() => subtotal * estTaxRate, [subtotal])
  const orderTotal = useMemo(() => subtotal + estTax, [subtotal, estTax])

  if (!ready) return null

  if (!cart.length)
    return <p className="text-center mt-10 text-xl">🛒 Your cart is empty.</p>

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
<h1 className="text-3xl font-bold text-center text-orange-800">Your Cart</h1>
      {cart.map(item => {
        const qty = item.quantity || 1
        const lineTotal = (item.price * qty).toFixed(2)
        return (
          <div key={item.id} className="border p-4 rounded-xl shadow-sm bg-white">
            <h2 className="font-semibold text-lg">
              {item.patty} Burger ({item.bun} Bun)
            </h2>
            <p>{item.cheese} | {sauceSummary(item.sauce)} | Add-ons: {item.addons.join(', ') || 'None'}</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setItemQuantity(item.id, qty - 1)} aria-label="Decrease quantity">-</Button>
                <span className="w-8 text-center" aria-live="polite">{qty}</span>
                <Button size="sm" variant="outline" onClick={() => setItemQuantity(item.id, qty + 1)} aria-label="Increase quantity">+</Button>
                <span className="ml-3 text-sm text-neutral-600">@ ${item.price.toFixed(2)} each</span>
              </div>
              <div className="font-bold">${lineTotal}</div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => removeItem(item.id)} variant="destructive">Remove</Button>
              <Button variant="outline" onClick={() => saveForLater(item.id)}>Save for later</Button>
            </div>
          </div>
        )
      })}
      <div className="flex items-center justify-between border-t pt-4">
        <span className="font-semibold">Subtotal</span>
        <span className="font-bold">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-700">Est. tax (8% placeholder)</span>
        <span className="font-medium">${estTax.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-semibold">Total</span>
        <span className="font-bold">${orderTotal.toFixed(2)}</span>
      </div>

      {saved.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Saved for later</h2>
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-neutral-700">Want to finish your order? Move saved items back to your cart.</span>
            <div className="flex gap-2">
              <Button variant="outline" onClick={moveAllSavedToCart}>Move all to cart</Button>
              <Button variant="ghost" onClick={clearSaved}>Clear saved</Button>
            </div>
          </div>
          <div className="space-y-3">
            {saved.map(item => (
              <div key={item.id} className="border p-3 rounded-xl bg-white flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.patty} Burger ({item.bun} Bun)</div>
                  <div className="text-sm text-neutral-700">{item.cheese} | {sauceSummary(item.sauce)}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => moveToCart(item.id)}>Move to cart</Button>
                  <Button variant="destructive" onClick={() => removeSaved(item.id)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Button asChild variant="outline" className="w-full">
        <Link href="/">← Back to Home</Link>
      </Button>

      <Button onClick={clearCart} className="w-full bg-orange-700 text-white">
        Clear Cart
      </Button>

      <Button
        onClick={async () => {
          try {
            setLoading(true)
            const res = await fetch('/api/checkout', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: cart }),
            })
            if (!res.ok) {
              const msg = await res.text()
              console.error('Checkout failed', msg)
              toast.error('Checkout failed', {
                description: 'Please try again. If the issue persists, check your network.',
                action: {
                  label: 'Retry',
                  onClick: async () => {
                    const retry = await fetch('/api/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ items: cart }),
                    })
                    const data = await retry.json()
                    if (data?.url) window.location.href = data.url
                  },
                },
              })
              setLoading(false)
              return
            }
            const data = await res.json()
            if (data.url) window.location.href = data.url
          } catch (e) {
            console.error(e)
            toast.error('Checkout error', {
              description: 'We could not reach the server. Please try again.',
            })
          } finally {
            setLoading(false)
          }
        }}
        disabled={!cart.length || loading}
        className="w-full bg-black text-white hover:bg-neutral-800"
      >
        {loading ? 'Redirecting…' : 'Checkout'}
      </Button>
    </div>
  )
}

function sauceSummary(sauce: string) {
return sauce.replace(/_/g, ' ')
}
