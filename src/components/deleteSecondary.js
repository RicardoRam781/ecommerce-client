import React, { useEffect, useState } from 'react'
import './styles/prueba.css'
import Cookies from "js-cookie";



export default function DeleteSecondaryProduct() {

    const isLoggedIn = Cookies.get("userData");
    const data = JSON.parse(isLoggedIn?.toString() || "{}");
    const [product, setProduct] = useState([]);
    const [totalProducts, setTotalProducts] = useState([])
    const [id,setId] = useState([])
    
    const [form, setForm] = useState({})
    useEffect(() => {
      const getProducts = async () => {
        const res = await fetch("https://novedades-rosy-api-production.up.railway.app/get/primary", {
          method: 'GET',
          
        });
        const data = await res.json();
        setProduct(data);
      };
      const getProductsSecondary = async () =>{
        console.log("ID", id)
        const res = await fetch(`https://novedades-rosy-api-production.up.railway.app/get/products/total/${id}`, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${data.token}`
                },
          });
          const data = await res.json();
          console.log("TOTAL DE PRODUCTOS RELACIONADOS",data)
          setTotalProducts(data)
      }
      getProductsSecondary()
      

      getProducts();
      
    }, [id]);
    const formData = new FormData();
    
    
    
    const handlesubmit = async (e) =>{
        e.preventDefault();
       console.log("ID EN HANDLESUBMIT",id)
        
      const res = await fetch(`https://novedades-rosy-api-production.up.railway.app/delete/secondary/${id}`,{
        method:"DELETE",
        headers:{
            'Authorization': `Bearer ${data.token}`
            },
      })
      const datas = await res.json()

        
    }
 


    const handleChange = (e) => {
        console.log(form)
        setForm({ ...form, [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value);
        const productString = e.target.value
        const productId = productString.split(" ")[0]
        console.log("IDDDD", productId)
        const getProductsSecondary = async () =>{
            console.log("ID", id)
            const res = await fetch(`https://novedades-rosy-api-production.up.railway.app/get/products/total/${productId}`, {
                method: 'GET',
                headers:{
                    'Authorization': `Bearer ${data.token}`
                    },
              });
              const datas = await res.json();
              console.log("TOTAL DE PRODUCTOS RELACIONADOS",datas)
              setTotalProducts(datas)
          }
          getProductsSecondary()
          
      }

      const productChange = (e) =>{
        const secondary = e.target.value
        const secondaryID = secondary.split(" ")[0]
        console.log("SECONDARY ID",secondaryID)
        setId(secondaryID)
      }

  return (
    <main id='formMain'>
        <div id='form'>
            <form  onSubmit={handlesubmit}>
               
               
                <label>Productos disponibles</label>
                <select className='inputs' onChange={handleChange} name='producto'>
                {
                    product.map((item) =>{
                     return <option key={item.id}>{item.id} {item.productname}</option>
                    })
                }
                </select>
                <select className='inputs' name='producto' onChange={productChange}>
                {
                    totalProducts.map((item) =>{
                     return <option key={item.id}>{item.id} {item.producto},{item.color},{item.tamano} ${item.precio}</option>
                    })
                }
                </select>
               
                
                <button id='del'>Eliminar</button>
            </form>
        </div>
    </main>
  )
}