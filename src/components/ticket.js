import React, { useEffect } from 'react'
import './styles/ticket.css'
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
export default function Ticket(props) {
    const navigate = useNavigate()
    console.log("PROPSS",props)
    const state = useLocation()
    console.log("State", state.state)
    useEffect(()=>{
        window.print()
        navigate("/pedidos")
    })
  return (
    <main id='mainTicket'>
        <div id='ticket'>
            <h3>Ticket # {state.state.id}</h3>
            <h4>Usuario: {state.state.email}</h4>
        <p>Colonia: {state.state.direccion[0].nombre}</p>
        <p>Colonia: {state.state.direccion[0].colonia}</p>
        <p>Direccion: {state.state.direccion[0].direccion}</p>
        <p>Numero interior: {state.state.direccion[0].numeroint}</p>
        <p>Código postal: {state.state.direccion[0].postal}</p>
        <p>Estado:{state.state.direccion[0].estado}</p>
        <p>Telefono: {state.state.direccion[0].telefono}</p>

        <p></p>
        <br></br>
        <h4>Pedido:</h4>
        {JSON.parse(state.state.pedido).map((element,index) => 
                     <div>
                           <p> {index + 1}.-"{element.producto}, {element.cantidad}, {element.color}, {element.tamano}"</p>
                            
                     </div>
                     
                        )}
        <br></br>
        <p>Total de pedido: ${state.state.total}</p>
        <p>Fecha de pedido:{state.state.date}</p>
        <p></p>
        <br></br>
        </div>
    </main>
  )
}
