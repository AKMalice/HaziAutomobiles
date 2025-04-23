import React, { useState } from 'react';

const AdminProfile = () => {
    const [adminDetails] = useState({
        name: 'Admin Name',
        email: 'admin@example.com',
        role: 'Administrator',
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
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Admin Profile</h2>

            {/* Admin Details */}
            <div className="mb-6 border border-gray-300 p-4 rounded">
                <h3 className="text-lg font-bold mb-4">Profile Details</h3>
                <p><strong>Name:</strong> {adminDetails.name}</p>
                <p><strong>Email:</strong> {adminDetails.email}</p>
                <p><strong>Role:</strong> {adminDetails.role}</p>
            </div>

            {/* Change Password */}
            <div className="border border-gray-300 p-4 rounded">
                <h3 className="text-lg font-bold mb-4">Change Password</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium">Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Confirm New Password</label>
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
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;