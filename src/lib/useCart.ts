'use client'
import { useEffect, useState } from 'react'

export interface BurgerItem {
  id: string
  bun: string
  patty: string
  cheese: string
  sauce: string
  addons: string[]
  quantity: number
  price: number
}

export const useCart = () => {
  const [cart, setCart] = useState<BurgerItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) setCart(JSON.parse(stored))
  }, [])

  const saveCart = (updated: BurgerItem[]) => {
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const addItem = (item: BurgerItem) => saveCart([...cart, item])
  const removeItem = (id: string) => saveCart(cart.filter(i => i.id !== id))
  const clearCart = () => saveCart([])

  return { cart, addItem, removeItem, clearCart }
}
