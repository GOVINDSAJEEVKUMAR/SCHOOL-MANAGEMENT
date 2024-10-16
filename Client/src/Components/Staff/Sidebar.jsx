import React, { useState,useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineDashboard, MdLibraryBooks } from "react-icons/md"; // Dashboard & Library icon
import { FiUserPlus } from "react-icons/fi"; // User add icon
import { FaMoneyCheckAlt } from "react-icons/fa"; // Fees details icon
import { Link, useNavigate } from "react-router-dom";
import GlobalApi from "../GlobalApi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate(); 
 
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth); // Select authentication state

  
  useEffect(() => {
    if (!token || !isAuthenticated) {
      navigate('/'); 
    }
  }, [token, isAuthenticated, navigate]);

  const menus = [
    { name: "Dashboard", link: "/staffdashboard", icon: MdOutlineDashboard },
    { name: "Student Add", link: "/studentdetails", icon: FiUserPlus },
    { name: "View Library Book", link: "/booklibrary", icon: MdLibraryBooks },
    { name: "Fees Details", link: "/fees", icon: FaMoneyCheckAlt, margin: true },
    { name: "Logout", link: "/logout", icon: AiOutlineLogout, isLogout: true }, // Mark logout
  ];

  const [open, setOpen] = useState(true);

  const handleLogout = async () => {
    try {
      // Perform the logout API call
      await axios.post(`${GlobalApi.baseUrl}/auth/logout`); 
      
      localStorage.removeItem("userToken"); 
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.isLogout ? "#" : menu?.link}
              key={i}
              className={`${menu?.margin && "mt-5"} group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              onClick={menu?.isLogout ? handleLogout : null} // Handle logout on click
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1"></div>
    </section>
  );
};

export default Sidebar;
