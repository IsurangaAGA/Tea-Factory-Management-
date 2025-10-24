// ./components/Sidebar/SidebarLayout.js
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { IoLeafOutline, IoListCircleOutline } from "react-icons/io5";
import "./Sidebar.css"; // Ensure this CSS file exists

const SidebarLayout = () => {
  const navigationItems = [
    {
      heading: "Tea Intake",
      icon: <IoLeafOutline />,
      items: [
        { name: "Record Tea Intakes", path: "/tea-intake-form" },
        { name: "Tea Intake Dashboard", path: "/tea-intake-dashboard" },
      ],
    },
    {
      heading: "Tea Batches",
      icon: <IoListCircleOutline />,
      items: [
        { name: "Record Tea Batches", path: "/record-tea-batches" },
        { name: "Tea Batches Dashboard", path: "/tea-batches-dashboard" },
      ],
    },
  ];

  // The 'display: "flex"' and 'Outlet' are the key elements for the layout to work
  return (
    <div style={{ display: "flex", height: "100vh", background: "#f5f5f5" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          background: "#2f2f2f",
          color: "white",
          padding: "20px",
          flexShrink: 0, // Prevents sidebar from shrinking
        }}
      >
        <h2 style={{ marginBottom: '30px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
          Tea Factory
        </h2>
        {navigationItems.map((section) => (
          <div key={section.heading} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 'bold' }}>
              {section.icon}
              <span>{section.heading}</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "8px" }}>
              {section.items.map((item) => (
                <li key={item.name} style={{ margin: "5px 0" }}>
                  <NavLink
                    to={item.path}
                    style={({ isActive }) => ({
                      display: 'block',
                      padding: '8px 15px',
                      borderRadius: '4px',
                      background: isActive ? "#5DD5D5" : "transparent",
                      color: isActive ? "#2f2f2f" : "white",
                      textDecoration: "none",
                      transition: 'background 0.3s',
                    })}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        {/* VITAL: This is where the content of the nested routes renders */}
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;