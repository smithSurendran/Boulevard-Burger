'use client'
import { useCart } from '@/lib/useCart'
import { Button } from '@/components/ui/button'

export default function CartPage() {
const { cart, removeItem, clearCart } = useCart()

if (!cart.length)
return <p className="text-center mt-10 text-xl">🛒 Your cart is empty.</p>

return (
<div className="max-w-3xl mx-auto p-6 space-y-6">
<h1 className="text-3xl font-bold text-center text-orange-800">Your Cart</h1>
{cart.map(item => (
<div key={item.id} className="border p-4 rounded-xl shadow-sm bg-white">
<h2 className="font-semibold text-lg">
{item.patty} Burger ({item.bun} Bun)
</h2>
<p>{item.cheese} | {sauceSummary(item.sauce)} | Add-ons: {item.addons.join(', ') || 'None'}</p>
<p className="font-bold mt-2">${item.price.toFixed(2)}</p>
<Button onClick={() => removeItem(item.id)} variant="destructive" className="mt-2">
Remove
</Button>
</div>
))}
<Button onClick={clearCart} className="w-full bg-orange-700 text-white">
Clear Cart
</Button>
</div>
)
}

function sauceSummary(sauce: string) {
return sauce.replace(/_/g, ' ')
}