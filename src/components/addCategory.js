import React, { useEffect, useState } from 'react'
import "./styles/color.css"
import Cookies from "js-cookie";
export default function AddCategory() {
    const isLoggedIn = Cookies.get("userData");
    const data = JSON.parse(isLoggedIn?.toString() || "{}");
//prueba de commit
    const [category,setCategory] = useState([])
    useEffect(() =>{
        const getSizes = async () => {
            const res = await fetch("https://novedades-rosy-api-production.up.railway.app/get/categorys", {
              method: 'GET'
            });
            const data = await res.json();
            console.log("tamaños",data)
            setCategory(data);
          };
          getSizes()
    },[])

    
    const [name,setName] = useState({})
    const handleSubmit = async (e) =>{
        
        e.preventDefault()
        
        const formData = new FormData()
        formData.append("Nombre", name)
        
        
        const res = await fetch(`https://novedades-rosy-api-production.up.railway.app/new/categorys`,{
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
            <label>Nombre de la Categoria</label>
            <input type='text' className='inputs' name='nombreCategoria' onChange={handleChange}></input>
            <label>Disponibles</label>
            <select>
                {
                    category.map((item) =>{
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