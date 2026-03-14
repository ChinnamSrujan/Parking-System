function PaymentReceipt({ receipt, onClose }) {

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=600,height=800');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Parking Receipt</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          @page { size: A5; margin: 8mm; }
          body { font-family: Arial, sans-serif; font-size: 12px; color: #333; }
          .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 12px; }
          .header h1 { font-size: 18px; color: #1e40af; margin-bottom: 2px; }
          .header p { font-size: 10px; color: #888; }
          .badge { display: inline-block; background: #dcfce7; color: #16a34a; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; margin-top: 4px; }
          .row { display: flex; gap: 10px; margin-bottom: 10px; }
          .box { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px; }
          .box-green { background: #f0fdf4; border-color: #bbf7d0; }
          .box label { font-size: 9px; text-transform: uppercase; color: #94a3b8; font-weight: bold; display: block; margin-bottom: 3px; }
          .box .value { font-size: 13px; font-weight: bold; color: #1e293b; }
          .box .amount { font-size: 22px; font-weight: bold; color: #16a34a; }
          .box .sub { font-size: 10px; color: #64748b; margin-top: 1px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
          table td { padding: 5px 4px; font-size: 11px; border-bottom: 1px solid #f1f5f9; }
          table td:first-child { color: #64748b; width: 40%; }
          table td:last-child { font-weight: 600; text-align: right; }
          .total-row td { border-top: 2px solid #e2e8f0; font-size: 13px; font-weight: bold; color: #16a34a; padding-top: 7px; }
          .qr-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
          .qr-row img { width: 90px; height: 90px; border: 1px solid #e2e8f0; border-radius: 6px; }
          .txn { font-size: 9px; color: #64748b; font-family: monospace; word-break: break-all; line-height: 1.5; }
          .txn label { font-size: 9px; text-transform: uppercase; color: #94a3b8; font-weight: bold; display: block; margin-bottom: 3px; font-family: Arial; }
          .footer { text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 8px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🅿 Smart Parking</h1>
          <p>Payment Receipt</p>
          <span class="badge">✓ Payment Successful</span>
          <p style="margin-top:4px; font-size:10px; color:#888;">
            Receipt #${receipt.bookingId?.slice(-8).toUpperCase()} &nbsp;|&nbsp; ${new Date().toLocaleDateString('en-IN')}
          </p>
        </div>

        <div class="row">
          <div class="box">
            <label>Customer</label>
            <div class="value">${receipt.userName}</div>
            <div class="sub">${receipt.userEmail}</div>
          </div>
          <div class="box box-green">
            <label>Amount Paid</label>
            <div class="amount">₹${receipt.amount?.toFixed(2)}</div>
            <div class="sub">Card · Stripe</div>
          </div>
        </div>

        <table>
          <tr><td>Location</td><td>${receipt.locationName}</td></tr>
          <tr><td>Slot Number</td><td>${receipt.slotNumber}</td></tr>
          <tr><td>Check-in</td><td>${new Date(receipt.startTime).toLocaleString('en-IN')}</td></tr>
          <tr><td>Check-out</td><td>${new Date(receipt.endTime).toLocaleString('en-IN')}</td></tr>
          <tr><td>Duration</td><td>${receipt.hours} hr${receipt.hours > 1 ? 's' : ''} × ₹${receipt.pricePerHour}/hr</td></tr>
          <tr class="total-row"><td>Total Paid</td><td>₹${receipt.amount?.toFixed(2)}</td></tr>
        </table>

        <div class="qr-row">
          ${receipt.qrCode ? `<img src="data:image/png;base64,${receipt.qrCode}" alt="QR Code" />` : ''}
          <div>
            <div class="txn">
              <label>Transaction ID</label>
              ${receipt.transactionId}
            </div>
            <p style="font-size:10px; color:#64748b; margin-top:6px;">
              Show this QR code at the parking entry gate for verification.
            </p>
          </div>
        </div>

        <div class="footer">Thank you for using Smart Parking! 🚗</div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-5">

          {/* Header */}
          <div className="text-center mb-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-lg font-bold text-gray-800">Payment Receipt</h1>
            </div>
            <p className="text-xs text-gray-400">Receipt #{receipt.bookingId?.slice(-8).toUpperCase()} · {new Date().toLocaleDateString('en-IN')}</p>
          </div>

          {/* Customer + Amount */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-gray-50 rounded-lg p-2.5">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Customer</p>
              <p className="text-sm font-semibold text-gray-800 truncate">{receipt.userName}</p>
              <p className="text-xs text-gray-500 truncate">{receipt.userEmail}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-2.5">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Amount Paid</p>
              <p className="text-2xl font-bold text-green-600">₹{receipt.amount?.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Card · Stripe</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-lg p-2.5 mb-3 text-xs space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-1.5">Booking Details</p>
            {[
              ['Location', receipt.locationName],
              ['Slot', receipt.slotNumber],
              ['Check-in', new Date(receipt.startTime).toLocaleString('en-IN')],
              ['Check-out', new Date(receipt.endTime).toLocaleString('en-IN')],
              ['Duration', `${receipt.hours} hr${receipt.hours > 1 ? 's' : ''} × ₹${receipt.pricePerHour}/hr`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-800 text-right max-w-[60%]">{value}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-gray-200 pt-1 mt-1">
              <span className="font-semibold text-gray-700">Total Paid</span>
              <span className="font-bold text-green-600">₹{receipt.amount?.toFixed(2)}</span>
            </div>
          </div>

          {/* QR + Transaction */}
          <div className="flex items-center gap-3 mb-3">
            {receipt.qrCode && (
              <div className="shrink-0 text-center">
                <img src={`data:image/png;base64,${receipt.qrCode}`} alt="QR" className="w-20 h-20 border border-gray-200 rounded-lg" />
                <p className="text-xs text-gray-400 mt-0.5">Scan at entry</p>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Transaction ID</p>
              <p className="text-xs font-mono text-gray-600 break-all">{receipt.transactionId}</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 border-t pt-2">Thank you for using Smart Parking! 🚗</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-5 pb-4">
          <button onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 font-semibold text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Receipt
          </button>
          <button onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl hover:bg-gray-200 font-semibold text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentReceipt;
