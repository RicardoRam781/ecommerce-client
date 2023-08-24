import React, { useEffect, useState } from 'react'
import "./styles/informes.css"
import Cookies from "js-cookie";
export default function Informes() {
    const isLoggedIn = Cookies.get("userData");
     const data = JSON.parse(isLoggedIn?.toString() || "{}");
    const [total, setTotal] = useState()
    const [filterResult, setFilterResult] = useState()
   const getInfo = async () => {

    
    const res = await fetch("https://novedades-rosy-api-production.up.railway.app/get/orders", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.token}`
      }
    });
    const datas = await res.json()
    setTotal(datas)
    console.log(datas)
   }
   
    useEffect(()=>{


        
    })
    const handleFilter = async (e) =>{
        console.log(e.target.value)
        
        const res = await fetch(`http://localhost:4000/informe/filtro/${e.target.value}`, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${data.token}`
                },
          });
          const datas = await res.json()
          console.log("TIPO DE FILTRO",datas)

          const grupos = datas.reduce((resultado, objeto) => {
            const { producto, cantidad ,tamano, color,precio ,precio_descuento} = objeto;
            
            if (!resultado[producto]) {
              resultado[producto] = [];
            }
            
            resultado[producto].push({ cantidad, tamano, color, precio , precio_descuento,});
            
            return resultado;
            
          }, {});
          console.log("GRUPOS",grupos)
          const array = []
          const claves = Object.keys(grupos);
          setFilterResult([claves, grupos])
          console.log("array",array)
          
          console.log("claves", claves)

        claves.forEach((clave,index) => {
         const elementos = grupos[clave];
         console.log(index,clave)
         elementos.map((item)=>(
            console.log("ITEMSS", index,item)
         ));
            });
    }
  return (
    <main id='informeMain'>
        <div>
            <label>Filtrar por...</label>
        <select className='inputs' onChange={handleFilter} name='filter'>
            <option>Selecciona...</option>
            <option>Fecha</option>
            <option>Producto</option>
        
           
        </select>
        <selec>
            {
                filterResult && 
                console.log("filterresult", filterResult)
            }
        </selec>
        </div>
       
        <div id='reporte'>
            <div class='info'>
                
            </div>
            <div class='info'>
            { 
              
            }
            </div>
            <div class='info'></div>
        </div>
    </main>
  )
}
