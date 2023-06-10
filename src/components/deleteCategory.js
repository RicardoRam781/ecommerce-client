import React, { useEffect, useState } from 'react'
import './styles/prueba.css'
import Cookies from "js-cookie";



export default function DeleteCategory() {

    const isLoggedIn = Cookies.get("userData");
    const data = JSON.parse(isLoggedIn?.toString() || "{}");
    const [category, setCategory] = useState([]);
   
    const [id,setId] = useState([])
    
    const [form, setForm] = useState({})
    useEffect(() => {
      const getCategorys = async () => {
        const res = await fetch("https://novedades-rosy-api-production.up.railway.app/get/categorys", {
          method: 'GET',
          
        });
        const data = await res.json();
        setCategory(data);
      };
     getCategorys()
      

      
      
    }, [id]);
    //const formData = new FormData();
    
    
    
    const handlesubmit = async (e) =>{
        e.preventDefault();
       console.log("ID EN HANDLESUBMIT",id)
        
      const res = await fetch(`https://novedades-rosy-api-production.up.railway.app/delete/categorys/${id}`,{
        method:"DELETE",
        headers:{
            'Authorization': `Bearer ${data.token}`
            },
      })
      const datas = await res.json()
      alert(datas)
        
    }
 


    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value);
        setId(e.target.value)
        const productString = e.target.value
        const colorId = productString.split(" ")[0]
        console.log("IDDDD", colorId)
        
          
      }

      // const productChange = (e) =>{
      //   const secondary = e.target.value
      //   const secondaryID = secondary.split(" ")[0]
      //   console.log("SECONDARY ID",secondaryID)
      //   setId(secondaryID)
      // }

  return (
    <main id='formMain'>
        <div id='form'>
            <form  onSubmit={handlesubmit}>
               
               
                <label>Categorias disponibles</label>
                <select className='inputs' onChange={handleChange} name='producto'>
                {
                    category.map((item) =>{
                     return <option key={item.id}>{item.id} {item.nombre}</option>
                    })
                }
                </select>
                
               
                
                <button id='del'>Eliminar</button>
            </form>
        </div>
    </main>
  )
}