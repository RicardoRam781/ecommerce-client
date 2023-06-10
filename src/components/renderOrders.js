import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import './styles/orders.css'
export default function RenderOrders(props) {

    const isLoggedIn = Cookies.get('userData');
  
    const data = JSON.parse(isLoggedIn?.toString() || "{}")
   const direc = props.direccion[0]
  
 const obj =  JSON.parse(props.pedido)
  console.log(obj)
  const [loading] = useState(false)
  useEffect(() =>{

  },[loading])
  const handleSubmit =  async (e) =>{
    e.preventDefault()
    const confirm = window.confirm("Marcar como enviado eliminara este pedido")

    
    if(confirm){
        console.log("confirmado")
        const result = await fetch(`https://novedades-rosy-api-production.up.railway.app/delete/order/${props.id}`,{
            method:"DELETE",
            headers:{
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            }
        })
        const response = await result.json()
        if(response.message){
            alert(response.message)
            window.location.reload()
        }
        console.log(response)
    } else{
        console.log("no confirmao")
    }
  }
  return (
    <div id='renderOrder'>
        <div id='userInfo'>
            <h4>  Información del usuario</h4>
            <p>Numero de pedido:{props.id}</p>
            <p>Usuario:<br/>{props.email}</p>
            <p>Fecha de solicitud: <br/>{props.date}</p>
        </div>
        <div id='direc'>
        <h4>  Información de destino</h4>
            <p>Nombre:{direc.nombre}</p>
            <p>Direccion:{direc.direccion}</p>
            <p>Colonia:{direc.colonia}</p>
            <p>Estado:{direc.estado}</p>
            <p>Numero Interior:{direc.numeroint}</p>
            <p>Código postal:{direc.postal}</p>
            <p>telefono:{direc.telefono}</p>
        </div>
        <div id='product'>
        <h4>Contenido del pedido</h4>
            <p>Total de pedido:{props.total}</p>
            {/* <p>Contenido del pedido:{props.pedido}</p> */}
            {
                obj.map((item) =>{
                    return  (<p> "{item.producto} {item.color} {item.tamano} {item.cantidad}"</p> 
                    )
                })
            }
            
        </div>
        <form onSubmit={handleSubmit}>
            <button> Enviado </button>
            
        </form>
        
        
        
    </div>
  )
}
