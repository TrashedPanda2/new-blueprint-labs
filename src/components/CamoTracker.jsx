import { useState, useEffect, useMemo } from "react";
import "../components/CamoTracker.css";

/* ===== CAMO DATA (ALL MODES, REAL CHALLENGES) ===== */

const camoData = {
  multiplayer: {
    categories: [
      {
        name: "Military Camos",
        camos: [
          { name: "Underbrush", challenge: "5 headshot kills" },
          { name: "Woodland", challenge: "10 headshot kills" },
          { name: "Slate Digital", challenge: "20 headshot kills" },
          { name: "Redwood", challenge: "30 headshot kills" },
          { name: "Poison", challenge: "40 headshot kills" },
          { name: "Toxic", challenge: "50 headshot kills" },
          { name: "Mountain", challenge: "60 headshot kills" },
          { name: "Stalker", challenge: "70 headshot kills" },
          { name: "Ruby Snake", challenge: "80 headshot kills" }
        ]
      },
      {
        name: "Special Camos",
        camos: [
          { name: "Diamondback", challenge: "50 kills while moving" },
          { name: "Raptor", challenge: "30 objective kills" },
          {
            name: "Mainframe",
            challenge: "20 kills with underbarrel launcher attachment"
          }
        ]
      },
      {
        name: "Mastery Camos",
        camos: [
          {
            name: "Shattered Gold",
            challenge: "3 kills without dying 10 times"
          },
          { name: "Arclight", challenge: "10 double kills or better" },
          {
            name: "Tempest",
            challenge: "5 kills without dying 3 times"
          },
          { name: "Singularity", challenge: "Complete previous camos" }
        ]
      }
    ]
  },

  zombies: {
    categories: [
      {
        name: "Military Camos",
        camos: [
          { name: "Char", challenge: "100 critical kills" },
          { name: "Tundra", challenge: "200 critical kills" },
          { name: "Flood Digital", challenge: "300 critical kills" },
          { name: "Cedar", challenge: "400 critical kills" },
          { name: "Marshland", challenge: "500 critical kills" },
          { name: "Mire", challenge: "600 critical kills" },
          { name: "Ravine", challenge: "700 critical kills" },
          { name: "Skulk", challenge: "800 critical kills" },
          { name: "Emerald Snake", challenge: "1000 critical kills" }
        ]
      },
      {
        name: "Special Camos",
        camos: [
          { name: "Mutilate", challenge: "300 hipfire kills" },
          {
            name: "Slither",
            challenge: "3 critical kills consecutively 5 times"
          },
          {
            name: "Pathfinder",
            challenge: "300 kills with fireworks activations"
          }
        ]
      },
      {
        name: "Mastery Camos",
        camos: [
          {
            name: "Golden Dragon",
            challenge: "10 kills rapidly 15 times"
          },
          {
            name: "Bloodstone",
            challenge:
              "20 or more consecutive kills without taking damage 5 times"
          },
          { name: "Doomsteel", challenge: "10 elite zombies kills" },
          { name: "Infestation", challenge: "Complete previous camos" }
        ]
      }
    ]
  },

  warzone: {
    categories: [
      {
        name: "Military Camos",
        camos: [
          { name: "Autumn", challenge: "5 kills" },
          { name: "Artic", challenge: "10 kills" },
          { name: "Forest Digital", challenge: "20 kills" },
          { name: "Balsam", challenge: "30 kills" },
          { name: "Arid", challenge: "40 kills" },
          { name: "Oil", challenge: "50 kills" },
          { name: "Snowcap", challenge: "60 kills" },
          { name: "Hunter", challenge: "80 kills" },
          { name: "Sapphire Snake", challenge: "100 kills" }
        ]
      },
      {
        name: "Special Camos",
        camos: [
          { name: "Shimmer", challenge: "5 headshot kills" },
          {
            name: "Tyrant",
            challenge: "5 kills while using a suppressor"
          },
          {
            name: "Trace",
            challenge: "5 kills shortly after sprinting"
          }
        ]
      },
      {
        name: "Mastery Camos",
        camos: [
          {
            name: "Golden Damascus",
            challenge: "3 kills in a single match 5 times"
          },
          {
            name: "Starglass",
            challenge: "5 kills without dying 5 times"
          },
          {
            name: "Absolute Zero",
            challenge: "10 kills while in the Top 10"
          },
          { name: "Apocolypse", challenge: "Complete previous camos" }
        ]
      }
    ]
  },

  endgame: {
    categories: [
      {
        name: "Military Camos",
        camos: [
          { name: "Foliage", challenge: "10 critical kills" },
          { name: "Desert", challenge: "25 critical kills" },
          { name: "City Digital", challenge: "50 critical kills" },
          { name: "Pine", challenge: "75 critical kills" },
          { name: "Forest", challenge: "100 critical kills" },
          { name: "Sludge", challenge: "125 critical kills" },
          { name: "Plateau", challenge: "150 critical kills" },
          { name: "Nocturne", challenge: "200 critical kills" },
          { name: "Topaz Snake", challenge: "250 critical kills" }
        ]
      },
      {
        name: "Special Camos",
        camos: [
          {
            name: "Cinder",
            challenge: "50 kills shortly after sprinting"
          },
          {
            name: "Caiman",
            challenge: "100 kills with a 4.0x or higher magnification scope"
          },
          { name: "Network", challenge: "100 Fear enemy kills" }
        ]
      },
      {
        name: "Mastery Camos",
        camos: [
          { name: "Molten Gold", challenge: "20 special enemy kills" },
          {
            name: "Moonstone",
            challenge: "100 Zone III or Zone IV enemy kills"
          },
          { name: "Chroma Flux", challenge: "10 Elite enemy kills" },
          { name: "Genesis", challenge: "Complete previous camos" }
        ]
      }
    ]
  }
};

