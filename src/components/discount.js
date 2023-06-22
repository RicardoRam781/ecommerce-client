import React, { useEffect, useState } from 'react'
import './styles/prueba.css'
import Cookies from "js-cookie";



export default function Discount() {

    const isLoggedIn = Cookies.get("userData");
    const data = JSON.parse(isLoggedIn?.toString() || "{}");
    const [product, setProduct] = useState([]);
    const [totalProducts, setTotalProducts] = useState([])
    const [id,setId] = useState([])
    const [selec, Setselec] = useState('')
    const [option, setOption] = useState(false)
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
      const res = await fetch(`http://localhost:4000/discount`,{
        method:"POST",
        headers:{
            'Authorization': `Bearer ${data.token}`
            },
        body:formData
      })
      const datas = await res.json()
      console.log("RESPONSE",datas)
      alert(datas)
        
    }
 
    
 
    const handleChange = (e) => {
        
        
        setForm({ ...form, [e.target.name]: e.target.value })
       
        const productString = e.target.value
        const productId = productString.split(" ")[0]
       
        const getProductsSecondary = async () =>{
           
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
          setOption(true)
      }

      const productChange = (e) =>{
        const secondary = e.target.value
        const secondaryID = secondary.split(" ")[0]
        console.log("SECONDARY ID",secondaryID)
        setId(secondaryID)
      }

      const handleCriterioChange = (e) =>{
        setForm({ ...form, [e.target.name]: e.target.value })
        console.log(e.target.value)
      } 
      const tamanosUnicos = [...new Set(totalProducts.map(item => item.tamano))];
      const colorUnico = [...new Set(totalProducts.map(item => item.color))];
       const handleOptionChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
        Setselec(e.target.value)
       }
  return (
    <main id='formMain'>
        <div id='form'>
            <form  onSubmit={handlesubmit}>
               
               
                <label>Aplicar descuento a producto</label>
               
                <select className='inputs' onChange={handleChange} name='producto'>
                {   
                    
                    product.map((item) =>{
                     return <option key={item.id}>{item.id} {item.productname}</option>
                    })
                }
                </select>
                
                
                { 

                option === true && (
                    <div>
                <label>Criterio de descuento</label>
                <select onChange={handleOptionChange} className='inputs' name='criterio'>
                    <option>Selecciona...</option>
                    <option>Producto especifico</option>
                    <option>Tamaño</option>
                    <option>Color</option>
                    <option> Todos </option> 
                </select>
                    </div>
                )
                }

                <br></br>
                
               
               {  

                selec === "Producto especifico" && (
                    
                <div>
                    <label>Producto especifico</label>
                <select className='inputs' name='value' onChange={handleCriterioChange}>
                    <option> Selecciona... </option>
                      
                
                {
                   
                    totalProducts.map((item) =>{
                        
                     return <option key={item.id} onChange={productChange}>{item.id} {item.producto},{item.color},{item.tamano} ${item.precio}</option>
                     
                    })
                }
                
                </select>
                </div>
                )
                }   
                <br></br>


                
                <br></br>

                {

        selec === "Tamaño" && (
            <div>
            <label>Tamaños</label>
                <select className='inputs' onChange={handleCriterioChange} name='value'>
                    <option> Selecciona...</option>
                    
                {
                        
                        tamanosUnicos.map((item) =>{
                            
                            return <option key={item.id}>{item}</option>
                            
                           })
                    }      
                   
                </select>
                </div>
)}
{

selec === "Color" && (
    <div>
    <label>Colores</label>
        <select className='inputs' onChange={handleCriterioChange} name='value'>
            <option> Selecciona...</option>
            
           
            {
                colorUnico.map((item) =>{

                    return <option key={item.id}>{item}</option>
                    
                   })
            } 
        </select>
        </div>
)}
                <br></br>
            
               <br></br>
               <label>Introduce el porcentaje de descuento</label>
               <input type='number' name="numero" onChange={handleCriterioChange}></input>
                
                <button id='edit'>Aplicar descuento</button>
            </form>
        </div>
    </main>
  )
}