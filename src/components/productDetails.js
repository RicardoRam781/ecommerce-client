import React, { useContext, useState, useEffect } from "react"
import { json, useParams } from "react-router-dom"
import './styles/productDetails.css'
import imagen from "./sources/maceta.png"
import EditForm from "./editForm";
import Cookies from 'js-cookie';
import { CartContext } from "./cartContext";

import {useNavigate } from 'react-router-dom';

export default function ProductDetails(props) {
  const objetoGuardado = JSON.parse(localStorage.getItem('producto'));
  //console.log(objetoGuardado);
  const product = objetoGuardado.product
  console.log("producto en local storage",product)
  //console.log(Cookies)
  const isLoggedIn = Cookies.get('userData');
  console.log(isLoggedIn)
  const data = JSON.parse(isLoggedIn?.toString() || "{}")
  console.log("body",data)
  const role = data && data.body ? data.body.role : undefined;
  console.log(role)
  const userId = data && data.body ? data.body._id : undefined;
  console.log("U S E R   I D  ",userId)
  // const [cart, setCart] = useState(() => {
  //   const storedCart = JSON.parse(localStorage.getItem('cart'));
  //   return storedCart ? storedCart : [];
  // });
  
 

 

  const [cart, setCart] = useContext(CartContext)
  // useEffect(() => {
  //   localStorage.setItem(`cart ${userId}`, JSON.stringify(cart));
  // }, [cart]);
  

  const quanty = cart.reduce((acc,curr) =>{
    return acc + curr.quantity
},0);
console.log("cantidad perrona",quanty)



const navigate = useNavigate()

  const addToCart = () =>{

    if(product.inventario == 0){
      alert("Lo sentimos, este producto esta agotado")
    }
    if(!role){
      console.log("no hay rol")
      alert("Debes iniciar sesion para agregar un producto")
      navigate("/user/forms")
    } else {
    setCart((currItem)=>{
      const isItemFound = currItem.find((item) => item.id == product.id)
      if(isItemFound){
        return currItem.map((item) =>{
          if(item.id == product.id){
            return {...item, quantity: item.quantity + 1}
          }else {
            return item
          }
        });
      } else {
        return [...currItem,{id:product.id, quantity:1,price:product.price,name:product.name,img:product.img}]
      }
    })
  }  }

  
const removeItem = (id) =>{
  setCart((currItem) =>{
    if(currItem.find((item) => item.id == product.id)?.quantity === 1) {
      return currItem.filter((item) => item.id !== product.id);

    }else {
      return currItem.map((item) =>{
        if(item.id == id){
          return {...item,quantity:item.quantity -1}
        } else {
          return item 
        }
      })
    }
  })
}
const getQuantityByid = (id) =>{
  return cart.find((item) => item.id == id)?.quantity || 0
}
const quantityPerItem = getQuantityByid(product.id);
  
  

const handleClick = async (e) => {

  
  
   const id = product.id
   console.log('click',id)
  const res = await fetch(`http://localhost:4000/delete/product/${id}`, {
    headers:{
      'Authorization': `Bearer ${data.token}`
      },
    method: 'DELETE',
  })
  res.json().then(data => {
    alert(data);
    window.location.href = '/'
    })
  }
   const [img, setImg] = useState(product.img)
   const imgHandleClick =(e) =>{
    setImg(e.target.src)
    
   }
   console.log("CAANTIDADD POR ITEM",product.inventario)
  return (

    <main className="main">
      <div className="showdetails">
        <div className="showimgs">

          <div className='pimg'>
            <img id="mainImg" src={img}></img>
          </div>
          <div className="simg">    
            <img className="secondIMG" onClick={imgHandleClick} src={product.img}></img>
            <img className="secondIMG" onClick={imgHandleClick} src={product.fimg}></img>
            <img className="secondIMG" onClick={imgHandleClick} src={product.simg}></img>
            <img className="secondIMG" onClick={imgHandleClick} src={product.timg}></img> 
              

          </div>
        </div>
        <div className="description">
          <div className="title">
            
            <h4> {product.name} </h4>
            
          </div>
          <div className="desc">
            <p id="text"> {product.description} </p>
          </div>
          <div className="price">
            <h3>${product.price} MXN</h3>
          </div>
          <div className="buttons">
            <button id="addToCart" onClick={() => addToCart()}><span id="spann">Agregar al carrito</span>
            
            </button>
            {  quantityPerItem > 0 &&
              <button  id='removeToCart' onClick={() => removeItem(product.id)}>Quitar</button>
            }
            
            
          </div>
        </div>
      </div >
     
    { role === "tr" &&
      <div id="manager">
      <React.Fragment>
        <button onClick={handleClick} id="del" >Eliminar producto</button>
      <EditForm productId={product.id} data={data}></EditForm> 
      </React.Fragment>
      <span>Disponibles en inventario:{product.inventario}</span>
      </div>
    }
    
    
    </main >  
  )

}