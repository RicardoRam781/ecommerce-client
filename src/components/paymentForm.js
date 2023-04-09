// import React from 'react'
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(
//     "pk_test_51Mqs4NABeCEXzzKGjuj90BwvxMDP2zQjCQYfw3gyv6pR5TDDf51FAh3WZV68TLxHmvLYcQUosQY6PLglEZCH3oOU00DB5EH3y4"
//   );
// export default function FormPay() {
    
//    const stripe = useStripe()
    

//   const handleSubmit = async (e) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, paymentMethod] = await stripe.createPaymentMethod({
//         type:'card',
//         card:elements.getElement(CardElement)
//     })
//  }
//     const ParentComponent= () => (
        
//         <Elements stripe={stripePromise}>
//           <CardElement/>
//         </Elements>
//       );
      
//   return (
//     <CardElement/>
//   )
// }  

