'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const API_URL = "https://favorite-server-0.onrender.com";

// --- FORGOT PASSWORD PAGE COMPONENT ---
// This component would live at `app/forgot-password/page.jsx`
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Forgot Your Password?</h2>
        <p className="text-center text-sm text-gray-600">
          No problem. Enter your email address below and we'll send you a link to reset it.
        </p>
        
        {message ? (
          <div className="p-4 text-center text-green-700 bg-green-100 rounded-md">
            <FaCheckCircle className="inline-block w-6 h-6 mr-2" />
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <FaSpinner className="animate-spin" /> : 'Send Reset Link'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage