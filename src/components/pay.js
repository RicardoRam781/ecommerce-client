import React, { useContext, useEffect, useState, useCallback} from "react";
import "./styles/pay.css";
import { CartContext } from "./cartContext";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";
import { Alert} from "@mui/material";

  const stripePromise = loadStripe(
    "pk_test_51Mqs4NABeCEXzzKGjuj90BwvxMDP2zQjCQYfw3gyv6pR5TDDf51FAh3WZV68TLxHmvLYcQUosQY6PLglEZCH3oOU00DB5EH3y4"
  );
export default function Pay(user) {
   

  
  const navigate = useNavigate();
  const [cart, setCart] = useContext(CartContext);
  const [directions, setDirections] = useState([]);
  //const [delivery, setDelivery] = useState([]);
  const isLoggedIn = Cookies.get("userData");
  const data = JSON.parse(isLoggedIn?.toString() || "{}");
  //const role = data && data.body ? data.body.role : undefined;
  const userId = data && data.body ? data.body._id : undefined;
//   const {
//     register,
//     formState: { errors },
//     setError,
//     getValues,
//     handleSubmit,
//   } = useForm();


    



  // useEffect(() => {
  //   userDirections();
  // }, []);

  // const userDirections = async () => {
  //   if (!userId) {
  //     alert("Debes iniciar sesion para continuar");
  //     navigate("/user/forms");
  //   }
  //   const res = await fetch(`http://localhost:4000/get/direction${userId}`, {
  //     method: "GET",
  //   });

  //   res.json()
  //     .then((data) => {
  //       if (data.error) {
  //         alert(data.error);
  //       } else {
  //         setDirections(data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };
  
  
  const userDirections = useCallback(async () => {
    if (!userId) {
      alert("Debes iniciar sesion para continuar");
      navigate("/user/forms");
    }
    const res = await fetch(`https://novedades-rosy-api-production.up.railway.app/get/direction${userId}`, {
      method: "GET",
    });
  
    res.json()
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setDirections(data);
        }
      })
      .catch((err) => console.log(err));
  }, [userId, navigate, setDirections]);

  useEffect(() => {
    userDirections();
  }, [userDirections]);

  const [selectedOption, setSelectedOption] = useState("");

  function handleOptionChange(e) {
    console.log("value del target", e.target.value);
    setSelectedOption(e.target.value);
  }

 
  const moveToDir = () => {
    navigate("/new/direction");
  };

 
  
  const CheckoutForm = () => {
    
    const stripe = useStripe();
    const elements = useElements();
    
    
    
    const [loading, setLoading] = useState(false);

    //nueva incorporacion

    let correcOption = selectedOption
    console.log("correct option",correcOption, )
    console.log("DIRECCIONES ", directions)
    const direccion = directions.find((obj) => obj.id.toString() === correcOption.toString())
    console.log("maomeno direccion",direccion)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(selectedOption === ""){
          alert("Selecciona una direccion")
          window.location.reload()
        }
      console.log("PRUEBA DE SUBMIT",sum)
      console.log("Se enviara a",selectedOption, directions)
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      setLoading(true);
  
      if (!error) {
        console.log(paymentMethod)
        const { id } = paymentMethod;
        console.log(id)
        const payData = {id:id,amounth:sum}
        console.log("datra del user",data.body.email)
        const ticket = {
            userId:userId,
            payData:payData,
            products:cart,
            direction:direccion,
            email:data.body.email
            
        }
        
        console.log("TICKET DE SALIDA ",ticket)
        
        // {cart.map((item) => (
        //     console.log(`Product id: ${item.id} quantity: ${item.quantity}`)
        //   ))}


        const res = await fetch('https://novedades-rosy-api-production.up.railway.app/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
            },
            body: JSON.stringify(ticket)
        })
        res.json().then(data => {

            console.log(data)
            if(data.message){
              console.log("pago en data.msg")
              alert(data.message)
              setCart([])                                // 
              navigate("/resume", {state:{ticket}})

            }
            else if(data.error){
              console.log("pago en else")
                alert(data.error)
                navigate("/" )
            }
            
       
          
        })
      }
      else if(error){
        alert("OCURRIO UN ERROR CON EL PAGO, redirigiendo")
      }
    };
    
    console.log(!stripe || loading);
   
    
  return (
    
    

    


    <form onSubmit={handleSubmit}>
        <div className="CardContent">
        


    <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
          
        }}/>

        <br></br>
<Alert severity='info'>El pago es realizado mediante Stripe.<br></br> No guardamos informacion de tu tarjeta de credito, tu pago es seguro.</Alert>
        </div>
        <br></br>
        <button className="btn" >
                Realizar pedido
              </button>
    </form>
    
  
        
    
  ) 
}



let sum = 0;
cart.forEach((item) => {
  for (let i = 0; i < item.quantity; i++) {
    sum = Number(sum) + Number(item.price);
  }
});
console.log("suma total", sum);
  return (
    <main className="paymain">
      
        <div className="payDiv">
          <div id="direcction">
            <div id="directions">
              <h4>Seleccione la direccion destino</h4>
              <div id="renderDir">
                {directions.map((item) => (
                  <div id="divDirec" key={item.id}>
                    <input
                      id="inputDirec"
                      type="radio"
                      name="opcion"
                      value={item.id}
                      onChange={handleOptionChange}
                      required
                    />
                    <label>
                      {item.direccion} {item.colonia} ,{item.postal},
                      {item.estado}
                    </label>
                  </div>
                ))}

                <button onClick={moveToDir} className="btn">
                  {" "}
                  Agregar una nueva direccion
                </button>
              </div>
            </div>
            <div id="renderPay">
            <p>Introduzca un metodo de pago</p>
                <div id="stripe"> 
                
                    
                    <Elements stripe={stripePromise}>
                        <CheckoutForm/>
                    </Elements>
                </div>
                <br></br>
                
            </div>
          </div>
          <div id="payment">
            <div id="allCards">
              <h4 id="Cartresum">Total de carrito:{sum}</h4>
              {cart.map((item) => (
                <div id="item">
                  {item.name} {item.color} {item.tamano} {item.quantity} X {item.price}
                </div>
              ))}
            </div>
            
          </div>
        </div>
     
    </main>
  );
}

