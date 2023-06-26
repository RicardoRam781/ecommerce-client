import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from 'react-router-dom';
import { useState,useContext } from 'react'
import { CategoryContext } from './categoryContext';
export default function TemporaryDrawer() {
  
  const [setCategory] = useContext(CategoryContext)

  React.useEffect(() =>{
    getData()
  },[])
  const [dataa,setDataa] = useState([])
  const getData = async () =>{
    const res = await fetch("https://novedades-rosy-api-production.up.railway.app/categorys")
    const data = await res.json()
    console.log("Categorias dsiponibles",data)
    setDataa(data)
  }

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const navigate = useNavigate()
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleClick = (e) =>{
    console.log(e.target.textContent)
    setCategory(e.target.textContent)
    
  }
  const handleMain = () => {
    console.log("HANDLEMAIN")
    const a = "general"
    setCategory(a)
  }
  const nav = () =>{
    navigate("/")
  }
  
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
        
      <List>
      <ListItemButton> 
      <ListItem to="/"  style={{ textDecoration: '', color:"black"  ,  fontFamily: 'arial',  fontSize:'1.5rem'}} onClick={() => {handleMain(); nav()}}>Inicio</ListItem>
      </ListItemButton>
      <ListItemButton> 
      <ListItem to="/" style={{ textDecoration: 'none', color:"black"  ,  fontFamily: 'arial',  fontSize:'1.5rem'}} onClick={() => navigate("/aboutUs")}>Contacto</ListItem>
      </ListItemButton> 
      </List>
      <Divider />
      <List>
        <ListItem>Categorías</ListItem>
        {
          dataa.map((item) =>{
            return <ListItemButton onClick={handleClick} key={item.id}>
                   <ListItem >{item.nombre}</ListItem>
                    </ListItemButton>
          })
        }
        
        
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} style={{color:"green"}}><MenuIcon/></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >

            {list(anchor)}
            
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}