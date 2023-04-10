import React,{useContext} from 'react'
import './styles/shopCart.css'
import { CartContext } from './cartContext'
import CartCards from './shopcartCards'
import {useNavigate } from 'react-router-dom';

export default function ShopCart(user,props) {
    const navigate = useNavigate()
    console.log("USER EN SHOPCART", user)
    if(!user.user ){
        navigate('/')
        }
    const [cart] = useContext(CartContext)
    //const cart = JSON.parse(localStorage.getItem('cart'));
    
    console.log("cart",cart)
    
        
        let sum = 0
        cart.forEach(item => {
            for(let i = 0;i < item.quantity; i++){
                sum = sum + item.price
                
            }
       });
       console.log("suma total",sum)
            
    const handleClick  = () =>{
        navigate('/cart/payment')
    }
   
    
    
  return (
    <main className='cartMain'>
        <div className='divCart'>
            <div className='cartTitle'>
                <h1 className='pilin'>Bienvenido al carrito</h1>
               
            </div>
            <div className='productsInCart'>



                
                <div className='countCart'>
                    
                {cart.map((item) => (
                    cart.quantity !== 0 &&
                <CartCards id={item.id} name={item.name} price={item.price} quantity={item.quantity} img={item.img}
                
                />
                    ))}

                    
                </div>
                


               
                

                <div className='renderCart'>
                    
                    <div id='total'>
                        <h3>subtotal</h3>
                    </div>
                    <div id='count'>
                            <p className='totals'>Total de productos:${sum}</p>
                            <p className='totals'>Envio: $200</p>
                            <p className='totals'>Total:{sum + 200}</p>
                    </div>
                    <div id='btncard'>
                        <button id='btn' onClick={() => handleClick()} >Proceder con el pago</button>
                    </div>
                </div>
            </div>

            
        </div>
    </main>
  )
}
