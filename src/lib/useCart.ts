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
  const [saved, setSaved] = useState<BurgerItem[]>([])

  useEffect(() => {
    const load = () => {
      try {
        const stored = localStorage.getItem('cart')
        if (stored) setCart(JSON.parse(stored))
        const storedSaved = localStorage.getItem('saved')
        if (storedSaved) setSaved(JSON.parse(storedSaved))
      } catch {}
    }
    load()
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === 'cart' || e.key === 'saved') load()
    }
    const onCustom = () => load()
    window.addEventListener('storage', onStorage)
    window.addEventListener('cart-changed', onCustom as any)
    window.addEventListener('saved-changed', onCustom as any)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('cart-changed', onCustom as any)
      window.removeEventListener('saved-changed', onCustom as any)
    }
  }, [])

  const saveCart = (updated: BurgerItem[]) => {
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    try { window.dispatchEvent(new Event('cart-changed')) } catch {}
  }
  const saveSaved = (updated: BurgerItem[]) => {
    setSaved(updated)
    localStorage.setItem('saved', JSON.stringify(updated))
    try { window.dispatchEvent(new Event('saved-changed')) } catch {}
  }

  const addItem = (item: BurgerItem) => saveCart([...cart, item])
  const removeItem = (id: string) => saveCart(cart.filter(i => i.id !== id))
  const updateItem = (id: string, patch: Partial<BurgerItem>) => {
    const next = cart.map(i => i.id === id ? { ...i, ...patch } : i)
    saveCart(next)
  }
  const setItemQuantity = (id: string, qty: number) => {
    const clamped = Math.max(1, Math.floor(qty || 1))
    updateItem(id, { quantity: clamped })
  }
  const clearCart = () => saveCart([])
  const saveForLater = (id: string) => {
    const item = cart.find(i => i.id === id)
    if (!item) return
    saveCart(cart.filter(i => i.id !== id))
    saveSaved([item, ...saved])
  }
  const moveToCart = (id: string) => {
    const item = saved.find(i => i.id === id)
    if (!item) return
    saveSaved(saved.filter(i => i.id !== id))
    saveCart([item, ...cart])
  }
  const removeSaved = (id: string) => saveSaved(saved.filter(i => i.id !== id))
  const clearSaved = () => saveSaved([])
  const moveAllSavedToCart = () => {
    if (!saved.length) return
    saveCart([...saved, ...cart])
    saveSaved([])
  }

  return { cart, saved, addItem, removeItem, updateItem, setItemQuantity, saveForLater, moveToCart, removeSaved, clearSaved, moveAllSavedToCart, clearCart }
}
