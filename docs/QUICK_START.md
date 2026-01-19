# 🎮 Quick Start Guide - Neon Snake

## Play the Game

```bash
open index.html
```

Or simply **double-click** `index.html` in Finder.

---

## Run Tests

### Automated Tests
```bash
open test-critical.html
```

Click **"Run All Tests"** → Should see all tests pass (green)

### Manual Tests
1. Open `index.html`
2. Follow checklist in `MANUAL_TEST_RESULTS.md`
3. Test all 13 critical paths

---

## Game Controls

| Key | Action |
|-----|--------|
| **Arrow Keys** or **WASD** | Move snake |
| **Spacebar** or **ESC** | Pause/Resume |

---

## Difficulty Levels

- **NOVICE** (Easy) - 150ms speed - Green
- **HACKER** (Medium) - 100ms speed - Cyan
- **CYBERPSYCHO** (Hard) - 60ms speed - Magenta

---

## Project Structure

```
ai-sandbox/
├── index.html              # Main game
├── test-critical.html      # Automated tests
├── styles.css              # Cyberpunk theme
├── game.js                 # Game logic
├── ui.js                   # UI controls
├── constants.js            # Configuration
├── storage.js              # High scores
├── README.md               # Full docs
├── TEST_PLAN.md            # Complete test plan (76+ tests)
├── TESTING_SUMMARY.md      # Test status & results
├── MANUAL_TEST_RESULTS.md  # Manual testing checklist
├── BUG_FIXES.md            # Bug tracking
└── assets/                 # For mockups/sounds
```

---

## Testing Status

✅ **Code Complete** - All files created
✅ **Bug Fixes Applied** - 1 critical bug fixed
✅ **Test Suite Ready** - 15+ automated tests
⚠️ **Manual Testing** - Ready to test
⚠️ **Browser Compatibility** - Pending

---

## Bug Fixes Applied

### ✅ Bug #1: Canvas Rendering (HIGH)
**Fixed:** Canvas now renders snake/food on start and difficulty screens
**Files:** `ui.js` lines 236, 248

---

## What to Test

### Critical (Must Pass)
- [ ] Game loads without errors
- [ ] All 3 difficulties work
- [ ] Arrow keys + WASD control snake
- [ ] Food collision increases score
- [ ] Wall collision ends game
- [ ] Self collision ends game
- [ ] Pause/resume works
- [ ] High scores save and persist
- [ ] Visual design looks correct

### Performance
- [ ] 60 FPS during gameplay
- [ ] No lag with long snake
- [ ] Smooth animations

### Browser Compatibility
- [ ] Chrome 120+
- [ ] Firefox 121+
- [ ] Safari 17+

---

## Expected Test Results

**Automated:** 15/15 tests pass (100%)
**Manual:** 13/13 critical tests pass
**Performance:** 60 FPS, < 2s load time

---

## Quick Console Commands

Open browser DevTools (F12) and try:

```javascript
// Check localStorage
localStorage.getItem('snake_game_high_score_medium')

// Clear all high scores
localStorage.clear()

// Set test high score
localStorage.setItem('snake_game_high_score_easy', '999')
```

---

## Need Help?

- **Full Documentation:** See `README.md`
- **Test Plan:** See `TEST_PLAN.md` (76+ test cases)
- **Bug Tracking:** See `BUG_FIXES.md`
- **Manual Tests:** See `MANUAL_TEST_RESULTS.md`
- **Test Summary:** See `TESTING_SUMMARY.md`

---

## Ready to Play? 🚀

```bash
open index.html
```

**Have fun! 🐍✨**
