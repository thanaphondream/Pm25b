import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { BiHome, BiMusic, BiDrink, BiShoppingBag, BiChat, BiUser, BiBell, BiLogOut } from "react-icons/bi";
import { icon } from "leaflet";

const routes = [
  { text: "Home", path: "/", icon: <BiHome /> },
  { text: "Her", path: "/pm", icon: <BiMusic /> },
  { text: "Location", path: "/Location", icon: <BiDrink /> },
  { text: "issanmap", path: "issanmap", icon: <BiDrink/>}
];
function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <div className={`fixed inset-y-0 left-0 w-56 bg-white rounded-r-3xl shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>        
        <div className="flex items-center justify-between p-5 shadow-md">
          <h2 className="text-2xl uppercase text-indigo-500 font-bold">ฝุ่น PM2.5</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-600 text-2xl">
            <FiX />
          </button>
        </div>
        <nav>
          <ul className="flex flex-col py-4">
            {routes.map((route, index) => (
              <li key={index}>
                <Link to={route.path} className="flex items-center h-12 px-5 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800" onClick={() => setIsOpen(false)}>
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">{route.icon}</span>
                  <span className="text-sm font-medium">{route.text}</span>
                  {route.badge && <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">{route.badge}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed top-5 left-5 text-2xl text-indigo-500 focus:outline-none">
          <FiMenu />
        </button>
      )}
    </div>
  );
}
export default Sidebar;