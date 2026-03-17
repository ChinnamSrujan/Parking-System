import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';

function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(formData);
      if (response.data.user.role !== 'ADMIN') {
        setError('This account does not have admin privileges');
        return;
      }
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = '/admin';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
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
          <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-gray-500 text-sm mt-1">Sign in to admin dashboard</p>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Admin Email"
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <input type="password" placeholder="Password"
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          <button type="submit" className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 font-semibold">
            Login as Admin
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500 space-y-1">
          <p><Link to="/admin-register" className="text-red-600 hover:underline">Create admin account</Link></p>
          <p><Link to="/login" className="text-gray-400 hover:underline">User Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
