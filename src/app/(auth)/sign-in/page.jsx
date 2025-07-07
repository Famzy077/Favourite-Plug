'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '/public/Images/Logo.png';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import * as yup from 'yup'; // ✅ yup schema

// ✅ Define validation schema
const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required')
});

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const api = axios.create({
    baseURL: 'https://favorite-server-0.onrender.com',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await validationSchema.validate(formData, { abortEarly: false });
    } catch (validationError) {
      if (validationError.inner?.length > 0) {
        setError(validationError.inner[0].message);
      } else {
        setError(validationError.message);
      }
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('favoritePlugUser', JSON.stringify(response.data.user));
        router.push('/home');
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);

      let errorMessage = 'An error occurred during login';
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = 'Invalid email or password';
            break;
          case 401:
            errorMessage = 'Unauthorized - Please check your credentials';
            break;
          case 404:
            errorMessage = 'User not found';
            break;
          case 500:
            errorMessage = 'Server error - Please try again later';
            break;
          default:
            errorMessage = error.response.data?.message || 'Login failed';
        }
      } else if (error.request) {
        errorMessage = 'No response from server - Check your connection';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout - Please try again';
      } else {
        errorMessage = error.message || 'Login failed';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center max-w-md mx-auto">
      <Image src={logo} alt="Favvorite plug Logo" width={60} height={60} className="mb-4" />
      <h1 className="text-2xl font-bold mb-2">Welcome Back To Favvorite plug</h1>
      <p className="text-gray-600 mb-6">Log in</p>

      {error && (
        <div className="w-full mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 pr-10"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Forgotten password?
            </a>
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition ${
            loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-10 text-center">
        For further support, you may visit the Help Center or contact our customer service team.
      </p>
    </div>
  );
};

export default SignIn;