// This file organizes blueprints by their pool numbers
// Data is derived from the weapons.json file structure

// Category mapping based on weapon types
const weaponCategoryMap = {
  // Assault Rifles
  "XM4": "Assault Rifles",
  "AK-74": "Assault Rifles",
  "AMES 85": "Assault Rifles",
  "GPR 91": "Assault Rifles",
  "MODEL L": "Assault Rifles",
  "GOBLIN MK 2": "Assault Rifles",
  "AS VAL": "Assault Rifles",
  "KRIG C": "Assault Rifles",
  "CYPHER 091": "Assault Rifles",
  "KILO 141": "Assault Rifles",
  "ABR A1": "Assault Rifles",
  "CR-56 AMAX": "Assault Rifles",

  // Submachine Guns
  "9MM PM": "Submachine Guns",
  "KSV": "Submachine Guns",
  "JACKAL PDW": "Submachine Guns",
  "SAUG": "Submachine Guns",
  "PP-919": "Submachine Guns",
  "PPSH-41": "Submachine Guns",
  "C9": "Submachine Guns",
  "KOMPAKT 92": "Submachine Guns",

  // Sniper Rifles
  "HDR": "Sniper Rifles",
  "LW31A1 FROSTLINE": "Sniper Rifles",

  // Shotguns
  "MARINE SP": "Shotguns",
  "MAELSTROM": "Shotguns",

  // Pistols
  "GS45": "Pistols",
  "GREKHOVA": "Pistols",
  "SIRIN 9MM": "Pistols",
  "LADRA": "Pistols"
};

export const generatePoolsData = (weaponsData) => {
  const pools = {};

  // Iterate through all weapons and their blueprints
  weaponsData.Weapons.forEach(weapon => {
    const weaponName = (weapon.Name || '').trim();
    const category = weaponCategoryMap[weaponName] || "Assault Rifles"; // fallback but should be covered

    weapon.Blueprints.forEach(blueprint => {
      const poolNumber = parseInt(blueprint.Pool, 10);

      // Skip "NOTHING" status blueprints
      if (blueprint.status === "NOTHING") {
        return;
      }

      if (!pools[poolNumber]) {
        pools[poolNumber] = {
          poolNumber,
          blueprints: []
        };
      }

      const blueprintName = (blueprint.Name || '').trim();

      // Base path using exact gun name + blueprint name
      const basePath = `/images/${weaponName}/${blueprintName}`;

      // All possible image variants for the modal
      const images = [
        `${basePath}.png`,
        `${basePath}.jpg`,
        `${basePath}.jpeg`,
        `${basePath}.webp`
      ];

      pools[poolNumber].blueprints.push({
        id: `${weaponName}-${blueprintName}`,
        name: blueprintName,
        weapon: weaponName,
        category,
        status: blueprint.status,
        bundle: blueprint.Bundle,
        image: images[0],      // used by the table thumbnail if needed
        images,                // used by the modal View button
        fallbackEmoji: '🔫'
      });
    });
  });

  // Sort pools by pool number
  return Object.values(pools).sort((a, b) => a.poolNumber - b.poolNumber);
};
