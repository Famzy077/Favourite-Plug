'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '/public/Images/Logo.png';

const VerifyEmail = () => {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your@email.com";
  

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);

    // Focus next input
    const next = document.getElementById(`code-${index + 1}`);
    if (value && next) next.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Verifying code: ${code.join('')} for ${email}`);
      //  API here to validate the code
     router.push('/home')
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <Image src={logo} alt="Favorite Plug Logo" width={60} height={60} className="mb-4" />

      <h1 className="text-xl font-semibold">Verify your email address</h1>
      <p className="text-gray-600 text-sm mb-6">
        We have sent a verification code to <br />
        <span className="font-medium">{email}</span>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
        <div className="flex gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 border border-gray-400 text-center rounded-md focus:outline-blue-500 text-xl"
            />
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 transition cursor-pointer"
        >
          Submit
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-4">
        Didn&apos;t receive the verification code? It could take a bit of time, request a new code in <span className="text-blue-500">55 seconds</span>
      </p>

      <p className="text-xs text-gray-500 mt-10 max-w-md">
        For further support, you may visit the Help Center or contact our customer service team.
      </p>
    </div>
  );
};

export default VerifyEmail;