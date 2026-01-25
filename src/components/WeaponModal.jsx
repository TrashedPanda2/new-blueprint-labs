import "../components/CamoTracker.css";

function WeaponModal({
  mode,
  weaponName,
  className,
  camoList,
  categories,
  weaponCompletion,
  setWeaponCompletion,
  onClose
}) {
  const totalCamos = camoList.length;
  const completedCount = weaponCompletion.filter(Boolean).length;
  const progressPercent =
    totalCamos === 0 ? 0 : Math.round((completedCount / totalCamos) * 100);

  const toggleCamo = (index) => {
    const updated = [...weaponCompletion];
    if (updated[index]) {
      // deselect only this camo
      updated[index] = false;
    } else {
      // auto-complete all previous
      for (let i = 0; i <= index; i++) {
        updated[i] = true;
      }
    }
    setWeaponCompletion(weaponName, updated);
  };

  const isComplete = (i) => weaponCompletion[i];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{weaponName}</h3>
            <p>{className} • {mode.toUpperCase()}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="weapon-progress">
          <span>
            {completedCount} / {totalCamos} camos completed
          </span>
          <div className="weapon-progress-bar">
            <div
              className="weapon-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="weapon-camo-sections">
          {categories.map((cat) => (
            <div key={cat.name} className="camo-section">
              <h4 className="camo-section-title">{cat.name}</h4>
              <div className="camo-chip-row">
                {camoList
                  .map((camo, index) => ({ ...camo, index }))
                  .filter((c) => c.category === cat.name)
                  .map((c) => (
                    <button
                      key={c.name}
                      className={
                        "camo-chip" + (isComplete(c.index) ? " complete" : "")
                      }
                      onClick={() => toggleCamo(c.index)}
                      data-challenge={c.challenge}
                    >
                      <span className="camo-chip-name">{c.name}</span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeaponModal;
