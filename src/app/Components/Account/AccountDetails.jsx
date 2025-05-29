'use client';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { FaPen } from 'react-icons/fa';

export const AccountDetails = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const storedUser = localStorage.getItem('favoritePlugUser');
    const storedToken = localStorage.getItem('authToken');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser?.id);
      } catch (e) {
        console.error('Failed to parse user:', e);
      }
    }

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const url = `https://favorite-server-0.onrender.com/api/user-details/${userId}`;

  const { data, isLoading, error } = useQuery({
    queryKey: ['user-details', userId],
    enabled: !!userId && !!token,
    queryFn: async () => {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.userDetails;
    },
  });

  useEffect(() => {
    if (data) {
      setName(data.fullName || '');
      setPhone(data.phone || '');
      setAddress(data.address || '');
    }
  }, [data]);

  const { mutate: updateUserDetails, isLoading: isUpdating } = useMutation({
    mutationFn: async () => {
      const res = await axios.put(
        `https://favorite-server-0.onrender.com/api/user-details/${userId}`,
        { fullName: name, phone, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-details', userId]);
      setEditing(false);
    },
    onError: (err) => {
      console.error('❌ Update error:', err);
    },
  });

  if (isLoading)
    return (
      <div className="p-5 m-auto h-[80vh] flex justify-center items-center">
        <Loader size={40} className="animate-spin" />
      </div>
    );

  if (error)
    return <p className="text-red-500 p-5">Failed to load user details</p>;

  return (
    <section className="flex gap-5 lg:flex max-sm:flex-col max-sm:h-auto h-[70vh] justify-between items-center">
      {/* Account Details Card */}
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

        <div className="p-3 flex flex-col gap-2">
          {editing ? (
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
                onClick={() => updateUserDetails()}
                disabled={isUpdating}
                className="mt-2 bg-blue-500 text-white text-sm px-3 py-1 rounded disabled:opacity-50"
              >
                {isUpdating ? 'Saving...' : 'Save'}
              </button>
            </>
          ) : (
            <>
              <p className="text-sm pb-0">{name || 'No name available'}</p>
              <p className="text-sm text-gray-500 pt-0">
                {phone || 'No phone available'}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Address Book Card */}
      <div className="w-full">
        <main className="border bg-white border-gray-300 rounded-[5px]">
          <div className="flex items-center justify-between border-b p-3 border-gray-300">
            <h1 className="font-medium">Address Book</h1>
            <FaPen
              onClick={() => setEditing(!editing)}
              className="text-blue-500 cursor-pointer"
              size={14}
            />
          </div>

          <div className="p-3 py-5 text-sm text-gray-700">
            {editing ? (
              <div className="flex flex-col gap-2">
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border rounded px-2 py-1"
                />
                <button
                  onClick={() => updateUserDetails()}
                  disabled={isUpdating}
                  className="bg-blue-500 text-white text-sm px-3 py-1 rounded self-start disabled:opacity-50"
                >
                  {isUpdating ? 'Saving...' : 'Save'}
                </button>
              </div>
            ) : (
              <p>{address || 'No address provided'}</p>
            )}
          </div>
        </main>
      </div>
    </section>
  );
};


// 'use client';
// import { useState, useEffect } from 'react';
// import AddressBook from './AddressBook';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { Loader } from 'lucide-react';

// export const AccountDetails = () => {
//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [userId, setUserId] = useState(null);
//   const [token, setToken] = useState(null);
//   const [localUserData, setLocalUserData] = useState(null);

//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('favoritePlugUser');
//     const storedToken = localStorage.getItem('authToken');

//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         console.log('📦 Parsed user object:', parsedUser);
//         setUserId(parsedUser?.id);
//         setLocalUserData(parsedUser);
//         // Set initial values from local storage
//         setName(parsedUser?.fullName || '');
//         setPhone(parsedUser?.phone || '');
//       } catch (e) {
//         console.error('Failed to parse user:', e);
//       }
//     }

//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ['user-details', userId],
//     enabled: !!userId && !!token,
//     queryFn: async () => {
//       try {
//         const res = await axios.get(
//            `https://favorite-server-0.onrender.com/api/user-details/${userId}`,
//           {
//             headers: { 
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             },
//           }
//         );

//         console.log('API Response:', res.data); // Debug log

//         if (!res.data.success) {
//           throw new Error(res.data.message || 'Failed to fetch user details');
//         }

//         return res.data.userDetails || res.data;
//       } catch (err) {
//         console.error('API Error:', err);
//         // Fallback to local data if API fails
//         return localUserData || {
//           fullName: '',
//           phone: ''
//         };
//       }
//     },
//   });

//   // Update state when data is loaded
//   useEffect(() => {
//     if (data) {
//       console.log('Data to display:', data); // Debug log
//       setName(data.fullName || data.name || '');
//       setPhone(data.phone || '');
      
//       // Update local storage with fresh data
//       if (data.fullName || data.phone) {
//         const updatedUser = {
//           ...localUserData,
//           fullName: data.fullName || localUserData?.fullName,
//           phone: data.phone || localUserData?.phone
//         };
//         localStorage.setItem('favoritePlugUser', JSON.stringify(updatedUser));
//       }
//     }
//   }, [data, localUserData]);

//   const { mutate: updateUserDetails, isLoading: isUpdating } = useMutation({
//     mutationFn: async () => {
//       const res = await axios.put(
//         `https://favorite-server-0.onrender.com/api/user-details/${userId}`,
//         { fullName: name, phone },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//         }
//       );
//       return res.data;
//     },
//     onSuccess: (data) => {
//       // Update local storage
//       const updatedUser = {
//         ...localUserData,
//         fullName: name,
//         phone: phone
//       };
//       localStorage.setItem('favoritePlugUser', JSON.stringify(updatedUser));
//       setLocalUserData(updatedUser);
      
//       // Invalidate and refetch
//       queryClient.invalidateQueries(['user-details', userId]);
//       setEditing(false);
//     },
//     onError: (err) => {
//       console.error('Update error:', err);
//       alert(`Failed to update: ${err.response?.data?.message || err.message}`);
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="p-5 m-auto h-[80vh] flex justify-center items-center">
//         <Loader size={40} className="animate-spin" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-5">
//         <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
//           <p className="text-yellow-700">
//             ⚠️ Couldn't fetch latest details: {error.message}
//           </p>
//           <p className="text-sm mt-1">
//             Showing information from local storage
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="flex gap-5 lg:flex max-sm:flex-col max-sm:h-auto h-[70vh] justify-between items-center">
//       <div className="border w-full bg-white border-gray-300 rounded-[5px]">
//         <div className="flex items-center justify-between border-b p-3 border-gray-300">
//           <h1 className="font-medium">Account details</h1>
//           <button
//             onClick={() => setEditing(!editing)}
//             className="text-blue-500 text-sm"
//             disabled={isUpdating}
//           >
//             {editing ? 'Cancel' : 'Edit'}
//           </button>
//         </div>

//         {editing ? (
//           <div className="p-3 flex flex-col gap-2">
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="border rounded px-2 py-1 text-sm"
//               placeholder="Full name"
//               disabled={isUpdating}
//             />
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="border rounded px-2 py-1 text-sm"
//               placeholder="Phone number"
//               disabled={isUpdating}
//             />
//             <button
//               onClick={() => updateUserDetails()}
//               disabled={isUpdating || !name.trim()}
//               className={`mt-2 bg-blue-500 text-white text-sm px-3 py-1 rounded ${
//                 isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
//               }`}
//             >
//               {isUpdating ? 'Saving...' : 'Save'}
//             </button>
//           </div>
//         ) : (
//           <>
//             <p className="text-sm pb-0 p-3">{name || 'No name available'}</p>
//             <p className="text-sm text-gray-500 pt-0 p-3">
//               {phone || 'No phone available'}
//             </p>
//           </>
//         )}
//       </div>

//       <div className="w-full">
//         <AddressBook />
//       </div>
//     </section>
//   );
// };