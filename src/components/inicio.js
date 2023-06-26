import { useState,useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Alert } from "@mui/material";
export default function Products(user) {

     
  //const navigate = useNavigate();
  console.log("USUARIO EN FOREM",user.user)
  
  const [form, setForm] = useState({})
  const [dataa,setDataa] = useState([])
  const [file, setFile] = useState();
  const [update, setUpdate] = useState(false)

  useEffect(() =>{

    const getData = async () =>{
      const res = await fetch("https://novedades-rosy-api-production.up.railway.app/categorys")
      const data = await res.json()
      console.log("Categorias dsiponibles",data)
      setDataa(data)
      setUpdate(!update)
    }
    getData()
    // eslint-disable-next-line
  },[])
  const handleFile = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }

  if(user.user !== 'tr'){
    
     window.location.replace("/")
    }
  const [files, setFiles] = useState([])
  const handleFiless = (e) => {
    setFiles(e.target.files)
    console.log(e.target.files)
  }

  const isLoggedIn = Cookies.get("userData");
  const data = JSON.parse(isLoggedIn?.toString() || "{}");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    for (let i = 0; i < files.length; i++) {
      formData.append('filess', files[i]);
    }

    console.log("formadata",form)
    formData.append("form", JSON.stringify(form));
    const res = await fetch('https://novedades-rosy-api-production.up.railway.app/api', {
      method: 'POST',
      headers:{
        'Authorization': `Bearer ${data.token}`
        },
      body: formData,

    })
    res.json().then(data => {
      //window.location.href = '/'
      alert(data);

      
    })
    
    
    
  }

 
  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value);

  }
  

  return (
    <div className='cont'>
{/* { user.user == 'tr' && */}
      <form className="form" onSubmit={handleSubmit}>
        <h6 className="title">Agregar producto</h6>
        <input className="inputs" placeholder="Nombre de producto"
          name="name" value={form.nombre}
          onChange={handleChange}></input>

        <input className="inputs" placeholder="Precio"
          name="price" value={form.price}
          onChange={handleChange} type='number'></input>

        <input className="inputs" placeholder="Descripcion"
          name="description" value={form.description}
          onChange={handleChange}></input>

        {/* <input className="inputs" placeholder="Categoria"
          name="cat" value={form.category}
          onChange={handleChange}></input> */}

          <select value={form.category} onChange={handleChange} name="cat">
            <option>Seleccionar categoria</option>
          {
          dataa.map((item) =>{
            return <option key={item.id}>{item.nombre}</option>
          })
          }
          </select>

        <input className="inputs" placeholder="Inventario"
          name="quanty" value={form.quanty}
          onChange={handleChange} type='number'></input>


        <p className="labels">Imagen principal</p>
        <input onChange={handleFile} type='file' className="inputs"
          name="img" encType="multipart/form-data"></input>

        <input onChange={handleFiless} type='file' multiple className="inputs"
          name="img" encType="multipart/form-data"></input>

        <button className="btn" type="submit">Guardar producto</button>
      </form>

{/* 
  } */}
    <div id="info">
      <Alert severity="info">
        Capacidad de nombre: 50 caracteres <br/>
        Coloca el precio SIN simbolo $<br/>
        Capacidad de Descripcion: 80 caracteres<br/>
       
        Categoria a elegir<br/>
        Solo numero (no decimales) <br/>
        Imagen principal es la mas grande<br/>
        Máximo 3 imagenes secundarias<br/>
       
       </Alert>
    </div>
    </div>
  );
}
