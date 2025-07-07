'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '/public/Images/Logo.png';
import { Loader } from 'lucide-react';

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTime, setResendTime] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Handle resend timer
  useEffect(() => {
    let timer;
    if (resendTime > 0) {
      timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTime]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);
    setError('');

    if (value && index < 3) {
      const next = document.getElementById(`code-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prev = document.getElementById(`code-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').trim();
    if (/^\d{4}$/.test(pasteData)) {
      const pastedCode = pasteData.split('');
      setCode(pastedCode);
      document.getElementById('code-3').focus();
    }
  };

  const resendCode = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('https://favorite-server-0.onrender.com/api/auth/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resend code');
      }

      setResendTime(60);
      setCanResend(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');

    if (verificationCode.length < 4) {
      setError('Please enter the full 4-digit code');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('https://favorite-server-0.onrender.com/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      if (data.success) {
        localStorage.setItem('verifiedEmail', email);

        const checkResponse = await fetch(
          `https://favorite-server-0.onrender.com/api/auth/check-email?email=${encodeURIComponent(email)}`
        );
        const checkData = await checkResponse.json();

        if (checkData.exists) {
          router.push('/sign-in');
        } else {
          router.push(`/create?email=${encodeURIComponent(email)}`);
        }
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (error) {
      setError(error.message || 'Verification failed. Please try again.');
      setCode(['', '', '', '']);
      document.getElementById('code-0').focus();
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <Image src={logo} alt="Favvorite plug Logo" width={60} height={60} className="mb-4" />
        <h1 className="text-xl font-semibold mb-2">Email Required</h1>
        <p className="text-gray-600 mb-6">Please provide an email address to verify</p>
        <button
          onClick={() => router.push('/login')}
          className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 transition cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center max-w-md mx-auto">
      <Image src={logo} alt="Favvorite plug Logo" width={60} height={60} className="mb-4" />

      <h1 className="text-xl font-semibold mb-2">Verify your email address</h1>
      <p className="text-gray-600 text-sm mb-6">
        We've sent a verification code to <br />
        <span className="font-medium">{email}</span>
      </p>

      {error && (
        <div className="w-full mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} onPaste={handlePaste} className="flex flex-col items-center gap-6 w-full">
        <fieldset className="flex gap-3" aria-label="4-digit verification code">
          <legend className="sr-only">Verification Code</legend>
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 border border-gray-300 text-center rounded-md focus:outline-blue-500 focus:ring-2 focus:ring-blue-200 text-xl"
              autoFocus={index === 0}
              disabled={loading}
            />
          ))}
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition ${
            loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="animate-spin h-5 w-5" />
              Verifying...
            </span>
          ) : (
            'Verify Code'
          )}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        {loading && !canResend ? (
          <span className="text-blue-400">Resending...</span>
        ) : canResend ? (
          <button
            onClick={resendCode}
            className="text-blue-500 hover:text-blue-700 font-medium"
            disabled={loading}
          >
            Resend Verification Code
          </button>
        ) : (
          `Didn't receive the code? Request a new code in ${resendTime} seconds`
        )}
      </p>

      <p className="text-xs text-gray-500 mt-10">
        For further support, you may visit the Help Center or contact our customer service team.
      </p>
    </div>
  );
};

export default VerifyEmail;
