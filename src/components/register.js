import React, { useState } from 'react'
import { Alert } from '@mui/material';
import {useForm} from "react-hook-form"
//import {useNavigate } from 'react-router-dom';


export default function Register(props) {
  
  const {register,formState:{errors},getValues, handleSubmit} = useForm()
 
  const [isRegister, setIsRegister] = useState(false)
  
 
  const onSubmit = async (NewUser) => {
    
    
    console.log(NewUser)
    
    
      const res = await fetch(`https://novedades-rosy-api-production.up.railway.app/new/user`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(NewUser)
      })

        
        res.json().then(data =>{
          console.log(data.error)
          
            if(data.error){
              alert(data.error)
            }else {
              alert(data.message)
              props.onUpdate()
              setIsRegister(true)
            }
          
        })
        .catch(err => console.log(err))
        
      

  } 

  
  
  function blurpass(){
    const [password, confirmPassword] = getValues(["password","confPass"])
    if (password !== confirmPassword){
      console.log("son diferentes")
      return false
    }
    else{
      console.log("son iwales")
      return true
    }
  }

  return (
    <div className='cont'>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h6 className="title">Registrarse</h6>
        <input className="inputs" placeholder="Nombre completo"
          name="fullName" 
           {...register('fullName',{
            required:{value:true, message:'El nombre completo es obligatorio'},
            maxLength:{value:50, message:"El nombre no puede exceder los 50 caracteres"},
            minLength:{value:3 , message:"Tienes que colocar un nombre mas largo"},
            pattern:/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/


          })}></input>
          
          {errors?.fullName?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
          {errors?.fullName?.type === 'minLength' && <Alert severity="error">Nombre demasiado corto</Alert> }
          {errors?.fullName?.type === 'maxLength' && <Alert severity="error">Nombre demasiado largo</Alert> }
          {errors?.fullName?.type === 'pattern' && <Alert severity="error">El nombre no puede incluir caracteres especiales o numeros</Alert> }
         
          
        <input className="inputs" placeholder="Nombre de usuario"
          name="nickname" type="text"
          {...register("nickname",{
            required:{value:true , message: "Campo requerido"},
            pattern:/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/
          })}
           ></input>
          {errors?.nickname?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
          {errors?.nickname?.type === 'pattern' && <Alert severity="error">El nombre no puede incluir caracteres especiales o numeros</Alert> }
          
     

        <input className="inputs" placeholder="e-mail"
          name="email"  type="email"
            {...register('email',{
            required:{value:true ,  message:'El nombre completo es obligatorio'},
            pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          })}></input>
          {errors?.email?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
          {errors?.email?.type === 'pattern' && <Alert severity="error">Formato de email incorrecto</Alert> }
          

        <input className="inputs" placeholder="Contraseña"
          name="password"  type="password" {...register('password',{
            required:{value:true ,  message:'El nombre completo es obligatorio'},
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,20}$/
          })}
          ></input>
          {errors?.password?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
          {errors?.password?.type === 'pattern' && <Alert severity="error">La contraseña debe contener caracteres especiales, mayusculas,minuscualasn numeros y no tener espacios</Alert> }
          
          <input className="inputs" placeholder="Confirmar contraseña "
          name="confPass" type="password" onBlur={blurpass()}{...register('confPass',{
            required:{value:true ,  message:'Debes confirmar tu contraseña'},
            validate:blurpass
          })}
          ></input>
          {errors?.confPass?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
          {errors?.confPass?.type === 'validate' && <Alert severity="error">Las contraseñas no coinciden</Alert> }
          
          



        <button className="btn" type="submit" >Aceptar</button>
        <br></br>
        <button  onClick={props.onClick}>¿Ya tienes una cuenta? Inicia sesion aquí</button>
        <br></br>
        { isRegister === true && (<Alert>Inicio de sesion correcto, redirigiendo</Alert>)}
      </form>
    </div>
  );
}  
