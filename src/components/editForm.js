import { useState, } from "react";
import Cookies from 'js-cookie';

export default function EditForm(productId) {

  const isLoggedIn = Cookies.get('userData');
  const data = JSON.parse(isLoggedIn?.toString() || "{}")
  

  const [form, setForm] = useState({})

  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = productId
    const formData = new FormData();
    formData.append('file', file);
    formData.append("form", JSON.stringify(form));
    console.log(id.productId);
    console.log(form)
    const res = await fetch(`http://localhost:4000/update/product/${id.productId}`, {
      method: 'PUT',
      headers:{
        'Authorization': `Bearer ${data.token}`
        },
      body: formData,
      
    })
    
    res.json().then(data => {
        alert(data)
    window.location.href = '/' 
      
    })

  }


  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value);

  }

  return (
    <div className='cont'>

      <form className="form" onSubmit={handleSubmit}>
        <h6 className="title">Actualizar datos</h6>
        <input className="inputs" placeholder="Modificar nombre"
          name="productname" value={form.nombre}
          onChange={handleChange}></input>

        <input className="inputs" placeholder="modificar precio"
          name="productprice" value={form.price}
          onChange={handleChange}></input>

        <input className="inputs" placeholder="Modificar descripcion"
          name="productdescription" value={form.description}
          onChange={handleChange}></input>

        <input className="inputs" placeholder="modificar categoria"
          name="productcategory" value={form.category}
          onChange={handleChange}></input>
          <input className="inputs" placeholder="Cantidad en inventario"
          name="inventario" value={form.quantity}
          onChange={handleChange}></input>


       
        <button className="btn" type="submit">Actualizar</button>
      </form>
    </div>
  );
}