
import React, { useState } from 'react'
import { Alert } from '@mui/material';
import {useForm} from "react-hook-form"
import {useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login(props) {

    const {register,formState:{errors}, handleSubmit} = useForm()
  const navigate = useNavigate()
  const [loged,setLoged] = useState(false)
  
  const onSubmit = async (NewUser) => {
     console.log(NewUser)
        
          try{ 
          const res = await fetch(`https://novedades-rosy-api-production.up.railway.app/login`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(NewUser)
          })
    
            
            res.json().then(data =>{
              console.log("codigo de error",data.error)
              
              
              if (data.error){
                alert(data.error)
              }
              
              const token = data.token
              const userData = {
                token:token,
                body:data.body
              }
              if(data.token){ 
                //expires:0.00208333
              Cookies.set('userData', JSON.stringify(userData) , { expires:1, path: '/', sameSite: 'strict' });
              

              const isLoggedIn = Cookies.get('userData');
              console.log(isLoggedIn)
              const datau = JSON.parse(isLoggedIn?.toString() || "{}")
              console.log("body",datau)
              const role = datau && datau.body ? datau.body.role : undefined;
              console.log(role,loged)
              setLoged(true)
            
               } else if(data.token === undefined){
                Cookies.remove('userData')
               }
               
            })
            .catch(err => console.log("el error es ",err))
             } catch(err){
              alert("Error interno del servidor")
            }
          
    
      } 
      
      
      const isLoggedIn = Cookies.get('userData');
      const datau = JSON.parse(isLoggedIn?.toString() || "{}")
      const role = datau && datau.body ? datau.body.role : undefined;
      if (role){
        setTimeout(function ()  {
          navigate('/')
        }, 2000);
      }
    
      
  return (
   
    <div className='cont'>
       
    <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
   
      <h6 className="title">Iniciar sesion</h6>
      <input className="inputs" placeholder="e-mail"
        name="email"  type='email' autoComplete='off'
          {...register('email',{
          required:{value:true ,  message:'El nombre completo es obligatorio'},
          pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        })}></input>
        {errors?.email?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
        {errors?.email?.type === 'pattern' && <Alert severity="error">Formato de email incorrecto</Alert> }
        {errors?.nickname && <Alert severity="error">Error desconocido</Alert> }

      <input className="inputs" placeholder="Contraseña" autoComplete='off'
        name="password"  type="password" {...register('password',{
          required:{value:true ,  message:'El nombre completo es obligatorio'},
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,20}$/
          
        })}
        ></input>
        {errors?.password?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
        {errors?.password?.type === 'pattern' && <Alert severity="error">La contraseña debe contener caracteres especiales, mayusculas,minuscualasn numeros y no tener espacios</Alert> }
        
       
        
        



      <button className="btn" type="submit" >Iniciar sesion</button>
      <br></br>
      <button onClick={props.onClick}>¿No tienes una cuenta? Crea una aquí</button>   
      <br></br>
      { role !== undefined && (<Alert>Inicio de sesion correcto, redirigiendo</Alert>)}
        
    </form>
    
  </div>
  )
}
