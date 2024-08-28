import React from 'react';
import { useSelector } from 'react-redux';

const UserCard = () => {
  const user = useSelector((state) => state.user.currentUser); // Accessing the current user from Redux store

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800">
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">{user?.username}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-500">Password: ********</p> {/* Masking the password */}
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-500">Welcome to your dashboard!</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
