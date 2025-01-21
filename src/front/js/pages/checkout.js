import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { CheckoutForm } from "../component/checkout.jsx";

const stripePromise = loadStripe('pk_live_51QdW17Rw7M9O7DycLq0JZ0kHiEnxpcGEtt5hx22aIaDsqayj7tDLezyY1jEckF7dB9nbiS6Y9zcUPKzlEYtn8ueC00Njcu5IZA');

const CheckoutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <p className="text-center mb-4">Completa el formulario para realizar el pago de tu pedido.</p>

      <div className="text-center mt-5">
        <Elements stripe={stripePromise}>
          <PaymentForm navigate={navigate} />  
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;

