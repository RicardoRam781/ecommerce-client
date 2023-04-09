import './styles/showProduct.css'
//import imagen from "./sources/productss.jpg"
import RenderCards from "./renderCards"
import { useEffect, useState, useContext } from 'react'

export default function RenderProduct() {
    console.log("Hola mundo",document.cookie)
    const [product, setProduct] = useState([])
    
    
    useEffect(() => {
        getData()
        
    }, [])

    const getData = async () => {
        const res = await fetch('http://localhost:4000/inicio')
        const data = await res.json()
        console.log(data);
        setProduct(data)

    }

    return (
        <section className='cardSection' >

            {product.map((item) => (
                <RenderCards key={item.id} id={item.id} name={item.productname} price={item.productprice} description={item.productdescription} img={item.mainimg} 
                fimg={item.fimg} simg={item.simg} timg={item.timg} inventario={item.inventario}
                />
            ))}



        </section>
    );
};