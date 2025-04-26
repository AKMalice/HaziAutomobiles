import React, { useState } from 'react';

const AdminProfile = () => {
    const [adminDetails] = useState({
        name: 'John Paul',
        email: 'jphn@example.com',
        role: 'Marketing Head',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!',
    });

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('New password and confirmation do not match.');
            return;
        }

        alert('Password changed successfully!');
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-12 space-y-6">
            {/* Profile Card */}
            <div className="max-w-[90%] sm:max-w-md w-full bg-white shadow-lg rounded-2xl p-6 text-center mx-auto">
                <div className="relative">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-md"
                    />
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">{adminDetails.name}</h3>
                    <p className="text-gray-600 text-sm">{adminDetails.role}</p>
                    <p className="text-gray-500 text-sm mt-2">{adminDetails.email}</p>
                </div>
            </div>

            {/* Change Password Card */}
            <div className="max-w-[90%] sm:max-w-md w-full bg-white shadow-lg rounded-2xl p-6 mx-auto">
                <h3 className="text-lg font-bold mb-4 text-gray-700">Change Password</h3>
                <form
                    onSubmit={handlePasswordChange}
                    className="space-y-4 text-left"
                >
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
