const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Obtén el clientSecret desde tu backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1099, // Ejemplo de monto en centavos (10.99 USD)
          currency: 'usd',
        }),
      });
      const data = await response.json();
      const clientSecret = data.clientSecret;
  
      // Usa el clientSecret para confirmar el pago
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
  
      if (error) {
        console.error(error);
        // Maneja el error
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Pago exitoso');
        // Maneja el éxito del pago
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>Pagar</button>
      </form>
    );
  };
  
  export default () => (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
  