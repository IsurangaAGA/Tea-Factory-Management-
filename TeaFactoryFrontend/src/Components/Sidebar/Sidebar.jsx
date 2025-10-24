import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // ✅ use NavLink for routing
import { AiOutlineContainer } from 'react-icons/ai';
import { IoLeafOutline, IoListCircleOutline } from 'react-icons/io5';
import './Sidebar.css';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('Tea Intake Dashboard');

  const navigationItems = [
    {
      heading: 'Tea Intake',
      icon: <IoLeafOutline />,
      items: [
        { name: 'Record Tea Intakes', path: '/tea-intake-form' },
        { name: 'Tea Intake Dashboard', path: '/tea-intake-dashboard' },
      ],
    },
    {
      heading: 'Tea Batches',
      icon: <IoListCircleOutline />,
      items: [
        { name: 'Record Tea Batches', path: '/record-tea-batches' },
        { name: 'Tea Batches Dashboard', path: '/tea-batches-dashboard' },
      ],
    },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <IoLeafOutline className="header-icon" />
        <span className="header-text">Tea Production Management</span>
      </div>

      <div className="sidebar-menu">
        {navigationItems.map((section) => (
          <div key={section.heading} className="menu-section">
            <div className="section-heading">
              {section.icon}
              <span className="heading-text">{section.heading}</span>
            </div>

            {section.items.map((item) => (
              <NavLink
                key={item.name}
                to={item.path} // ✅ replaces href
                className={({ isActive }) =>
                  `menu-item ${isActive ? 'active' : ''}`
                }
                onClick={() => setActiveLink(item.name)}
              >
                <div className="item-icon-placeholder"></div>
                <span className="item-text">{item.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
