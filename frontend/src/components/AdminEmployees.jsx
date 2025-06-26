import React, { useState } from "react";

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([
    { id: 1, photo: "", name: "Ajay Simha", phone: "1234567890", role: "Clerk" },
    { id: 2, photo: "", name: "Ram Charan", phone: "9876543210", role: "Manager" },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    photo: "",
    name: "",
    phone: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [error, setError] = useState("");

  const validateFields = () => {
    const { name, phone, role } = newEmployee;
    if (!name || !phone || !role || phone.length !== 10) {
      setError("All fields are required, and the phone number must be 10 digits.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddEmployee = () => {
    if (!validateFields()) return;
    setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
    setNewEmployee({ photo: "", name: "", phone: "", role: "" });
  };

  const handleSaveEdit = () => {
    if (!validateFields()) return;
    setEmployees(
      employees.map((employee) =>
        employee.id === editEmployeeId ? { ...newEmployee, id: editEmployeeId } : employee
      )
    );
    setNewEmployee({ photo: "", name: "", phone: "", role: "" });
    setIsEditing(false);
    setEditEmployeeId(null);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleEditEmployee = (id) => {
    const employeeToEdit = employees.find((employee) => employee.id === id);
    setNewEmployee(employeeToEdit);
    setIsEditing(true);
    setEditEmployeeId(id);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewEmployee({ ...newEmployee, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-[90%] mx-auto font-sans">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Employees</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-6 space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <input
          type="file"
          onChange={handlePhotoUpload}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Phone"
          value={newEmployee.phone}
          onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Role"
          value={newEmployee.role}
          onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {isEditing ? (
          <button
            onClick={handleSaveEdit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleAddEmployee}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Add Employee
          </button>
        )}
      </div>
      <div className="mb-6 bg-white rounded-lg shadow-lg overflow-hidden">
        <h3 className="text-xl font-bold p-4 bg-gray-100 text-gray-800 border-b border-gray-200">
          Employee List
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="py-3 px-6 text-left border-b border-gray-300">Photo</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Name</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Phone</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Role</th>
                <th className="py-3 px-6 text-left border-b border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">
                    {employee.photo ? (
                      <img
                        src={employee.photo}
                        alt={employee.name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">{employee.name}</td>
                  <td className="py-3 px-6 text-left">{employee.phone}</td>
                  <td className="py-3 px-6 text-left">{employee.role}</td>
                  <td className="py-3 px-6 text-left flex space-x-2">
                    <button
                      onClick={() => handleEditEmployee(employee.id)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployees;
