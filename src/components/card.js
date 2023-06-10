import './styles/showProduct.css'
//import imagen from "./sources/productss.jpg"
import RenderCards from "./renderCards"
import { useContext, useEffect, useState } from 'react'
import { CategoryContext } from './categoryContext'

export default function RenderProduct() {
   
    const [product, setProduct] = useState([])
    const [category] = useContext(CategoryContext)
    
    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [category])

    const getData = async () => {
        const res = await fetch(`https://novedades-rosy-api-production.up.railway.app/inicio/${category}`) // http://localhost:4000
        const data = await res.json()
        console.log(data);
        
        setProduct(data)

    }

    return (
        <section className='cardSection' >
            
            {
            
            product.map((item) => (
                <RenderCards key={item.id} id={item.id} name={item.productname} price={item.productprice} description={item.productdescription} img={item.mainimg} 
                fimg={item.fimg} simg={item.simg} timg={item.timg} inventario={item.inventario}
                />
            ))}



        </section>
    );
};