import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Pages/Login';
import Home from './Components/Admin/Home'; // Sidebar component
import Dashboard from './Components/Admin/Dashboard';
import Student from './Components/Staff/Student';
import StaffDetails from './Components/Admin/StaffDetails';
import Book from "./Components/Admin/Book"

import Sidebar from "./Components/Staff/Sidebar"
import StudentDetails from './Components/Staff/StudentDetails';
import StaffDashboard from './Components/Staff/StaffDashboard';
import DashboardLibrian from './Components/Librarian/DashboardLibrian';

import SideBarr from './Components/Librarian/SideBarr';
import Libraray from './Components/Librarian/Libraray';




const Layout = ({ children }) => {
  return (
    <div className="flex">
       <Home /> {/* Admin Sidebar} */}
      <div className="flex-grow">{children}</div> 
    </div>
  );
};

const Layout2 = ({ children }) => {
  return (
    <div className="flex">
       <Sidebar/> {/* Staff Sidebar} */}
      <div className="flex-grow">{children}</div> 
    </div>
  );
};

const Layout3 = ({ children }) => {
  return (
    <div className="flex">
       <SideBarr/> {/* Librarian Sidebar} */}
      <div className="flex-grow">{children}</div> 
    </div>
  );
};

const App = () => {
  return (
    <Routes>
     
      <Route path="/" element={<Login />} />

      {/* Admin */}
      <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route path="/staffdetails" element={
          <Layout>
            <StaffDetails />
          </Layout>
        }
      />
      <Route path="/student" element={
          <Layout>
            <Student />
          </Layout>
        }
        
      />
      <Route path='/library' element={
        <Layout>
          <Book/>
        </Layout>
      }/>

      {/* Staff  */}

        <Route path='/staffdashboard' element ={
          <Layout2>
            <StaffDashboard />
          </Layout2>
        }/>
      <Route path='/studentdetails' element ={
        <Layout2>
          <StudentDetails />
        </Layout2>
      }/> 
      <Route path='/booklibrary' element={
        <Layout>
          <Book/>
        </Layout>
      }/>

      <Route path ="/dashboardLibarian" element ={<Layout3><DashboardLibrian/></Layout3>}/>
      <Route path="/addbook" element={<Layout3><Libraray/></Layout3>}/>
      <Route path="/student-details" element={
          <Layout3>
            <Student />
          </Layout3>
        }
      />
    </Routes>
  );
};

export default App;


// import React from 'react'
// import StaffDashboard from './Components/Staff/StaffDashboard'

// const App = () => {
//   return (
//     <div>
//       <StaffDashboard/>
//     </div>
//   )
// }

// export default App
