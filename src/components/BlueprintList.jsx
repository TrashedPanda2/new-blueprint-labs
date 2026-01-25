import './BlueprintList.css';

function BlueprintList({ blueprints, onEdit, onDelete }) {
  return (
    <div className="blueprint-list">
      <h2>Your Blueprints</h2>
      {blueprints.length === 0 ? (
        <p className="empty-state">No blueprints yet. Create one to get started!</p>
      ) : (
        <ul>
          {blueprints.map((bp) => (
            <li
              key={bp.id}
              className="blueprint-item"
              onClick={() => onEdit(bp)}
            >
              <div className="blueprint-info">
                <h3>{bp.name}</h3>
                <p className="weapon-name">{bp.weapon}</p>
                <p className="blueprint-code">{bp.code}</p>
              </div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Delete this blueprint?')) {
                    onDelete(bp.id);
                  }
                }}
                title="Delete blueprint"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BlueprintList;
