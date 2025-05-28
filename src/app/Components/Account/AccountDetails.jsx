'use client';
import { useState, useEffect } from 'react';
import AddressBook from './AddressBook';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader } from 'lucide-react';

export const AccountDetails = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('favoritePlugUser');
    const storedToken = localStorage.getItem('authToken');

    if (storedUser) {
      try {
        // console.log('🧾 Raw storedUser:', storedUser);
        const parsedUser = JSON.parse(storedUser);
        // console.log('📦 Parsed user object:', parsedUser);
        setUserId(parsedUser?.id);
      } catch (e) {
        console.error('❌ Failed to parse user:', e);
      }
    }

    if (storedToken) {
      setToken(storedToken);
      // console.log('🔑 Loaded token:', storedToken);
    }
  }, []);

  const url = `https://favorite-server-0.onrender.com/api/user-details/${userId}`;

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    enabled: !!userId && !!token,
    queryFn: async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log('✅ API full response:', res.data);
        return res.data.userDetails;
      } catch (err) {
        console.error('❌ Error fetching user details:', err);
        throw err;
      }
    },
  });

  // Update state when data is loaded
  useEffect(() => {
    if (data) {
      setName(data.fullName || '');
      setPhone(data.phone || '');
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="p-5 m-auto h-[80vh] flex justify-center items-center">
        <Loader size={40} className="animate-spin" />
      </div>
    );

  if (error)
    return <p className="text-red-500 p-5">❌ Failed to load user details</p>;

  return (
    <section className="flex gap-5 lg:flex max-sm:flex-col max-sm:h-auto h-[70vh] justify-between items-center">
      <div className="border w-full bg-white border-gray-300 rounded-[5px]">
        <div className="flex items-center justify-between border-b p-3 border-gray-300">
          <h1 className="font-medium">Account details</h1>
          <button
            onClick={() => setEditing(!editing)}
            className="text-blue-500 text-sm"
          >
            {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {editing ? (
          <div className="p-3 flex flex-col gap-2">
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
              onClick={() => alert('Saving is disabled in this version.')}
              className="mt-2 bg-blue-500 text-white text-sm px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm pb-0 p-3">{name || 'No name available'}</p>
            <p className="text-sm text-gray-500 pt-0 p-3">
              {phone || 'No phone available'}
            </p>
          </>
        )}
      </div>

      <div className="w-full">
        <AddressBook />
      </div>
    </section>
  );
};