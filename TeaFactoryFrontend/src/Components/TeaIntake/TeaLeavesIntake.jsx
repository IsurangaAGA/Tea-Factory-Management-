import React, { useEffect, useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Target,
  Truck,
  Scale,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
// Ensure you have a TeaLeavesIntake.css file with the necessary styles
import "./TeaLeavesIntake.css";

// --- Helper: Format date in local YYYY-MM-DD ---
const formatDateLocal = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// --- Helper: Format time (e.g., 08:23 AM) ---
const formatTimeLocal = (date) => {
    // Add seconds to the format for a visual change every second
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
};


// --- Intake Card ---
const TeaIntakeCard = ({ item, index, onDelete }) => {
  const colors = [
    { bg: "#E0F7F7", accent: "#5DD5D5" },
    { bg: "#FFF5E6", accent: "#FFB84D" },
    { bg: "#FFF9E6", accent: "#FFD700" },
  ];
  const { bg, accent } = colors[index % colors.length];

  return (
    <div className="class-card" style={{ backgroundColor: bg }}>
      <div className="card-header">
        <span className="video-badge">#{item.id}</span>
        <Truck color={accent} size={20} />
      </div>
      <h3>{item.supplierName}</h3>
      <p className="class-subtitle">{item.estateName}</p>
      <p className="class-description">
        <Calendar size={14} /> {item.date} | {item.time}
      </p>
      <p className="class-description">
        <Scale size={14} /> {item.weight} kg • Quality: {item.quality}
      </p>
      <p className="class-description">Vehicle: {item.vehicleNumber}</p>
      <p className="class-description">Remarks: {item.remarks || "None"}</p>
      <div className="card-footer">
        <span>Received by {item.receiverName}</span>
        <div className="actions">
          <button
            className="icon-btn"
            onClick={() => console.log(`View ${item.id}`)}
          >
            <Eye size={16} />
          </button>
          <button
            className="icon-btn"
            onClick={() => console.log(`Edit ${item.id}`)}
          >
            <Edit size={16} />
          </button>
          <button className="icon-btn delete" onClick={() => onDelete(item.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const TeaLeavesIntake = () => {
  const today = new Date();
  const [intakeData, setIntakeData] = useState([]);
  const [filteredIntakes, setFilteredIntakes] = useState([]);
  // Main Calendar State
  const [selectedDate, setSelectedDate] = useState(formatDateLocal(today));
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Graph/Monthly Summary State
  const [graphData, setGraphData] = useState([]); // Data aggregated by day
  const [graphCurrentMonth, setGraphCurrentMonth] = useState(today.getMonth());
  const [graphCurrentYear, setGraphCurrentYear] = useState(today.getFullYear());

  // --- Real-Time Clock State ---
  const [currentTime, setCurrentTime] = useState(new Date());

  const scrollRef = useRef(null);

  // --- Derived Date values from the currentTime state ---
  const todayDate = currentTime.getDate();
  const todayMonthName = currentTime.toLocaleString("default", { month: "short" }).toUpperCase();
  const todayTime = formatTimeLocal(currentTime);


  // --- EFFECT: Set up the real-time clock (updates every 1 second) ---
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []); // Empty dependency array means this runs once on mount
  // -------------------------------------------------------------------


  // Fetch intakes
  useEffect(() => {
    fetch("http://localhost:8080/api/intakes")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((item) => ({
          ...item,
          // Assuming item.date is a valid date string/timestamp
          date: formatDateLocal(new Date(item.date)),
          weight: Number(item.weight),
        }));
        setIntakeData(normalized);
      })
      .catch(console.error);
  }, []);

  // Filter intakes for selected date
  useEffect(() => {
    setFilteredIntakes(intakeData.filter((i) => i.date === selectedDate));
  }, [selectedDate, intakeData]);

  // --- Graph Data Aggregation Logic (Aggregates by day) ---
  useEffect(() => {
    if (intakeData.length === 0) {
        setGraphData([]);
        return;
    }

    const firstDay = new Date(graphCurrentYear, graphCurrentMonth, 1);
    const lastDay = new Date(graphCurrentYear, graphCurrentMonth + 1, 0);
    const daysInGraphMonth = lastDay.getDate();

    const dailySummaryMap = {};
    for (let i = 1; i <= daysInGraphMonth; i++) {
        const d = new Date(graphCurrentYear, graphCurrentMonth, i);
        const key = formatDateLocal(d);
        // Initializing every day of the month with 0 weight
        dailySummaryMap[key] = { date: i, totalWeight: 0, key };
    }

    intakeData.forEach(item => {
        const itemDate = new Date(item.date);
        if (itemDate.getFullYear() === graphCurrentYear && itemDate.getMonth() === graphCurrentMonth) {
            const key = item.date;
            if (dailySummaryMap[key]) {
                dailySummaryMap[key].totalWeight += item.weight;
            }
        }
    });

    const finalGraphData = Object.values(dailySummaryMap).sort((a, b) => a.date - b.date);
    setGraphData(finalGraphData);
  }, [intakeData, graphCurrentMonth, graphCurrentYear]);
  // ---------------------------------------------

  // --- Analytics Calculations (Daily) ---
  const totalIntakes = filteredIntakes.length;
  const totalWeight = filteredIntakes.reduce((sum, i) => sum + (i.weight || 0), 0);
  const avgWeight = totalIntakes > 0 ? totalWeight / totalIntakes : 0;
  // ------------------------------

  // --- Monthly Graph Data Filter and Calculations ---
  // Filter only days with intake for rendering
  const filteredGraphData = graphData.filter(d => d.totalWeight > 0);

  // Recalculate max weight based *only* on the days with intake for better scaling
  const maxMonthlyWeight = Math.max(...filteredGraphData.map(d => d.totalWeight), 1);

  // Calculate total monthly intake (using the full graphData for accuracy)
  const totalMonthlyIntake = graphData.reduce((sum, d) => sum + d.totalWeight, 0);

  // Calculate key Y-axis ticks for visual context
  const maxLabel = Math.ceil(maxMonthlyWeight);
  // We'll show 0, Max/2, and Max
  const midLabel = (maxLabel / 2).toFixed(1);
  // ------------------------------

  // --- Handlers for Scrolling and Deletion ---
  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  const handleDelete = (id) =>
    fetch(`http://localhost:8080/api/intakes/${id}`, { method: "DELETE" })
      .then(() => setIntakeData(intakeData.filter((i) => i.id !== id)))
      .catch(console.error);

  // --- Calendar Logic ---
  const handleMonthChange = (e) => {
    setCurrentMonth(Number(e.target.value));
  };
  const handleYearChange = (e) => {
    setCurrentYear(Number(e.target.value));
  };
  // Graph Selector Handlers
  const handleGraphMonthChange = (e) => {
    setGraphCurrentMonth(Number(e.target.value));
  };
  const handleGraphYearChange = (e) => {
    setGraphCurrentYear(Number(e.target.value));
  };


  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Array of day objects for the current month
  const calendarDates = Array.from({ length: daysInMonth }, (_, i) => {
    const d = new Date(currentYear, currentMonth, i + 1);
    return { date: i + 1, iso: formatDateLocal(d) };
  });

  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );
  // Generate a range of years, e.g., current year +/- 10
  const yearRange = Array.from({ length: 21 }, (_, i) => today.getFullYear() - 10 + i);

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="study-banner">
          <h1>🍃 Tea Intake Dashboard</h1>
          <p className="subtitle">Showing intakes for {selectedDate}</p>
        </div>

        <div className="mission-section">
          <div className="mission-header">
            <div className="mission-title">
              <Target size={20} /> <span>Intake Records</span>
            </div>
            <Calendar size={20} />
          </div>

          <div className="classes-container">
            <button className="nav-btn left" onClick={scrollLeft}>
              <ChevronLeft size={24} />
            </button>

            <div className="classes-scroll" ref={scrollRef}>
              {filteredIntakes.length > 0 ? (
                filteredIntakes.map((item, index) => (
                  <TeaIntakeCard
                    key={item.id}
                    item={item}
                    index={index}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <p style={{ padding: '20px', minWidth: '100%', textAlign: 'center' }}>
                    No intakes recorded for this date ({selectedDate}).
                </p>
              )}
            </div>

            <button className="nav-btn right" onClick={scrollRight}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="calendar-widget">

          {/* === REAL-TIME DATE/TIME DISPLAY === */}
          <div className="today-date-inline-display">
            <div className="date-block">
                <span className="date-value">{todayDate}</span>
                <span className="month-value">{todayMonthName}</span>
            </div>
            <div className="time-block">
                <span className="time-value">{todayTime}</span>
                <span className="time-label">CURRENT</span>
            </div>
          </div>
          {/* === END REAL-TIME DATE/TIME DISPLAY === */}

          <div className="calendar-divider"></div> {/* New Divider */}

          <div className="calendar-header">
            {/* Month Selector */}
            <select
              value={currentMonth}
              onChange={handleMonthChange}
            >
              {monthNames.map((name, i) => (
                <option key={name} value={i}>
                  {name}
                </option>
              ))}
            </select>
            {/* Year Selector */}
            <select
              value={currentYear}
              onChange={handleYearChange}
            >
              {yearRange.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="calendar-days">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="calendar-grid">
            {/* Empty slots for days before the 1st */}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="calendar-date empty"></div>
            ))}

            {/* Days of the current month */}
            {calendarDates.map((item) => (
              <div
                key={item.iso}
                className={`calendar-date ${item.iso === selectedDate ? "active" : ""}`}
                onClick={() => setSelectedDate(item.iso)}
              >
                {item.date}
              </div>
            ))}
          </div>
        </div>

        {/* Updated Achievement/Analytics Section with Daily Summary Cards and Monthly Graph */}
        <div className="achievement-section">

          <h3 className="analytics-main-title">Analytics</h3>

          {/* Daily Summary */}
          <div className="daily-summary-section">
              <h4 className="summary-title">Daily Summary ({selectedDate})</h4>
              <div className="analytics-card-container">
                  {/* Total Intakes Card */}
                  <div className="analytic-card analytic-total-intakes">
                      <div className="analytic-value">{totalIntakes}</div>
                      <div className="analytic-label">Total Intakes</div>
                  </div>

                  {/* Total Weight Card */}
                  <div className="analytic-card analytic-total-weight">
                      <div className="analytic-value">{totalWeight.toFixed(2)}</div>
                      <div className="analytic-label">Total Weight (kg)</div>
                  </div>

                  {/* Avg. Weight Card */}
                  <div className="analytic-card analytic-avg-weight">
                      <div className="analytic-value">{avgWeight.toFixed(2)}</div>
                      <div className="analytic-label">Avg. Weight (kg)</div>
                  </div>
              </div>
          </div>

          {/* Monthly Summary (New) */}
          <div className="monthly-summary-section">
              <h4 className="summary-title">Monthly Summary</h4>
              <p className="monthly-summary-subtitle">Tea intake over time</p>

              {/* Month/Year Selectors for Graph */}
              <div className="graph-selector-header">
                <select
                  value={graphCurrentMonth}
                  onChange={handleGraphMonthChange}
                >
                  {monthNames.map((name, i) => (
                    <option key={name} value={i}>
                      {name}
                    </option>
                  ))}
                </select>
                <select
                  value={graphCurrentYear}
                  onChange={handleGraphYearChange}
                >
                  {yearRange.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* === GRAPH CONTAINER: Includes Y-Axis and Plot Area === */}
              <div className="graph-y-axis-container">
                  {/* Y-Axis Labels (New) */}
                  <div className="y-axis-labels">
                    {/* Max Value */}
                    <div className="y-axis-label top">{maxLabel} KG</div>
                    {/* Mid Value */}
                    <div className="y-axis-label middle">{midLabel} KG</div>
                    {/* Minimum Value (0, implicitly 1 for the smallest bar) */}
                    <div className="y-axis-label bottom">0 KG</div>
                  </div>

                  {/* Plot Area */}
                  <div className="graph-placeholder-container">
                      <div className="graph-point-container">
                          {filteredGraphData.length > 0 ? (
                              filteredGraphData.map((item) => (
                                  <div
                                      key={item.key}
                                      className="graph-point intake-day"
                                      // Scales height from 0% up to 100% of the container height.
                                      style={{ height: `${(item.totalWeight / maxMonthlyWeight) * 100}%` }}
                                  >
                                      {/* Label shows the day number for every plotted point */}
                                      <span className="point-label">{item.date}</span>
                                  </div>
                              ))
                          ) : (
                              <p style={{ textAlign: 'center', width: '100%', color: '#999', paddingTop: '50px' }}>No intake data for selected month.</p>
                          )}
                      </div>
                  </div>
              </div>
              {/* === END GRAPH CONTAINER === */}


              {/* Total Monthly Intake Metric */}
              <div className="monthly-total-metric">
                  <div className="metric-label">TOTAL MONTHLY INTAKE ({monthNames[graphCurrentMonth].toUpperCase()})</div>
                  <div className="metric-value">{totalMonthlyIntake.toFixed(2)} KG</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaLeavesIntake;