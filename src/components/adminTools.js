import React from 'react'
import AddColor from './addColor'
import AddSize from './addSize'
import "./styles/adminTools.css"
import AddTotalProduct from './formsprueba'
import AddCategory from './addCategory'
import DeleteSecondaryProduct from './deleteSecondary'
import Cookies from "js-cookie";
import DeleteCategory from './deleteCategory'
import UpdateTotalProduct from './editTotalProducts'
import Discount from './discount'
export default function AdminTools(user) {
  if(user.user !== "tr" ) {
    window.location.replace("/")
  }
  const isLoggedIn = Cookies.get("userData");
  // eslint-disable-next-line
  const data = JSON.parse(isLoggedIn?.toString() || "{}");

  console.log("USER EN ADMIN TOOLS",user)
  return (
    <div id='mainTools'>
        <div className='divImgTools'>
            <img src='https://cdn3.iconfinder.com/data/icons/user-interface-essential-line/32/UI-20-512.png' alt='devTools' className='toolsimg' ></img>
        </div>
        <div id='addForms'>

        <AddColor />
        <AddSize/>
        <AddCategory/>
        <AddTotalProduct />
       
       
        </div>
        <div className='divImgTools' id='warningTool'>
            <img src='https://www.svgrepo.com/show/28256/warning-sign.svg' className='toolsimg' alt='sdf'></img>
          </div>
        <div id='deleteForms'>
          
        <DeleteSecondaryProduct/>
        <DeleteCategory/>
        </div>
        <div className='divImgTools' id='warningTool'>
            <img src='https://cdn.onlinewebfonts.com/svg/img_19667.png' className='toolsimg' alt='ghfj'></img>
          </div>
        <div id='deleteForms'>
          <UpdateTotalProduct/>
          <Discount/>
        </div>
        
    </div>
  )
}
