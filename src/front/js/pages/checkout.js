import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { CheckoutForm } from "../component/checkout.jsx";

// Usar clave pública de Stripe
const stripePromise = loadStripe('pk_test_51QdW17Rw7M9O7Dycvp3cTU0I1Mv1EfZZrgS3AN05q7FtMQKpy1xyY2pX5oiN81iXiaa5gNVeajzWxtOVBmIePyze006PL2JpE3');

const CheckoutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <p className="text-center mb-4">Completa el formulario para realizar el pago de tu pedido.</p>

      <div className="text-center mt-5">
        <Elements stripe={stripePromise}>
          <CheckoutForm navigate={navigate} />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;