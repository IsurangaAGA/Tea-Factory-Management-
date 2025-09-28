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