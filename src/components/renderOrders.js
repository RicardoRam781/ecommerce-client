import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import './styles/orders.css'

import { useNavigate } from 'react-router-dom'

export default function RenderOrders(props) {
    const navigate = useNavigate();
    const isLoggedIn = Cookies.get('userData');
   
    const data = JSON.parse(isLoggedIn?.toString() || "{}")
    //const direc = props.direccion[0]
  console.log("PROPIEDDADES",props)
      const obj =  props.objeto
      console.log("OBJETOOO",obj)
    
   
    const [loading] = useState(false)
    useEffect(() =>{
    },[loading])
  const handleSubmit =  async (e, id) =>{
    e.preventDefault()
    const confirm = window.confirm("Marcar como enviado eliminara este pedido")

    
    if(confirm){
       
        console.log("confirmado",id )
        const result = await fetch(`https://novedades-rosy-api-production.up.railway.app/delete/order/${id}`,{
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

  function CalcularTiempo(fecha){
    const date = new Date (fecha)
    const now = new Date()
    const diferencia = now - date
    const minutosTranscurridos = Math.floor(diferencia / (1000 * 60));
    return minutosTranscurridos
  }
  function handlePrint(e,item){
    console.log("print", item)
    navigate("/ticket", {state:item, target:'_blank'})
  }
  
 
   return (
        <div id='mann'>
{
    obj.map((item,index)=>{
      
            return (
                <div id='renderOrder' style={{
                    border: `2px solid ${index === 0 ? 'green' : 'black'}`,
                    borderWidth: `${index === 0 ? '4px' : '1px'}`,
                  }} key={index} >
                <div id='userInfo'>
        
                
                       
                        <h4>  Información del usuario</h4>
                        <p>Numero de pedido:{item.id}</p>
                         <p>Usuario:<br/>{item.email}</p>
                         <p>Fecha de solicitud: <br/>{item.date}</p>
                         <p>Pedido hace {CalcularTiempo(item.date)} minutos </p>
                        {
                            console.log("TRANSCURRIDO",CalcularTiempo(item.date))
                        }
                 
                    
        
        
                </div>
                <div id='direc'>
        
                
                      
                        
                             <h4>  Información de destino</h4>
                             <p>Nombre:{item.direccion[0].nombre}</p>
                             <p>Direccion:{item.direccion[0].direccion}</p>
                             <p>Colonia:{item.direccion[0].colonia}</p>
                             <p>Estado:{item.direccion[0].estado}</p>
                             <p>Numero Interior:{item.direccion[0].numeroint}</p>
                             <p>Código postal:{item.direccion[0].postal}</p>
                             <p>telefono:{item.direccion[0].telefono}</p>
                        
                 
        
        
                </div>
                <div id='product'>
        
        
                <h4>Contenido del pedido</h4>
                    <p>Total de pedido: ${item.total}</p>
              
                    
    
            
                   
                     {JSON.parse(item.pedido).map((element,index) => 
                     <div>
                           <p> {index + 1}.-"{element.producto}, {element.cantidad}, {element.color}, {element.tamano}"</p>
                            
                     </div>
                     
                        )}
                    
                        
                     
             
                    
                </div>
        
        
                <form >
                  
                </form>
                <div>
                    <button onClick={(e) => handleSubmit(e,item.id)}> Enviado </button>
                    <link to='/ticket' target='_blank'></link>
                    <button onClick={(e) => handlePrint(e,item)}> Imprimir </button>
                
                </div>
               
                {/* item.id, item.pedido, item.email, item.date
                        item.direccion[0].nombre,
                        item.direccion[0].direccion,
                        item.direccion[0].colonia,
                        item.direccion[0].estado,
                        item.direccion[0].numeroint,
                        item.direccion[0].postal,
                        item.direccion[0].telefono */}
            </div>
            )
          
        //}
        
       
    }) 
   
}
        </div>

   )
    
    
}
