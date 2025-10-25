// import React from 'react';
// import { Link } from 'react-router-dom';
//
// // Reusable CourseCard Component
// const CourseCard = ({ title, description, creator, color }) => {
//   // Base styling for the card container
//   const cardStyle = {
//     // Key change: We're adding flex: 1 to allow the card to grow/shrink
//     // but setting a minWidth to prevent it from becoming too narrow.
//     flex: '1 1 45%', // Flex-grow, flex-shrink, basis (45% for a little space)
//     display: 'flex',
//     alignItems: 'center',
//     padding: '20px 30px',
//     margin: '10px', // Reduced margin to fit better in a grid
//     borderRadius: '15px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
//     background: color, // The background color/gradient changes per card
//     color: '#333',
//     minHeight: '150px',
//   };
//
//   // Styling for the abstract illustration area (left side)
//   const illustrationAreaStyle = {
//     flexShrink: 0,
//     width: '100px', // Reduced width for 2-column layout
//     height: '100px',
//     // Placeholder for the illustration - you would replace this with an SVG or image
//     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//     borderRadius: '10px',
//     marginRight: '20px', // Reduced margin
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '12px',
//     textAlign: 'center',
//     color: '#666',
//   };
//
//   // Styling for the text content area (middle)
//   const contentStyle = {
//     flexGrow: 1,
//   };
//
//   // Styling for the purple arrow button (right side)
//   const arrowButtonStyle = {
//     flexShrink: 0,
//     width: '45px',
//     height: '45px',
//     borderRadius: '50%',
//     backgroundColor: '#096e24', // Deep green/purple color
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     cursor: 'pointer',
//     marginLeft: '20px',
//     fontSize: '20px',
//     color: 'white',
//     border: 'none',
//   };
//
//   return (
//     <div style={cardStyle}>
//       {/* Placeholder for the abstract illustration/icon */}
//       <div style={illustrationAreaStyle}>
//               </div>
//
//       <div style={contentStyle}>
//         <h3 style={{ margin: '0 0 5px 0', fontSize: '1.4em', fontWeight: '600' }}>
//           {title}
//         </h3>
//         <p style={{ margin: '0 0 10px 0', fontSize: '0.95em', lineHeight: '1.4', color: '#555' }}>
//           {description}
//         </p>
//
//       </div>
//
//       {/* The arrow button */}
//       <button style={arrowButtonStyle} aria-label={`Go to ${title} course`}>
//         &gt;
//       </button>
//     </div>
//   );
// };
//
// // Main Component
// const TeaProductionCourses = () => {
//   // Main container style to mimic the full page look
//   const containerStyle = {
//     maxWidth: '1200px', // Increased max-width to accommodate two cards side-by-side comfortably
//     margin: '0 auto',
//     padding: '100px 20px',
//     fontFamily: 'Arial, sans-serif',
//     backgroundColor: '#f9f9f9', // Light background
//     minHeight: '100vh',
//   };
//
//   // Header style (not modified)
//   const headerStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '20px',
//   };
//
//   // Title style (not modified)
//   const titleStyle = {
//     fontSize: '2.2em',
//     fontWeight: '700',
//     color: '#096e24', // Primary purple color
//   };
//
//   // The four required cards data
//   const cardsData = [
//     {
//       title: 'Tea Intake', // Updated title for clarity
//       description: 'System for recording and managing raw leaf intake from farms, including weight and quality checks.',
//       color: 'linear-gradient(to right, #800000, #a52a2a40)',
//       to: '/tea-intake-form',
//     },
//     {
//       title: 'Tea Intake Dashboard',
//       description: 'Real-time analytical view of daily, weekly, and monthly raw leaf procurement metrics and trends.',
//       color: 'linear-gradient(to right, #ff8c00, #f5f5dc)',
//       to: '/tea-intake-dashboard',
//     },
//     {
//       title: 'Tea Batches',
//       description: 'Management of manufacturing stages for processed tea, including withering, rolling, and firing details.',
//       color: 'linear-gradient(to right, #ffeb3b, #f5f5dc)',
//       to: '/record-tea-batches',
//     },
//     {
//       title: 'Tea Batches Dashboard',
//       description: 'Overview of current batch progress, quality scores, yield rates, and production efficiencies.',
//       color: 'linear-gradient(to right, #38761d, #d9ead3)',
//       to: '/tea-batches-dashboard',
//     },
//   ];
//
//   // Styles for the card row containers
//   const cardRowStyle = {
//     display: 'flex',
//     justifyContent: 'space-between', // Ensures space between the two cards
//     flexWrap: 'wrap', // Allows wrapping if necessary, though two columns is the goal
//     marginBottom: '10px', // Space between rows
//   };
//
//   // Placeholder for filter bar (not modified)
//   const filterBarPlaceholderStyle = {
//     display: 'flex',
//     gap: '10px',
//     marginBottom: '20px',
//   };
//
//   const filterButtonStyle = {
//     padding: '8px 15px',
//     borderRadius: '8px',
//     border: '1px solid #ccc',
//     backgroundColor: 'white',
//     fontSize: '0.9em',
//     color: '#555',
//   };
//
//   return (
//     <div style={containerStyle}>
//       <header style={headerStyle}>
//         <h1 style={titleStyle}>Tea Production Modules</h1>
//       </header>
//
//       {/* Placeholder for filters/search */}
//       <div style={filterBarPlaceholderStyle}>
//         <button style={filterButtonStyle}>All Modules</button>
//         <button style={filterButtonStyle}>Intake</button>
//         <button style={filterButtonStyle}>Processing</button>
//       </div>
//
//       {/* Course Cards - Two rows with two cards each */}
//       <div className="card-container">
//
//         {/* Row 1: Tea Intake and Tea Intake Dashboard */}
//         <div style={cardRowStyle}>
//           {/* Card 0: Tea Intake */}
//           <CourseCard {...cardsData[0]} />
//           {/* Card 1: Tea Intake Dashboard (Right of Card 0) */}
//           <CourseCard {...cardsData[1]} />
//         </div>
//
//         {/* Row 2: Tea Batches and Tea Batches Dashboard (Bottom of Row 1) */}
//         <div style={cardRowStyle}>
//           {/* Card 2: Tea Batches (Bottom of Card 0) */}
//           <CourseCard {...cardsData[2]} />
//           {/* Card 3: Tea Batches Dashboard (Right of Card 2) */}
//           <CourseCard {...cardsData[3]} />
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default TeaProductionCourses;

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Reusable CourseCard Component
// Accepts 'to' prop for the route path
const CourseCard = ({ title, description, color, to }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Base styling for the card container (now applied to Link)
  const cardStyle = {
    flex: '1 1 45%', // Allows the card to grow/shrink, taking up slightly less than half the row
    display: 'flex',
    alignItems: 'center',
    padding: '20px 30px',
    margin: '10px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    background: color,
    color: '#333',
    minHeight: '150px',
    textDecoration: 'none', // Remove underline from the Link
    cursor: 'pointer', // Indicates clickability
    transition: 'transform 0.2s, box-shadow 0.2s', // Smooth transition for hover effect
  };

  // Hover effect style for visual feedback
  const cardHoverStyle = {
    transform: 'translateY(-5px)', // Lift card slightly
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)', // Darker shadow
  };

  // Styling for the abstract illustration area
  const illustrationAreaStyle = {
    flexShrink: 0,
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '10px',
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    textAlign: 'center',
    color: '#666',
  };

  // Styling for the text content area
  const contentStyle = {
    flexGrow: 1,
  };

  // Using Link to wrap the card content for routing
  return (
    <Link
      to={to}
      style={{ ...cardStyle, ...(isHovered ? cardHoverStyle : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Placeholder for the abstract illustration/icon */}
      <div style={illustrationAreaStyle}>
      </div>

      <div style={contentStyle}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '1.4em', fontWeight: '600', color: '#333' }}>
          {title}
        </h3>
        <p style={{ margin: '0 0 10px 0', fontSize: '0.95em', lineHeight: '1.4', color: '#555' }}>
          {description}
        </p>
      </div>

      {/* Simple navigation indicator */}
      <div style={{ fontSize: '30px', color: '#096e24', marginLeft: '20px', flexShrink: 0 }}>
        &rarr;
      </div>
    </Link>
  );
};

