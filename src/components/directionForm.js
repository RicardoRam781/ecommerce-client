import React from 'react'
import { Alert } from '@mui/material';
import {useForm} from "react-hook-form"
import {useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function DirectionForm(props) {
    const {register,formState:{errors}, handleSubmit} = useForm()
    const isLoggedIn = Cookies.get('userData');
    const data = JSON.parse(isLoggedIn?.toString() || "{}")
    //const role = data && data.body ? data.body.role : undefined;
    const userId = data && data.body ? data.body._id : undefined;
    const navigate = useNavigate()
    const onSubmit = async  (direc) => {
      if(!userId){
        alert("Debes iniciar sesion para agregar una direccion ")
        navigate("/user/forms")
      } else {

      
      console.log("dentro de submit")
      console.log(direc)
      direc['id'] = userId
      const res = await fetch(`http://localhost:4000/direccion`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify(direc)
      })

        
        res.json().then(data =>{
          console.log(data)
          
            if(data.error){
              alert(data.error)
            }else {
              alert(data.message)
              navigate('/cart/payment')
              
            }
           
        })
        .catch(err => console.log(err))
         }
    }

    
  return (
    <div className='cont'>
       
    <form className="form" onSubmit={handleSubmit(onSubmit)}>

      <h6 className="title">Nueva direccion</h6>
      <label>Nombre completo</label>
      <input className="inputs" placeholder='Jose Martinez Ramírez'
        name="fullname"  type='text' 
        {...register('fullname',{
          required:{value:true, message:'El nombre completo es obligatorio'},
          pattern:/^[a-zA-Z0-9# ]+$/
        })}
          
          
        ></input>
        {errors?.fullname?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
        {errors?.fullname?.type === 'pattern' && <Alert severity="error">No puede contener caracteres especiales</Alert> }
        <label>Calle y numero</label>
      <input className="inputs"  placeholder='Palma real #90'
        name="direction"  type='text' 
        {...register('direction',{
          required:{value:true, message:'El nombre completo es obligatorio'},
          pattern:/^[a-zA-Z0-9# ]+$/
        })}
          
        ></input>

        {errors?.direction?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
        {errors?.direction?.type === 'pattern' && <Alert severity="error">No puede contener caracteres especiales</Alert> }
        <label>Colonia</label>
      <input className="inputs"  placeholder='Lomas vista hermosa'
        name="colonia"  type='text' 
        {...register('colonia',{
          required:{value:true, message:'El nombre completo es obligatorio'},
          pattern:/^[a-zA-Z0-9# ]+$/
        })}
          
        ></input>
        
        {errors?.colonia?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
        {errors?.colonia?.type === 'pattern' && <Alert severity="error">No puede contener caracteres especiales</Alert> }
        <label>Direccion interior(si es necesario)</label>
      <input className="inputs"  placeholder='23A'
        name="intNumber"  type='text' 
        {...register('intNumber',{
          required:{value:true, message:'El nombre completo es obligatorio'},
          pattern:/^[a-zA-Z0-9# ]+$/
        })}
          
        ></input>
        {errors?.intNumber?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
        {errors?.intNumber?.type === 'pattern' && <Alert severity="error">No puede contener caracteres especiales</Alert> }
        <label>Codigo postal</label>
      <input className="inputs"  placeholder='28017'
        name="postal"  type='number' 
        {...register('postal',{
          required:{value:true, message:'El nombre completo es obligatorio'},
          pattern:/^[a-zA-Z0-9# ]+$/
        })}
          
        ></input>
        {errors?.postal?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
        {errors?.postal?.type === 'pattern' && <Alert severity="error">No puede contener caracteres especiales</Alert> }
        <label>Estado</label>
      <select id='selec' name='estado' {...register('estado',{
          required:{value:true, message:'El nombre completo es obligatorio'},
          
        })}>
      <option value="">Selecciona un estado</option>
      <option value="Aguascalientes">Aguascalientes</option>
  <option value="Baja California">Baja California</option>
  <option value="Baja California Sur">Baja California Sur</option>
  <option value="Campeche">Campeche</option>
  <option value="Chiapas">Chiapas</option>
  <option value="Chihuahua">Chihuahua</option>
  <option value="Coahuila">Coahuila</option>
  <option value="Colima">Colima</option>
  <option value="Durango">Durango</option>
  <option value="Estado de México">Estado de México</option>
  <option value="Guanajuato">Guanajuato</option>
  <option value="Guerrero">Guerrero</option>
  <option value="Hidalgo">Hidalgo</option>
  <option value="Jalisco">Jalisco</option>
  <option value="Michoacán">Michoacán</option>
  <option value="Morelos">Morelos</option>
  <option value="Nayarit">Nayarit</option>
  <option value="Nuevo León">Nuevo León</option>
  <option value="Oaxaca">Oaxaca</option>
  <option value="Puebla">Puebla</option>
  <option value="Querétaro">Querétaro</option>
  <option value="Quintana Roo">Quintana Roo</option>
  <option value="San Luis Potosí">San Luis Potosí</option>
  <option value="Sinaloa">Sinaloa</option>
  <option value="Sonora">Sonora</option>
  <option value="Tabasco">Tabasco</option>
  <option value="Tamaulipas">Tamaulipas</option>
  <option value="Tlaxcala">Tlaxcala</option>
  <option value="Veracruz">Veracruz</option>
  <option value="Yucatán">Yucatán</option>
  <option value="Zacatecas">Zacatecas</option>
      </select>
        {errors?.estado?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
        
        <label>Número de telefono</label>
      <input className="inputs" placeholder='33934753'
        name="tel"  type='number' autoComplete='off'
        {...register('tel',{
          required:{value:true, message:'El nombre completo es obligatorio'},
          pattern:/^[a-zA-Z0-9# ]+$/
        }) }
        
        ></input>
         {errors?.tel?.type === 'required' && <Alert severity="error">Este campo es requerido</Alert> }
        {errors?.tel?.type === 'pattern' && <Alert severity="error">No puede contener caracteres especiales</Alert> }
      <button className="btn" type="submit" >Agregar</button>
      <Alert severity="info">Coloca correctamente los datos para evitar problemas de envio</Alert>
      
        
    </form>
    
  </div>
  )
}
