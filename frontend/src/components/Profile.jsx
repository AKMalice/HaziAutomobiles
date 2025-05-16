import React, { useState } from "react";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main Street, Cityville",
    photo: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-neutral mb-6">
          {editing ? "Edit Profile" : "My Profile"}
        </h2>
        <form onSubmit={handleSave}>
          {/* Profile Picture */}
          <div className="mb-6 text-center">
            <img
              src={formData.photo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            {editing && (
              <input
                type="file"
                accept="image/*"
                className="block mx-auto text-sm"
                onChange={(e) =>
                  setFormData({ ...formData, photo: URL.createObjectURL(e.target.files[0]) })
                }
              />
            )}
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!editing}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!editing}
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="input input-bordered w-full"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!editing}
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <textarea
              name="address"
              className="textarea textarea-bordered w-full"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!editing}
            />
          </div>

          {/* Change Password */}
          {editing && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">New Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            {editing ? (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleEditToggle}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={handleEditToggle}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
