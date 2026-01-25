import { weaponCategories, attachmentCategories } from '../data/weaponData';
import { customAddMultiple } from './codeCalculator';

export function parseBlueprint(code) {
  if (!code || typeof code !== 'string') return null;

  // Extract weapon code (first 3 chars before first hyphen)
  const parts = code.split('-');
  if (parts.length < 2) return null;

  const weaponCode = parts[0];
  const attachmentCode = parts.slice(1).join('');

  // Find weapon by code
  let weapon = null;
  for (const [, weapons] of Object.entries(weaponCategories)) {
    if (weapons[weaponCode]) {
      weapon = `${weaponCode}-${weapons[weaponCode]}`;
      break;
    }
  }

  if (!weapon) return null;

  // Parse attachment code by brute-force search
  const attachments = findAttachmentCombination(attachmentCode);

  return {
    weapon,
    attachments
  };
}

function findAttachmentCombination(targetCode) {
  const attachments = {
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
  };

  // Get all available attachment codes for each category
  const attachmentLists = {
    optic: Object.keys(attachmentCategories.optic),
    muzzle: Object.keys(attachmentCategories.muzzle),
    barrel: Object.keys(attachmentCategories.barrel),
    underbarrel: Object.keys(attachmentCategories.underbarrel),
    launchers: Object.keys(attachmentCategories.launchers),
    magazine: Object.keys(attachmentCategories.magazine),
    reargrip: Object.keys(attachmentCategories.reargrip),
    stock: Object.keys(attachmentCategories.stock),
    laser: Object.keys(attachmentCategories.laser),
    firemods: Object.keys(attachmentCategories.firemods),
    ammomod: Object.keys(attachmentCategories.ammomod),
    special: Object.keys(attachmentCategories.special)
  };

  // Try combinations starting with each category
  const categories = Object.keys(attachmentLists);
  
  // Recursive function to find matching combination
  function tryCombo(categoryIndex, currentAttachments) {
    if (categoryIndex >= categories.length) {
      // Check if this combination matches
      const values = categories.map(cat => currentAttachments[cat]).filter(v => v);
      const cleanedValues = values.map(v => v.replace(/-/g, ''));
      const result = customAddMultiple(...cleanedValues);
      const formatted = result.match(/.{1,5}/g)?.join('-') || '';
      
      if (formatted === targetCode) {
        return currentAttachments;
      }
      return null;
    }

    const category = categories[categoryIndex];
    const codes = attachmentLists[category];

    // Try with no attachment for this category
    const result = tryCombo(categoryIndex + 1, { ...currentAttachments, [category]: '' });
    if (result) return result;

    // Try with each attachment code for this category
    for (const code of codes) {
      const result = tryCombo(categoryIndex + 1, { ...currentAttachments, [category]: code });
      if (result) return result;
    }

    return null;
  }

  const found = tryCombo(0, attachments);
  return found || attachments;
}
