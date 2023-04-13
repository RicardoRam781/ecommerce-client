import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { Link , useNavigate} from 'react-router-dom';
export default function TemporaryDrawer() {
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
        
      <List>
      <ListItemButton> 
      <ListItem to="/"  style={{ textDecoration: '', color:"black"  ,  fontFamily: 'arial',  fontSize:'1.5rem'}} onClick={() => navigate("/")}>Inicio</ListItem>
      </ListItemButton>
      <ListItemButton> 
      <ListItem to="/" style={{ textDecoration: 'none', color:"black"  ,  fontFamily: 'arial',  fontSize:'1.5rem'}} onClick={() => navigate("/aboutUs")}>Contacto</ListItem>
      </ListItemButton> 
      </List>
      <Divider />
      <List>
        <ListItem>Categorías</ListItem>        
        <ListItemButton>
          <ListItem>Jardineria</ListItem>
        </ListItemButton>
        <ListItemButton>
          <ListItem>Hogar</ListItem>
        </ListItemButton>
        <ListItemButton>
          <ListItem>Descuentos</ListItem>
        </ListItemButton>
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
          <Button onClick={toggleDrawer(anchor, true)} style={{color:"black"}}><MenuIcon/></Button>
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