import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  // Obtener clientSecret desde el backend al cargar el componente
  useEffect(() => {
    const paymentIntent = async () => {
      try {
        const response = await fetch(
          'https://symmetrical-space-garbanzo-jjrv5qg94gpqcpgpx-3001.app.github.dev/api/create-payment',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 1000, currency: 'eur' }) // 1000 = 10€
          }
        );

        const data = await response.json();

        // Validar la respuesta del backend
        if (!response.ok || !data.client_secret) {
          throw new Error(data.error || 'Error al obtener client_secret');
        }

        setClientSecret(data.client_secret);
      } catch (error) {
        console.error('Error al obtener client_secret:', error);
        alert('Hubo un problema al procesar el pago. Intenta de nuevo más tarde.');
      }
    };

    paymentIntent();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que Stripe y Elements estén inicializados
    if (!stripe || !elements) {
      console.error('Stripe o Elements no están inicializados.');
      return;
    }

    // Validar que clientSecret esté disponible
    if (!clientSecret) {
      console.error('Client secret no está disponible.');
      alert('No se pudo completar el pago. Por favor, inténtalo más tarde.');
      return;
    }

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      setLoading(false);

      if (error) {
        console.error('[Error]', error);
        alert('Hubo un problema con tu pago: ' + error.message);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('¡Pago realizado con éxito!');
        alert('Pago realizado con éxito.');
      } else {
        console.error('Error desconocido durante el pago.');
      }
    } catch (error) {
      console.error('Error al confirmar el pago:', error);
      setLoading(false);
    }
  };

  return (
    <form className="w-50 bg-light mx-auto p-3" onSubmit={handleSubmit}>
      <h3 className="text-center">Formulario de Pago</h3>
      <CardElement className="form-control mb-3" />
      <button type="submit" disabled={!stripe || loading} className="btn btn-primary w-100">
        {loading ? 'Procesando...' : 'Pagar'}
      </button>
    </form>
  );
};
