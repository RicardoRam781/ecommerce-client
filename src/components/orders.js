import { useCallback, useEffect, useState } from 'react'
import React from 'react'
import './styles/orders.css'
import Cookies from "js-cookie";
import RenderOrders from './renderOrders';
import sonido from '../assets/Sonido de notificación Xianomi Redmi.mp3'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Orders() {
  
    const isLoggedIn = Cookies.get("userData");
  const data = JSON.parse(isLoggedIn?.toString() || "{}");
  const socket = new WebSocket('ws://localhost:8080')
  //const role = data && data.body ? data.body.role : undefined;
  //const userId = data && data.body ? data.body._id : undefined;
  const [order, setOrder] = useState([])
  const [control, setControl] = useState(false)
  function notificacion() {
    const audio = new Audio(sonido)
    console.log("NOtificacion")
    audio.play();
  }

  function Mensaje (){
    setControl(true)
    notificacion()
    toast.info("📝 Hay un nuevo pedido, recarga para visualizarlo...")
    getOrders()
    
  }
  socket.onopen = () =>{
    console.log("Conexion websocket establecida")
    //socket.send("Hola servidor")
  }
  socket.onmessage = (event) => {
    if(!control) {
    console.log('Mensaje recibido:', event.data); 
   
      Mensaje()
    }
    
   
      
   
    
  };
  socket.onclose = () => {
    console.log('Conexión cerrada');
  };
  socket.onerror = (error) => {
    console.error('Error en la conexión:', error);
  };
    //http://localhost:4000
    //https://novedades-rosy-api-production.up.railway.app
  const getOrders = useCallback(async () => {
    
    
    const res = await fetch("http://localhost:4000/get/orders", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.token}`
      }
    });
    
    const orders = await res.json();
    // const orders = result.reverse()
    console.log("ACTUALIZANDO COMPONENTE")
    setOrder(orders.reverse());
   
  }, [data.token]);
    useEffect(() => {
        
      
      
        getOrders()
        
        
    }, [getOrders])

    
      console.log("ORDERS",order)
     
  return (
    <main id='mainOrder'>
     <div id='divOrder'>
      <label>¿Permitir reproduccion de sonido?</label>
      <input type='checkbox'></input>
     </div>

     
      <RenderOrders objeto ={order} ></RenderOrders> 
    {/* {order.map(ord => {
        
      return (
        <RenderOrders total = {ord.total} email = {ord.email} date = {ord.date} pedido = {ord.pedido} direccion = {ord.direccion}   />
        
        // <div id='renderOrder'>
        //   <p>{ord.total}</p>
        // </div>
      )
    })} */}
    
    <ToastContainer />

  </main>
  )
}
