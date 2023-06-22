import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import "./styles/color.css"
export default function AddColor() {

    const isLoggedIn = Cookies.get("userData");
    const data = JSON.parse(isLoggedIn?.toString() || "{}");

    console.log("USUARIO EN COLOR",)
    const [color,setColor] = useState([])
    const [form] = useState({})
    const [name,setName] = useState({})
    useEffect(() =>{
        const getColors = async () => {
            const res = await fetch("http://localhost:4000/get/colors", {
              method: 'GET'
            });
            const data = await res.json();
            console.log("colores",data)
            setColor(data);
          };
          getColors()
    },[])
    
    const handleSubmit = async (e) =>{
        
        e.preventDefault()
        console.log("nombre",form)
        const formData = new FormData()
        formData.append("Nombre", name)
        
        
        const res = await fetch(`http://localhost:4000/new/colores`,{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${data.token}`
            },
            body: formData
            
           
            
        })
        const dataa = await res.json()
        alert(dataa)
    }
    const handleChange = (e) =>{
        setName(e.target.value )
        console.log(e.target.value)
    }
  return (
    <main id='mainColor'>
        <div id='divForm'>
            <form id='colorform' onSubmit={handleSubmit}>
            <label>Nombre del color</label>
            <input type='text' className='inputs' onChange={handleChange}  name='nombreColor'></input>
            <label>Disponibles</label>
            <select>
                {
                    color.map((item) =>{
                        return <option>{item.nombre}</option>
                    })
                }
            </select>
            <button className='btn'>Guardar</button>
            </form>
        </div>
    </main>
  )
}
