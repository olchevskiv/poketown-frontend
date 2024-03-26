import { CartItem } from "@/types";
import React, { createContext, useState } from "react";

/* 
  CartItemsContext allows for access/modification of the cart items in local storage
  across all componenets so that the cart items are rendered in real time for all pages.

*/
interface CartItemsContextValue {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartItemsContext = createContext<CartItemsContextValue | undefined>(undefined);

type Props = {
    children: React.ReactNode;
}

const CartItemsProvider = ({ children }: Props) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    return (
      <CartItemsContext.Provider value={{cartItems, setCartItems}}>
        {children}
      </CartItemsContext.Provider>
    );
};

const useCartItemsContext = () => {
    const context = React.useContext(CartItemsContext);
    if (context === undefined) {
      throw new Error('useCartItemsContext must be inside a CartItemsProvider');
    }
    return context;
};

export { 
    CartItemsProvider, useCartItemsContext 
}
