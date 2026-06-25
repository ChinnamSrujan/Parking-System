import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      const redirectPath = response.data.user.role === 'ADMIN' ? '/admin' : '/dashboard';
      window.location.href = redirectPath;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center animate-fade-in"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1600&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 animate-pop-in relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          <img src="/logo.svg" alt="Logo" className="w-14 h-14 mx-auto mb-2 rounded-full shadow" />
          Login
        </h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 font-semibold">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
        <p className="mt-2 text-center">
          <Link to="/admin-login" className="text-gray-400 text-sm hover:underline">Admin Login →</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
