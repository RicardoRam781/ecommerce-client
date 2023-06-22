import React, { useContext, useEffect, useState } from "react"

import './styles/productDetails.css'

import EditForm from "./editForm";
import Cookies from 'js-cookie';
import { CartContext } from "./cartContext";

import {useNavigate } from 'react-router-dom';


export default function ProductDetails(props) {
  const objetoGuardado = JSON.parse(localStorage.getItem('producto'));
  //console.log(objetoGuardado);
  const product = objetoGuardado.product
  //console.log("producto en local storage",product)
  //console.log(Cookies)
  const isLoggedIn = Cookies.get('userData');
  //console.log(isLoggedIn)
  const data = JSON.parse(isLoggedIn?.toString() || "{}")
  //console.log("body",data)
  const role = data && data.body ? data.body.role : undefined;
  //console.log(role)
  //const userId = data && data.body ? data.body._id : undefined;
  //console.log("U S E R   I D  ",userId)
  // const [cart, setCart] = useState(() => {
  //   const storedCart = JSON.parse(localStorage.getItem('cart'));
  //   return storedCart ? storedCart : [];
  // });
  
 

 

  const [cart, setCart] = useContext(CartContext)
  const [totalProducts,  setTotalProducts] = useState([])
  
  // useEffect(() => {
  //   localStorage.setItem(`cart ${userId}`, JSON.stringify(cart));
  // }, [cart]);
  useEffect(() =>{
    const getProducts = async () =>{
      const res = await fetch(`http://localhost:4000/get/products/total/${product.id}`, {
          method: 'GET'
        });
        const data = await res.json();
        console.log("TOTAL DE PRODUCTOS RELACIONADOS",data)
        setTotalProducts(data)
    }
    getProducts()
  },[product.id])

//   const quanty = cart.reduce((acc,curr) =>{
//     return acc + curr.quantity
// },0);



const navigate = useNavigate()


  const addToCart = (producto) =>{
    console.log("producto", producto)
    console.log("cart", cart)
    if(producto.cantidad === 0){
      alert("Lo sentimos, este producto esta agotado")
      return
    }
    if(!role){
      
      alert("Debes iniciar sesion para agregar un producto")
      navigate("/user/forms")
      return
     } 
     const findCart = cart.find((item) => item.id === producto.id)
     console.log("FINDCART", findCart)
     if(findCart?.quantity === selectedProduct.cantidad){
      
      alert("No puedes agregar mas, este producto esta agotado")
      return  
     }
     
     else {
      
     
    setCart((currItem)=>{
      const  isItemFound = currItem.find((item) => item.id === producto.id )

      
      if(isItemFound){
        console.log("ISITEMFOUND",isItemFound)
        console.log("SELECTED PRODUCT", selectedProduct)
        
        return currItem.map((item) =>{
          if(item.id === producto.id ){
            
            return {...item, quantity: item.quantity + 1}
          }else {
            return item
          }
        });
      } else {
        
        return [...currItem,{id:producto.id, quantity:1,price:producto.precio,name:producto.producto,img:product.img, color:producto.color, tamano:producto.tamano}]
      }
    })
  }  }





  
const removeItem = (producto) =>{
  setCart((currItem) =>{
    if(currItem.find((item) => item.id === producto.id)?.quantity === 1) {
      return currItem.filter((item) => item.id !== producto.id);

    }else {
      return currItem.map((item) =>{
        if(item.id === producto.id){
          return {...item,quantity:item.quantity -1}
        } else {
          return item 
        }
      })
    }
  })
}
const getQuantityByid = (producto) =>{
  return cart.find((item) => item.id === producto.id)?.quantity || 0
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
   //console.log("CAANTIDADD POR ITEM",product.inventario)

   

   const uniqueColors = totalProducts.filter((item, index, self) => {
    return index === self.findIndex((t) => (
      t.color === item.color && t.cantidad > 0
    ));
  });
   
  const [size , setSize] = useState("")
  const [color, setColor] = useState("")
  const [sizeOption, setSizeOption] = useState([])

  const handleColorChange = (e) =>{
    const selecColor = e.target.value
    console.log("selectedcolor-",selecColor)
    setColor(selecColor)
    const filteredSizes = totalProducts.filter((option) => {
      // Filtrar las opciones de tamaño que coincidan con el color seleccionado
      return option.color === selecColor;
    });
    console.log("filtrado 1",filteredSizes)
    setSizeOption(filteredSizes)
    console.log("sise", sizeOption)
  }
  
  const [price,setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const handleTamañoChange = (e) =>{
    
    // const filteredColors = totalProducts.filter((option) => {
    //   // Filtrar las opciones de color que coincidan con el tamaño seleccionado
    //   return option.tamano === size;
    // });
    
    setSize(e.target.value)
    

  }
  useEffect(() => {
    const result = totalProducts.find(item => item.color === color && item.tamano === size);
    if (result) {
      console.log("DEGUB RESULT",result)
      setPrice(result.precio);
      setDiscount(result.precio_descuento)
      setSelectedProduct(result)
    }
  }, [color, size,totalProducts]);
 
  const handleBlur =(e) =>{
    const result = totalProducts.find(item => item.color === color && item.tamano === size)
    console.log("result handle tamaño")
    setPrice(result.precio)
    console.log("DEscuento", result.precio_descuento)
    setDiscount(result.precio_descuento)
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!color){
      alert("Escoge un color")
      return
    } 
    else if(!size){
      alert("Escoge un tamaño")
      return
    } else{
      
   const result = totalProducts.find(item => item.color === color && item.tamano === size)
   console.log("Objeto encontrado",result)
   // eslint-disable-next-line
    if(result.precio_descuento != 0.00){
      console.log("dentro de ifffff")
      result.precio = result.precio_descuento
      addToCart(result)
      return
    }
    addToCart(result)
    console.log("Preciooooooooooooooo",product.price)
  }}

  return (

    <main className="main">
      <div className="showdetails">
        <div className="showimgs">

          <div className='pimg'>
            <img id="mainImg" src={img} alt="MAIN IMG"></img>
          </div>
          <div className="simg">    
            <img className="secondIMG" onClick={imgHandleClick} src={product.img} alt="img"></img>
            <img className="secondIMG" onClick={imgHandleClick} src={product.fimg} alt="firstImg"></img>
            <img className="secondIMG" onClick={imgHandleClick} src={product.simg} alt="secondImg"></img>
            <img className="secondIMG" onClick={imgHandleClick} src={product.timg} alt="thirdIMG"></img> 
              

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

            { 
            // eslint-disable-next-line
            discount  == 0 &&
              <h3>${price} MXN</h3>
            }
            { discount > 0 &&
            <div>
              <h3 style={{ textDecoration: 'line-through' ,color:'red' }}>${price} MXN</h3>
              <h2 > {discount} MXN</h2>
            </div>
            }
            
          </div>
          <form onSubmit={handleSubmit}>  
          <div className="buttons">

            <select onChange={handleColorChange}>
            <option value="" selected>Color</option>
              {
                uniqueColors.map((item) =>{
                  return <option>{item.color}</option>
                })
              }
              
            </select>
            <select onChange={handleTamañoChange} onBlur={handleBlur}>
            <option value="" selected>Tamaño</option>
              {/* { 
                
                uniqueTamaños.map((item) =>{
                  if(item.cantidad !==0 ){ 
                  return <option key={item.id}>{item.tamano}</option>
                  }
                })
              } */}
              {sizeOption.map((option) => (
            <option key={option.id} value={option.tamano}>
             {option.tamano}
              </option>
              ))}
            </select>
            {/* <button id="addToCart" onClick={() => addToCart()}><span id="spann">Agregar al carrito</span> */}
            <button id="addToCart" ><span id="spann">Agregar al carrito</span>
            </button>
            {  quantityPerItem > 0 &&
              <button  id='removeToCart' onClick={() => removeItem(product.id)}>Quitar</button>
            }
          
          
          </div>
          </form>
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