// src/components/StaffDashboard.js

import React from 'react';
import { FaClipboardList, FaTasks } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from 'react-icons/md';

const StaffDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className=' text-3xl font-bold text-center'>WELCOME TO STAFF DASHBOARD</h1>
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-6 py-16">
        <div className="bg-gradient-to-r from-pink-300 to-orange-300 rounded-lg shadow-lg p-4 w-full md:w-1/2">
          <h3 className="text-lg font-semibold">GIRLS</h3>
          <p className="text-3xl font-bold">45</p>
          <p className="text-gray-500">Avg. GIRLS</p>
          <FaClipboardList className="text-5xl text-white absolute top-4 right-4" />
        </div>

        <div className="bg-gradient-to-r from-blue-300 to-green-300 rounded-lg shadow-lg p-4 w-full md:w-1/2">
          <h3 className="text-lg font-semibold">BOYS</h3>
          <p className="text-3xl font-bold">55</p>
          <p className="text-gray-500">Avg. BOYS</p>
          <FaTasks className="text-5xl text-white absolute top-4 right-4" />
        </div>
      </div>

      {/* Upcoming Meetings (Exams) */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center p-4 border-b">
            <div>
              <p className="font-medium">Onam Exam</p>
              <p className="text-gray-500">September</p>
            </div>
            <MdOutlineMeetingRoom className="text-2xl text-blue-500" />
          </div>

          <div className="flex justify-between items-center p-4 border-b">
            <div>
              <p className="font-medium">Xmas Exam</p>
              <p className="text-gray-500">December</p>
            </div>
            <MdOutlineMeetingRoom className="text-2xl text-blue-500" />
          </div>

          <div className="flex justify-between items-center p-4 border-b">
            <div>
              <p className="font-medium">Annual Exam</p>
              <p className="text-gray-500">March</p>
            </div>
            <MdOutlineMeetingRoom className="text-2xl text-blue-500" />
          </div>

          <div className="flex justify-between items-center p-4 border-b">
            <div>
              <p className="font-medium">Internal Exam</p>
              <p className="text-gray-500">To Be Charted</p>
            </div>
            <MdOutlineMeetingRoom className="text-2xl text-blue-500" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default StaffDashboard;
