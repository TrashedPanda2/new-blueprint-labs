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
  "Maddox RFB": "Assault Rifles",
  "M15 MOD 0": "Assault Rifles",
  "AK-27": "Assault Rifles",
  "MXR-17": "Assault Rifles",
  "X9 Maverick": "Assault Rifles",
  "DS20 Mirage": "Assault Rifles",
  "Peacekeeper MK1": "Assault Rifles",
  "FFAR 1": "Assault Rifles",

  // Submachine Guns
  "9MM PM": "Submachine Guns",
  "KSV": "Submachine Guns",
  "JACKAL PDW": "Submachine Guns",
  "SAUG": "Submachine Guns",
  "PP-919": "Submachine Guns",
  "PPSH-41": "Submachine Guns",
  "C9": "Submachine Guns",
  "KOMPAKT 92": "Submachine Guns",
  "LADRA": "Submachine Guns",
  "Dresden 9mm": "Submachine Guns",
  "Sturmwolf 45": "Submachine Guns",
  "RK-9": "Submachine Guns",
  "Ryden 45K": "Submachine Guns",
  "Razor 9mm": "Submachine Guns",
  "Dravec 45": "Submachine Guns",
  "Carbon 57": "Submachine Guns",
  "MPC-25": "Submachine Guns",
  "Kogot-7": "Submachine Guns",
  "LC10": "Submachine Guns",
  "TANTO .22": "Submachine Guns",
  // Light Machine Guns
  "MK.78": "Light Machine Guns",
  "XM325": "Light Machine Guns",
  "Sokol 545": "Light Machine Guns",
  "PU-21": "Light Machine Guns",
  "XMG": "Light Machine Guns",
  "GPMG-7": "Light Machine Guns",
  "FENG 82": "Light Machine Guns",
  "PML 5.56": "Light Machine Guns",

  // Marksman Rifles
  "SWAT 5.56": "Marksman Rifles",
  "TSARKOV 7.62": "Marksman Rifles",
  "AEK-973": "Marksman Rifles",
  "DM-10": "Marksman Rifles",
  "ESSEX MODEL 07": "Marksman Rifles",
  "TR2": "Marksman Rifles",
  "M8A1": "Marksman Rifles",
  "Warden 308": "Marksman Rifles",
  "M34 Novaline": "Marksman Rifles",

  // Sniper Rifles
  "HDR": "Sniper Rifles",
  "LW31A1 FROSTLINE": "Sniper Rifles",
  "Hawker HX": "Sniper Rifles",
  "XR-3 Ion": "Sniper Rifles",
  "Shadow SK": "Sniper Rifles",
  "VS Recon": "Sniper Rifles",
  "SVD": "Sniper Rifles",
  "LR 7.62": "Sniper Rifles",
  "AMR MOD 4": "Sniper Rifles",

  // Shotguns
  "MARINE SP": "Shotguns",
  "MAELSTROM": "Shotguns",
  "Akita": "Shotguns",
  "Echo 12": "Shotguns",
  "M10 Breacher": "Shotguns",
  "ASG-89": "Shotguns",

  // Pistols
  "GS45": "Pistols",
  "GREKHOVA": "Pistols",
  "SIRIN 9MM": "Pistols",
  "Coda 9": "Pistols",
  "Velox 5.7": "Pistols",
  "Jäger 45": "Pistols",
  "STRYDER .22": "Pistols",
  "GRAVEMARK .357": "Pistols",

   //Launchers
  "CIGMA 2B": "Launchers",
  "HE-1": "Launchers",
  "ARROW 109": "Launchers",
  "A.R.C M1": "Launchers"
  ,

  // Specials
  "NX Ravager": "Specials",
  "NAIL GUN": "Specials",
  "Olympia": "Specials",
  "D1.3 SECTOR": "Specials",
  "X52 RESONATOR": "Specials",
  "SIRIN 9MM": "Specials",
  // CATEGORY 9 — MELEE
  "Knife": "Melee",
  "Knife (BO6)": "Melee",
  "Flatline MK.II": "Melee",
  "Ballistic Knife": "Melee",
  "Baseball Bat": "Melee",
  "Kali Sticks": "Melee",
  "Pickaxe": "Melee",
  "Boxing Gloves": "Melee",
  "Chainsaw": "Melee",
  "Sai": "Melee",
  "Bo Staff": "Melee",
  "Nunchaku": "Melee",
  "Katanas": "Melee",
  "Skateboard": "Melee",
  "Cleaver": "Melee",
  "Powerdrill": "Melee"


};

export const generatePoolsData = (weaponsData) => {
  const pools = {};

  // Iterate through all weapons and their blueprints
  weaponsData.Weapons.forEach(weapon => {
    const weaponName = (weapon.Name || '').trim();
    const category = weaponCategoryMap[weaponName] || "Melee"; // fallback but should be covered

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
