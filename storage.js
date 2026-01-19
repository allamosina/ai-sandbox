// LocalStorage management for high scores

const STORAGE_KEY_PREFIX = 'snake_game_high_score_';

/**
 * Get the high score for a specific difficulty level
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {number} The high score, or 0 if not set
 */
export function getHighScore(difficulty) {
  const key = STORAGE_KEY_PREFIX + difficulty;
  const score = localStorage.getItem(key);
  return score ? parseInt(score, 10) : 0;
}

/**
 * Set the high score for a specific difficulty level
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @param {number} score - The score to save
 */
export function setHighScore(difficulty, score) {
  const key = STORAGE_KEY_PREFIX + difficulty;
  const currentHigh = getHighScore(difficulty);

  // Only update if the new score is higher
  if (score > currentHigh) {
    localStorage.setItem(key, score.toString());
    return true;
  }
  return false;
}

/**
 * Clear all high scores
 */
export function clearHighScores() {
  const difficulties = ['easy', 'medium', 'hard'];
  difficulties.forEach(difficulty => {
    const key = STORAGE_KEY_PREFIX + difficulty;
    localStorage.removeItem(key);
  });
}

/**
 * Get all high scores
 * @returns {Object} Object with easy, medium, and hard scores
 */
export function getAllHighScores() {
  return {
    easy: getHighScore('easy'),
    medium: getHighScore('medium'),
    hard: getHighScore('hard')
  };
}
