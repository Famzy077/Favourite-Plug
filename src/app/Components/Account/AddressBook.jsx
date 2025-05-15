import { useState } from 'react';
import { FaPen } from 'react-icons/fa';

const AddressBook = () => {
  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState('Fish Pond, Ganiyu Sule Agric Ikorodu');

  const handleSave = () => {
    // Save logic (e.g., API call)
    setEditing(false);
  };

  return (
    <main className='border bg-white border-gray-300 rounded-[5px]'>
      <div className='flex items-center justify-between border-b p-3 border-gray-300'>
        <h1 className='font-medium'>Address Book</h1>
        <FaPen onClick={() => setEditing(!editing)} className='text-blue-500 cursor-pointer' size={14} />
      </div>

      <div className='p-3 py-5 text-sm text-gray-700'>
        {editing ? (
          <div className="flex flex-col gap-2">
            <textarea
              rows={2}
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white text-sm px-3 py-1 rounded self-start"
            >
              Save
            </button>
          </div>
        ) : (
          <p>{address}</p>
        )}
      </div>
    </main>
  );
};

export default AddressBook;