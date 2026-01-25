import './BlueprintCard.css';

function BlueprintCard({ blueprint }) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(blueprint.code);
    alert('Code copied to clipboard!');
  };

  const attachmentNames = {
    optic: 'Optic',
    muzzle: 'Muzzle',
    barrel: 'Barrel',
    underbarrel: 'Underbarrel',
    magazine: 'Magazine',
    reargrip: 'Rear Grip',
    stock: 'Stock',
    stock1: 'Stock 1',
    stock2: 'Stock 2',
    laser: 'Laser',
    firemods: 'Fire Mods',
    ammomod: 'Ammo Mod',
    special: 'Special'
  };

  const hasAttachments = Object.values(blueprint.attachments).some(v => v);

  return (
    <div className="blueprint-card">
      <div className="card-image">
        <img
          src={blueprint.image}
          alt={blueprint.name}
          className="blueprint-img"
        />
      </div>

      <div className="card-header">
        <h3>{blueprint.name}</h3>
        <p className="weapon-type">{blueprint.category}</p>
      </div>

      <div className="card-details">
        <div className="attachments-list">
          <h4>Attachments</h4>
          <ul>
            {hasAttachments ? (
              Object.entries(blueprint.attachments).map(([key, value]) =>
                value ? (
                  <li key={key}>
                    <span className="attachment-label">{attachmentNames[key] || key}:</span>
                    <span className="attachment-value">{value}</span>
                  </li>
                ) : null
              )
            ) : (
              <li className="no-attachments">No attachments selected</li>
            )}
          </ul>
        </div>

        <div className="card-code">
          <h4>Weapon Code</h4>
          <div className="code-display">
            <code>{blueprint.code}</code>
          </div>
        </div>

        <div className="card-actions">
          <button className="copy-code-btn" onClick={handleCopyCode}>
            Copy Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlueprintCard;
