// Core Snake Game Logic
import { GRID_SIZE, CELL_SIZE, DIRECTIONS, INITIAL_SNAKE_LENGTH, POINTS_PER_FOOD, COLORS } from './constants.js';

/**
 * Snake class - manages snake position, movement, and rendering
 */
class Snake {
  constructor() {
    this.reset();
  }

  reset() {
    // Start snake in the middle of the grid, moving right
    const startX = Math.floor(GRID_SIZE / 2);
    const startY = Math.floor(GRID_SIZE / 2);

    this.body = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      this.body.push({ x: startX - i, y: startY });
    }

    this.direction = DIRECTIONS.RIGHT;
    this.nextDirection = DIRECTIONS.RIGHT;
    this.growing = false;
  }

  move() {
    // Update direction (prevent reversing into itself)
    if (!this.isOppositeDirection(this.nextDirection)) {
      this.direction = this.nextDirection;
    }

    // Calculate new head position
    const head = this.body[0];
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y
    };

    // Add new head
    this.body.unshift(newHead);

    // Remove tail unless growing
    if (!this.growing) {
      this.body.pop();
    } else {
      this.growing = false;
    }
  }

  grow() {
    this.growing = true;
  }

  setDirection(direction) {
    this.nextDirection = direction;
  }

  isOppositeDirection(direction) {
    return (
      (this.direction === DIRECTIONS.UP && direction === DIRECTIONS.DOWN) ||
      (this.direction === DIRECTIONS.DOWN && direction === DIRECTIONS.UP) ||
      (this.direction === DIRECTIONS.LEFT && direction === DIRECTIONS.RIGHT) ||
      (this.direction === DIRECTIONS.RIGHT && direction === DIRECTIONS.LEFT)
    );
  }

  checkSelfCollision() {
    const head = this.body[0];
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }
    return false;
  }

  checkWallCollision() {
    const head = this.body[0];
    const collision = head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;
    if (collision) {
      console.log('Wall collision at:', head, 'GRID_SIZE:', GRID_SIZE);
    }
    return collision;
  }

  draw(ctx) {
    this.body.forEach((segment, index) => {
      const isHead = index === 0;
      const x = segment.x * CELL_SIZE + 1;
      const y = segment.y * CELL_SIZE + 1;
      const size = CELL_SIZE - 2;

      // Create gradient from cyan to magenta
      const gradient = ctx.createLinearGradient(x, y, x + size, y + size);
      gradient.addColorStop(0, COLORS.snakeHead); // Cyan
      gradient.addColorStop(1, COLORS.snake); // Magenta

      ctx.fillStyle = gradient;
      ctx.shadowBlur = isHead ? 30 : 15;
      ctx.shadowColor = isHead ? COLORS.snakeHead : COLORS.snake;

      // Draw rounded rectangle
      const radius = isHead ? 6 : 2;
      ctx.beginPath();
      ctx.roundRect(x, y, size, size, radius);
      ctx.fill();

      // Draw eye on head
      if (isHead) {
        ctx.fillStyle = '#000';
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.shadowBlur = 0;
  }
}

/**
 * Food class - manages food position and rendering
 */
class Food {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.spawn();
  }

  spawn(snakeBody = []) {
    let validPosition = false;

    while (!validPosition) {
      this.position = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };

      // Check if position overlaps with snake
      validPosition = !snakeBody.some(
        segment => segment.x === this.position.x && segment.y === this.position.y
      );
    }
  }

  draw(ctx) {
    const centerX = this.position.x * CELL_SIZE + CELL_SIZE / 2;
    const centerY = this.position.y * CELL_SIZE + CELL_SIZE / 2;

    ctx.shadowBlur = 20;
    ctx.shadowColor = COLORS.food;
    ctx.fillStyle = COLORS.food;
    ctx.beginPath();
    ctx.arc(centerX, centerY, CELL_SIZE / 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

/**
 * Game class - main game loop and state management
 */
export class Game {
  constructor(canvas, onScoreUpdate, onGameOver) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onScoreUpdate = onScoreUpdate;
    this.onGameOver = onGameOver;

    this.snake = new Snake();
    this.food = new Food();

    this.score = 0;
    this.gameSpeed = 100;
    this.isRunning = false;
    this.isPaused = false;
    this.lastRenderTime = 0;
    this.animationId = null;
  }

  start(difficulty = 'medium', speed) {
    this.reset();
    this.gameSpeed = speed;
    this.isRunning = true;
    this.isPaused = false;
    this.lastRenderTime = 0;
    this.loop();
  }

  reset() {
    this.snake.reset();
    this.food.spawn(this.snake.body);
    this.score = 0;
    this.onScoreUpdate(this.score);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
    this.lastRenderTime = 0; // Reset timing to prevent jump
    this.loop();
  }

  stop() {
    this.isRunning = false;
    this.isPaused = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  setDirection(direction) {
    if (this.isRunning && !this.isPaused) {
      this.snake.setDirection(direction);
    }
  }

  loop(currentTime = 0) {
    if (!this.isRunning || this.isPaused) {
      return;
    }

    this.animationId = requestAnimationFrame((time) => this.loop(time));

    const timeSinceLastRender = currentTime - this.lastRenderTime;

    if (timeSinceLastRender < this.gameSpeed) {
      return;
    }

    this.lastRenderTime = currentTime;
    this.update();
    this.render();
  }

  update() {
    // Move snake
    this.snake.move();

    // Check collisions
    if (this.snake.checkWallCollision() || this.snake.checkSelfCollision()) {
      this.handleGameOver();
      return;
    }

    // Check food collision
    const head = this.snake.body[0];
    if (head.x === this.food.position.x && head.y === this.food.position.y) {
      this.snake.grow();
      this.score += POINTS_PER_FOOD;
      this.onScoreUpdate(this.score);
      this.food.spawn(this.snake.body);
    }
  }

  render() {
    // Clear canvas with dark background
    this.ctx.fillStyle = COLORS.canvasBg;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw grid
    this.drawGrid();

    // Draw game objects
    this.food.draw(this.ctx);
    this.snake.draw(this.ctx);
  }

  drawGrid() {
    this.ctx.strokeStyle = COLORS.grid;
    this.ctx.lineWidth = 0.5;

    for (let i = 0; i <= GRID_SIZE; i++) {
      // Vertical lines
      this.ctx.beginPath();
      this.ctx.moveTo(i * CELL_SIZE, 0);
      this.ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      this.ctx.stroke();

      // Horizontal lines
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * CELL_SIZE);
      this.ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      this.ctx.stroke();
    }
  }

  handleGameOver() {
    this.stop();
    this.onGameOver(this.score);
  }

  getScore() {
    return this.score;
  }
}
