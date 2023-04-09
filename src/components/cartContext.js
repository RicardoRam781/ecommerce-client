import React, { createContext, useContext, useState,useEffect } from 'react'
import Cookies from 'js-cookie';
export const CartContext = createContext(null)

export default function ShoppingCartProvider({children}) {


  const isLoggedIn = Cookies.get('userData');
  const data = JSON.parse(isLoggedIn?.toString() || "{}")
  const userId = data && data.body ? data.body._id : undefined;
  const [cart, setCart] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`));
    
    return storedCart ? storedCart : [];
    
  });
  useEffect(() => {
    
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }, [cart, userId]);


  return (
    <CartContext.Provider value={[cart,setCart]}>
        {children}
    </CartContext.Provider>
  )
}
