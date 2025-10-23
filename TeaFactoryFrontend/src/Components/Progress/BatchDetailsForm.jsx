import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BatchDetailsForm.css';

// --- Utility Function to format timestamp ---
const formatTimestamp = (date) => {
  const pad = (num) => String(num).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};
// --- End Utility Function ---

// --- SVG icons (no change) ---
const StageIcon = ({ color }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>;
const WeightIcon = ({ color }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11V3h16v8M4 11v10h16V11M4 11h16M12 3v18"/></svg>;
const ResponsibleIcon = ({ color }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const StatusIcon = ({ color }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.83"></path><path d="M22 4L12 14.01l-3-3"></path></svg>;
const StartTimeIcon = ({ color }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const EndTimeIcon = ({ color }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;


// --- Segmented control ---
const SegmentedStatusControl = ({ value, onChange }) => {
  const statuses = ['Started', 'In Progress', 'Completed'];
  return (
    <div className="segmented-control-container">
      <div className="segmented-control-inner">
        {statuses.map(status => (
          <button
            key={status}
            className={`segment-button ${value === status ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onChange(status); }}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

const InputFieldContainer = ({ label, children, borderColor, icon: IconComponent }) => (
  <div className="input-field-container" style={{ borderLeftColor: borderColor }}>
    <div className="icon-area">{IconComponent && <IconComponent color={borderColor} />}</div>
    <div className="content-area">
      <label className="input-label">{label}</label>
      <div className="input-wrapper" style={{ borderColor }}>{children}</div>
    </div>
  </div>
);

// --- Main Form Component ---
const BatchDetailsForm = ({ batch, onClose, currentStage }) => {
  const [formData, setFormData] = useState({
    id: null,
    stage: currentStage || '',
    weight: '',
    responsible: '',
    status: '',
    startTime: '',
    endTime: '',
  });

  // ✅ Fetch existing data on mount or when stage/batch changes
  useEffect(() => {
    const fetchStageData = async () => {
      if (!batch?.id || !currentStage) return;
      try {
        const res = await axios.get(`http://localhost:8080/api/batches/${batch.id}/stages/${currentStage}`);
        const data = res.data;
        if (data) {
          setFormData({
            id: data.id || null,
            stage: currentStage,
            weight: data.weight || '',
            responsible: data.responsible || '',
            status: data.status || '',
            startTime: data.startTime || '',
            endTime: data.endTime || '',
          });
        }
      } catch (err) {
        console.log('No existing stage found');
        // Reset to defaults if no record found
        setFormData({
          id: null,
          stage: currentStage,
          weight: '',
          responsible: '',
          status: '',
          startTime: '',
          endTime: '',
        });
      }
    };

    fetchStageData();
  }, [batch.id, currentStage]); // ← only runs when modal actually mounts or batch/stage changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (newStatus) => {
    const now = formatTimestamp(new Date());
    setFormData(prev => {
      const update = { status: newStatus };
      if (newStatus === 'Started' && !prev.startTime) update.startTime = now;
      if (newStatus === 'Completed' && !prev.endTime) update.endTime = now;
      return { ...prev, ...update };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      stageName: formData.stage,
      weight: parseFloat(formData.weight),
      responsible: formData.responsible,
      status: formData.status,
      startTime: formData.startTime || null,
      endTime: formData.endTime || null,
    };

    try {
      if (formData.id) {
        await axios.put(`http://localhost:8080/api/batches/${batch.id}/stages/${formData.id}`, payload);
        alert('Stage details updated successfully!');
      } else {
        await axios.post(`http://localhost:8080/api/batches/${batch.id}/stages`, payload);
        alert('Stage details saved successfully!');
      }
      onClose();
    } catch (error) {
      console.error('Error saving stage details:', error);
      alert('Failed to save stage details.');
    }
  };

  if (!batch) return null;

  const fieldColors = {
    stage: '#00BCD4',
    weight: '#FFC107',
    responsible: '#8BC34A',
    status: '#fafafa',
    startTime: '#9350e6',
    endTime: '#FF5783',
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <div className="popup-header">
          <h2>{batch.name} Details</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="form-grid">
          <InputFieldContainer label="Stage" borderColor={fieldColors.stage} icon={StageIcon}>
            <input type="text" name="stage" value={formData.stage} readOnly className="read-only-input" />
          </InputFieldContainer>

          <InputFieldContainer label="Weight (kg)" borderColor={fieldColors.weight} icon={WeightIcon}>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
          </InputFieldContainer>

          <InputFieldContainer label="Responsible" borderColor={fieldColors.responsible} icon={ResponsibleIcon}>
            <input type="text" name="responsible" value={formData.responsible} onChange={handleChange} required />
          </InputFieldContainer>

          <InputFieldContainer label="Status" borderColor={fieldColors.status} icon={StatusIcon}>
            <SegmentedStatusControl value={formData.status} onChange={handleStatusChange} />
          </InputFieldContainer>

          <InputFieldContainer label="Start Time" borderColor={fieldColors.startTime} icon={StartTimeIcon}>
            <input type="text" name="startTime" value={formData.startTime} readOnly={!!formData.startTime} className={formData.startTime ? 'read-only-input' : ''} />
          </InputFieldContainer>

          <InputFieldContainer label="End Time" borderColor={fieldColors.endTime} icon={EndTimeIcon}>
            <input type="text" name="endTime" value={formData.endTime} readOnly={!!formData.endTime} className={formData.endTime ? 'read-only-input' : ''} />
          </InputFieldContainer>

          <div className="form-actions">
            <button type="submit" className="save-button">Save Details</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BatchDetailsForm;

