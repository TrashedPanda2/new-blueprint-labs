# Black Ops 7 Weapon Code Generator

A modern web application for creating and managing Black Ops 7 weapon blueprints and generating custom weapon codes.

## Features

- **Blueprint Creation**: Create custom weapon blueprints with a name, base weapon, and selected attachments
- **Automatic Code Generation**: Instantly generates weapon codes based on your blueprint attachments
- **Blueprint Management**: Save, edit, and delete your blueprints
- **Local Storage**: All blueprints are automatically saved to your browser's local storage
- **Copy to Clipboard**: Easily copy generated codes with one click
- **Responsive Design**: Works great on desktop and mobile devices

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## How to Use

### Creating a Blueprint

1. **Enter a Name**: Give your blueprint a descriptive name (e.g., "Assault Setup")
2. **Select a Weapon**: Choose from 7 weapon categories (Assault Rifles, SMGs, Shotguns, LMGs, Marksman Rifles, Sniper Rifles, Pistols)
3. **Configure Attachments**: 
   - Select attachments from 9 categories: Optic, Muzzle, Barrel, Underbarrel, Magazine, Grip, Stock, Laser, and Fire Mods
   - Leave any attachment blank if you don't want to use it
4. **Review the Code**: The weapon code generates automatically as you configure attachments
5. **Save Blueprint**: Click "Save Blueprint" to store it

### Managing Blueprints

- **View Blueprints**: All saved blueprints appear in the left sidebar
- **Edit**: Click any blueprint in the sidebar to edit it
- **Delete**: Click the × button on a blueprint to remove it
- **Copy Code**: Click "Copy Code" to copy the generated code to your clipboard

## Project Structure

```
src/
├── components/
│   ├── BlueprintBuilder.jsx    # Main form for creating/editing blueprints
│   ├── BlueprintList.jsx       # Sidebar showing saved blueprints
│   └── BlueprintList.css       # Styles for blueprint list
├── data/
│   ├── weaponGenerator.js      # Original weapon data and code calculation
│   └── weaponData.js           # Organized weapon and attachment data
├── utils/
│   └── codeCalculator.js       # Code generation logic
├── App.jsx                     # Main app component
├── App.css                     # Main app styles
├── index.css                   # Global styles
└── main.jsx                    # React entry point
```

## Technology Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **CSS3**: Styling with modern features
- **Local Storage API**: For persisting blueprints

## Code Generation Algorithm

The app uses a custom base-34 addition algorithm that:
1. Takes all selected attachment codes
2. Removes hyphens from the codes
3. Converts them to base-34 format
4. Adds them together
5. Formats the result with hyphens for readability

## Customization

### Adding New Weapons

Edit [src/data/weaponData.js](src/data/weaponData.js):
```javascript
export const weaponCategories = {
  "YOUR_CATEGORY": {
    "CODE": "Weapon Name",
    // ... more weapons
  }
};
```

### Adding New Attachments

Edit [src/data/weaponData.js](src/data/weaponData.js) and add to the appropriate attachment category in `attachmentCategories`.

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Notes

- Blueprints are stored locally in your browser. Clearing browser data will delete them.
- Export your blueprints before clearing cache if you want to keep them.
- The weapon codes are calculated based on your selected attachments and cannot be manually overridden.
