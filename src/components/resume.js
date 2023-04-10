import React from 'react'
import { useLocation } from 'react-router-dom'
import './styles/resume.css'
//import Cookies from "js-cookie";
import { Alert } from '@mui/material';
export default function Resume(props) {

   // const isLoggedIn = Cookies.get("userData");
 // const data = JSON.parse(isLoggedIn?.toString() || "{}");
    const location = useLocation()
    const ticket = location.state?.ticket
    console.log("EL TICKET ES",ticket)
    const products = ticket.products
    const direction = ticket.direction
    
    
  return (
    <main id='mainResume'>
        <div id='divResume'>
            <div id='titles'>
              <Alert id='alert' >Pedido exitoso!</Alert>
            </div>
            <div id='resum'>
                <h4>Resumen de pedido</h4>
            {products.map((item) => (
                <div id="item">
                  {item.name} {item.quantity} 
                </div>
              ))}
              <h4>Enviado a:</h4>
              <h5>{direction.nombre}</h5>
              <h5>{direction.direccion} {direction.colonia}</h5>
              <h5>{direction.postal} Interior:{direction.numeroint}</h5>
              <h5>{direction.estado}</h5>
            </div>
            
        </div>
    </main>
  )
}
