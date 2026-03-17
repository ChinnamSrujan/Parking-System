import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';

// Simple secret code to prevent unauthorized admin registration
const ADMIN_SECRET = 'smartparking@admin';

function AdminRegister() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (secretCode !== ADMIN_SECRET) {
      setError('Invalid admin secret code');
      return;
    }
    try {
      await authAPI.register({ ...formData, role: 'ADMIN' });
      setSuccess('Admin account created! You can now login.');
      setError('');
      setFormData({ name: '', email: '', password: '', phone: '' });
      setSecretCode('');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 animate-fade-in">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 animate-pop-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Admin Register</h2>
          <p className="text-gray-500 text-sm mt-1">Create an admin account</p>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
            {success} <Link to="/admin-login" className="font-bold underline">Login here</Link>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name"
            className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <input type="email" placeholder="Email"
            className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <input type="password" placeholder="Password"
            className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          <input type="tel" placeholder="Phone"
            className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          <input type="password" placeholder="Admin Secret Code"
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={secretCode} onChange={(e) => setSecretCode(e.target.value)} required />
          <button type="submit" className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 font-semibold">
            Create Admin Account
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500 space-y-1">
          <p><Link to="/admin-login" className="text-red-600 hover:underline">Already have an admin account? Login</Link></p>
          <p><Link to="/login" className="text-gray-400 hover:underline">User Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
