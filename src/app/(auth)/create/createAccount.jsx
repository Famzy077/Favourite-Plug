'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '/public/Images/Logo.png';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const CreateAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: searchParams.get("email") || "your@email.com",
    password: '',
    confirmPassword: ''
  });
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Initialize Axios with base URL
  const api = axios.create({
    baseURL: 'https://favorite-server-0.onrender.com',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return Math.min(strength, 5);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords don't match");
    return;
  }

  if (formData.password.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  }

  try {
    setLoading(true);

    const response = await api.post('/api/auth/create-account', {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    });


    if (response.data.success) {
      router.push('/personal-details');
    } else {
      throw new Error(response.data.message || 'Account creation failed');
    }
  } catch (error) {
    console.error('Full error response:', error.response?.data || error.message);

    if (error.code === 'ECONNABORTED') {
      setError('Request timeout. Please try again.');
    } else if (error.response) {
      switch (error.response.status) {
        case 404:
          setError('Endpoint not found. Please contact support.');
          break;
        case 500:
          setError('Server error. Please try again later.');
          break;
        default:
          setError(error.response.data?.message || 'Request failed');
      }
    } else if (error.request) {
      setError('No response from server. Check your connection.');
    } else {
      setError(error.message || 'An unexpected error occurred');
    }
  } finally {
    setLoading(false);
  }
};

  const getPasswordStrengthColor = () => {
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-blue-500',
      'bg-green-500'
    ];
    return colors[passwordStrength] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center max-w-md mx-auto">
      <Image src={logo} alt="Favorite Plug Logo" width={60} height={60} className="mb-4" />

      <h1 className="text-2xl font-bold mb-2">Create your account</h1>
      <p className="text-gray-600 mb-6">
        Let's get started by creating your account.
      </p>

      {error && (
        <div className="w-full mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="flex-grow bg-transparent border-none focus:ring-0 p-0 m-0 text-sm"
              required
            />
            <button 
              type="button" 
              onClick={() => setIsEditingEmail(true)}
              className="text-blue-500 text-sm font-medium hover:text-blue-700"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="mb-4 text-left">
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
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Password strength:</span>
              <span>
                {passwordStrength < 2 ? 'Weak' : 
                 passwordStrength < 4 ? 'Good' : 'Strong'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div 
                className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`} 
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            To keep your account safe, we need a strong password (min 8 chars)
          </p>
        </div>

        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 pr-10"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
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
              Creating account...
            </span>
          ) : (
            'Continue'
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-10 text-center">
        For further support, you may visit the Help Center or contact our customer service team.
      </p>

      {/* Email Edit Modal */}
      {isEditingEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-md w-full max-w-sm">
            <h3 className="text-lg font-medium mb-4">Edit Email</h3>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditingEmail(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditingEmail(false);
                  router.push('/login')
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAccount;