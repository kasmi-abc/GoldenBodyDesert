"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/lib/data";

type CartItem = Product & { qty: number; selectedWeight: string; selectedFlavor?: string };
type CartContextType = {
  items: CartItem[];
  add: (p: Product, opts?: { weight?: string; flavor?: string }) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  count: number;
  subtotal: number;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const add = (p: Product, opts?: { weight?: string; flavor?: string }) => {
    setItems(prev => {
      const key = p.id + (opts?.weight || p.weights[0]);
      const existing = prev.find(i => i.id + i.selectedWeight === key);
      if (existing) return prev.map(i => i.id + i.selectedWeight === key ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1, selectedWeight: opts?.weight || p.weights[0], selectedFlavor: opts?.flavor || p.flavors?.[0] }];
    });
  };
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return remove(id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const clear = () => setItems([]);
  return <CartContext.Provider value={{ items, add, remove, updateQty, count, subtotal, clear }}>{children}</CartContext.Provider>;
}
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