/* ===== WEAPON LIST (SAME FOR ALL MODES) ===== */

const weaponClasses = {
  ARS: [
    "M15 MOD 0",
    "AK-27",
    "MXR-17",
    "X9 MAVERICK",
    "DS20 MIRAGE",
    "PEACEKEEPER MK1",
    "MADDOX RFB"
  ],
  SMGS: [
    "STURMWOLF 45",
    "KOGOT-7",
    "RYDEN 45K",
    "RK-9",
    "RAZOR 9MM",
    "DRAVEC 45",
    "CARBON 57",
    "MPC-26"
  ],
  SHOTGUNS: ["M10 BREACHER", "ECHO 12", "AKITA"],
  LMGS: ["SOKOL 545", "MK.78", "XM325"],
  "MARKSMAN RIFLES": ["M8A1", "WARDEN 308", "M34 NOVALINE"],
  SNIPERS: ["HAWKER HX", "VS RECON", "SHADOW SK", "XR-3 ION"],
  PISTOLS: ["JAGER 45", "VELOX 5.7", "CODA 9"],
  LAUNCHERS: ["AAROW 109", "A.R.C. M1"],
  SPECIALS: ["NX RAVAGER"],
  MELEE: ["BALLISTIC KNIFE", "KNIFE", "FLATLINE MK.II"]
};

/* ===== MODAL COMPONENT ===== */

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
            <p>
              {className} • {mode.toUpperCase()}
            </p>
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

/* ===== MAIN TRACKER ===== */

function CamoTracker() {
  const [mode, setMode] = useState("multiplayer");
  const [completed, setCompleted] = useState({});
  const [activeWeapon, setActiveWeapon] = useState(null);
  const [activeClass, setActiveClass] = useState(null);

  const categories = camoData[mode].categories;

  const camoList = useMemo(
    () =>
      camoData[mode].categories.flatMap((cat) =>
        cat.camos.map((camo) => ({ ...camo, category: cat.name }))
      ),
    [mode]
  );

  const totalCamos = camoList.length;

  useEffect(() => {
    const saved = localStorage.getItem("weaponCamoCompletion_v2");
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "weaponCamoCompletion_v2",
      JSON.stringify(completed)
    );
  }, [completed]);

  const getWeaponCompletion = (weaponName) => {
    const modeBlock = completed[mode] || {};
    const existing = modeBlock[weaponName];
    if (existing && existing.length === totalCamos) return existing;
    return Array(totalCamos).fill(false);
  };

  const setWeaponCompletion = (weaponName, newArr) => {
    setCompleted((prev) => {
      const copy = { ...prev };
      const modeBlock = copy[mode] || {};
      copy[mode] = { ...modeBlock, [weaponName]: newArr };
      return copy;
    });
  };

  const isWeaponFullyComplete = (weaponName) =>
    getWeaponCompletion(weaponName).every(Boolean);

  return (
    <div className="camo-dashboard">
      <div className="camo-dashboard-header">
        <h2>Camo Tracker</h2>
        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setActiveWeapon(null);
            setActiveClass(null);
          }}
          className="mode-select-input"
        >
          <option value="multiplayer">Multiplayer</option>
          <option value="zombies">Zombies</option>
          <option value="warzone">Warzone</option>
          <option value="endgame">Endgame</option>
        </select>
      </div>

      <div className="weapon-dropdowns">
        {Object.entries(weaponClasses).map(([className, weapons]) => {
          const totalWeapons = weapons.length;
          const completedWeapons = weapons.filter((w) =>
            isWeaponFullyComplete(w)
          ).length;

          return (
            <details key={className} className="weapon-dropdown">
              <summary>
                <span>{className}</span>
                <span className="class-progress">
                  {completedWeapons} / {totalWeapons} guns complete
                </span>
              </summary>
              <div className="weapon-list">
                {weapons.map((weapon) => (
                  <button
                    key={weapon}
                    className={
                      "weapon-btn" +
                      (isWeaponFullyComplete(weapon) ? " weapon-complete" : "")
                    }
                    onClick={() => {
                      setActiveWeapon(weapon);
                      setActiveClass(className);
                    }}
                  >
                    {weapon}
                  </button>
                ))}
              </div>
            </details>
          );
        })}
      </div>

      {activeWeapon && (
        <WeaponModal
          mode={mode}
          weaponName={activeWeapon}
          className={activeClass}
          camoList={camoList}
          categories={categories}
          weaponCompletion={getWeaponCompletion(activeWeapon)}
          setWeaponCompletion={setWeaponCompletion}
          onClose={() => setActiveWeapon(null)}
        />
      )}
    </div>
  );
}

export default CamoTracker;
