import React, {useContext} from 'react'
import { CartContext } from "./cartContext";

export default function CartCards(props) {
  const [cart, setCart] = useContext(CartContext)
  
const addOne = (productId) => {
  const updatedCart = [...cart]; // crea una copia del carrito
  const index = updatedCart.findIndex((item) => item.id === productId); // encuentra el índice del objeto correspondiente
  updatedCart[index].quantity += 1; // incrementa la propiedad quantity del objeto correspondiente
  setCart(updatedCart); // actualiza el estado del carrito
}
const removeOne = (productId) => {
  const newCart = cart.map((item) => {
    if (item.id === productId) {
      return {
        ...item,
        quantity: item.quantity - 1
      };
    } else {
      return item;
    }
  }).filter((item) => item.quantity > 0);

  setCart(newCart);
}
  
  return (
    <div className='cartCard'>

                <img id='img' src={props.img} alt="product-primary-img" />
                <h4  id='title2' key={props.id}> {props.name} </h4>
                <p>{props.color} {props.tamaño}</p>
                <h3>${props.price}</h3>
                        
                        
                        
                    <div className='product__details' >
                        <h4>{props.quantity}</h4>
                         <button className='btns' onClick={() => addOne(props.id)}>+</button>
                         <button className='btns'onClick={() => removeOne(props.id)}>-</button>
                        </div>
    </div>
  )
}
