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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Employees</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-6 space-y-4">
        <input
          type="file"
          onChange={handlePhotoUpload}
          className="block w-full p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          className="block w-full p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Phone"
          value={newEmployee.phone}
          onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
          className="block w-full p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Role"
          value={newEmployee.role}
          onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
          className="block w-full p-2 border rounded-md"
        />
        {isEditing ? (
          <button
            onClick={handleSaveEdit}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleAddEmployee}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Employee
          </button>
        )}
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Photo</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border px-4 py-2">
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
              <td className="border px-4 py-2">{employee.name}</td>
              <td className="border px-4 py-2">{employee.phone}</td>
              <td className="border px-4 py-2">{employee.role}</td>
              <td className="border px-4 py-2 flex space-x-2">
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
  );
};

export default AdminEmployees;
