import React, { useState } from 'react';
import '../styles/Credits.css';

function Credits() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="credits-button"
        onClick={() => setIsOpen(true)}
        title="View Credits"
      >
        <img src="/info-icon.svg" alt="Info" className="info-icon" />
      </button>

      {isOpen && (
        <div className="credits-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="credits-modal" onClick={(e) => e.stopPropagation()}>
            <div className="credits-header">
              <h2>Credits</h2>
              <button 
                className="credits-close-btn"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="credits-content">
              <div className="credit-section">
                <h3>Original Creator</h3>
                <div className="credit-item">
                  <p className="credit-name">Liamcky / Liamesso</p>
                  <p className="credit-description">
                    Original Black Ops 7 weapon code generator and base logic
                  </p>
                  <a 
                    href="https://liamcky.github.io/Bo7ImportCodeGenerator/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="credit-link"
                  >
                    View Original Generator
                  </a>
                </div>
              </div>

              <div className="credit-section">
                <h3>Blueprint Pulling List</h3>
                <div className="credit-item">
                  <p className="credit-description">
                    Access the Black ops 6 Blueprint Pulling List
                  </p>
                  <a 
                    href="https://blueprint-labs.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="credit-link"
                  >
                    View Blueprint List
                  </a>
                </div>
              </div>

              <div className="credit-section">
                <h3>Key Features</h3>
                <ul className="features-list">
                  <li>Custom weapon blueprint generator</li>
                  <li>Real-time code generation with base-34 algorithm</li>
                  <li>Load and modify existing blueprints</li>
                  <li>Local blueprint storage</li>
                </ul>
              </div>
            </div>

            <div className="credits-footer">
              <p>Thank you for using the Black Ops 7 Weapon Code Generator</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Credits;
