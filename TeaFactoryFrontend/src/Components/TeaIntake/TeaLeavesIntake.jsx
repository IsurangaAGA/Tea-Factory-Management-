// import React, { useEffect, useState, useRef } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Calendar,
//   Target,
//   Truck,
//   Scale,
//   Eye,
//   Edit,
//   Trash2,
// } from "lucide-react";
// // Ensure you have a TeaLeavesIntake.css file with the necessary styles
// import "./TeaLeavesIntake.css";
//
// // --- Helper: Format date in local YYYY-MM-DD ---
// const formatDateLocal = (date) => {
//   const y = date.getFullYear();
//   const m = String(date.getMonth() + 1).padStart(2, "0");
//   const d = String(date.getDate()).padStart(2, "0");
//   return `${y}-${m}-${d}`;
// };
//
// // --- Intake Card ---
// const TeaIntakeCard = ({ item, index, onDelete }) => {
//   const colors = [
//     { bg: "#E0F7F7", accent: "#5DD5D5" },
//     { bg: "#FFF5E6", accent: "#FFB84D" },
//     { bg: "#FFF9E6", accent: "#FFD700" },
//   ];
//   const { bg, accent } = colors[index % colors.length];
//
//   return (
//     <div className="class-card" style={{ backgroundColor: bg }}>
//       <div className="card-header">
//         <span className="video-badge">#{item.id}</span>
//         <Truck color={accent} size={20} />
//       </div>
//       <h3>{item.supplierName}</h3>
//       <p className="class-subtitle">{item.estateName}</p>
//       <p className="class-description">
//         <Calendar size={14} /> {item.date} | {item.time}
//       </p>
//       <p className="class-description">
//         <Scale size={14} /> {item.weight} kg • Quality: {item.quality}
//       </p>
//       <p className="class-description">Vehicle: {item.vehicleNumber}</p>
//       <p className="class-description">Remarks: {item.remarks || "None"}</p>
//       <div className="card-footer">
//         <span>Received by {item.receiverName}</span>
//         <div className="actions">
//           <button
//             className="icon-btn"
//             onClick={() => console.log(`View ${item.id}`)}
//           >
//             <Eye size={16} />
//           </button>
//           <button
//             className="icon-btn"
//             onClick={() => console.log(`Edit ${item.id}`)}
//           >
//             <Edit size={16} />
//           </button>
//           <button className="icon-btn delete" onClick={() => onDelete(item.id)}>
//             <Trash2 size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// // --- Main Component ---
// const TeaLeavesIntake = () => {
//   const today = new Date();
//   const [intakeData, setIntakeData] = useState([]);
//   const [filteredIntakes, setFilteredIntakes] = useState([]);
//   // Initialize selected date to today's date in YYYY-MM-DD format
//   const [selectedDate, setSelectedDate] = useState(formatDateLocal(today));
//   const [currentMonth, setCurrentMonth] = useState(today.getMonth());
//   const [currentYear, setCurrentYear] = useState(today.getFullYear());
//   const scrollRef = useRef(null);
//
//   // Fetch intakes
//   useEffect(() => {
//     fetch("http://localhost:8080/api/intakes")
//       .then((res) => res.json())
//       .then((data) => {
//         const normalized = data.map((item) => ({
//           ...item,
//           // Assuming item.date is a valid date string/timestamp
//           date: formatDateLocal(new Date(item.date)),
//           weight: Number(item.weight),
//         }));
//         setIntakeData(normalized);
//       })
//       .catch(console.error);
//   }, []);
//
//   // Filter intakes for selected date
//   useEffect(() => {
//     setFilteredIntakes(intakeData.filter((i) => i.date === selectedDate));
//   }, [selectedDate, intakeData]);
//
//   // --- Handlers for Scrolling and Deletion ---
//   const scrollLeft = () =>
//     scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
//   const scrollRight = () =>
//     scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
//
//   const handleDelete = (id) =>
//     fetch(`http://localhost:8080/api/intakes/${id}`, { method: "DELETE" })
//       .then(() => setIntakeData(intakeData.filter((i) => i.id !== id)))
//       .catch(console.error);
//
//   // --- Calendar Logic ---
//   const handleMonthChange = (e) => {
//     setCurrentMonth(Number(e.target.value));
//   };
//
//   const handleYearChange = (e) => {
//     setCurrentYear(Number(e.target.value));
//   };
//
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//   // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
//   const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
//
//   // Array of day objects for the current month
//   const calendarDates = Array.from({ length: daysInMonth }, (_, i) => {
//     const d = new Date(currentYear, currentMonth, i + 1);
//     return { date: i + 1, iso: formatDateLocal(d) };
//   });
//
//   const monthNames = Array.from({ length: 12 }, (_, i) =>
//     new Date(0, i).toLocaleString("default", { month: "long" })
//   );
//   // Generate a range of years, e.g., current year +/- 10
//   const yearRange = Array.from({ length: 21 }, (_, i) => today.getFullYear() - 10 + i);
//
//   return (
//     <div className="dashboard-container">
//       <div className="main-content">
//         <div className="study-banner">
//           <h1>🍃 Tea Intake Dashboard</h1>
//           <p className="subtitle">Showing intakes for {selectedDate}</p>
//         </div>
//
//         <div className="mission-section">
//           <div className="mission-header">
//             <div className="mission-title">
//               <Target size={20} /> <span>Intake Records</span>
//             </div>
//             <Calendar size={20} />
//           </div>
//
//           <div className="classes-container">
//             <button className="nav-btn left" onClick={scrollLeft}>
//               <ChevronLeft size={24} />
//             </button>
//
//             <div className="classes-scroll" ref={scrollRef}>
//               {filteredIntakes.length > 0 ? (
//                 filteredIntakes.map((item, index) => (
//                   <TeaIntakeCard
//                     key={item.id}
//                     item={item}
//                     index={index}
//                     onDelete={handleDelete}
//                   />
//                 ))
//               ) : (
//                 <p style={{ padding: '20px', minWidth: '100%', textAlign: 'center' }}>
//                     No intakes recorded for this date ({selectedDate}).
//                 </p>
//               )}
//             </div>
//
//             <button className="nav-btn right" onClick={scrollRight}>
//               <ChevronRight size={24} />
//             </button>
//           </div>
//         </div>
//       </div>
//
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="calendar-widget">
//           <div className="calendar-header">
//             {/* Month Selector */}
//             <select
//               value={currentMonth}
//               onChange={handleMonthChange}
//             >
//               {monthNames.map((name, i) => (
//                 <option key={name} value={i}>
//                   {name}
//                 </option>
//               ))}
//             </select>
//             {/* Year Selector */}
//             <select
//               value={currentYear}
//               onChange={handleYearChange}
//             >
//               {yearRange.map((y) => (
//                 <option key={y} value={y}>
//                   {y}
//                 </option>
//               ))}
//             </select>
//           </div>
//
//           <div className="calendar-days">
//             <span>Sun</span>
//             <span>Mon</span>
//             <span>Tue</span>
//             <span>Wed</span>
//             <span>Thu</span>
//             <span>Fri</span>
//             <span>Sat</span>
//           </div>
//
//           <div className="calendar-grid">
//             {/* Empty slots for days before the 1st */}
//             {Array.from({ length: firstDayOfMonth }, (_, i) => (
//               <div key={`empty-${i}`} className="calendar-date empty"></div>
//             ))}
//
//             {/* Days of the current month */}
//             {calendarDates.map((item) => (
//               <div
//                 key={item.iso}
//                 className={`calendar-date ${item.iso === selectedDate ? "active" : ""}`}
//                 onClick={() => setSelectedDate(item.iso)}
//               >
//                 {item.date}
//               </div>
//             ))}
//           </div>
//         </div>
//
//         <div className="achievement-section">
//           <h3>Analytics</h3>
//           <p>Total Intakes: {filteredIntakes.length}</p>
//           <p>
//             Total Weight:{" "}
//             {filteredIntakes.reduce((sum, i) => sum + (i.weight || 0), 0).toFixed(2)} kg
//           </p>
//           <p>
//             Avg. Weight per Intake:{" "}
//             {filteredIntakes.length > 0
//               ? (
//                   filteredIntakes.reduce((sum, i) => sum + (i.weight || 0), 0) /
//                   filteredIntakes.length
//                 ).toFixed(2)
//               : 0}{" "}
//             kg
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default TeaLeavesIntake;

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
  // Initialize selected date to today's date in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState(formatDateLocal(today));
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const scrollRef = useRef(null);

  // --- Date for the new UI element ---
  const todayMonthName = today.toLocaleString("default", { month: "long" }).toUpperCase();
  const todayDate = today.getDate();
  const todayDayName = today.toLocaleString("default", { weekday: "long" }).toUpperCase();
  // ------------------------------------


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

          {/* New UI: Today's Date Display */}
          <div className="today-date-display">
            <div className="today-month">{todayMonthName}</div>
            <div className="today-date">{todayDate}</div>
            <div className="today-day">{todayDayName}</div>
          </div>
          {/* End New UI */}

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

        <div className="achievement-section">
          <h3>Analytics</h3>
          <p>Total Intakes: {filteredIntakes.length}</p>
          <p>
            Total Weight:{" "}
            {filteredIntakes.reduce((sum, i) => sum + (i.weight || 0), 0).toFixed(2)} kg
          </p>
          <p>
            Avg. Weight per Intake:{" "}
            {filteredIntakes.length > 0
              ? (
                  filteredIntakes.reduce((sum, i) => sum + (i.weight || 0), 0) /
                  filteredIntakes.length
                ).toFixed(2)
              : 0}{" "}
            kg
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeaLeavesIntake;
