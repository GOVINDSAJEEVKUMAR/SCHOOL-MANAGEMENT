import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, addStudent,updateStudent,deleteStudent,} from "../../Redux/studentSlice";

const StudentDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    std: "",
    gender: "",
    bookname: "",
    section: "",
    purchasedate: "",
    returndate: "",
    fees: "",
    date: "",
    remarks: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      if (isEditing) {
        await dispatch(updateStudent({ id: editingUserId, studentData: formData }));
      } else {
        await dispatch(addStudent(formData));
      }
      resetForm();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEditUser = (user) => {
    setFormData({
      name: user.name,
      std: user.std,
      gender: user.gender,
      bookname: user.bookname,
      section: user.section,
      purchasedate: user.purchasedate,
      returndate: user.returndate,
      fees: user.fees,
      date: user.date,
      remarks: user.remarks,
    });
    setEditingUserId(user._id);
    setIsEditing(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      await dispatch(deleteStudent(id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      std: "",
      gender: "",
      bookname: "",
      section: "",
      purchasedate: "",
      returndate: "",
      fees: "",
      date: "",
      remarks: "",
    });
    setIsEditing(false);
    setEditingUserId(null);
  };

  return (
    <div className="container mx-auto p-6 m-10">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditing ? "Edit Student" : "Add Student"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form Fields with Titles */}
          {Object.keys(formData).map((key) => (
            <div className="mb-4" key={key}>
              <label className="block font-semibold mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              {key === "gender" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="border p-2 rounded w-full bg-slate-50"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                <input
                  type={key === "fees" ? "number" : key === "purchasedate" || key === "returndate" || key === "date" ? "date" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                  className="border p-2 rounded w-full"
                />
              )}
            </div>
          ))}
        </div>

        {/* Add or Update Button */}
        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white mt-4 p-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Update Student" : "Add Student"}
        </button>
      </div>

      {/* Table for Displaying Users */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Existing Students</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table className="table-auto w-full bg-white shadow-md rounded">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Class (STD)</th>
                <th className="px-4 py-2 text-left">Gender</th>
                <th className="px-4 py-2 text-left">Book Name</th>
                <th className="px-4 py-2 text-left">Section</th>
                <th className="px-4 py-2 text-left">Purchase Date</th>
                <th className="px-4 py-2 text-left">Return Date</th>
                <th className="px-4 py-2 text-left">Fees</th>
                <th className="px-4 py-2 text-left">Remarks</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    No students available.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.std}</td>
                    <td className="border px-4 py-2">{user.gender}</td>
                    <td className="border px-4 py-2">{user.bookname}</td>
                    <td className="border px-4 py-2">{user.section}</td>
                    <td className="border px-4 py-2">{user.purchasedate}</td>
                    <td className="border px-4 py-2">{user.returndate}</td>
                    <td className="border px-4 py-2">{user.fees}</td>
                    <td className="border px-4 py-2">{user.remarks}</td>
                    <td className="border px-4 py-2 gap-6">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
