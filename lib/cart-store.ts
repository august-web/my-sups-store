import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
  variant?: string;
  quantity: number;
  isSubscription: boolean;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed-like helpers
  getSubtotal: () => number;
  getItemCount: () => number;
  getFreeShippingRemaining: () => number;
}

const FREE_SHIPPING_THRESHOLD = 50;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.id === item.id && i.variant === item.variant
          );

          if (existingIndex >= 0) {
            // Increase quantity of existing item
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + (item.quantity ?? 1),
            };
            return { items: updated, isOpen: true };
          }

          // Add new item
          return {
            items: [...state.items, { ...item, quantity: item.quantity ?? 1 }],
            isOpen: true,
          };
        });
      },

      removeItem: (id, variant) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.variant === variant)
          ),
        }));
      },

      updateQuantity: (id, quantity, variant) => {
        if (quantity <= 0) {
          get().removeItem(id, variant);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.variant === variant ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getFreeShippingRemaining: () => {
        const subtotal = get().getSubtotal();
        return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
      },
    }),
    {
      name: "mysups-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
