import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const sections = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/profile" },
  { name: "Skills", path: "/skills" },
  { name: "Experiences", path: "/experiences" },
  { name: "Education", path: "/education" },
  { name: "Aperçu", path: "/preview" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
       <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded"
      >
        <FaBars />
      </button>

      {/* Sidebar Menu */}
      <aside className={`fixed top-0 left-0 h-full w-48 bg-blue-100 dark:bg-gray-800 p-4 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <nav className="flex flex-col gap-4">
          {sections.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `py-2 px-3 rounded ${isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-200 dark:hover:bg-gray-700"}`
              }
              end={path === "/"}
            >
              {name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
