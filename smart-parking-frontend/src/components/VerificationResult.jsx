function VerificationResult({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          {booking ? (
            <>
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-green-600 mb-2">Verified!</h2>
                <p className="text-xl text-gray-700 mb-6">
                  You can park the vehicle in the slot
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-bold text-lg mb-3">Booking Details:</h3>
                <div className="space-y-2">
                  <p><strong>Booking ID:</strong> {booking.id}</p>
                  <p><strong>Slot ID:</strong> {booking.slotId}</p>
                  <p><strong>Status:</strong> 
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                      {booking.status}
                    </span>
                  </p>
                  <p><strong>Start Time:</strong> {new Date(booking.bookingStartTime).toLocaleString()}</p>
                  <p><strong>End Time:</strong> {new Date(booking.bookingEndTime).toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-semibold text-lg">
                  ✓ Access Granted
                </p>
                <p className="text-green-700 text-sm mt-1">
                  Please proceed to your assigned parking slot
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-red-600 mb-2">Invalid QR Code</h2>
                <p className="text-xl text-gray-700 mb-4">
                  Booking not found or expired
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-6">
                <p className="text-red-800 font-semibold">
                  ✗ Access Denied
                </p>
                <p className="text-red-700 text-sm mt-1">
                  Please contact support or make a new booking
                </p>
              </div>
            </>
          )}

          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerificationResult;
