import React, { useEffect, useState } from 'react'
import './styles/prueba.css'



export default function AddTotalProduct() {
    const [product, setProduct] = useState([]);
    const [color, setColor] = useState([])
    const [size, setSize] = useState([])
    const [form, setForm] = useState({})
    useEffect(() => {
      const getProducts = async () => {
        const res = await fetch("https://novedades-rosy-api-production.up.railway.app/get/primary", {
          method: 'GET'
        });
        const data = await res.json();
        setProduct(data);
      };

      const getColors = async () => {
        const res = await fetch("https://novedades-rosy-api-production.up.railway.app/get/colors", {
          method: 'GET'
        });
        const data = await res.json();
        console.log("colores",data)
        setColor(data);
      };

      const getSizes = async () => {
        const res = await fetch("https://novedades-rosy-api-production.up.railway.app/get/sizes", {
          method: 'GET'
        });
        const data = await res.json();
        console.log("colores",data)
        setSize(data);
      };

      getProducts();
      getColors();
      getSizes();
    }, []);
    const formData = new FormData();
    
    
    
    const handlesubmit = async (e) =>{
        e.preventDefault();
        const toSend = JSON.stringify(form)
        console.log("tosend",toSend)
        
        const res = await fetch(`https://novedades-rosy-api-production.up.railway.app/secondary/product`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
          })
          res.json().then(data =>{
            console.log(data)
            
          })

        console.log("HANDLESUBMIT")
    }
 


    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value);
    
      }
  return (
    <main id='formMain'>
        <div id='form'>
            <form onSubmit={handlesubmit}>
               
                <label>Cantidad</label>
                <input className='inputs' type='number' onChange={handleChange} name='cantidad'></input>
                <label>Precio</label>
                <input className='inputs' type='number' onChange={handleChange} name='precio'></input>
                <label>Productos disponibles</label>
                <select className='inputs' onChange={handleChange} name='producto'>
                {
                    product.map((item) =>{
                     return <option key={item.id}>{item.id} {item.productname}</option>
                    })
                }
                </select>
                
                <select className='inputs' onChange={handleChange} name='color'>
                {
                    color.map((item) =>{
                     return <option key={item.id}>{item.id} {item.nombre}</option>
                    })
                }
                </select>
               
                
                <select className='inputs' onChange={handleChange} name='tamano'>
                {
                    size.map((item) =>{
                     return <option key={item.id}>{item.id} {item.nombre}</option>
                    })
                }
                </select>
                <button className='btn'>Enviar</button>
            </form>
        </div>
    </main>
  )
}