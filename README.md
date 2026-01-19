# Snake Game

A classic Snake game built with vanilla HTML, CSS, and JavaScript featuring a modern, refreshed design.

## Features

- **Three Difficulty Levels**: Easy, Medium, and Hard with different game speeds
- **Score Tracking**: Real-time score display with persistent high scores
- **Pause Functionality**: Pause and resume gameplay at any time
- **Responsive Controls**: Support for both Arrow keys and WASD
- **Modern Design**: Clean, animated UI with smooth transitions
- **Local Storage**: High scores are saved separately for each difficulty level

## How to Play

1. Open `index.html` in your web browser
2. Select your preferred difficulty level:
   - **Easy**: Slower speed, perfect for beginners
   - **Medium**: Moderate speed, balanced gameplay
   - **Hard**: Fast-paced, challenging mode
3. Click "Start Game" to begin
4. Control the snake to eat the food and grow longer
5. Avoid hitting the walls or the snake's own body

## Controls

- **Arrow Keys** or **WASD**: Move the snake (Up, Down, Left, Right)
- **Spacebar**: Pause/Resume the game
- **ESC**: Pause the game

## Game Rules

- Each piece of food eaten increases your score by 10 points
- The snake grows longer with each food consumed
- Game ends if the snake hits the wall or itself
- High scores are automatically saved for each difficulty level

## File Structure

```
/
├── index.html       # Main HTML file
├── styles.css       # Styling and animations
├── game.js          # Core game logic (Snake, Food, Game classes)
├── constants.js     # Game configuration constants
├── ui.js            # UI controls and event handlers
├── storage.js       # LocalStorage management
├── assets/          # Assets directory
│   ├── mockups/    # Design mockup files
│   └── sounds/     # Sound effects (optional)
└── README.md        # This file
```

## Technical Details

- **Technology**: Vanilla JavaScript (ES6 modules)
- **Rendering**: HTML5 Canvas API
- **Storage**: Browser LocalStorage
- **No Dependencies**: Pure browser technologies, no build step required

## Browser Compatibility

Works in all modern browsers that support:
- HTML5 Canvas
- ES6 Modules
- LocalStorage API

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Customization

### Modify Game Settings

Edit [constants.js](constants.js) to customize:
- Grid size and cell dimensions
- Game speeds for each difficulty
- Colors and visual styling
- Starting snake length
- Points per food

### Update Design

Edit [styles.css](styles.css) to modify:
- Color scheme (CSS variables in `:root`)
- Button styles and animations
- Layout and spacing
- Responsive breakpoints

### Add Mockup Designs

1. Place your mockup files in the `assets/mockups/` directory
2. Update color values in [constants.js](constants.js) based on your mockups
3. Adjust CSS in [styles.css](styles.css) to match the design

## Future Enhancements

Potential features to add:
- Sound effects and background music
- Mobile touch controls
- Multiple themes/skins
- Power-ups and special food types
- Multiplayer mode
- Leaderboard with timestamps

## License

Free to use and modify.

## Credits

Classic Snake game reimagined with modern web technologies.
