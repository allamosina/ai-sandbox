// Mobile Touch Controls
import { DIRECTIONS } from './constants.js';

export class MobileControls {
  constructor(onDirectionChange, onPause) {
    this.onDirectionChange = onDirectionChange;
    this.onPause = onPause;

    // Swipe detection
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.minSwipeDistance = 30; // Minimum distance for a swipe to register

    // D-pad buttons
    this.dpadButtons = null;
    this.isEnabled = false;

    this.init();
  }

  init() {
    this.createDPad();
    this.setupSwipeListeners();
    this.detectMobile();
  }

  detectMobile() {
    // Show controls on mobile devices or small screens
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth <= 768;

    if (isMobile || isSmallScreen) {
      this.show();
    }

    // Listen for resize events
    window.addEventListener('resize', () => {
      const shouldShow = window.innerWidth <= 768;
      if (shouldShow) {
        this.show();
      } else {
        this.hide();
      }
    });
  }

  createDPad() {
    // Create D-pad container
    const dpad = document.createElement('div');
    dpad.id = 'mobileDPad';
    dpad.className = 'mobile-dpad';
    dpad.innerHTML = `
      <button class="dpad-btn dpad-up" data-direction="up" aria-label="Move Up">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
      <button class="dpad-btn dpad-down" data-direction="down" aria-label="Move Down">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <button class="dpad-btn dpad-left" data-direction="left" aria-label="Move Left">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="dpad-btn dpad-right" data-direction="right" aria-label="Move Right">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      <div class="dpad-center"></div>
    `;

    // Create pause button
    const pauseBtn = document.createElement('button');
    pauseBtn.id = 'mobilePauseBtn';
    pauseBtn.className = 'mobile-pause-btn';
    pauseBtn.setAttribute('aria-label', 'Pause Game');
    pauseBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      </svg>
    `;

    document.body.appendChild(dpad);
    document.body.appendChild(pauseBtn);

    this.dpadButtons = {
      container: dpad,
      up: dpad.querySelector('.dpad-up'),
      down: dpad.querySelector('.dpad-down'),
      left: dpad.querySelector('.dpad-left'),
      right: dpad.querySelector('.dpad-right'),
      pause: pauseBtn
    };

    this.setupDPadListeners();
  }

  setupDPadListeners() {
    // Direction buttons
    Object.keys(this.dpadButtons).forEach(key => {
      if (key === 'container' || key === 'pause') return;

      const button = this.dpadButtons[key];
      const direction = button.dataset.direction;

      // Use touchstart for immediate response
      button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.handleDirectionInput(direction);
        button.classList.add('active');
      });

      button.addEventListener('touchend', (e) => {
        e.preventDefault();
        button.classList.remove('active');
      });

      // Also support mouse for testing on desktop
      button.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.handleDirectionInput(direction);
        button.classList.add('active');
      });

      button.addEventListener('mouseup', (e) => {
        e.preventDefault();
        button.classList.remove('active');
      });
    });

    // Pause button
    this.dpadButtons.pause.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.onPause();
      this.dpadButtons.pause.classList.add('active');
    });

    this.dpadButtons.pause.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.dpadButtons.pause.classList.remove('active');
    });

    this.dpadButtons.pause.addEventListener('click', (e) => {
      e.preventDefault();
      this.onPause();
    });
  }

  setupSwipeListeners() {
    // Only attach to game canvas area to avoid interfering with UI buttons
    const gameScreen = document.getElementById('gameScreen');

    if (!gameScreen) {
      console.warn('gameScreen not found, swipe listeners not attached');
      return;
    }

    gameScreen.addEventListener('touchstart', (e) => {
      // Don't process if touching a button
      if (e.target.closest('button')) return;

      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    gameScreen.addEventListener('touchend', (e) => {
      // Don't process if touching a button
      if (e.target.closest('button')) return;

      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if swipe is long enough
    if (absDeltaX < this.minSwipeDistance && absDeltaY < this.minSwipeDistance) {
      return;
    }

    // Determine primary direction (horizontal or vertical)
    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (deltaX > 0) {
        this.handleDirectionInput('right');
      } else {
        this.handleDirectionInput('left');
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        this.handleDirectionInput('down');
      } else {
        this.handleDirectionInput('up');
      }
    }
  }

  handleDirectionInput(direction) {
    const directionMap = {
      'up': DIRECTIONS.UP,
      'down': DIRECTIONS.DOWN,
      'left': DIRECTIONS.LEFT,
      'right': DIRECTIONS.RIGHT
    };

    const dir = directionMap[direction];
    if (dir) {
      this.onDirectionChange(dir);
    }
  }

  show() {
    if (this.dpadButtons && this.dpadButtons.container) {
      this.dpadButtons.container.style.display = 'grid';
      this.dpadButtons.pause.style.display = 'flex';
      this.isEnabled = true;
    }
  }

  hide() {
    if (this.dpadButtons && this.dpadButtons.container) {
      this.dpadButtons.container.style.display = 'none';
      this.dpadButtons.pause.style.display = 'none';
      this.isEnabled = false;
    }
  }

  destroy() {
    if (this.dpadButtons) {
      this.dpadButtons.container.remove();
      this.dpadButtons.pause.remove();
    }
  }
}
