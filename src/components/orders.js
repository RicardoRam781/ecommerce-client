import { useCallback, useEffect, useState } from 'react'
import React from 'react'
import './styles/orders.css'
import Cookies from "js-cookie";
import RenderOrders from './renderOrders';

export default function Orders() {
    const isLoggedIn = Cookies.get("userData");
  const data = JSON.parse(isLoggedIn?.toString() || "{}");
  //const role = data && data.body ? data.body.role : undefined;
  //const userId = data && data.body ? data.body._id : undefined;
    const [order, setOrder] = useState([])
    
    
  const getOrders = useCallback(async () => {
    const res = await fetch("https://novedades-rosy-api-production.up.railway.app/get/orders", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.token}`
      }
    });
    const orders = await res.json();
    setOrder(orders);
   
  }, [data.token]);
    useEffect(() => {
        
      
      getOrders()
        
        
    }, [getOrders])
  return (
    <main id='mainOrder'>
    {order.map(ord => {
        
      return (
        <RenderOrders total = {ord.total} email = {ord.email} date = {ord.date} pedido = {ord.pedido} direccion = {ord.direccion} id ={ord.id} color= {ord.color} tamaño={ord.tamano}/>
        
        // <div id='renderOrder'>
        //   <p>{ord.total}</p>
        // </div>
      )
    })}
  </main>
  )
}
