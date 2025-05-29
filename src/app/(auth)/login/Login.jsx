'use client';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '/public/Images/Logo.png';
import { FcGoogle } from 'react-icons/fc';
import * as yup from 'yup';

const apiBase = 'https://favorite-server-0.onrender.com/api'; 

// Yup validation schema
const schema = yup.object().shape({
  email: yup.string().email('Enter a valid email address').required('Email is required'),
});

const Login = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [Error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
    setError(null); // clear error as user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await schema.validate(formData, { abortEarly: false });

      const response = await axios.post(`${apiBase}/auth/send-code`, {
        email: formData.email,
      });

      if (response.data.message) {
        // Success message from backend (optional to show)
        console.log(response.data.message);
      }

      // Save to local storage
      localStorage.setItem('favoritePlugUser', JSON.stringify({ email: formData.email }));

      // Redirect
      router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      if (err.name === 'ValidationError') {
        setError(err.errors[0]); // Only show the first error
      } else if (err.response) {
        setError(err.response.data?.message || `Error: ${err.response.status}`);
      } else if (err.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError(`Unexpected error: ${err.message}`);
      }
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      <Image src={logo} alt="Favorite Plug Logo" width={60} height={60} />
      <h2 className="text-xl font-semibold mt-4">Welcome to Favorite Plug</h2>
      <p className="text-sm text-center text-gray-600 mb-6">
        Type your e-mail or phone number to log in or create an account.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email or Mobile Number*"
          className="border w-full px-3 py-2 rounded-md mb-4 text-sm"
        />
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
              Continue...
            </span>
          ) : (
            'Continue'
          )}
        </button>

        {Error && <p className="text-red-500 text-sm mt-1.5">{Error}</p>}
      </form>

      <p className="text-xs text-gray-500 mb-4">
        By continuing you agree to Favorite Plug’s{' '}
        <span className="underline cursor-pointer text-blue-500">Terms and Conditions</span>
      </p>

      <button className="w-full max-w-sm border flex items-center justify-center gap-2 py-2 rounded-md shadow-sm text-sm">
        <FcGoogle size={20} /> Log in with Google
      </button>

      <p className="text-xs text-center text-gray-500 mt-10 max-w-xs">
        For further support, you may visit the Help Center or contact our customer service team.
      </p>
    </div>
  );
};

export default Login;