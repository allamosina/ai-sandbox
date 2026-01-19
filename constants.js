// Game Configuration Constants

// Grid settings
export const GRID_SIZE = 20; // 20x20 grid
export const CELL_SIZE = 20; // 20 pixels per cell (matching mockup)
export const CANVAS_SIZE = GRID_SIZE * CELL_SIZE; // 400x400 pixels

// Game speeds (milliseconds per frame)
export const DIFFICULTY_SPEEDS = {
  easy: 300,
  medium: 200,
  hard: 120
};

// Colors - Cyberpunk Neon Theme
export const COLORS = {
  background: '#0a0e27',
  canvasBg: '#050714',
  snake: '#ff00ff', // Neon magenta
  snakeHead: '#00ffff', // Neon cyan
  food: '#ffff00', // Neon yellow
  grid: 'rgba(0, 255, 255, 0.05)',
  text: '#ffffff',
  textCyan: '#00ffff',
  textMagenta: '#ff00ff',
  textSecondary: 'rgba(0, 255, 255, 0.4)',
  buttonCyan: '#00ffff',
  buttonMagenta: '#ff00ff',
  buttonGreen: '#00ff00',
  overlay: 'rgba(0, 0, 0, 0.9)'
};

// Game settings
export const INITIAL_SNAKE_LENGTH = 3;
export const POINTS_PER_FOOD = 10;

// Direction constants
export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

// Key codes
export const KEYS = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  W: 'w',
  A: 'a',
  S: 's',
  D: 'd',
  SPACE: ' ',
  ESCAPE: 'Escape'
};
