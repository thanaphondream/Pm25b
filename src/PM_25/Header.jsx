import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const routes = [
  { text: "Home", path: "/" },
  { text: "Her", path: "/pm" },
  { text: "Location", path: "/location" }
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-blue-600 text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out shadow-lg`}>        
        <div className="p-5 flex justify-between items-center">
          <h2 className="text-xl font-bold">My App</h2>
          <button onClick={() => setIsOpen(false)} className="text-white text-2xl">
            <FiX />
          </button>
        </div>
        <nav>
          <ul className="space-y-4 p-5">
            {routes.map((route, index) => (
              <li key={index}>
                <Link to={route.path} className="block hover:text-gray-300" onClick={() => setIsOpen(false)}>
                  {route.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Menu Button - Hidden when sidebar is open */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed top-5 left-5 text-2xl text-blue-600 focus:outline-none">
          <FiMenu />
        </button>
      )}
    </div>
  );
}

export default Sidebar;
