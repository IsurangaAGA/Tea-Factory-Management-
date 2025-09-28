import React, { useState } from 'react';
import {
  Menu, Search, Sun, Bell, User, LayoutDashboard, Compass,
  Layers3, FileText, Lock, Settings, ChevronDown, List, X
} from 'lucide-react';

// --- Icon components for demo (using lucide-react) ---
const DashboardIcon = LayoutDashboard;
const SupportIcon = Compass;
const ComponentsIcon = Layers3;
const AuthIcon = Lock;
const MiscIcon = Settings;
const FormIcon = FileText;
const TableIcon = List;

// Utility component for navigation item
const NavItem = ({ icon: Icon, title, active, hasSubMenu, onClick }) => {
  const baseClasses = "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors";
  const activeClasses = active
    ? "bg-cyan-600/30 text-cyan-400 font-semibold"
    : "text-gray-400 hover:bg-gray-700/50 hover:text-white";

  return (
    <div className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
      <div className="flex items-center">
        <Icon className="w-5 h-5 mr-3" />
        <span>{title}</span>
      </div>
      {hasSubMenu && <ChevronDown className={`w-4 h-4 transition-transform ${active ? 'rotate-180' : ''}`} />}
    </div>
  );
};


// ----------------------------------------------------
// /components/Layout/Sidebar.jsx
// ----------------------------------------------------
const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Navigation state (using a simple object for demo)
  const [dashboardOpen, setDashboardOpen] = useState(true);

  // Styling based on the deep dark/navy theme from the image
  const sidebarWidth = 'w-64';

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-[#1E202B] border-r border-gray-800 text-white p-4 transition-all duration-300 z-30
                  ${sidebarWidth} ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:sticky lg:top-0`}
    >
      <div className="flex items-center justify-between h-16 mb-6">
        <h1 className="text-xl font-bold tracking-wider">
          <span className="text-cyan-400">CRM</span> HQ Admin
        </h1>
        <button onClick={toggleSidebar} className="p-2 text-gray-400 hover:text-white lg:hidden">
            <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="space-y-6">
        {/* DASHBOARD */}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase text-gray-500 mb-2 px-3">Dashboard</p>
          <NavItem
            icon={DashboardIcon}
            title="Dashboard"
            active={true}
            hasSubMenu={true}
            onClick={() => setDashboardOpen(!dashboardOpen)}
          />
          {dashboardOpen && (
            <div className="ml-4 space-y-1 py-1 border-l border-gray-700">
              <div className="text-sm text-cyan-400 bg-gray-700/30 p-2 rounded-lg cursor-pointer">Dashboard 1</div>
              <div className="text-sm text-gray-400 hover:text-white p-2 rounded-lg cursor-pointer">Dashboard 2</div>
              <div className="text-sm text-gray-400 hover:text-white p-2 rounded-lg cursor-pointer">Dashboard 3</div>
            </div>
          )}
        </div>

        {/* SUPPORT & COMPONENTS */}
        <div className="space-y-1">
          <NavItem icon={SupportIcon} title="Support" hasSubMenu={true} active={false} />
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase text-gray-500 mb-2 px-3">Components</p>
          <NavItem icon={FormIcon} title="Forms & Charts" hasSubMenu={true} active={false} />
          <NavItem icon={TableIcon} title="Tables" hasSubMenu={true} active={false} />
        </div>

        {/* LOGIC & ERROR */}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase text-gray-500 mb-2 px-3">Login & Error</p>
          <NavItem icon={AuthIcon} title="Authentication" hasSubMenu={true} active={false} />
          <NavItem icon={MiscIcon} title="Miscellaneous" hasSubMenu={true} active={false} />
        </div>
      </nav>

      {/* CRM Footer */}
      <div className="absolute bottom-4 left-4 right-4 p-4 bg-gray-800 rounded-xl">
        <div className="text-center">
          {/* Using a placeholder SVG or emoji to represent the CRM box image */}
          <div className="text-4xl mb-2">📊</div>
          <p className="text-sm font-semibold text-white">Get Latest CRM Features</p>
        </div>
      </div>
    </aside>
  );
};


// ----------------------------------------------------
// /components/Layout/Header.jsx
// ----------------------------------------------------
const Header = ({ toggleSidebar }) => (
  <header className="sticky top-0 h-16 bg-[#1E202B] border-b border-gray-800 px-6 flex items-center justify-between z-20 shadow-lg">
    {/* Left Side: Mobile Menu Button & Search Bar */}
    <div className="flex items-center">
      <button onClick={toggleSidebar} className="p-2 text-gray-400 hover:text-white mr-4 lg:hidden">
        <Menu className="w-6 h-6" />
      </button>

      <div className="relative flex items-center bg-gray-800 rounded-xl p-2 w-full max-w-sm">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent border-none focus:ring-0 text-gray-200 placeholder-gray-500 w-full outline-none"
        />
        <Search className="w-5 h-5 text-gray-500 cursor-pointer" />
      </div>
    </div>

    {/* Right Side: Action Icons and User */}
    <div className="flex items-center space-x-4">
      <div className="p-2 rounded-full cursor-pointer hover:bg-gray-700/50 text-gray-400 hover:text-cyan-400">
        <Sun className="w-6 h-6" />
      </div>
      <div className="p-2 rounded-full cursor-pointer hover:bg-gray-700/50 text-gray-400 hover:text-cyan-400 relative">
        <Bell className="w-6 h-6" />
        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-[#1E202B]"></span>
      </div>

      <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-full hover:bg-gray-700/50">
        <img
          src="https://placehold.co/32x32/1E202B/ffffff?text=U"
          alt="User Avatar"
          className="w-8 h-8 rounded-full border-2 border-cyan-400"
        />
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  </header>
);

// ----------------------------------------------------
// /components/Layout/Dashboard.jsx
// ----------------------------------------------------
// This component acts as the main container for the dashboard content.
const Dashboard = () => (
  <main className="p-6 bg-[#12141C] min-h-[calc(100vh-4rem)]">
    {/* Sales Report Overview Section */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white">Sales Report Overview</h2>
      <p className="text-sm text-gray-400 mt-1">Add new and manage all of your project</p>
    </div>

    {/* Placeholder Grid Structure - This is where the cards and charts would go */}
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* Col 1-2 (Main Content Area) */}
      <div className="lg:col-span-2 xl:col-span-3 space-y-6">
        {/* Row 1: Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1E202B] rounded-xl p-5 h-40 flex items-center justify-center text-center text-gray-400">
            MetricCard (Sales Revenue)
          </div>
          <div className="bg-[#1E202B] rounded-xl p-5 h-40 flex items-center justify-center text-center text-gray-400">
            MetricCard (Today Received)
          </div>
          <div className="bg-[#1E202B] rounded-xl p-5 h-40 flex items-center justify-center text-center text-gray-400">
            MetricCard (Sales Total)
          </div>
        </div>

        {/* Row 2: Average Revenue Chart */}
        <div className="bg-[#1E202B] rounded-xl p-6 h-96 flex items-center justify-center text-gray-400">
          BarChart (Average Revenue)
        </div>

        {/* Row 3: Analytics Cards */}
        <div className="bg-[#1E202B] rounded-xl p-6 flex items-center justify-center text-gray-400">
          Analytics & TaskStatusCards
        </div>
      </div>

      {/* Col 3 (Right Sidebar Content Area) */}
      <div className="xl:col-span-1 space-y-6">
        {/* Top Product List */}
        <div className="bg-[#1E202B] rounded-xl p-6 flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-white">Top Product</h3>
          <div className="text-gray-400">ProgressList Placeholder</div>
        </div>

        {/* Activity Feed */}
        <div className="bg-[#1E202B] rounded-xl p-6 flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-white">Activity</h3>
          <div className="text-gray-400">ActivityFeed Placeholder</div>
        </div>
      </div>
    </div>
  </main>
);


// ----------------------------------------------------
// App.jsx (Main Application Component)
// ----------------------------------------------------
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative min-h-screen flex bg-[#12141C]">
        {/* Sidebar (fixed on small screens, part of flex on large screens) */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Overlay for mobile view when sidebar is open */}
        {isSidebarOpen && (
             <div
                className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
                onClick={toggleSidebar}
            ></div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 flex flex-col">
            <Header toggleSidebar={toggleSidebar} />
            {/* The Header is sticky, so the Dashboard starts right below it */}
            <Dashboard />
        </div>
    </div>
  );
};

export default App;
