'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '/public/Images/Logo.png';

const PersonalDetails = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    prefix: '+234',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Validate phone number (basic validation)
    if (!/^\d+$/.test(formData.phoneNumber)) {
      alert('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to next page after successful submission
      router.push('/home');
    } catch (error) {
      console.error('Error saving details:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center max-w-md mx-auto">
      <Image src={logo} alt="Favorite Plug Logo" width={60} height={60} className="mb-4" />

      <h1 className="text-2xl font-bold mb-2">Personal details</h1>
      <p className="text-gray-600 mb-6">
        We just need you to fill in some details.
      </p>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your last name"
            required
          />
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
              {/* Add more country codes as needed */}
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+233">+233</option>
            </select>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="flex-grow border border-gray-300 rounded-r-md p-2"
              placeholder="Enter your phone number"
              required
            />
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