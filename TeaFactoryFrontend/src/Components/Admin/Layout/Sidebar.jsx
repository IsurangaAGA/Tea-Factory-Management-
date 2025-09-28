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