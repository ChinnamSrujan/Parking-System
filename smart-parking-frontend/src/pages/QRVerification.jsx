import { useState } from 'react';
import { bookingAPI } from '../services/api';
import QRScanner from '../components/QRScanner';
import VerificationResult from '../components/VerificationResult';

function QRVerification() {
  const [showScanner, setShowScanner] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleScanSuccess = async (bookingId) => {
    try {
      // Verify the booking by fetching it from the backend
      const response = await bookingAPI.getBookingById(bookingId);
      
      if (response.data && response.data.status === 'ACTIVE') {
        setVerificationResult(response.data);
      } else {
        setVerificationResult(null);
      }
      
      setShowScanner(false);
      setShowResult(true);
    } catch (error) {
      console.error('Verification failed:', error);
      setVerificationResult(null);
      setShowScanner(false);
      setShowResult(true);
    }
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setVerificationResult(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">QR Code Verification</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Scan Booking QR Code</h2>
            <p className="text-gray-600 mb-8">
              Scan the QR code from the booking to verify and grant parking access
            </p>
          </div>

          <button
            onClick={() => setShowScanner(true)}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 font-semibold text-lg flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Open QR Scanner
          </button>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Click "Open QR Scanner" button</li>
              <li>• Allow camera access when prompted</li>
              <li>• Position the QR code within the frame</li>
              <li>• Wait for automatic verification</li>
              <li>• View the verification result</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-green-600 font-bold text-lg mb-1">✓ Valid</div>
            <p className="text-green-700 text-sm">Active booking verified</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <div className="text-yellow-600 font-bold text-lg mb-1">⚠ Expired</div>
            <p className="text-yellow-700 text-sm">Booking time passed</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-red-600 font-bold text-lg mb-1">✗ Invalid</div>
            <p className="text-red-700 text-sm">Booking not found</p>
          </div>
        </div>
      </div>

      {showScanner && (
        <QRScanner
          onScanSuccess={handleScanSuccess}
          onClose={() => setShowScanner(false)}
        />
      )}

      {showResult && (
        <VerificationResult
          booking={verificationResult}
          onClose={handleCloseResult}
        />
      )}
    </div>
  );
}

export default QRVerification;
