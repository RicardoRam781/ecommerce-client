import React from 'react'
import Register from './register'
import './styles/userbox.css'
import { useState } from 'react'
import Login from './login';
import Cookies from 'js-cookie';

export default function Userbox() {

    const [isRegisterMode, setIsRegisterMode] = useState(true); // estado inicial
    
  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode); // cambia el estado al modo opuesto
  };

  //const [state, setState ]= useState(false);

  const isLoggedIn = Cookies.get('userData');
      console.log(isLoggedIn)
  return (
    <main className='min'>
       
    <div className='userbox'>
        <div className='img'> 
        <img src = 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' id='lateral' alt='userbox IMG'></img> 
        
        
        
        </div>
        <div className='forms'>
        
        {isRegisterMode ? (
            <Login onClick={toggleMode} />
          ) : (
            <Register onUpdate={() => setIsRegisterMode(true)} onClick={toggleMode} />
          )}
        </div>
        
    </div>
    </main>
  )
}
