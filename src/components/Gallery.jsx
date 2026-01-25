import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SHOWCASE_BLUEPRINTS } from '../data/showcaseBlueprints';
import '../styles/Gallery.css';

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Top 3 Blueprints');

  const categories = Object.keys(SHOWCASE_BLUEPRINTS);
  const currentBlueprints = SHOWCASE_BLUEPRINTS[selectedCategory];

  return (
    <div className="gallery-container">
      
      <div className="gallery-header">
        <h1>Weapon Blueprint Showcase</h1>
        <p>Explore pre-made builds for every game mode on Black ops 7</p>
      </div>

      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="blueprints-grid">
        {currentBlueprints.map(blueprint => (
          <div key={blueprint.id} className="blueprint-card-gallery">

            {/* FIXED IMAGE BLOCK */}
            <div className="card-image">
              <img 
                src={blueprint.image}
                alt={blueprint.name}
                className="blueprint-img"
              />
            </div>

            <div className="card-content">
              <h3>{blueprint.name}</h3>
              <p className="weapon-name">{blueprint.weapon.split('-')[1]}</p>
              <p className="category">{blueprint.category}</p>
              
              <div className="attachments-list">
                <h4>Attachments:</h4>
                <ul>
                  {Object.entries(blueprint.attachments).map(([key, value]) => (
                    value && (
                      <li key={key}>
                        <span className="attachment-label">
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </span>
                        <span className="attachment-value">{value}</span>
                      </li>
                    )
                  ))}
                </ul>
              </div>

              <div className="code-section">
                <p className="code-label">Import Code:</p>
                <code className="blueprint-code">{blueprint.code}</code>
                <button
                  className="copy-code-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(blueprint.code);
                    alert('Code copied to clipboard!');
                  }}
                >
                  Copy Code
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
