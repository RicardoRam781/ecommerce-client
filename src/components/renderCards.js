
import React, { useState } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import purple from '@mui/material/colors/purple'
import { useNavigate } from 'react-router-dom'



// const ProductContext = React.createContext({});
// export { ProductContext }

const btn = createTheme({
    palette: {
        primary: {
            main: '#2E5B27',
        },
        secondary: {
            main: purple[50],
        },
    },
    status: {
        danger: purple[700],
    },
});

//to={`/product/${props.id}`}


const Cards = (props) => {
    localStorage.removeItem('producto');
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState({ id:0, name: "", price: "", descriptiom: "", })
    const handleClick = (product) => {
        setSelectedProduct({ ...selectedProduct, id: product.id, name: product.name, price: product.price });
        navigate(`/product/id=${product.id}?name=${product.name}`)
        localStorage.setItem('producto', JSON.stringify({ product }))
        console.log(product.id);
    }
    

    return (

        <ThemeProvider theme={btn}>

            <div className='product' onClick={() => handleClick(props)} key={props.id}>

                <img className='product__image' src={props.img} alt="product-primary-img" />
                <h2 className='product__name' > {props.name}</h2>
                <div className='product__details' >

                    <p className='product__price' >${props.price}</p>
                    <template> {props.description} </template>
                    <template> {props.fimg} </template>
                    <template> {props.simg} </template>
                    <template> {props.timg} </template>
                    <template> {props.inventario}</template>
                    

                </div>

            </div>

        </ThemeProvider>





    )
}

export default Cards 
