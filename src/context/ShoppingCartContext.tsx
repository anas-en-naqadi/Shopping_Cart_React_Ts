import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { USeLocalStorage } from "../hooks/UseLocalStorage";

// Define cart item type
type CartItem = {
  id: number;
  quantity: number;
};

// Define context type for shopping cart
type ShoppingCartContextType = {
  openCart : () => void;
  closeCart : () => void;
  incremCart: (id: number) => void;
  decremCart: (id: number) => void;
  getQuantityItem: (id: number) => number;
  removeItem: (id: number) => void;
  cartItems: CartItem[];
  cartCount : number;
};

// Create context with default value
const ShoppingCartContext = createContext({} as ShoppingCartContextType);

// Custom hook to access shopping cart context
export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

// Define type for the provider's props
type ShoppingCartProviderProps = {
  children: ReactNode;
};

// Provider component to manage the shopping cart state
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = USeLocalStorage<CartItem[]>("shopping-cart",[]);
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cartItems.length;
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  // Get the quantity of a specific item by its id
  function getQuantityItem(id: number): number {
    return cartItems.find((c) => c.id === id)?.quantity || 0;
  }

  // Increment the quantity of a cart item by its id
  function incremCart(id: number) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === id);
      if (!existingItem) {
        return [...currentItems, { id: id, quantity: 1 }];
      } else {
        return currentItems.map((i) => {
          if (i.id === id) {
            return { ...i, quantity: i.quantity + 1 };  // Fixed increment
          } else {
            return i;
          }
        });
      }
    });
  }

  // Decrement the quantity of a cart item by its id
  function decremCart(id: number) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((i) => i.id === id);
      if (existingItem?.quantity === 1) {
        return currentItems.filter((i) => i.id !== id);
      } else {
        return currentItems.map((i) => {
          if (i.id === id) {
            return { ...i, quantity: i.quantity - 1 };  // Fixed decrement
          } else {
            return i;
          }
        });
      }
    });
  }

  // Remove an item from the cart by its id
  function removeItem(id: number) {
    setCartItems((currentItems) => currentItems.filter((i) => i.id !== id));
  }

  return (
    <ShoppingCartContext.Provider value={{ getQuantityItem, incremCart, decremCart, removeItem,cartItems,cartCount,openCart,closeCart }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
