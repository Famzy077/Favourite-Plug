'use client';

import logo from '/public/Images/Logo.png';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email.trim().length < 5) {
      alert('Please enter a valid email or phone number');
      return;
    }

    // Navigate to verification page with email as query
    router.push(`/pages/verify?email=${encodeURIComponent(formData.email)}`);
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
          className="w-full cursor-pointer bg-blue-500 text-white font-semibold py-2 rounded-md mb-2 shadow-sm"
        >
          Continue
        </button>
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