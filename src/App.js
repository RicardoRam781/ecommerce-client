import './App.css';
import Menu from './components/Navbar';
import Products from './components/inicio'
import ProductDetails from './components/productDetails'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import { Container } from '@mui/system';
import RenderProduct from './components/card';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import purple from '@mui/material/colors/purple'
import green from '@mui/material/colors/green'
import Userbox from './components/userbox';
import ShopCart from './components/shopCart';
import ShoppingCartProvider from './components/cartContext';
import Pay from './components/pay';
import DirectionForm from './components/directionForm';
import Cookies from "js-cookie";
import Resume from './components/resume';
import Orders from './components/orders';
import AboutUs from './aboutUs';
import CategoryProvider from './components/categoryContext';
import AdminTools from './components/adminTools';
import MyOrders from './components/myOrders';
import Ticket from './components/ticket';
import Informes from './components/informes';


const isLoggedIn = Cookies.get("userData");
const data = JSON.parse(isLoggedIn?.toString() || "{}");
const role = data && data.body ? data.body.role : undefined;
//const userId = data && data.body ? data.body._id : undefined;
//PRUEBA DESDE MAC


const themes = createTheme({
  palette: {
    primary: purple,
    secondary: green,
    main: '#212121',
  },
  status: {
    danger: 'orange',
  },

});

function App() {


  return (
    <main style={{ margin: 0 }}>
  <CategoryProvider> 
      <ShoppingCartProvider>
        
        <ThemeProvider theme={themes}>
          <BrowserRouter>
          
            
            
              {/* <Container style={{ margin: "auto" }} maxWidth="xl">     */}
             
              
                
              <Menu/>
                <Routes>
                  
                  
                  <Route path='/ticket' element={<Ticket/>}></Route>
                  <Route path='/product/addProduct' element={<Products user={role} />} />
                  <Route path='/' element={< RenderProduct user={role} />} />
                  <Route path='/product/:id' element={< ProductDetails user={role} />} />
                  <Route path='/cart/payment' element={<Pay user={role} />} />
                  <Route path='/user/forms' element={<Userbox user={role} />} />
                  <Route path='/cart' element={<ShopCart user={role} />} />
                  <Route path='/new/direction' element={<DirectionForm user={role} />} />
                  <Route path='/pedidos' element={<Orders user={role} />} />
                  <Route path='/resume' element={<Resume />} />
                  <Route path='/aboutUs' element={<AboutUs />} />
                  <Route path='/tools' element={<AdminTools user={role}/>} />
                  <Route path='/misPedidos' element={<MyOrders user={role}/>} />
                  <Route path='/info' element={<Informes user={role}/>} />
                  
                  
                </Routes>
              {/* </Container> */}
            
          </BrowserRouter>
        </ThemeProvider>
        
      </ShoppingCartProvider>
      </CategoryProvider>
    </main>
  )
}

export default App;
