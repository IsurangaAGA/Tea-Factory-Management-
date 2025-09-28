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