// Main Component
const TeaProductionCourses = () => {
  // Main container style to center the content
  const containerStyle = {
    maxWidth: '1200px', // Wide enough for two cards
    margin: '0 auto',   // KEY: Centers the container horizontally
    padding: '30px 20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  };

  // Header style
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  // Title style
  const titleStyle = {
    fontSize: '2.2em',
    fontWeight: '700',
    color: '#7b68ee',
  };

  // The four required cards data with added 'to' property for routing
  const cardsData = [
    {
      title: 'Tea Intake',
      description: 'System for recording and managing raw leaf intake from farms, including weight and quality checks.',
      color: 'linear-gradient(to right, #800000, #a52a2a40)',
      to: '/tea-intake-form', // Route for MultiStepForm
    },
    {
      title: 'Tea Intake Dashboard',
      description: 'Real-time analytical view of daily, weekly, and monthly raw leaf procurement metrics and trends.',
      color: 'linear-gradient(to right, #ff8c00, #f5f5dc)',
      to: '/tea-intake-dashboard', // Route for TeaLeavesIntake
    },
    {
      title: 'Tea Batches',
      description: 'Management of manufacturing stages for processed tea, including withering, rolling, and firing details.',
      color: 'linear-gradient(to right, #38761d, #d9ead3)',
      to: '/record-tea-batches', // Route for TeaBatch
    },
    {
      title: 'Tea Batches Dashboard',
      description: 'Overview of current batch progress, quality scores, yield rates, and production efficiencies.',
      color: 'linear-gradient(to right, #ffeb3b, #f5f5dc)',
      to: '/tea-batches-dashboard', // Route for Track
    },
  ];

  // Styles for the card row containers (Flexbox for 2 columns)
  const cardRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: '10px',
  };

  // Placeholder styles (optional, for maintaining structure)
  const filterBarPlaceholderStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  };

  const filterButtonStyle = {
    padding: '8px 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    fontSize: '0.9em',
    color: '#555',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Tea Production Modules</h1>
      </header>

      {/* Placeholder for filters/search */}
      <div style={filterBarPlaceholderStyle}>
        <button style={filterButtonStyle}>All Modules</button>
        <button style={filterButtonStyle}>Intake</button>
        <button style={filterButtonStyle}>Processing</button>
      </div>

      {/* Course Cards - Two rows with two cards each */}
      <div className="card-container">

        {/* Row 1: Tea Intake (Left) and Tea Intake Dashboard (Right) */}
        <div style={cardRowStyle}>
          <CourseCard {...cardsData[0]} />
          <CourseCard {...cardsData[1]} />
        </div>

        {/* Row 2: Tea Batches (Bottom Left) and Tea Batches Dashboard (Bottom Right) */}
        <div style={cardRowStyle}>
          <CourseCard {...cardsData[2]} />
          <CourseCard {...cardsData[3]} />
        </div>
      </div>
    </div>
  );
};

export default TeaProductionCourses;