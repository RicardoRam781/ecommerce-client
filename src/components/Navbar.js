import React, { useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography, Box, Container, Hidden } from '@mui/material'
import { createTheme, hexToRgb, ThemeProvider } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import purple from '@mui/material/colors/purple'
import DropdownButton from './menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from './cartContext'
import Cookies from 'js-cookie';

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.Toolbar,
    title: {
        flexGrow: 1
    }
}))



const themes = createTheme({
    palette: {
        primary: {
            main: '#FEF9E7 ',
        },
        secondary: {
            main: '#2E5B27 ',
        },
    },
    status: {
        danger: purple[700],
    },
});

export default function Navbar(props) {
    const clasess = useStyles();
    const navigate = useNavigate();




const isLoggedIn = Cookies.get('userData');
const data = JSON.parse(isLoggedIn?.toString() || "{}")
const role = data && data.body ? data.body.role : undefined;
const userId = data && data.body ? data.body._id : undefined;
console.log("U S E R   I D  ",userId)

// const [cart, setCart] = useState(() => {
//     const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`));
//     return storedCart ? storedCart : [];
//   });


///////////////////////////////
//   useEffect(() => {
//     localStorage.setItem(`cart ${userId}`, JSON.stringify(cart));
//   }, [cart]);
//////////////////////////////

const [cart,setCart] = useContext(CartContext)

//   useEffect(() => {
//     localStorage.getItem(`cart_${userId}`, JSON.stringify(cart));
    
//   }, []);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`));
    if (storedCart) {
      setCart(storedCart);
    }
  }, [userId, setCart]);
  

const quanty = cart.reduce((acc,curr) =>{
    return acc + curr.quantity
},0);




const validate = () =>{
    if(!role || quanty === 0){
        alert("EL carrito esta vacio")
    } else{
        navigate("/cart")
    }
}




    return (
        <ThemeProvider theme={themes}>
            <Box sx={{ flexGrow: 1, }} >
                <AppBar position='static' color='primary' style={{boxShadow:'none'}}>
                 
                    <Container maxWidth='none'>
               
                        <Toolbar >
                            <Hidden smDown> 
                            <Typography variant='h6' sx={{ flexGrow: 1 }}>
                                <Link to="/" style={{ textDecoration: 'none', color:hexToRgb('#2E5B27')  ,  fontFamily: 'Helvetica Neue Italic',  fontSize:'1.5rem'}} onClick={() => navigate("/index")}>Inicio </Link>
                               
                                <Link to="/aboutUs" style={{ textDecoration: 'none', color:hexToRgb('#2E5B27')  ,  fontFamily: 'Helvetica Neue Italic',  fontSize:'1.5rem', marginLeft:'1rem'}} onClick={() => navigate("/index")}>Acerca de</Link>
                                
                            </Typography>
                            </Hidden>
                            <Typography variant='h6' sx={{ flexGrow: 1 }}>
                                <Link to="/" style={{ textDecoration: "none", color:hexToRgb('#2E5B27')  ,  fontFamily: 'Helvetica Neue Italic', fontStyle:'italic', fontSize:'2rem'}} onClick={() => navigate("/index")}>Novedades Rubí</Link>
                            </Typography>
                            <Button startIcon={<ShoppingCartIcon />} color='secondary' onClick={() => validate()}>
                                {userId && quanty}
                            </Button>

                            <DropdownButton />
                        </Toolbar>
                    </Container>
                   
                </AppBar>
                <div className={clasess.offset}></div>
            </Box>
        </ThemeProvider>
    )

}


