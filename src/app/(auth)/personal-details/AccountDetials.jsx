'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import * as yup from 'yup';
import { AlertCircle, Loader } from 'lucide-react';
import logo from '/public/Images/Logo.png';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  prefix: yup.string().required(),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .required('Phone number is required'),
  address: yup.string().required('Address is required'),
});

const PersonalDetails = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem('favoritePlugUser') || '{}');

  const [formData, setFormData] = useState({
    firstName: storedUser?.fullName?.split(' ')[0] || '',
    lastName: storedUser?.fullName?.split(' ')[1] || '',
    address: storedUser?.address || '',
    prefix: storedUser?.phone?.slice(0, 4) || '+234',
    phoneNumber: storedUser?.phone?.slice(4) || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setApiError(null);

    try {
      await schema.validate(formData, { abortEarly: false });

      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const fullPhoneNumber = `${formData.prefix}${formData.phoneNumber}`;

      const payload = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        phone: fullPhoneNumber,
        address: formData.address,
      };

      // Optional: Skip API call if nothing has changed
      const storedPhone = storedUser?.phone;
      const storedFullName = storedUser?.fullName;
      const storedAddress = storedUser?.address;

      if (
        storedPhone === payload.phone &&
        storedFullName === payload.fullName &&
        storedAddress === payload.address
      ) {
        setLoading(false);
        router.push('/home');
        return;
      }

      const response = await axios.post(
        'https://favorite-server-0.onrender.com/api/user-details',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      localStorage.setItem('favoritePlugUser', JSON.stringify({
        ...storedUser,
        fullName: payload.fullName,
        phone: payload.phone,
        address: payload.address
      }));

      router.push('/home');
    } catch (err) {
      if (err.name === 'ValidationError') {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else if (err.response?.status === 409) {
        setApiError('This phone number is already registered. Please use a different number.');
      } else {
        setApiError(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center max-w-md mx-auto">
      <Image src={logo} alt="Favorite Plug Logo" width={60} height={60} className="mb-4" />

      <h1 className="text-2xl font-bold mb-2">Personal details</h1>
      <p className="text-gray-600 mb-6">We just need you to fill in some details.</p>

      {apiError && (
        <div className="w-full mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
          <div className="flex">
            <select
              name="prefix"
              value={formData.prefix}
              onChange={handleChange}
              className="border border-gray-300 rounded-l-md p-2 bg-gray-100"
            >
              <option value="+234">+234 ▼</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+233">+233</option>
            </select>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`flex-grow border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-r-md p-2`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            placeholder="123 Street Name, City"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

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
              Processing...
            </span>
          ) : (
            'Continue'
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-10 text-center">
        For further support, you may visit the Help Center or contact our customer service team.
      </p>
    </div>
  );
};

export default PersonalDetails;