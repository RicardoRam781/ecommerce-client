import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import RenderOrders from './renderOrders';
export default function MyOrders() {
    const isLoggedIn = Cookies.get("userData");
    const data = JSON.parse(isLoggedIn?.toString() || "{}");
    const id = data && data.body ? data.body._id : undefined;
    console.log("IDDD", id)
    const [order,setOrder] = useState([])
    useEffect(() =>{
        const getData = async () =>{
            const res = await fetch(`http://localhost:4000/myOrders/${id}`)
            const datas = await res.json()
            console.log(datas)
            setOrder(datas)
        }
        getData()
        // eslint-disable-next-line
    },[])
  return (
    <div>
        {
            order.map((ord) =>{
               return  <RenderOrders total = {ord.total} email = {ord.email} date = {ord.date} pedido = {ord.pedido} direccion = {ord.direccion} id ={ord.id} color= {ord.color} tamaño={ord.tamano}/>
               
            })
        }
        
    </div>
  )
}
