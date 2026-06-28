import {
  FiHome,
  FiCheckSquare,
  FiTarget,
  FiBookOpen,
  FiClock,
  FiMusic,
  FiSettings,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

const menu = [
  {
    icon: <FiHome />,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: <FiCheckSquare />,
    label: "Daily Targets",
    path: "/daily",
  },
  {
    icon: <FiTarget />,
    label: "Monthly Goals",
    path: "/monthly",
  },
  {
    icon: <FiBookOpen />,
    label: "Syllabus Tracker",
    path: "/tracker",
  },
  {
    icon: <FiClock />,
    label: "Study Timer",
    path: "/timer",
  },
  {
    icon: <FiMusic />,
    label: "Ambient Sounds",
    path: "/ambient",
  },
  {
    icon: <FiSettings />,
    label: "Settings",
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h1>📚 StudyFlow</h1>
        <p>Study OS by Aryan</p>
      </div>

      <nav>
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
