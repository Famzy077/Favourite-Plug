// 'use client';

// import logo from '/public/Images/Logo.png';
// import Image from 'next/image';
// import { FcGoogle } from 'react-icons/fc';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';


// // const Login = () => {
// //   const [formData, setFormData] = useState({ email: '' });
// //   const router = useRouter();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, email: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //   e.preventDefault();

// //   if (formData.email.trim().length < 5) {
// //     alert('Please enter a valid email or phone number');
// //     return;
// //   }

// //   localStorage.setItem('favoritePlugUser', JSON.stringify({ email: formData.email }));

// //   // Redirect to verification page
// //   router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
// // };
// const apiBase = 'https://favorite-server.onrender.com/api'; 

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '' });
//   const router = useRouter();

//   const handleChange = (e) => {
//     setFormData({ ...formData, email: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.email.trim().length < 5) {
//       alert('Please enter a valid email or phone number');
//       return;
//     }

//     // Example API call to send code
//     try {
//       const res = await fetch(`${apiBase}/auth/send-code`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: formData.email }),
//       });

//       if (!res.ok) throw new Error('Failed to send code');

//       // Save to localStorage and redirect
//       localStorage.setItem('favoritePlugUser', JSON.stringify({ email: formData.email }));
//       router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
//     } catch (error) {
//       alert(error.message);
//     }
//   };


//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
//       <Image src={logo} alt="Favorite Plug Logo" width={60} height={60} />
//       <h2 className="text-xl font-semibold mt-4">Welcome to Favorite Plug</h2>
//       <p className="text-sm text-center text-gray-600 mb-6">
//         Type your e-mail or phone number to log in or create an account.
//       </p>

//       <form onSubmit={handleSubmit} className="w-full max-w-sm">
//         <input
//           type="text"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email or Mobile Number*"
//           className="border w-full px-3 py-2 rounded-md mb-4 text-sm"
//         />

//         <button
//           type="submit"
//           className="w-full cursor-pointer bg-blue-500 text-white font-semibold py-2 rounded-md mb-2 shadow-sm"
//         >
//           Continue
//         </button>
//       </form>

//       <p className="text-xs text-gray-500 mb-4">
//         By continuing you agree to Favorite Plug’s{' '}
//         <span className="underline cursor-pointer text-blue-500">Terms and Conditions</span>
//       </p>

//       <button className="w-full max-w-sm border flex items-center justify-center gap-2 py-2 rounded-md shadow-sm text-sm">
//         <FcGoogle size={20} /> Log in with Google
//       </button>

//       <p className="text-xs text-center text-gray-500 mt-10 max-w-xs">
//         For further support, you may visit the Help Center or contact our customer service team.
//       </p>
//     </div>
//   );
// };

// export default Login;

'use client';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '/public/Images/Logo.png';
import { FcGoogle } from 'react-icons/fc';

const apiBase = 'https://favorite-server.onrender.com/api'; 
// const apiBase = 'http://localhost:5000/api'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email.trim().length < 5) {
      alert('Please enter a valid email or phone number');
      return;
    }

    try {
      const response = await axios.post(`${apiBase}/auth/send-code`, {
        email: formData.email,
      });

      // response.data already parsed JSON
      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert('Code sent successfully!');
      }

      localStorage.setItem('favoritePlugUser', JSON.stringify({ email: formData.email }));

      router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      if (error.response) {
        // Server responded with a status outside 2xx
        alert(`Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request made but no response received
        alert('No response from server. Please try again later.');
      } else {
        // Other errors
        alert(`Error: ${error.message}`);
      }
      console.error(error);
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
