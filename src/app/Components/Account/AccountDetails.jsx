'use client'
import { useState } from 'react';
import AddressBook from './AddressBook';

export const AccountDetails = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Xavier Johnson');
  const [email, setEmail] = useState('xavier@gmail.com');

  const handleSave = () => {
    // Save logic goes here (API call)
    setEditing(false);
  };

  return (
    <section className='flex gap-5 lg:flex max-sm:flex-col max-sm:h-[auto] h-[70vh] justify-between items-center pr'>
        <div className="border w-[100%] bg-white border-gray-300 rounded-[5px]">
            <div className='flex  items-center justify-between border-b p-3 border-gray-300'>
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
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                />
                <button
                    onClick={handleSave}
                    className="mt-2 bg-blue-500 text-white text-sm px-3 py-1 rounded"
                >
                    Save
                </button>
                </div>
            ) : (
                <>
                <p className="text-sm pb-0 p-3">{name}</p>
                <p className="text-sm text-gray-500 pt-0 p-3">{email}</p>
                </>
            )}

        </div>
        <div className='w-[100%]'>
            <AddressBook/>
        </div>
    </section>
  );
};


// "use client";
// import { useState, useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// const fetchUser = async () => {
//   const res = await fetch("/pages/api/user");
//   if (!res.ok) throw new Error("Failed to fetch user data");
//   return res.json();
// };

// const updateUser = async (data) => {
//   const res = await fetch("/pages/api/user", {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) throw new Error("Failed to update user data");
//   return res.json();
// };

// const AccountDetails = () => {
//   const queryClient = useQueryClient();
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["account"],
//     queryFn: fetchUser,
//   });

//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const mutation = useMutation({
//     mutationFn: updateUser,
//     onSuccess: (updatedData) => {
//       // Sync updated data into local state
//       setName(updatedData.name);
//       setEmail(updatedData.email);
//       setEditing(false);
//       queryClient.invalidateQueries({ queryKey: ["account"] });
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setName(data.name);
//       setEmail(data.email);
//     }
//   }, [data]);

//   const handleSave = () => {
//     mutation.mutate({ name, email });
//   };

//   if (isLoading) return <p className="p-3">Please wait, we're loading user details...</p>;
//   if (error) return <p className="p-3 text-red-500">Error: {error.message}</p>;

//   return (
//     <div className="border bg-white border-gray-300 rounded-[5px]">
//       <div className="flex items-center justify-between border-b p-3 border-gray-300">
//         <h1 className="font-medium">Account details</h1>
//         <button
//           onClick={() => setEditing(!editing)}
//           className="text-blue-500 text-sm cursor-pointer"
//         >
//           {editing ? "Cancel" : "Edit"}
//         </button>
//       </div>

//       {editing ? (
//         <div className="p-3 flex flex-col gap-2">
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border rounded px-2 py-1 text-sm"
//           />
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border rounded px-2 py-1 text-sm"
//           />
//           <button
//             onClick={handleSave}
//             className="mt-2 bg-blue-500 text-white text-sm px-3 py-1 rounded cursor-pointer"
//             disabled={mutation.isLoading}
//           >
//             {mutation.isLoading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       ) : (
//         <>
//           <p className="text-sm pb-0 p-3">{data?.name}</p>
//           <p className="text-sm text-gray-500 pt-0 p-3">{data?.email}</p>
//         </>
//       )}
//     </div>
//   );
// };

// export default AccountDetails;