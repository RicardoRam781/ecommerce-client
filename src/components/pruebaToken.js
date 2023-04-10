import React from 'react'

export default function PruebaToken() {
  
    // async function Prueba(){
    //     console.log("solicitando autorizacion")
    //     const token = document.cookie.replace('token=','')
    //     const res = await fetch(`http://localhost:4000/pruebadatos`,{
    //         method:'POST',
    //         headers:{
    //             'authorization': token
    //         }
    //     })
        
    //     res.json().then(data =>{ 
    //     alert(data.msg)
    //     })
    

    async function Prueba() {
        const response = await fetch('https://novedades-rosy-api-production.up.railway.app/login/error');
        const data = await response.json();
        console.log(data);
      }
   
   Prueba();
    return (
    <div>pruebaToken</div>
  )
 }
