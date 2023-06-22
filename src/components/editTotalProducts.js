import React, { useEffect, useState } from 'react'
import './styles/prueba.css'
import Cookies from "js-cookie";



export default function UpdateTotalProduct() {

    const isLoggedIn = Cookies.get("userData");
    const data = JSON.parse(isLoggedIn?.toString() || "{}");
    const [product, setProduct] = useState([]);
    const [totalProducts, setTotalProducts] = useState([])
    const [id,setId] = useState([])
    
    const [form, setForm] = useState({})
    useEffect(() => {
      const getProducts = async () => {
        const res = await fetch("http://localhost:4000/get/primary", {
          method: 'GET',
          
        });
        const data = await res.json();
        setProduct(data);
      };
      const getProductsSecondary = async () =>{
        console.log("ID", id)
        const res = await fetch(`http://localhost:4000/get/products/total/${id}`, {
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
      

      getProducts();
      // eslint-disable-next-line
    }, [id]);
    const formData = new FormData();
    
    
    
    const handlesubmit = async (e) =>{
        e.preventDefault();
       console.log("ID EN HANDLESUBMIT",id)
        console.log("FORMDATA",form)
        formData.append("info", JSON.stringify(form))
      const res = await fetch(`http://localhost:4000/update/total/product/${id}`,{
        method:"PUT",
        headers:{
            'Authorization': `Bearer ${data.token}`
            },
        body:formData
      })
      const datas = await res.json()
      console.log("RESPONSE",datas)
      alert(datas)
        
    }
 
    const typeChange = (e) =>{
      console.log(form)
      setForm({...form,[e.target.name]: e.target.value})
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
            const res = await fetch(`http://localhost:4000/get/products/total/${productId}`, {
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
               
               
                <label>Productos disponibles para editar</label>
                <select className='inputs' onChange={handleChange} name='producto'>
                  <option>Selecciona...</option>
                {
                    product.map((item) =>{
                     return <option key={item.id}>{item.id} {item.productname}</option>
                    })
                }
                </select>
                <select className='inputs' name='producto' onChange={productChange}>
                <option>Selecciona...</option>
                {
                    totalProducts.map((item) =>{
                     return <option key={item.id}>{item.id} {item.producto},{item.color},{item.tamano} ${item.precio}</option>
                    })
                }
                </select>
                <br></br>
                
               <select name='type' onChange={typeChange}>
                <option>Selecciona...</option>
                <option>precio</option>
                <option>cantidad</option>
               </select>
               <br></br>
               <label>Introduzca la cantidad</label>
               <input type='number' name="numero" onChange={typeChange}></input>
                
                <button id='del'>Eliminar</button>
            </form>
        </div>
    </main>
  )
}