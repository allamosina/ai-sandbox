# Neon Snake - Test Plan

## Overview
This document outlines the comprehensive test plan for the Neon Snake cyberpunk-themed browser game. The game is built with vanilla JavaScript and requires thorough testing across functionality, UI/UX, and browser compatibility.

---

## 1. Functional Testing

### 1.1 Game Initialization
**Test Case ID:** TC-INIT-001
**Description:** Verify game loads correctly on page load
**Steps:**
1. Open `index.html` in browser
2. Observe the start screen

**Expected Results:**
- Page loads without errors in console
- Start screen displays with "SYSTEM READY" title
- Background grid and ambient glow effects visible
- Canvas shows initial snake and food
- Header displays "NEON SNAKE" with system version "SYS.V.2.0.77"
- Score shows "0000", High Score shows saved value or "0000"

**Priority:** High

---

### 1.2 Difficulty Selection
**Test Case ID:** TC-DIFF-001
**Description:** Verify difficulty selection screen and functionality
**Steps:**
1. Click "INITIALIZE" button on start screen
2. Observe difficulty selection screen
3. Hover over each difficulty button
4. Note high scores displayed for each difficulty

**Expected Results:**
- Difficulty screen displays with "SELECT PROTOCOL" title
- Three difficulty options visible:
  - NOVICE (green) - Easy
  - HACKER (cyan) - Medium
  - CYBERPSYCHO (magenta) - Hard
- Buttons show hover effects (scale and glow)
- High scores displayed correctly for each difficulty
- Each button shows appropriate color and icon

**Priority:** High

---

**Test Case ID:** TC-DIFF-002
**Description:** Verify each difficulty level starts correctly
**Steps:**
1. For each difficulty (NOVICE, HACKER, CYBERPSYCHO):
   - Click the difficulty button
   - Observe game start
   - Note game speed
   - Play for 10 seconds

**Expected Results:**
- Game starts immediately after selection
- Snake speed matches difficulty:
  - NOVICE: 150ms (slower)
  - HACKER: 100ms (medium)
  - CYBERPSYCHO: 60ms (faster)
- Header shows correct difficulty label
- Game canvas displays correctly

**Priority:** High

---

### 1.3 Snake Movement & Controls

**Test Case ID:** TC-MOVE-001
**Description:** Verify arrow key controls
**Steps:**
1. Start game on any difficulty
2. Press Up Arrow
3. Press Right Arrow
4. Press Down Arrow
5. Press Left Arrow

