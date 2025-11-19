import React, { useState } from 'react';

const Settings = ({ darkMode, setDarkMode }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Ceylon Tea Estates Ltd',
    email: 'info@ceylontea.com',
    phone: '+94 (11) 234-5678',
    address: 'Tea Estate Road, Nuwara Eliya\nCentral Province, Sri Lanka',
    logo: '🍵'
  });

  const [preferences, setPreferences] = useState({
    lowStockThreshold: 10,
    currency: 'LKR',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Asia/Colombo'
  });

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure your tea factory inventory preferences</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="card">
          <h3 className="card-title">Settings</h3>
          <div className="settings-nav">
            <button 
              className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              🍵 Factory Info
            </button>
            <button 
              className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              ⚙️ Preferences
            </button>
            <button 
              className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              🔔 Notifications
            </button>
            <button 
              className={`nav-item ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              🎨 Appearance
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="card col-span-3">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="tab-content">
              <h2>Factory Information</h2>
              <p className="tab-description">Update your tea factory details and contact information</p>
              
              <div className="settings-form">
                <div className="form-group">
                  <label className="form-label">Factory Logo</label>
                  <div className="logo-upload">
                    <div className="logo-preview">
                      <span className="logo-icon">{companyInfo.logo}</span>
                    </div>
                    <div className="upload-actions">
                      <button className="btn btn-outline">🖼️ Change Logo</button>
                      <button className="btn btn-outline">🗑️ Remove</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label">Factory Name</label>
                    <input 
                      type="text" 
                      className="form-input"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-input"
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input 
                      type="tel" 
                      className="form-input"
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Currency</label>
                    <select className="form-select" value={preferences.currency}>
                      <option value="LKR">LKR (Rs)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                  <div className="form-group col-span-2">
                    <label className="form-label">Address</label>
                    <textarea 
                      className="form-textarea"
                      rows="3"
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn btn-outline">Cancel</button>
                  <button className="btn btn-primary">💾 Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div className="tab-content">
              <h2>Inventory Preferences</h2>
              <p className="tab-description">Configure how your tea inventory system behaves</p>
              
              <div className="settings-form">
                <div className="grid grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label">Low Stock Threshold</label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={preferences.lowStockThreshold}
                      onChange={(e) => setPreferences({...preferences, lowStockThreshold: parseInt(e.target.value)})}
                    />
                    <div className="form-help">Alert when stock falls below this number</div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Currency</label>
                    <select 
                      className="form-select"
                      value={preferences.currency}
                      onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                    >
                      <option value="LKR">Sri Lankan Rupee (Rs)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date Format</label>
                    <select 
                      className="form-select"
                      value={preferences.dateFormat}
                      onChange={(e) => setPreferences({...preferences, dateFormat: e.target.value})}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Timezone</label>
                    <select 
                      className="form-select"
                      value={preferences.timezone}
                      onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                    >
                      <option value="Asia/Colombo">Sri Lanka Time</option>
                      <option value="Asia/Kolkata">India Time</option>
                      <option value="Asia/Dubai">Dubai Time</option>
                      <option value="Europe/London">London Time</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn btn-outline">Reset to Default</button>
                  <button className="btn btn-primary">💾 Save Preferences</button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <div className="tab-content">
              <h2>Appearance Settings</h2>
              <p className="tab-description">Customize the look and feel of your dashboard</p>
              
              <div className="settings-form">
                <div className="appearance-options">
                  <div className="theme-option">
                    <label className="theme-label">
                      <input 
                        type="radio" 
                        name="theme"
                        checked={!darkMode}
                        onChange={() => setDarkMode(false)}
                      />
                      <div className="theme-card">
                        <div className="theme-preview light">
                          <div className="preview-header"></div>
                          <div className="preview-content"></div>
                        </div>
                        <span className="theme-name">Light Mode</span>
                      </div>
                    </label>
                  </div>
                  
                  <div className="theme-option">
                    <label className="theme-label">
                      <input 
                        type="radio" 
                        name="theme"
                        checked={darkMode}
                        onChange={() => setDarkMode(true)}
                      />
                      <div className="theme-card">
                        <div className="theme-preview dark">
                          <div className="preview-header"></div>
                          <div className="preview-content"></div>
                        </div>
                        <span className="theme-name">Dark Mode</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn btn-primary">💾 Save Appearance</button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="tab-content">
              <h2>Notification Settings</h2>
              <p className="tab-description">Manage how and when you receive alerts</p>
              
              <div className="settings-form">
                <div className="notification-options">
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Low Stock Alerts</h4>
                      <p>Get notified when tea products are running low</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Out of Stock Alerts</h4>
                      <p>Receive alerts when tea products are out of stock</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Purchase Order Updates</h4>
                      <p>Notifications for PO status changes</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="notification-item">
                    <div className="notification-info">
                      <h4>Weekly Reports</h4>
                      <p>Automated weekly tea inventory reports</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn btn-primary">💾 Save Notifications</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .settings-page {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--dark-color);
          margin-bottom: 0.5rem;
        }

        .page-header p {
          color: var(--gray-color);
          font-size: 1.125rem;
        }

        .card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .card-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--dark-color);
          margin-bottom: 1rem;
        }

        .settings-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          border-radius: 8px;
          font-weight: 500;
        }

        .nav-item:hover {
          background: rgba(59, 130, 246, 0.1);
        }

        .nav-item.active {
          background: #3b82f6;
          color: white;
        }

        .tab-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--dark-color);
          margin-bottom: 0.5rem;
        }

        .tab-description {
          color: var(--gray-color);
          margin-bottom: 2rem;
        }

        .settings-form {
          max-width: 600px;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--dark-color);
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .logo-upload {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .logo-preview {
          width: 80px;
          height: 80px;
          border: 2px dashed #e5e7eb;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }

        .upload-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .btn-outline {
          background: white;
          border: 1px solid #e5e7eb;
          color: var(--dark-color);
        }

        .btn-outline:hover {
          background: #f9fafb;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
        }

        .form-help {
          font-size: 0.875rem;
          color: var(--gray-color);
          margin-top: 0.5rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .grid {
          display: grid;
          gap: 1.5rem;
        }

        .grid-cols-2 {
          grid-template-columns: repeat(2, 1fr);
        }

        .grid-cols-4 {
          grid-template-columns: repeat(4, 1fr);
        }

        .appearance-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .theme-option {
          text-align: center;
        }

        .theme-label {
          cursor: pointer;
        }

        .theme-label input {
          display: none;
        }

        .theme-card {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 1rem;
          transition: all 0.3s ease;
        }

        .theme-label input:checked + .theme-card {
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.05);
        }

        .theme-preview {
          width: 100%;
          height: 80px;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }

        .theme-preview.light {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
        }

        .theme-preview.dark {
          background: #1f2937;
          border: 1px solid #374151;
        }

        .preview-header {
          height: 20px;
          background: #3b82f6;
        }

        .preview-content {
          height: 60px;
          padding: 0.5rem;
        }

        .theme-preview.light .preview-content {
          background: #ffffff;
        }

        .theme-preview.dark .preview-content {
          background: #111827;
        }

        .theme-name {
          font-weight: 600;
          color: var(--dark-color);
        }

        .notification-options {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .notification-info h4 {
          font-weight: 600;
          color: var(--dark-color);
          margin-bottom: 0.25rem;
        }

        .notification-info p {
          color: var(--gray-color);
          font-size: 0.875rem;
          margin: 0;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #3b82f6;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .col-span-2 {
          grid-column: span 2;
        }

        .col-span-3 {
          grid-column: span 3;
        }

        @media (max-width: 1024px) {
          .grid.grid-cols-4 {
            grid-template-columns: 1fr;
          }
          
          .col-span-3 {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .logo-upload {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .upload-actions {
            flex-direction: row;
          }
          
          .grid.grid-cols-2 {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .notification-item {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;