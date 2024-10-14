import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalApi from '../GlobalApi';

const ManageUsers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '', // Default value should match backend roles
  });

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // To track if editing a user
  const [editingUserId, setEditingUserId] = useState(null); // Store the user ID being edited

  // Fetch employee data from the backend
  const getEmployees = async () => {
    try {
      const response = await axios.get(`${GlobalApi.baseUrl}/staff/get`);
      setUsers(response.data); // Assuming the API returns an array of employee objects
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password && !isEditing) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6 && !isEditing) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    return newErrors;
  };

  const handleAddUser = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isEditing) {
        // Update user
        const response = await axios.put(`${GlobalApi.baseUrl}/staff/edit/${editingUserId}`, formData);
        setUsers(users.map(user => (user._id === editingUserId ? response.data : user))); // Update users array with edited user
        setIsEditing(false); // Reset editing mode
        setEditingUserId(null); // Clear editing user ID
      } else {
        // Add new user
        const response = await axios.post(`${GlobalApi.baseUrl}/staff/create`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setUsers([...users, response.data]);
      }
      setFormData({ name: '', email: '', password: '', role: 'staff' });
      setErrors({});
    } catch (error) {
      console.error('Error saving user:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditUser = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: '', // Do not pre-fill the password for security reasons
      role: user.role,
    });
    setIsEditing(true); // Switch to editing mode
    setEditingUserId(user._id); // Set the ID of the user being edited
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${GlobalApi.baseUrl}/staff/delete/${userId}`);
      setUsers(users.filter(user => user._id !== userId)); // Remove the deleted user from state
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 m-10">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit User' : 'Manage Users'}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="border p-2 rounded w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border p-2 rounded w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="border p-2 rounded w-full"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="mb-4">
  <select
    name="role"
    value={formData.role}
    onChange={handleInputChange}
    className="border p-2 rounded w-full"
  >
    <option value="">Select Role</option> {/* Default option */}
    <option value="staff">Staff</option>
    <option value="worker">Worker</option>
  </select>
  {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>} {/* Validation error */}
</div>

        </div>

        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white mt-4 p-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update User' : 'Add User'}
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Existing Users</h2>

        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">No users available</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
