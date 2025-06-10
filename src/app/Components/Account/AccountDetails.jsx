'use client';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { FaPen } from 'react-icons/fa';

const fetchUserDetails = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Authentication token not found.');

  try {
    const res = await axios.get('https://favorite-server-0.onrender.com/api/user-details/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userData = res.data.user.userDetails || res.data.user || {};

    return {
      fullName: userData.fullName || '',
      phone: userData.phone || '',
      address: userData.address || '',
    };
  } catch (error) {
    console.error('Failed to fetch user details:', error.response?.data || error.message);
    throw error;
  }
};

const updateUserDetails = async (updatedData) => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Authentication token not found.');

    const res = await axios.post(
        'https://favorite-server-0.onrender.com/api/user-details/me',
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
};

export const AccountDetails = () => {
    // Separate editing states for a better UX
    const [isDetailsEditing, setIsDetailsEditing] = useState(false);
    const [isAddressEditing, setIsAddressEditing] = useState(false);

    // Local form state
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
      queryKey: ['user-details'],
      queryFn: fetchUserDetails,
    });

    // When data loads from the query, update our local form state
    useEffect(() => {
      if (data) {
        setName(data.fullName || '');
        setPhone(data.phone || '');
        setAddress(data.address || '');
      }
    }, [data]);

    const mutation = useMutation({
      mutationFn: updateUserDetails,
      onSuccess: () => {
        // Refetch the user details to show the updated data
        queryClient.invalidateQueries({ queryKey: ['user-details'] });
        // Close both editing forms on successful save
        setIsDetailsEditing(false);
        setIsAddressEditing(false);
      },
      onError: (err) => {
        console.error('Update error:', err);
        // You could set an error state here to show the user
      },
    });

    const handleSave = () => {
      // When saving, send all current form state
      mutation.mutate({ fullName: name, phone, address });
    };

    if (isLoading) {
        return (
          <div className="p-5 m-auto h-[80vh] flex justify-center items-center">
              <Loader size={40} className="animate-spin" />
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
            <h1 className="font-medium">Account details</h1>
            <button
              onClick={() => setIsDetailsEditing(!isDetailsEditing)}
              className="text-blue-500 text-sm"
            >
              {isDetailsEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="p-3 flex flex-col gap-2">
            {isDetailsEditing ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                  placeholder="Full name"
                />
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                    placeholder="Phone number"
                />
                <button
                    onClick={handleSave}
                    disabled={mutation.isLoading}
                    className="mt-2 bg-blue-500 text-white text-sm px-3 py-1 rounded disabled:opacity-50 self-start"
                >
                    {mutation.isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <>
                  <p className="text-sm pb-0">{data?.fullName || 'No name available'}</p>
                  <p className="text-sm text-gray-500 pt-0">
                    {data?.phone || 'No phone available'}
                  </p>
              </>
            )}
        </div>
      </div>

      {/* Address Book Card */}
      <div className="border w-full bg-white border-gray-300 rounded-[5px]">
          <div className="flex items-center justify-between border-b p-3 border-gray-300">
              <h1 className="font-medium">Address Book</h1>
              <FaPen
                onClick={() => setIsAddressEditing(!isAddressEditing)}
                className="text-blue-500 cursor-pointer"
                size={14}
              />
          </div>

          <div className="p-3 py-5 text-sm text-gray-700">
            {isAddressEditing ? (
              <div className="flex flex-col gap-2">
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border rounded px-2 py-1"
                    placeholder="Your address"
                  />
                  <button
                    onClick={handleSave}
                    disabled={mutation.isLoading}
                    className="bg-blue-500 text-white text-sm px-3 py-1 rounded self-start disabled:opacity-50"
                >
                    {mutation.isLoading ? 'Saving...' : 'Save Changes'}
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