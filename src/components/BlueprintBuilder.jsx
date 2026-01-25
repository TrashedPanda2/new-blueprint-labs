import { useState, useEffect } from 'react';
import { weaponCategories, attachmentCategories } from '../data/weaponData';
import { customAddMultiple } from '../utils/codeCalculator';

function BlueprintBuilder({ blueprint, onAdd, onUpdate, onClear }) {
  const [name, setName] = useState('');
  const [weapon, setWeapon] = useState('');
  const [attachments, setAttachments] = useState({
    optic: '',
    muzzle: '',
    barrel: '',
    underbarrel: '',
    launchers: '',
    magazine: '',
    reargrip: '',
    stock: '',
    laser: '',
    firemods: '',
    ammomod: '',
    special: ''
  });
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    if (blueprint) {
      setName(blueprint.name);
      setWeapon(blueprint.weapon);
      setAttachments(blueprint.attachments);
      generateCode(blueprint.attachments);
    } else {
      resetForm();
    }
  }, [blueprint]);

  const resetForm = () => {
    setName('');
    setWeapon('');
    setAttachments({
      optic: '',
      muzzle: '',
      barrel: '',
      underbarrel: '',
      launchers: '',
      magazine: '',
      reargrip: '',
      stock: '',
      laser: '',
      firemods: '',
      ammomod: '',
      special: ''
    });
    setGeneratedCode('');
  };

  const handleAttachmentChange = (category, value) => {
    const newAttachments = { ...attachments, [category]: value };
    setAttachments(newAttachments);
    generateCode(newAttachments);
  };

  const generateCode = (attchments) => {
    const values = [
      attchments.optic,
      attchments.muzzle,
      attchments.barrel,
      attchments.underbarrel,
      attchments.launchers,
      attchments.magazine,
      attchments.reargrip,
      attchments.stock,
      attchments.laser,
      attchments.firemods,
      attchments.ammomod,
      attchments.special
    ];

    const cleanedValues = values.map(v => v.replace(/-/g, ''));
    const result = customAddMultiple(...cleanedValues);
    const attachmentCode = result.match(/.{1,5}/g)?.join('-') || '';
    
    // Extract weapon code from weapon string (format: "CODE-WeaponName")
    const weaponCode = weapon.split('-')[0];
    const fullCode = weaponCode ? `${weaponCode}-${attachmentCode}` : attachmentCode;
    
    setGeneratedCode(fullCode);
  };

  const handleSave = () => {
    if (!name.trim() || !weapon) {
      alert('Please enter a blueprint name and select a weapon');
      return;
    }

    const blueprintData = {
      name,
      weapon,
      attachments,
      code: generatedCode
    };

    if (blueprint) {
      onUpdate(blueprint.id, blueprintData);
    } else {
      onAdd(blueprintData);
    }

    resetForm();
    onClear?.();
  };

  const handleClear = () => {
    resetForm();
    onClear?.();
  };

  return (
    <div className="blueprint-builder">
      <div className="builder-section">
        <h2>{blueprint ? 'Edit Blueprint' : 'Create New Blueprint'}</h2>

        <div className="form-group">
          <label htmlFor="blueprint-name">Blueprint Name</label>
          <input
            id="blueprint-name"
            type="text"
            placeholder="e.g., Assault Setup"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="weapon">Weapon</label>
          <select value={weapon} onChange={(e) => setWeapon(e.target.value)}>
            <option value="">Select a weapon...</option>
            {Object.entries(weaponCategories).map(([category, weapons]) => (
              <optgroup key={category} label={category}>
                {Object.entries(weapons).map(([code, name]) => (
                  <option key={code} value={`${code}-${name}`}>
                    {name} ({code})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="attachments-grid">
          <h3>Attachments</h3>
          {Object.entries(attachmentCategories).map(([category, categoryAttachments]) => (
            <div key={category} className="form-group">
              <label htmlFor={`attach-${category}`}>
                {category === 'ammomod' ? 'Ammo Mod' : category === 'firemods' ? 'Fire Mods' : category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
              <select
                id={`attach-${category}`}
                value={attachments[category] || ''}
                onChange={(e) => handleAttachmentChange(category, e.target.value)}
              >
                <option value="">None</option>
                {Object.entries(categoryAttachments).map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} - {name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="code-display">
          <h3>Generated Code</h3>
          <div className="code-box">
            {generatedCode ? (
              <code>{generatedCode}</code>
            ) : (
              <span className="placeholder">Code will appear here</span>
            )}
          </div>
          <button className="copy-btn" onClick={() => {
            if (generatedCode) {
              navigator.clipboard.writeText(generatedCode);
              alert('Code copied to clipboard!');
            }
          }}>
            Copy Code
          </button>
        </div>

        <div className="form-actions">
          <button className="btn-primary" onClick={handleSave}>
            {blueprint ? 'Update Blueprint' : 'Save Blueprint'}
          </button>
          <button className="btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlueprintBuilder;
