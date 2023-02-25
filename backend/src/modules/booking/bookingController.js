// import Tour from "../../../models/Tour.js";
import Stripe from 'stripe';
import Tour from '../../../models/Tour.js';
const stripe = new Stripe(process.env.Stripe_Secret_Key);




export const addInvoice = (req,res)=>{
  try {
    console.log(req.body);
    token = req.body.token
  const customer = stripe.customers
    .create({
      email: "mostafamahmoudmorcy@gmail.com",
      source: token.id
    })
    .then((customer) => {
      console.log(customer);
      return stripe.charges.create({
        amount: 12,
        description: "Test Purchase",
        currency: "USD",
        customer: customer.id,
      });
    })
    .then((charge) => {
      console.log(charge);
        res.json({
          data:"success"
      })
    })
    .catch((err) => {

        res.json({
          data: "failure",
        });
    });
  return true;
} catch (error) {
  return false;
}
}























/*
   // 1) Get the currently booked tour
    const tour = await Tour.findById(req.params.tourId);
    console.log(tour)
  
    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'], // creadit card
    success_url:`${req.protocol}://${req.get('host')}/tours`,
    cancel_url:`${req.protocol}://${req.get('host')}/tours`,
    client_reference_id: req.params.tourId,
    line_items: [
        {
          name: `${tour.title} Tour`,
          description: tour.desc,
          images: [
            `https://tse1.mm.bing.net/th?id=OIP.MkbOYzyIf8w_YwqbCxENwwHaFj&pid=Api&P=0`
          ],
          amount: tour.price * 100,
          currency: 'usd',
          quantity: 1
        }
      ]
    });
  
    // 3) Create session as response
    res.status(200).json({
      status: 'success',
      session
    });*/

/*

import Stripe from 'stripe';



const stripe = new Stripe(process.env.Stripe_Secret_Key);
export const getCheckoutSession = (async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  console.log(tour)

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'], // creadit card
  success_url:`${req.protocol}://${req.get('host')}/tours`,
  cancel_url:`${req.protocol}://${req.get('host')}/tours`,
  customer_email:'selviafayez1@gmail.com' ,
  client_reference_id: req.params.tourId,
  line_items: [
      {
        name: `${tour.title} Tour`,
        description: tour.desc,
        images: [
          `https://tse1.mm.bing.net/th?id=OIP.MkbOYzyIf8w_YwqbCxENwwHaFj&pid=Api&P=0`
        ],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });

  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session
  })
  })



    */
