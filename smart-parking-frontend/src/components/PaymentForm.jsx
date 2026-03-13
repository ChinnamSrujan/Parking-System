import { useState } from 'react';

function PaymentForm({ amount, onSubmit, onCancel }) {
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ paymentMethod, ...cardDetails });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      <p className="text-xl mb-6">Amount: <strong>${amount.toFixed(2)}</strong></p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="CARD">Credit/Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="WALLET">Wallet</option>
          </select>
        </div>

        {paymentMethod === 'CARD' && (
          <>
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-2 mb-3 border rounded"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="MM/YY"
                className="p-2 border rounded"
                value={cardDetails.expiryDate}
                onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="CVV"
                className="p-2 border rounded"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                required
              />
            </div>
          </>
        )}

        <div className="flex gap-4">
          <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Pay Now
          </button>
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
