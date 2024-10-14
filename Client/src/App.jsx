import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import StaffDetails from './Components/Admin/StaffDetails';
import Dashboard from './Components/Admin/Dashboard';
import Student from './Components/Staff/Student';

const App = () => {
  return (
    <>
      <div className=' flex'>
      <Home />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      <Route path="/staffdetails" element={<StaffDetails />} />
      <Route path="/student" element={<Student />} />
      </Routes>
      </div>
    </>
  );
};

export default App;
