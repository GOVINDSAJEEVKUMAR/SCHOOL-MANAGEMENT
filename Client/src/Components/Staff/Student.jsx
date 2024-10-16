import React, { useEffect, useState } from 'react';
import GlobalApi from '../GlobalApi';
import {fetchStudents} from "../../Redux/studentSlice";
import { useDispatch, useSelector } from 'react-redux';

const Student = () => {
  const [students, setStudents] = useState([]); // State to hold fetched student data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle error

  useEffect(() => {
    // Fetch student data
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${GlobalApi.baseUrl}/student/get`); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudents(data); // Update the state with fetched data
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchStudents(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div className="container max-w-6xl px-4 mx-auto sm:px-8">
      <div className="py-8">
        {/* Table Heading */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Student Information</h1>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block w-full overflow-hidden rounded-lg shadow-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th scope="col" className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">
                    Std
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">
                    Gender
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">
                    Book Name
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">
                    Section
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">
                    Purchase Date
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">
                    Return Date
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-semibold text-right uppercase tracking-wider">
                    Fees
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="bg-white border-b hover:bg-gray-100">
                    <td className="px-5 py-5 text-sm text-gray-900">
                      <p className="whitespace-no-wrap">{student.name}</p>
                    </td>
                    <td className="px-5 py-5 text-sm text-gray-900">
                      <p className="whitespace-no-wrap">{student.std}</p>
                    </td>
                    <td className="px-5 py-5 text-sm text-gray-900">
                      <p className="whitespace-no-wrap">{student.gender}</p>
                    </td>
                    <td className="px-5 py-5 text-sm text-gray-900">
                      <p className="whitespace-no-wrap">{student.bookname}</p>
                    </td>
                    <td className="px-5 py-5 text-sm text-gray-900">
                      <p className="whitespace-no-wrap">{student.section}</p>
                    </td>
                    <td className="px-5 py-5 text-sm text-gray-900">
                      <p className="whitespace-no-wrap">{student.purchasedate}</p>
                    </td>
                    <td className="px-5 py-5 text-sm text-gray-900">
                      <p className="whitespace-no-wrap">{student.returndate}</p>
                    </td>
                    <td className="px-5 py-5 text-sm text-right">
                      <p className={`whitespace-no-wrap ${student.fees < 1 ? 'text-red-500' : 'text-black'}`}>
                        {student.fees}
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm text-gray-900">
                      <p className="whitespace-no-wrap">{student.remarks}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
