import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const parkingAPI = {
  getAllParkingLots: () => api.get('/parking-lots'),
  getParkingLotById: (id) => api.get(`/parking-lots/${id}`),
  getSlots: (id) => api.get(`/parking-lots/${id}/slots`),
};

export const bookingAPI = {
  createBooking: (data) => api.post('/bookings', data),
  getUserBookings: (userId) => api.get(`/bookings/user/${userId}`),
  getBookingById: (bookingId) => api.get(`/bookings/${bookingId}`),
  cancelBooking: (bookingId) => api.delete(`/bookings/${bookingId}`),
};

export const paymentAPI = {
  createPaymentIntent: (data) => api.post('/payments/create-intent', data),
  processPayment: (data) => api.post('/payments/process', data),
};

export const adminAPI = {
  createParkingLot: (data) => api.post('/admin/parking-lot', data),
  addSlot: (parkingLotId, data) => api.post(`/admin/add-slot?parkingLotId=${parkingLotId}`, data),
  getAllBookings: () => api.get('/admin/bookings'),
  getAnalytics: () => api.get('/admin/analytics'),
};

export default api;
