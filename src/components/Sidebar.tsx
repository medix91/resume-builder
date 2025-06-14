
import { NavLink } from "react-router-dom";

const sections = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/profile" },
  { name: "Skills", path: "/skills" },
  { name: "Experiences", path: "/experiences" },
  { name: "Education", path: "/education" },
  { name: "Aperçu", path: "/preview" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-48 bg-gray-100 dark:bg-gray-800 p-4 flex flex-col gap-4">
      {sections.map(({ name, path }) => (
        <NavLink
          key={name}
          to={path}
          className={({ isActive }) =>
            `py-2 px-3 rounded ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-200 dark:hover:bg-gray-700"
            }`
          }
          end={path === "/"} // pour que la route "/" soit active seulement sur exact match
        >
          {name}
        </NavLink>
      ))}
    </aside>
  );
}
