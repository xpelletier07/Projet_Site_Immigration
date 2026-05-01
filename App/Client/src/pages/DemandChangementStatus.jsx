import { useState } from 'react'
import '../styles/DemandChangementStatus.css'

export default function DemandChangementStatus() {
  const [formData, setFormData] = useState({
    currentStatus: 'Temporary Resident (Visa Class 0-1)',
    desiredStatus: '',
    legalName: '',
    dateOfBirth: '',
    reasonForChange: '',
    justification: ''
  })

  const [currentStep, setCurrentStep] = useState(2)
  const totalSteps = 4

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="demand-status-container">
      <div className="page-header">
        <h1>Request for Change of Status</h1>
        <p>Official form for modifying the legal residency or work status of an existing client profile within the Sovereignty Ledger system.</p>
      </div>

      <div className="content-wrapper">
        <div className="main-content">
          {/* Step Indicator */}
          <div className="step-indicator">
            <span className="step-label">STEP {currentStep} OF {totalSteps}: {
              currentStep === 1 ? 'CURRENT INFORMATION' :
              currentStep === 2 ? 'DESIRED STATUS' :
              currentStep === 3 ? 'SUPPORTING EVIDENCE' :
              'REVIEW & SUBMIT'
            }</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
            </div>
          </div>

          {/* Current Status Section */}
          <div className="form-section">
            <h2>1. Current Status Information</h2>
            <div className="status-box">
              <div className="status-item">
                <label>CURRENT INFORMATION</label>
                <p className="status-value">Temporary Resident (Visa Class 0-1)</p>
              </div>
              <div className="status-item">
                <label>EXPIRY DATE</label>
                <p className="status-value">April 15, 2024</p>
              </div>
            </div>
          </div>

          {/* Request Details Section */}
          <div className="form-section">
            <h2>2. Request Details</h2>
            
            <div className="form-group">
              <label htmlFor="desiredStatus">Select a status from the ledger:</label>
              <select 
                id="desiredStatus"
                name="desiredStatus"
                value={formData.desiredStatus}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Choose a status...</option>
                <option value="permanent-resident">Permanent Resident</option>
                <option value="work-permit">Work Permit</option>
                <option value="study-permit">Study Permit</option>
                <option value="visitor-record">Visitor Record</option>
              </select>
              <small>Details reflect selected status will guide the client's current eligibility criteria.</small>
            </div>

            <div className="form-group">
              <label htmlFor="reasonForChange">Details and Reasons for Change</label>
              <textarea
                id="reasonForChange"
                name="reasonForChange"
                value={formData.reasonForChange}
                onChange={handleChange}
                placeholder="Provide a comprehensive justification for this request..."
                className="form-textarea"
                rows="5"
              ></textarea>
            </div>
          </div>

          {/* Supporting Evidence Section */}
          <div className="form-section">
            <h2>3. Supporting Evidence</h2>
            <div className="upload-area">
              <div className="upload-icon">📎</div>
              <p>Drag and drop documents here or <button className="link-btn">click to browse</button></p>
              <small>Accepted formats: PDF, JPG, PNG, DOC (Max 5MB each)</small>
            </div>
            <div className="documents-list">
              <p className="no-documents">No documents uploaded yet</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="form-actions">
            <button 
              className="btn btn-secondary"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
            >
              ← Previous
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleNextStep}
              disabled={currentStep === totalSteps}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Legal Directory */}
          <div className="sidebar-card legal-directory">
            <div className="card-header">
              <span className="card-icon">⚖️</span>
              <h3>LEGAL DIRECTORY</h3>
            </div>
            <div className="card-body">
              <p>The Section 2.8 of the Immigration Code states that status change can be filed as per section 10 of the established legislation.</p>
              <a href="#" className="read-more-btn">Read Full Regulatory Compliance</a>
            </div>
          </div>

          {/* Review Checklist */}
          <div className="sidebar-card review-checklist">
            <h3>Review Checklist</h3>
            <div className="checklist">
              <div className="checklist-item">
                <input type="checkbox" id="check1" />
                <label htmlFor="check1">Check passport has been valid 6 months remaining validity</label>
              </div>
              <div className="checklist-item">
                <input type="checkbox" id="check2" />
                <label htmlFor="check2">Reasonably verify eligibility codes for the targeted new status</label>
              </div>
              <div className="checklist-item">
                <input type="checkbox" id="check3" />
                <label htmlFor="check3">Ensure all required documents are scanned and uploaded</label>
              </div>
              <div className="checklist-item">
                <input type="checkbox" id="check4" />
                <label htmlFor="check4">Double-check accuracy of all personal information</label>
              </div>
            </div>
          </div>

          {/* Information Box */}
          <div className="sidebar-card info-box">
            <div className="video-placeholder">
              <span className="play-icon">▶</span>
              <p>Learn How It Works</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
