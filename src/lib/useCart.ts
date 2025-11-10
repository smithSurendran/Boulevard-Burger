'use client'
import { useCallback, useEffect, useState } from 'react'

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

const CART_KEY = 'cart'
const SAVED_KEY = 'saved'
const CART_EVENT = 'cart-changed'
const SAVED_EVENT = 'saved-changed'

const readItems = (key: string): BurgerItem[] => {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(key)
  return raw ? (JSON.parse(raw) as BurgerItem[]) : []
}

const writeItems = (key: string, value: BurgerItem[]) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

const dispatchSyncEvent = (name: string) => {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(name))
}

export const useCart = () => {
  const [cart, setCart] = useState<BurgerItem[]>([])
  const [saved, setSaved] = useState<BurgerItem[]>([])

  const loadFromStorage = useCallback(() => {
    setCart(readItems(CART_KEY))
    setSaved(readItems(SAVED_KEY))
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    loadFromStorage()

    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === CART_KEY || event.key === SAVED_KEY) {
        loadFromStorage()
      }
    }

    const handleCartChanged: EventListener = () => loadFromStorage()
    const handleSavedChanged: EventListener = () => loadFromStorage()

    window.addEventListener('storage', handleStorage)
    window.addEventListener(CART_EVENT, handleCartChanged)
    window.addEventListener(SAVED_EVENT, handleSavedChanged)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(CART_EVENT, handleCartChanged)
      window.removeEventListener(SAVED_EVENT, handleSavedChanged)
    }
  }, [loadFromStorage])

  const persistCart = (next: BurgerItem[]) => {
    setCart(next)
    writeItems(CART_KEY, next)
    dispatchSyncEvent(CART_EVENT)
  }

  const persistSaved = (next: BurgerItem[]) => {
    setSaved(next)
    writeItems(SAVED_KEY, next)
    dispatchSyncEvent(SAVED_EVENT)
  }

  const addItem = (item: BurgerItem) => persistCart([...cart, item])
  const removeItem = (id: string) => persistCart(cart.filter(i => i.id !== id))
  const updateItem = (id: string, patch: Partial<BurgerItem>) =>
    persistCart(cart.map(i => (i.id === id ? { ...i, ...patch } : i)))

  const setItemQuantity = (id: string, qty: number) => {
    const clamped = Math.max(1, Math.floor(qty || 1))
    updateItem(id, { quantity: clamped })
  }

  const clearCart = () => persistCart([])

  const saveForLater = (id: string) => {
    const item = cart.find(i => i.id === id)
    if (!item) return
    persistCart(cart.filter(i => i.id !== id))
    persistSaved([item, ...saved])
  }

  const moveToCart = (id: string) => {
    const item = saved.find(i => i.id === id)
    if (!item) return
    persistSaved(saved.filter(i => i.id !== id))
    persistCart([item, ...cart])
  }

  const removeSaved = (id: string) => persistSaved(saved.filter(i => i.id !== id))
  const clearSaved = () => persistSaved([])
  const moveAllSavedToCart = () => {
    if (!saved.length) return
    persistCart([...saved, ...cart])
    persistSaved([])
  }

  return {
    cart,
    saved,
    addItem,
    removeItem,
    updateItem,
    setItemQuantity,
    saveForLater,
    moveToCart,
    removeSaved,
    clearSaved,
    moveAllSavedToCart,
    clearCart,
  }
}