**Expected Results:**
- Snake changes direction on each key press
- Snake cannot reverse into itself (e.g., can't go left when moving right)
- Movement is smooth and continuous
- Page does not scroll when using arrow keys

**Priority:** High

---

**Test Case ID:** TC-MOVE-002
**Description:** Verify WASD controls
**Steps:**
1. Start game on any difficulty
2. Press W key
3. Press D key
4. Press S key
5. Press A key

**Expected Results:**
- W moves snake up
- A moves snake left
- S moves snake down
- D moves snake right
- Controls work identically to arrow keys
- Cannot reverse into itself

**Priority:** High

---

**Test Case ID:** TC-MOVE-003
**Description:** Verify direction change during movement
**Steps:**
1. Start game
2. While snake is moving right, quickly press Up then Right
3. Observe snake path

**Expected Results:**
- Snake successfully makes 90-degree turn
- No missed inputs
- Direction changes are responsive

**Priority:** Medium

---

### 1.4 Food Consumption & Scoring

**Test Case ID:** TC-FOOD-001
**Description:** Verify food collision and score increment
**Steps:**
1. Start game
2. Navigate snake to food
3. Observe collision
4. Check score display
5. Observe new food spawn

**Expected Results:**
- Snake head collides with food (yellow glowing circle)
- Score increases by 10 points (displayed as 4 digits with leading zeros)
- Snake grows by 1 segment
- New food spawns at random location
- Food never spawns on snake's body

**Priority:** High

---

**Test Case ID:** TC-FOOD-002
**Description:** Verify multiple food consumptions
**Steps:**
1. Start game
2. Consume 5 pieces of food
3. Verify score after each consumption

**Expected Results:**
- Score progression: 0010, 0020, 0030, 0040, 0050
- Snake length increases with each food
- Each new food spawns correctly
- Game performance remains smooth

**Priority:** High

---

### 1.5 Collision Detection

**Test Case ID:** TC-COLL-001
**Description:** Verify wall collision detection
**Steps:**
1. Start game
2. Move snake directly into each wall (top, bottom, left, right)

**Expected Results:**
- Game ends immediately when snake head hits any wall
- Game over screen displays
- Final score shown correctly
- "CRITICAL FAILURE" message displays

**Priority:** High

---

**Test Case ID:** TC-COLL-002
**Description:** Verify self-collision detection
**Steps:**
1. Start game
2. Grow snake to at least 4 segments
3. Make snake turn to collide with its own body

**Expected Results:**
- Game ends when head touches body
- Game over screen displays
- Collision detected accurately

**Priority:** High

---

### 1.6 Pause/Resume Functionality

**Test Case ID:** TC-PAUSE-001
**Description:** Verify pause with Spacebar
**Steps:**
1. Start game
2. Press Spacebar during gameplay
3. Observe pause overlay
4. Press Spacebar again

**Expected Results:**
- Game pauses immediately
- "SUSPENDED" overlay appears with pulsing text
- Snake stops moving
- Food remains visible through overlay
- Pressing Spacebar resumes game
- Game continues from same state

**Priority:** High

---

**Test Case ID:** TC-PAUSE-002
**Description:** Verify pause with Escape key
**Steps:**
1. Start game
2. Press Escape key during gameplay
3. Press Escape again to resume

**Expected Results:**
- ESC key pauses game (same as Spacebar)
- ESC key resumes game
- Functionality identical to Spacebar

**Priority:** Medium

---

**Test Case ID:** TC-PAUSE-003
**Description:** Verify pause doesn't work on menu screens
**Steps:**
1. Press Spacebar on start screen
2. Press Spacebar on difficulty screen
3. Press Spacebar on game over screen

**Expected Results:**
- Pause only works during active gameplay
- No pause overlay on menu screens

**Priority:** Low

---

### 1.7 Game Over & High Score

**Test Case ID:** TC-OVER-001
**Description:** Verify game over screen display
**Steps:**
1. Start game and intentionally collide
2. Observe game over screen

**Expected Results:**
- "CRITICAL FAILURE" title displays with glitch animation
- Protocol (difficulty) label shown
- Final score displayed in cyan
- Current high score displayed in magenta
- Two buttons available: RETRY and MENU

**Priority:** High

---

**Test Case ID:** TC-OVER-002
**Description:** Verify high score detection and save
**Steps:**
1. Start HACKER difficulty (clear localStorage first if needed)
2. Score 50 points
3. End game
4. Observe high score display
5. Refresh page and check difficulty screen

**Expected Results:**
- New high score saved to localStorage
- High score persists after page refresh
- High score shown on difficulty screen matches saved value
- Different difficulties have separate high scores

**Priority:** High

---

**Test Case ID:** TC-OVER-003
**Description:** Verify high score not updated when lower
**Steps:**
1. Set high score of 100 (play or manually set in localStorage)
2. Play game and score only 30 points
3. Check high score after game over

**Expected Results:**
- High score remains 100
- Final score shows 30
- Best score shows 100

**Priority:** Medium

---

**Test Case ID:** TC-OVER-004
**Description:** Verify RETRY button functionality
**Steps:**
1. End game on CYBERPSYCHO difficulty
2. Click RETRY button

**Expected Results:**
- Game restarts immediately
- Same difficulty maintained (CYBERPSYCHO)
- Score resets to 0
- Snake resets to starting position
- Food spawns in new location

**Priority:** High

---

**Test Case ID:** TC-OVER-005
**Description:** Verify MENU button functionality
**Steps:**
1. End game
2. Click MENU button

**Expected Results:**
- Returns to difficulty selection screen
- High scores updated on difficulty buttons
- Can select different difficulty

**Priority:** High

---

### 1.8 Local Storage

**Test Case ID:** TC-STORE-001
**Description:** Verify high scores persist across sessions
**Steps:**
1. Play each difficulty and set high scores
2. Note scores: NOVICE: 50, HACKER: 30, CYBERPSYCHO: 20
3. Close browser tab
4. Reopen `index.html`
5. Check difficulty selection screen

**Expected Results:**
- All three high scores display correctly
- Scores match: 50 PTS, 30 PTS, 20 PTS

**Priority:** High

---

**Test Case ID:** TC-STORE-002
**Description:** Verify localStorage keys
**Steps:**
1. Open browser DevTools → Application → Local Storage
2. Check stored keys after playing

**Expected Results:**
- Keys exist: `snake_game_high_score_easy`, `snake_game_high_score_medium`, `snake_game_high_score_hard`
- Values are numeric strings
- Values update correctly after new high scores

**Priority:** Medium

---

## 2. UI/UX Testing

### 2.1 Visual Design

**Test Case ID:** TC-UI-001
**Description:** Verify cyberpunk theme elements
**Steps:**
1. Load game
2. Inspect all visual elements

**Expected Results:**
- **Colors:** Neon cyan (#00ffff), magenta (#ff00ff), yellow (#ffff00) used consistently
- **Fonts:** Orbitron for headings, Share Tech Mono for body text
- **Background:** Dark gradient (#0a0e27 to #16213e)
- **Grid effect:** Subtle cyan grid visible in background
- **Ambient glow:** Cyan glow visible behind content
- **Scanlines:** Animated scanline effect on canvas
- **CRT flicker:** Subtle flicker animation on canvas
- **Corner decorations:** Glowing corner borders on game frame

**Priority:** High

---

**Test Case ID:** TC-UI-002
**Description:** Verify snake visual design
**Steps:**
1. Start game
2. Observe snake rendering
3. Grow snake to 10+ segments

**Expected Results:**
- Snake segments have cyan-to-magenta gradient
- Rounded corners on segments (2px radius)
- Head has more rounded corners (6px radius)
- Neon glow around each segment
- Small black dot eye on head
- Gradient consistent across all segments

**Priority:** High

---

**Test Case ID:** TC-UI-003
**Description:** Verify food visual design
**Steps:**
1. Start game
2. Observe food rendering

**Expected Results:**
- Food is circular (not square)
- Bright yellow color (#ffff00)
- Glowing effect (shadowBlur: 20)
- Approximately 6-7px radius
- Clearly visible against dark background

**Priority:** Medium

---

**Test Case ID:** TC-UI-004
**Description:** Verify button hover effects
**Steps:**
1. Hover over each button type:
   - INITIALIZE button
   - Difficulty buttons
   - RETRY button
   - MENU button
   - RESUME button

**Expected Results:**
- Buttons show visual feedback on hover
- Glow intensity increases
- Slight scale transform (difficulty buttons: 1.05)
- Color transitions smooth (0.3s ease)
- Cursor changes to pointer

**Priority:** Medium

---

### 2.2 Typography & Readability

**Test Case ID:** TC-UI-005
**Description:** Verify text readability
**Steps:**
1. Check all text elements across all screens

**Expected Results:**
- All text clearly readable against backgrounds
- Font sizes appropriate for content hierarchy
- Letter spacing consistent with cyberpunk aesthetic
- No text cutoff or overflow
- Score displays use monospace font with leading zeros

**Priority:** High

---

### 2.3 Animations

**Test Case ID:** TC-UI-006
**Description:** Verify glitch text animation
**Steps:**
1. Observe "SYSTEM READY" and "CRITICAL FAILURE" titles

**Expected Results:**
- Text has subtle skew animation
- Animation loops continuously
- Smooth cubic-bezier easing
- On hover: chromatic aberration effect (cyan/magenta offset)

**Priority:** Low

---

**Test Case ID:** TC-UI-007
**Description:** Verify pulse animations
**Steps:**
1. Check pulsing dot in header (SYS.V.2.0.77)
2. Check "SUSPENDED" text pulse when paused

**Expected Results:**
- Smooth fade in/out animation
- Appropriate timing (1.5-2s duration)
- Glow effect increases/decreases

**Priority:** Low

---

**Test Case ID:** TC-UI-008
**Description:** Verify scanline animation
**Steps:**
1. Start game
2. Observe canvas area for 10 seconds

**Expected Results:**
- Horizontal scanlines visible
- Lines scroll downward slowly
- Animation smooth and continuous
- 10s loop duration
- Opacity around 30%

**Priority:** Low

---

### 2.4 Screen Transitions

**Test Case ID:** TC-UI-009
**Description:** Verify smooth transitions between screens
**Steps:**
1. Navigate through all screens:
   - Start → Difficulty → Game → Pause → Resume
   - Game → Game Over → Menu → Difficulty
   - Difficulty → Start (if implemented)

**Expected Results:**
- Fade-in animation (0.3s) on screen appearance
- No flickering or jarring transitions
- Canvas renders correctly on each screen
- Previous screen fully hidden before new screen shows

**Priority:** Medium

---

## 3. Browser Compatibility Testing

### 3.1 Desktop Browsers

**Test Case ID:** TC-COMPAT-001
**Description:** Test on Chrome
**Browser Version:** Chrome 120+ (latest stable)
**Expected Results:**
- All features work correctly
- No console errors
- Smooth animations
- Fonts load correctly

**Priority:** High

---

**Test Case ID:** TC-COMPAT-002
**Description:** Test on Firefox
**Browser Version:** Firefox 121+ (latest stable)
**Expected Results:**
- All features work correctly
- Canvas rendering identical
- CSS effects display properly
- No compatibility warnings

**Priority:** High

---

**Test Case ID:** TC-COMPAT-003
**Description:** Test on Safari
**Browser Version:** Safari 17+ (latest stable)
**Expected Results:**
- All features work correctly
- Gradient text displays correctly
- Backdrop-filter works
- Web fonts load

**Priority:** High

---

**Test Case ID:** TC-COMPAT-004
**Description:** Test on Edge
**Browser Version:** Edge 120+ (latest stable)
**Expected Results:**
- All features work correctly
- Performance similar to Chrome

**Priority:** Medium

---

### 3.2 Mobile Browsers

**Test Case ID:** TC-MOBILE-001
**Description:** Test responsive layout on mobile
**Device:** iOS Safari, Chrome Android
**Viewport:** 375x667 (iPhone SE) and larger
**Steps:**
1. Open game on mobile browser
2. Test in portrait orientation
3. Attempt to play using on-screen controls (if implemented)

**Expected Results:**
- Layout adapts to smaller screen
- Canvas scales proportionally
- Buttons remain tappable (min 44x44px)
- Text remains readable
- No horizontal scroll

**Priority:** Medium

---

**Test Case ID:** TC-MOBILE-002
**Description:** Verify no gameplay on mobile (current design)
**Expected Results:**
- Game displays correctly visually
- No touch controls implemented (expected limitation)
- Controls hint shows keyboard instructions
- No errors occur

**Priority:** Low

---

## 4. Performance Testing

**Test Case ID:** TC-PERF-001
**Description:** Verify smooth gameplay at 60 FPS
**Steps:**
1. Open Chrome DevTools → Performance
2. Start recording
3. Play game for 30 seconds on CYBERPSYCHO difficulty
4. Stop recording and analyze

**Expected Results:**
- Frame rate stays near 60 FPS
- No significant frame drops
- requestAnimationFrame used correctly
- Game loop efficient

**Priority:** High

---

**Test Case ID:** TC-PERF-002
**Description:** Verify performance with long snake
**Steps:**
1. Use browser console to set high score and grow snake to 100+ segments
2. Continue playing
3. Monitor performance

**Expected Results:**
- Game remains playable
- No significant slowdown
- Rendering optimized for many segments

**Priority:** Medium

---

**Test Case ID:** TC-PERF-003
**Description:** Check memory usage
**Steps:**
1. Open DevTools → Memory
2. Play multiple games without refreshing (10 games)
3. Check for memory leaks

**Expected Results:**
- Memory usage stable
- No memory leaks after multiple games
- Game instances cleaned up properly

**Priority:** Medium

---

## 5. Edge Cases & Error Handling

**Test Case ID:** TC-EDGE-001
**Description:** Rapid key presses
**Steps:**
1. Start game
2. Rapidly press multiple direction keys simultaneously
3. Press opposite direction keys in quick succession

**Expected Results:**
- Game handles rapid inputs gracefully
- No crash or undefined behavior
- Snake doesn't reverse into itself

**Priority:** Medium

---

**Test Case ID:** TC-EDGE-002
**Description:** LocalStorage disabled
**Steps:**
1. Disable localStorage in browser
2. Play game and score points
3. Check for errors

**Expected Results:**
- Game still playable
- No JavaScript errors
- High scores not saved (graceful degradation)
- Error caught and handled

**Priority:** Low

---

**Test Case ID:** TC-EDGE-003
**Description:** Canvas API not supported
**Steps:**
1. Test in very old browser without Canvas support

**Expected Results:**
- Graceful error message displayed OR
- Game simply doesn't render (acceptable for modern game)

**Priority:** Low

---

**Test Case ID:** TC-EDGE-004
**Description:** Fonts fail to load
**Steps:**
1. Block Google Fonts domain
2. Load game

**Expected Results:**
- Fallback fonts used (sans-serif, monospace)
- Layout remains functional
- Game playable

**Priority:** Low

---

**Test Case ID:** TC-EDGE-005
**Description:** Very high score display
**Steps:**
1. Manually set localStorage high score to 9999+
2. Load game

**Expected Results:**
- Score displays correctly (may exceed 4 digits)
- No layout breaking
- Numbers remain readable

**Priority:** Low

---

## 6. Accessibility Testing

**Test Case ID:** TC-A11Y-001
**Description:** Keyboard navigation
**Steps:**
1. Navigate game using only keyboard
2. Use Tab key to move between interactive elements
3. Use Enter/Space to activate buttons

**Expected Results:**
- All interactive elements reachable via keyboard
- Focus indicators visible
- Buttons activatable with Enter/Space

**Priority:** Medium

---

**Test Case ID:** TC-A11Y-002
**Description:** Color contrast
**Steps:**
1. Use browser DevTools → Lighthouse → Accessibility
2. Check contrast ratios

**Expected Results:**
- Text has sufficient contrast against backgrounds
- Important UI elements distinguishable
- Color not sole means of conveying information

**Priority:** Low

---

## 7. Test Execution Checklist

### Pre-Testing Setup
- [ ] Clear browser cache
- [ ] Clear localStorage
- [ ] Open browser DevTools console
- [ ] Prepare test devices/browsers
- [ ] Document environment (OS, browser version)

### Critical Path (Must Pass)
- [ ] TC-INIT-001: Game loads correctly
- [ ] TC-DIFF-002: All difficulties start
- [ ] TC-MOVE-001: Arrow keys work
- [ ] TC-MOVE-002: WASD works
- [ ] TC-FOOD-001: Food collision and scoring
- [ ] TC-COLL-001: Wall collision
- [ ] TC-COLL-002: Self collision
- [ ] TC-PAUSE-001: Pause/resume
- [ ] TC-OVER-001: Game over display
- [ ] TC-OVER-002: High score saves
- [ ] TC-COMPAT-001-003: Chrome, Firefox, Safari

### Priority Matrix
- **High Priority:** All functional tests (Section 1), Core UI tests
- **Medium Priority:** Advanced UI, Performance, Mobile
- **Low Priority:** Edge cases, Accessibility, Animation details

---

## 8. Bug Reporting Template

When logging bugs, use this format:

```
**Bug ID:** BUG-XXX
**Severity:** Critical / High / Medium / Low
**Test Case:** TC-XXX-XXX
**Browser:** Chrome 120.0 / Firefox 121.0 / etc.
**OS:** Windows 11 / macOS 14 / etc.

**Description:**
[Clear description of the issue]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happened]

**Screenshots/Console Logs:**
[Attach if applicable]

**Reproducibility:**
Always / Sometimes / Once

**Workaround:**
[If available]
```

---

## 9. Sign-Off Criteria

The game is ready for release when:
- [ ] All High Priority test cases pass
- [ ] 90%+ of Medium Priority test cases pass
- [ ] No Critical or High severity bugs remain
- [ ] Game tested in Chrome, Firefox, and Safari (latest versions)
- [ ] Performance is acceptable (smooth 60 FPS gameplay)
- [ ] High scores persist correctly across sessions
- [ ] All three difficulty levels work correctly

---

## 10. Test Environment

**Recommended Test Setup:**
- **Browsers:** Chrome 120+, Firefox 121+, Safari 17+
- **OS:** Windows 11, macOS 14+, or Linux
- **Screen Resolutions:** 1920x1080, 1366x768, 2560x1440
- **Mobile:** iPhone 12+, Samsung Galaxy S21+
- **Tools:** Browser DevTools, Lighthouse, Performance Monitor

**Files to Test:**
- index.html
- styles.css
- game.js
- ui.js
- constants.js
- storage.js

---

## Document Control

**Version:** 1.0
**Created:** 2026-01-19
**Author:** Test Plan for Neon Snake Game
**Status:** Active

**Revision History:**
| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-01-19 | Initial test plan | - |
