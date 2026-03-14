import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { paymentAPI } from '../services/api';

function StripePaymentForm({ bookingData, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create payment intent
      const intentResponse = await paymentAPI.createPaymentIntent({
        bookingId: bookingData.bookingId,
        userId: bookingData.userId,
        amount: bookingData.amount,
        paymentMethod: 'STRIPE'
      });

      const { clientSecret } = intentResponse.data;

      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Process payment in backend
        const paymentResponse = await paymentAPI.processPayment({
          bookingId: bookingData.bookingId,
          userId: bookingData.userId,
          amount: bookingData.amount,
          paymentMethod: 'STRIPE',
          transactionId: paymentIntent.id
        });

        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Payment failed');
      setProcessing(false);
    }
  };

  const cardElementOptions = {
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h3 className="font-bold text-lg mb-2">Payment Details</h3>
        <p className="text-2xl font-bold text-blue-600">
          ₹{bookingData.amount.toFixed(2)}
        </p>
      </div>

      <div className="border rounded-lg p-4 bg-white">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <CardElement options={cardElementOptions} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!stripe || processing}
          className={`flex-1 py-3 rounded-lg font-semibold text-white ${
            processing || !stripe
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            `Pay ₹${bookingData.amount.toFixed(2)}`
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={processing}
          className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 font-semibold disabled:opacity-50"
        >
          Cancel
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
        </svg>
        Secured by Stripe
      </div>
    </form>
  );
}

export default StripePaymentForm;
