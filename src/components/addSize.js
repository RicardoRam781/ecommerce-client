import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import "./styles/color.css"
export default function AddSize() {
    const isLoggedIn = Cookies.get("userData");
    const data = JSON.parse(isLoggedIn?.toString() || "{}");
    const [size,setSize] = useState([])
    useEffect(() =>{
        const getSizes = async () => {
            const res = await fetch("http://localhost:4000/get/sizes", {
              method: 'GET'
            });
            const data = await res.json();
            console.log("tamaños",data)
            setSize(data);
          };
          getSizes()
    },[])
    
    
    const [name,setName] = useState({})
    const handleSubmit = async (e) =>{
        
        e.preventDefault()
        
        const formData = new FormData()
        formData.append("Nombre", name)
        
        
        const res = await fetch(`http://localhost:4000/new/tamanos`,{
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
            <label>Nombre del tamaño</label>
            <input type='text' className='inputs' onChange={handleChange} name='nombreTamaño'></input>
            <label>Disponibles</label>
            <select>
                {
                    size.map((item) =>{
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