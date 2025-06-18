'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react'; // Loader is from lucide-react
import { FaPen } from 'react-icons/fa'; // FaPen is from react-icons
import { Textarea } from '@/components/ui/textarea';

const API_URL = "https://favorite-server-0.onrender.com";

// Updated to fetch email as well
const fetchUserDetails = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Authentication token not found.');

  try {
    const res = await axios.get(`${API_URL}/api/user-details/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userData = res.data.user || {};
    const userDetails = userData.userDetails || {};
    
    return {
      email: userData.email || '', // Get email from the main user object
      fullName: userDetails.fullName || '',
      phone: userDetails.phone || '',
      address: userDetails.address || '',
    };
  } catch (error) {
    console.error('Failed to fetch user details:', error.response?.data || error.message);
    throw error;
  }
};

// Updated to use PUT method
const updateUserDetails = async (updatedData) => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Authentication token not found.');

    // Using PUT is more conventional for updates
    const res = await axios.post(
        `${API_URL}/api/user-details`, 
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
};

export const AccountDetails = () => {
    const [isDetailsEditing, setIsDetailsEditing] = useState(false);
    const [isAddressEditing, setIsAddressEditing] = useState(false);

    // Local form state
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
      queryKey: ['user-details'],
      queryFn: fetchUserDetails,
    });

    // When data loads, update our local form state
    useEffect(() => {
      if (data) {
        setEmail(data.email || '');
        setFullName(data.fullName || '');
        setPhone(data.phone || '');
        setAddress(data.address || '');
      }
    }, [data]);

    // Updated mutation with toast notifications
    const mutation = useMutation({
      mutationFn: updateUserDetails,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user-details'] });
        toast.success('Account details updated successfully!');
        setIsDetailsEditing(false);
        setIsAddressEditing(false);
      },
      onError: (err) => {
        console.error('Update error:', err);
        toast.error(err.response?.data?.message || 'Failed to update details.');
      },
    });

    const handleSave = () => {
      // Send only the fields that are being edited
      const dataToUpdate = { fullName, phone, address };
      mutation.mutate(dataToUpdate);
    };

    if (isLoading) {
        return (
          <div className="p-5 flex justify-center items-center h-64">
              <Loader size={40} className="animate-spin text-blue-500" />
          </div>
        );
    }

    if (error) {
        return (
          <div className="p-5 text-red-500">
            Failed to load user details. Please try logging in again.
          </div>
        );
    }

    return (
      <section className="flex gap-5 lg:flex-row flex-col h-auto">
        {/* Account Details Card */}
        <div className="border w-full bg-white border-gray-300 rounded-[5px]">
          <div className="flex items-center justify-between border-b p-3 border-gray-300">
            <h1 className="font-medium">Account Details</h1>
            <button
              onClick={() => setIsDetailsEditing(!isDetailsEditing)}
              className="text-blue-500 text-sm font-semibold"
            >
              {isDetailsEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="p-3 flex flex-col gap-3">
            {isDetailsEditing ? (
              <>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border rounded px-2 py-1.5 text-sm"
                  placeholder="Full name"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border rounded px-2 py-1.5 text-sm"
                  placeholder="Phone number"
                />
                <button
                  onClick={handleSave}
                  disabled={mutation.isLoading}
                  className="mt-2 bg-blue-500 text-white text-sm px-4 py-2 rounded-md disabled:opacity-50 self-start hover:bg-blue-600"
                >
                  {mutation.isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold"><span className='font-bold'>Name:</span> {data?.fullName || 'No name provided'}</p>
                {/* Display Email (read-only) */}
                <p className="text-sm text-gray-600"><span className='font-bold text-black'>Email:</span> {data?.email}</p>
                <p className="text-sm text-gray-600"> <span className='font-bold text-black'>Phone:</span> 
                  {data?.phone || 'No phone number provided'}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Address Book Card */}
        <div className="border w-full bg-white border-gray-300 rounded-[5px]">
            <div className="flex items-center justify-between border-b p-3 border-gray-300">
              <h1 className="font-medium">Address Book</h1>
              <button onClick={() => setIsAddressEditing(!isAddressEditing)} className="text-blue-500 text-sm font-semibold">
                {isAddressEditing ? 'Cancel' : <FaPen size={14} />}
              </button>
            </div>

            <div className="p-3 text-sm text-gray-700">
              {isAddressEditing ? (
                <div className="flex flex-col gap-2">
                  <Textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border rounded px-2 py-1"
                    placeholder="Your address"
                  />
                  <button
                    onClick={handleSave}
                    disabled={mutation.isLoading}
                    className="mt-2 bg-blue-500 text-white text-sm px-4 py-2 rounded-md disabled:opacity-50 self-start hover:bg-blue-600"
                  >
                    {mutation.isLoading ? 'Saving...' : 'Save Address'}
                  </button>
                </div>
              ) : (
                <p>{data?.address || 'No address provided'}</p>
              )}
            </div>
        </div>
      </section>
    );
};
