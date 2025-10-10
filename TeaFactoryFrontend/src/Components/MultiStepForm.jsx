import React, { useState, useCallback, Fragment } from 'react';
import './MultiStepForm.css'; // Import the CSS file

// --- Static Data for Step 4 ---
const REGISTERED_USERS = [
  { id: 'u1', name: 'Aisha Hassan (Shift A)' },
  { id: 'u2', name: 'James Kariuki (Shift B)' },
  { id: 'u3', name: 'Chen Lee (QC Team)' },
];

// --- SVG Icons (Replaces Lucide) ---
const CheckCircleSVG = (props) => (
    <svg className="status-modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
    </svg>
);
const ChevronLeftSVG = (props) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6"/>
    </svg>
);

// --- Custom Modal Component (Replaces alert()) ---
const StatusModal = ({ message, type, onClose }) => {
  if (!message) return null;

  const modalClass = type === 'success' ? 'status-modal-success' : 'status-modal-error';
  const headerText = type === 'success' ? 'Intake Submitted!' : 'Validation Error';

  return (
    <div className="status-modal-overlay">
      <div className={`status-modal-content ${modalClass}`}>
        <div className="status-modal-header">
          <CheckCircleSVG />
          {headerText}
        </div>
        <p className="status-modal-message">{message}</p>
        <button
          onClick={onClose}
          className="status-modal-close-btn"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---
const App = () => {
  const totalSteps = 5;
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Date and Time
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    // Step 2: Supplier Details
    supplierName: '',
    estateName: '',
    vehicleNumber: '',
    // Step 3: Intake Details
    weight: '0',
    quality: 'Excellent',
    remarks: '',
    // Step 4: Receiver Details
    receiverId: '',
    receiverName: '',
  });

  const [modalState, setModalState] = useState({ message: '', type: '' });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const validateStep = (step) => {
      let isValid = true;
      let errorFields = [];

      switch(step) {
          case 1:
              if (!formData.date || !formData.time) errorFields.push('Date and Time');
              break;
          case 2:
              if (!formData.supplierName) errorFields.push('Supplier Name');
              if (!formData.estateName) errorFields.push('Estate Name');
              if (!formData.vehicleNumber) errorFields.push('Vehicle Number');
              break;
          case 3:
              if (parseFloat(formData.weight) <= 0 || isNaN(parseFloat(formData.weight))) errorFields.push('Valid Weight');
              break;
          case 4:
              if (!formData.receiverId) errorFields.push('Receiver Selection');
              break;
          default:
              break;
      }

      if (errorFields.length > 0) {
          setModalState({
              message: `Please complete the required fields before proceeding: ${errorFields.join(', ')}.`,
              type: 'error'
          });
          isValid = false;
      }
      return isValid;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < totalSteps) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      // Simulate submission
      setModalState({
        message: 'Intake details successfully submitted! The log has been recorded for factory processing.',
        type: 'success'
      });
      // Optionally reset form here
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const handleModalClose = () => setModalState({ message: '', type: '' });

  // Helper function to get the name for each step
  const getStepName = (stepNum) => {
    switch (stepNum) {
      case 1: return "Date & Time";
      case 2: return "Supplier Details";
      case 3: return "Intake Details";
      case 4: return "Receiver Selection";
      case 5: return "Review & Confirm";
      default: return "";
    }
  }

  // --- Step Content Rendering ---
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step-content">
            <h3>Step 1: {getStepName(1)}</h3>
            <div style={{display: 'flex', gap: '20px'}}>
              <div style={{flex: 1}}>
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{flex: 1}}>
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step-content">
            <h3>Step 2: {getStepName(2)}</h3>
            <label>Supplier Name</label>
            <input
              type="text"
              name="supplierName"
              placeholder="Mkulima Cooperative"
              value={formData.supplierName}
              onChange={handleChange}
              required
            />
            <label>Estate Name</label>
            <input
              type="text"
              name="estateName"
              placeholder="Highlands Estate"
              value={formData.estateName}
              onChange={handleChange}
              required
            />
            <label>Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              placeholder="KBD 456L"
              value={formData.vehicleNumber}
              onChange={handleChange}
              required
            />
          </div>
        );
      case 3:
        return (
          <div className="form-step-content">
            <h3>Step 3: {getStepName(3)}</h3>
            <label>Weight (in KG)</label>
            <input
              type="number"
              name="weight"
              placeholder="e.g., 500.5"
              value={formData.weight}
              onChange={handleChange}
              required
              min="0.1"
              step="0.1"
            />
            <label>Quality Assessment</label>
            <select
              name="quality"
              value={formData.quality}
              onChange={handleChange}
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
            <label>Remarks</label>
            <textarea
              name="remarks"
              placeholder="Any specific observations (e.g., slightly wet, mixed batch, etc.)"
              value={formData.remarks}
              onChange={handleChange}
              rows="3"
            />
          </div>
        );
      case 4:
        return (
          <div className="form-step-content">
            <h3>Step 4: {getStepName(4)}</h3>
            <p style={{fontSize: '0.9em', color: '#666'}}>Select the factory personnel receiving this intake:</p>

            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              {REGISTERED_USERS.map(user => (
                <label key={user.id} className="receiver-option-label">
                  <input
                    type="radio"
                    name="receiverId"
                    value={user.id}
                    checked={formData.receiverId === user.id}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        receiverId: e.target.value,
                        receiverName: user.name,
                      }));
                    }}
                  />
                  <span>{user.name}</span>
                </label>
              ))}
            </div>
            {formData.receiverName && (
                <p className="receiver-info-text">
                    👤 Selected Receiver: {formData.receiverName}
                </p>
            )}
          </div>
        );
      case 5:
        return (
          <div className="form-step-content">
            <h3>Step 5: {getStepName(5)}</h3>
            <p style={{fontSize: '0.9em', color: '#666'}}>Please review the captured intake details below.</p>

            <div className="review-summary">
                <div className="review-section-header">🕒 Time & Date</div>
                <div className="review-detail"><p><strong>Date:</strong> {formData.date}</p></div>
                <div className="review-detail"><p><strong>Time:</strong> {formData.time}</p></div>

                <div className="review-section-header">🚚 Supplier & Vehicle</div>
                <div className="review-detail"><p><strong>Supplier:</strong> {formData.supplierName || 'N/A'}</p></div>
                <div className="review-detail"><p><strong>Estate:</strong> {formData.estateName || 'N/A'}</p></div>
                <div className="review-detail"><p><strong>Vehicle No:</strong> {formData.vehicleNumber || 'N/A'}</p></div>

                <div className="review-section-header">📦 Intake Metrics</div>
                <div className="review-detail"><p><strong>Weight:</strong> {formData.weight} KG</p></div>
                <div className="review-detail"><p><strong>Quality:</strong> <span style={{fontWeight: 'bold', color: formData.quality === 'Excellent' ? '#008000' : '#ff9900'}}>{formData.quality}</span></p></div>
                <div className="review-detail"><p><strong>Remarks:</strong> {formData.remarks || 'None provided'}</p></div>

                <div className="review-section-header">👤 Receiver</div>
                <div className="review-detail"><p><strong>Receiver Name:</strong> {formData.receiverName || 'N/A'}</p></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // --- Progress Indicator Rendering ---
  const renderProgressIndicator = () => {
    return (
      <div className="progress-indicator">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => {
          const isCurrent = currentStep === stepNum;
          const isCompleted = currentStep > stepNum;
          const stepName = getStepName(stepNum);

          return (
            <Fragment key={stepNum}>
              <div className={`step ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                <div className="step-number">
                  {isCompleted ? <CheckCircleSVG style={{width: '20px', height: '20px'}} /> : stepNum}
                </div>
                <div className="step-info">{stepName}</div>
              </div>
              {stepNum < totalSteps && <div className={`step-line ${isCompleted ? 'completed-line' : ''}`}></div>}
            </Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="multi-step-form-wrapper">

      <StatusModal message={modalState.message} type={modalState.type} onClose={handleModalClose} />

      <div className="multi-step-form-container">

        <div className="form-header-banner">
          New Tea Leaf Intake Log
        </div>

        <div className="form-card">
            {renderProgressIndicator()}

            <form className="form-content" onSubmit={(e) => e.preventDefault()}>

                <div style={{padding: '0 30px', borderBottom: '1px solid #eee', marginBottom: '20px'}}>
                    {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                <div className="form-navigation">
                    <button
                        type="button"
                        className="previous-button"
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                    >
                        <ChevronLeftSVG />
                        Previous
                    </button>

                    <button
                        type="submit"
                        className="next-button"
                        onClick={handleNext}
                    >
                        {currentStep === totalSteps ? (
                            <>
                                <CheckCircleSVG style={{width: '18px', height: '18px', color: 'white'}} />
                                Submit Intake
                            </>
                        ) : (
                            'Next Step'
                        )}
                    </button>
                </div>
            </form>
        </div>
      </div>

      <p style={{marginTop: '15px', fontSize: '0.8em', color: '#666'}}>Current Step: {currentStep}/{totalSteps}</p>
    </div>
  );
};

export default App;
