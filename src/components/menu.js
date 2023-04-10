import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const DropdownButton = (props) => {

  const isLoggedIn = Cookies.get('userData');
  console.log(isLoggedIn)
  const data = JSON.parse(isLoggedIn?.toString() || "{}")
  console.log("body",data)
  const role = data && data.body ? data.body.role : undefined;
  const user = data && data.body ? data.body.email : undefined;
  console.log(role)

 
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleCookies = () =>{
    Cookies.remove('userData')
    alert("Vuelve pronto")
    navigate('/')
    
 
  } 
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const [active, setActive] = useState(false);
  // const toggle = () => {
  //   setActive(!active);
  //   console.log(setActive);
  // }
  
  
  const navigate = useNavigate();
  return (
    <div display="flex"
      alignItems="center">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"

        startIcon={<AccountCircleIcon />}
      >


      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
          
        { role === "tr" &&
      
        <MenuItem onClick={() => { navigate("/product/addProduct"); handleClose() }} >Agregar producto </MenuItem>
        
      
      }
      {
        user !== undefined && 
        <MenuItem onClick={() => {handleClose() ;handleCookies()}}>Cerrar sesion</MenuItem>
      }
      { user === undefined &&
        <MenuItem onClick={() => {navigate ("/user/forms"); handleClose()  }}>Iniciar sesion</MenuItem>
      }
      
      </Menu>
    </div>
  );
};

export default DropdownButton;