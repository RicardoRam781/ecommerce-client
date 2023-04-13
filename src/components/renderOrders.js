import React from 'react'
import './styles/orders.css'
export default function RenderOrders(props) {
   const direc = props.direccion[0]
   console.log("props",props)
  return (
    <div id='renderOrder'>
        <div id='userInfo'>
            <p>Numero de pedido:{props.id}</p>
            <p>Usuario:<br/>{props.email}</p>
            <p>Fecha de solicitud: <br/>{props.date}</p>
        </div>
        <div id='direc'>
            <p>Nombre:{direc.nombre}</p>
            <p>Direccion:{direc.direccion}</p>
            <p>Colonia:{direc.colonia}</p>
            <p>Estado:{direc.estado}</p>
            <p>Numero Interior:{direc.numeroint}</p>
            <p>Código postal:{direc.postal}</p>
            <p>telefono:{direc.telefono}</p>
        </div>
        <div id='product'>
            <p>Total de pedido:{props.total}</p>
            <p>Contenido del pedido:{props.pedido}</p>
        </div>
        <form>
            Enviado
            <input type='checkbox'></input>
        </form>
        
        
        
    </div>
  )
}
