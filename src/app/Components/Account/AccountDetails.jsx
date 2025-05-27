// 'use client';
// import { useState } from 'react';
// import AddressBook from './AddressBook';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { Loader } from 'lucide-react';

// export const AccountDetails = ({ id }) => {
//   const queryClient = useQueryClient();
//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//     const url = 'https://favorite-server-0.onrender.com/api/auth/accounts/6937d073-85a6-44de-b0ff-17cdde9b4726'

//   // Fetch user
//   const { data, isLoading, error } = useQuery({
//     queryKey: ['user', id],
//     queryFn: async () => {
//     //   const res = await axios.get(`${url}/api/auth/accounts/${id}`);
//       const res = await axios.get(`${url}`);
//       console.log(res.data);
//       return res.data;
//     },
//     onSuccess: (data) => {
//       setName(data.user.name || '');
//       setEmail(data.user.email || '');
//     },
//   });

//   // Update user
//   const mutation = useMutation({
//     mutationFn: async () => {
//       return await axios.put(`${url}/api/auth/accounts/${id}`, {
//         name,
//         email,
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['user', id] });
//       setEditing(false);
//     },
//   });

//   if (isLoading) return <div className="p-5 m-auto place-items-center place-content-center h-[80vh]"><Loader size={40} className="animate-spin" /></div>;
//   if (error) return <p className="text-red-500 p-5">Failed to load user details</p>;

//   const user = data?.user;

//   return (
//     <section className='flex gap-5 lg:flex max-sm:flex-col max-sm:h-auto h-[70vh] justify-between items-center'>
//       <div className="border w-full bg-white border-gray-300 rounded-[5px]">
//         <div className='flex items-center justify-between border-b p-3 border-gray-300'>
//           <h1 className='font-medium'>Account details</h1>
//           <button onClick={() => setEditing(!editing)} className="text-blue-500 text-sm">
//             {editing ? 'Cancel' : 'Edit'}
//           </button>
//         </div>

//         {editing ? (
//           <div className="p-3 flex flex-col gap-2">
//             <input
//               type="text"
//               value={name}
//               onChange={e => setName(e.target.value)}
//               className="border rounded px-2 py-1 text-sm"
//             />
//             <input
//               type="email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               className="border rounded px-2 py-1 text-sm"
//             />
//             <button
//               onClick={() => mutation.mutate()}
//               disabled={mutation.isLoading}
//               className="mt-2 bg-blue-500 text-white text-sm px-3 py-1 rounded disabled:opacity-50"
//             >
//               {mutation.isLoading ? 'Saving...' : 'Save'}
//             </button>
//           </div>
//         ) : (
//           <>
//             <p className="text-sm pb-0 p-3">{user.name || 'No name available'}</p>
//             <p className="text-sm text-gray-500 pt-0 p-3">{user.email}</p>
//           </>
//         )}
//       </div>

//       <div className='w-full'>
//         <AddressBook />
//       </div>
//     </section>
//   );
// };

'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddressBook from './AddressBook';
import { Loader } from 'lucide-react';

export const AccountDetails = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://favorite-server-0.onrender.com/api/user-details?userId=${id}`);
        const data = res.data?.userDetails;
        setName(data?.fullName || '');
        setPhone(data?.phone || '');
        setError('');
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!id) return <div className="text-red-500 p-5">No user ID provided</div>;
  if (loading) return <div className="p-5 m-auto place-items-center place-content-center h-[80vh]"><Loader size={40} className="animate-spin" /></div>;
  if (error) return <p className="text-red-500 p-5">{error}</p>;

  return (
    <section className='flex gap-5 lg:flex max-sm:flex-col max-sm:h-auto h-[70vh] justify-between items-center'>
      <div className="border w-full bg-white border-gray-300 rounded-[5px]">
        <div className='flex items-center justify-between border-b p-3 border-gray-300'>
          <h1 className='font-medium'>Account details</h1>
          <button onClick={() => setEditing(!editing)} className="text-blue-500 text-sm">
            {editing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {editing ? (
          <div className="p-3 flex flex-col gap-2">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
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
            <p className="text-sm text-gray-500 pt-0 p-3">{phone || 'No phone available'}</p>
          </>
        )}
      </div>

      <div className='w-full'>
        <AddressBook />
      </div>
    </section>
  );
};
