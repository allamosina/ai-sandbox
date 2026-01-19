// UI Controls and State Management
import { Game } from './game.js';
import { DIFFICULTY_SPEEDS, KEYS, DIRECTIONS, CANVAS_SIZE } from './constants.js';
import { getHighScore, setHighScore } from './storage.js';
import { MobileControls } from './mobile-controls.js';

// Difficulty labels
const DIFFICULTY_LABELS = {
  easy: 'NOVICE',
  medium: 'HACKER',
  hard: 'CYBERPSYCHO'
};

class GameUI {
  constructor() {
    this.game = null;
    this.currentDifficulty = 'medium';
    this.currentScore = 0;
    this.highScore = 0;

    // Get DOM elements
    this.canvas = null; // Will be set based on current screen
    this.startScreen = document.getElementById('startScreen');
    this.difficultyScreen = document.getElementById('difficultyScreen');
    this.gameScreen = document.getElementById('gameScreen');
    this.pauseScreen = document.getElementById('pauseScreen');
    this.gameOverScreen = document.getElementById('gameOverScreen');

    // Canvas elements
    this.gameCanvas = document.getElementById('gameCanvas');
    this.difficultyCanvas = document.getElementById('difficultyCanvas');
    this.playCanvas = document.getElementById('playCanvas');

    // Score displays
    this.scoreDisplay = document.getElementById('currentScore');
    this.highScoreDisplay = document.getElementById('highScore');
    this.difficultyLabel = document.getElementById('difficultyLabel');

    // Game over elements
    this.finalScoreDisplay = document.getElementById('finalScore');
    this.finalHighScoreDisplay = document.getElementById('finalHighScore');
    this.gameOverDifficultyDisplay = document.getElementById('gameOverDifficulty');

    // High score displays on difficulty screen
    this.highScoreEasy = document.getElementById('highScoreEasy');
    this.highScoreMedium = document.getElementById('highScoreMedium');
    this.highScoreHard = document.getElementById('highScoreHard');

    // Mobile controls
    this.mobileControls = null;

    this.init();
  }

  init() {
    // Initialize all canvas sizes
    this.gameCanvas.width = CANVAS_SIZE;
    this.gameCanvas.height = CANVAS_SIZE;
    this.difficultyCanvas.width = CANVAS_SIZE;
    this.difficultyCanvas.height = CANVAS_SIZE;
    this.playCanvas.width = CANVAS_SIZE;
    this.playCanvas.height = CANVAS_SIZE;

    // Create game instance with gameCanvas initially
    this.canvas = this.gameCanvas;
    this.game = new Game(
      this.canvas,
      (score) => this.updateScore(score),
      (score) => this.handleGameOver(score)
    );

    // Set up event listeners
    this.setupEventListeners();

    // Initialize mobile controls
    this.initMobileControls();

    // Load and display all high scores
    this.loadAllHighScores();

    // Show start screen
    this.showStartScreen();
  }

  initMobileControls() {
    this.mobileControls = new MobileControls(
      (direction) => this.game.setDirection(direction),
      () => this.togglePause()
    );
  }

