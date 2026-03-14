import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from './StripePaymentForm';
import PaymentReceipt from './PaymentReceipt';

const stripePromise = loadStripe('pk_test_51Pj0VpGc33FIU749EMLawVQkOV7spemXurv4haAxQUKgE1lQ8luRK2zWq9Q5UmC7VcPEL3viRHW1DQKWC7FxsllR00R0pn2vQQ');

function BookingModal({ slot, parkingLot, onClose, onConfirm }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [hours, setHours] = useState(2);
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + hours * 60 * 60 * 1000);
  const totalAmount = parkingLot.pricePerHour * hours;

  const handleConfirm = async () => {
    try {
      const data = {
        userId: user.id,
        parkingLotId: parkingLot.id,
        slotId: slot.slotId,
        bookingStartTime: startTime.toISOString(),
        bookingEndTime: endTime.toISOString()
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Failed to create booking');
      const booking = await response.json();

      setBookingData({ ...data, bookingId: booking.id, qrCode: booking.qrCode, amount: totalAmount });
      setShowPayment(true);
    } catch (error) {
      alert('Failed to create booking: ' + error.message);
    }
  };

  const handlePaymentSuccess = (transactionId) => {
    setReceiptData({
      bookingId: bookingData.bookingId,
      userName: user.name,
      userEmail: user.email,
      locationName: parkingLot.locationName,
      slotNumber: slot.slotNumber,
      startTime: bookingData.bookingStartTime,
      endTime: bookingData.bookingEndTime,
      hours,
      pricePerHour: parkingLot.pricePerHour,
      amount: totalAmount,
      transactionId,
      qrCode: bookingData.qrCode
    });
    setShowPayment(false);
    setShowReceipt(true);
  };

  const handleReceiptClose = async () => {
    setShowReceipt(false);
    await onConfirm(bookingData);
  };

  return (
    <>
      {!showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            {!showPayment ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
                <div className="space-y-3 mb-6">
                  <p><strong>Location:</strong> {parkingLot.locationName}</p>
                  <p><strong>Slot:</strong> {slot.slotNumber}</p>
                  <p><strong>Start Time:</strong> {startTime.toLocaleString()}</p>
                  <div>
                    <label className="block mb-2"><strong>Duration (hours):</strong></label>
                    <input
                      type="number" min="1" max="24" value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value))}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <p><strong>End Time:</strong> {endTime.toLocaleString()}</p>
                  <p className="text-xl"><strong>Total Amount:</strong> ₹{totalAmount.toFixed(2)}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={handleConfirm} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Proceed to Payment
                  </button>
                  <button onClick={onClose} className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Payment</h2>
                <Elements stripe={stripePromise}>
                  <StripePaymentForm
                    bookingData={{ ...bookingData, amount: totalAmount }}
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setShowPayment(false)}
                  />
                </Elements>
              </>
            )}
          </div>
        </div>
      )}

      {showReceipt && receiptData && (
        <PaymentReceipt receipt={receiptData} onClose={handleReceiptClose} />
      )}
    </>
  );
}

export default BookingModal;