  setupEventListeners() {
    // Start button
    document.getElementById('startBtn').addEventListener('click', () => {
      this.showDifficultyScreen();
    });

    // Difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const difficulty = e.currentTarget.dataset.difficulty;
        this.startGame(difficulty);
      });
    });

    // Restart button
    document.getElementById('restartBtn').addEventListener('click', () => {
      this.restartGame();
    });

    // Resume button
    document.getElementById('resumeBtn').addEventListener('click', () => {
      this.togglePause();
    });

    // Back to menu button
    document.getElementById('menuBtn').addEventListener('click', () => {
      this.showDifficultyScreen();
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      this.handleKeyPress(e);
    });
  }

  handleKeyPress(e) {
    // Prevent default arrow key scrolling
    if ([KEYS.ARROW_UP, KEYS.ARROW_DOWN, KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT, KEYS.SPACE].includes(e.key)) {
      e.preventDefault();
    }

    // Pause/Resume
    if (e.key === KEYS.SPACE || e.key === KEYS.ESCAPE) {
      this.togglePause();
      return;
    }

    // Direction controls - check arrow keys first (case-sensitive), then WASD (lowercase)
    if (e.key === KEYS.ARROW_UP || e.key.toLowerCase() === KEYS.W) {
      this.game.setDirection(DIRECTIONS.UP);
    } else if (e.key === KEYS.ARROW_DOWN || e.key.toLowerCase() === KEYS.S) {
      this.game.setDirection(DIRECTIONS.DOWN);
    } else if (e.key === KEYS.ARROW_LEFT || e.key.toLowerCase() === KEYS.A) {
      this.game.setDirection(DIRECTIONS.LEFT);
    } else if (e.key === KEYS.ARROW_RIGHT || e.key.toLowerCase() === KEYS.D) {
      this.game.setDirection(DIRECTIONS.RIGHT);
    }
  }

  startGame(difficulty) {
    this.currentDifficulty = difficulty;

    // Load high score for selected difficulty
    this.highScore = getHighScore(difficulty);
    this.currentScore = 0;

    // Update header displays
    this.updateScore(0);
    this.updateHighScore();
    this.updateDifficultyLabel();

    // Switch to play canvas
    this.canvas = this.playCanvas;
    this.game.canvas = this.playCanvas;
    this.game.ctx = this.playCanvas.getContext('2d');

    // Show game screen
    this.showGameScreen();

    // Start game with selected difficulty
    const speed = DIFFICULTY_SPEEDS[difficulty];
    this.game.start(difficulty, speed);
  }

  restartGame() {
    this.hideGameOverScreen();
    this.startGame(this.currentDifficulty);
  }

  togglePause() {
    if (!this.game.isRunning) {
      return;
    }

    if (this.game.isPaused) {
      this.game.resume();
      this.hidePauseScreen();
    } else {
      this.game.pause();
      this.showPauseScreen();
    }
  }

  updateScore(score) {
    this.currentScore = score;
    this.scoreDisplay.textContent = score.toString().padStart(4, '0');
  }

  updateHighScore() {
    this.highScoreDisplay.textContent = this.highScore.toString().padStart(4, '0');
  }

  updateDifficultyLabel() {
    const label = DIFFICULTY_LABELS[this.currentDifficulty];
    this.difficultyLabel.textContent = `(${label})`;
  }

  loadAllHighScores() {
    const easyScore = getHighScore('easy');
    const mediumScore = getHighScore('medium');
    const hardScore = getHighScore('hard');

    this.highScoreEasy.textContent = `${easyScore} PTS`;
    this.highScoreMedium.textContent = `${mediumScore} PTS`;
    this.highScoreHard.textContent = `${hardScore} PTS`;
  }

  handleGameOver(finalScore) {
    this.currentScore = finalScore;

    // Check and update high score
    const isNewHighScore = setHighScore(this.currentDifficulty, finalScore);

    if (isNewHighScore) {
      this.highScore = finalScore;
      this.updateHighScore();
      this.loadAllHighScores(); // Update all displayed high scores
    }

    // Update game over screen
    this.finalScoreDisplay.textContent = finalScore;
    this.finalHighScoreDisplay.textContent = this.highScore;
    this.gameOverDifficultyDisplay.textContent = DIFFICULTY_LABELS[this.currentDifficulty];

    this.showGameOverScreen();
  }

  // Screen management
  showStartScreen() {
    this.hideAllScreens();
    this.startScreen.classList.add('active');

    // Switch to game canvas and draw initial state
    this.canvas = this.gameCanvas;
    this.game.canvas = this.gameCanvas;
    this.game.ctx = this.gameCanvas.getContext('2d');
    this.game.reset();
    this.game.render(); // Draw initial state
  }

  showDifficultyScreen() {
    this.hideAllScreens();
    this.difficultyScreen.classList.add('active');

    // Switch to difficulty canvas and draw
    this.canvas = this.difficultyCanvas;
    this.game.canvas = this.difficultyCanvas;
    this.game.ctx = this.difficultyCanvas.getContext('2d');
    this.game.reset();
    this.game.render(); // Draw initial state

    // Reload high scores
    this.loadAllHighScores();
  }

  showGameScreen() {
    this.hideAllScreens();
    this.gameScreen.classList.add('active');
  }

  showPauseScreen() {
    this.pauseScreen.classList.add('active');
  }

  hidePauseScreen() {
    this.pauseScreen.classList.remove('active');
  }

  showGameOverScreen() {
    this.gameOverScreen.classList.add('active');
  }

  hideGameOverScreen() {
    this.gameOverScreen.classList.remove('active');
  }

  hideAllScreens() {
    this.startScreen.classList.remove('active');
    this.difficultyScreen.classList.remove('active');
    this.gameScreen.classList.remove('active');
    this.pauseScreen.classList.remove('active');
    this.gameOverScreen.classList.remove('active');
  }
}

// Initialize UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GameUI();
});
