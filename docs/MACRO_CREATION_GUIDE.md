# Macro Creation Guide

This guide explains how to create custom macros for Drakensang Online using the DSO Utils macro system.

## Overview

Macros allow you to automate repetitive tasks in Drakensang Online by combining keyboard inputs, mouse clicks, and timing delays. The macro system works by sending input directly to the game window using Windows API calls.

## Getting Started

1. **Open Macro Manager**: Navigate to the Macros tab in DSO Utils
2. **Create New Macro**: Click "Create New Macro" button
3. **Fill Basic Information**: Set name, description, and optional keybinding
4. **Add Steps**: Build your macro by adding keyboard, mouse, and wait actions

## Step Types

### 1. Keyboard Actions

Keyboard actions simulate key presses in the game.

**Action Types:**

- `key-press` - Press and release a key (most common)
- `key-down` - Hold a key down
- `key-up` - Release a held key

**Supported Keys:**

- **Letters**: `A`, `B`, `C`, ..., `Z`
- **Numbers**: `0`, `1`, `2`, ..., `9`
- **Function Keys**: `F1`, `F2`, ..., `F12`
- **Special Keys**: `Space`, `Enter`, `Tab`, `Escape`
- **Modifiers**: `Ctrl`, `Alt`, `Shift`
- **Arrow Keys**: `Up`, `Down`, `Left`, `Right`

**Examples:**

- Press Q skill: Type `Q`
- Press health potion: Type `H`
- Press F1: Type `F1`
- Press spacebar: Type `Space`

### 2. Mouse Actions

Mouse actions simulate mouse clicks at specific screen coordinates.

**Action Types:**

- `click` - Left mouse button click
- `right-click` - Right mouse button click
- `middle-click` - Middle mouse button click (scroll wheel)
- `move` - Move mouse cursor without clicking

**Coordinate Format:**
Enter coordinates as `x,y` where:

- `x` = horizontal position (pixels from left edge)
- `y` = vertical position (pixels from top edge)

**Examples:**

- Click at position 400,250: Enter `400,250`
- Right-click inventory slot: Enter `600,400`

**Finding Coordinates:**

1. Use Windows built-in tools:
   - Open Paint, move mouse to position, see coordinates in status bar
   - Use Snipping Tool with ruler feature
2. Use third-party tools like PixelPerfect or Mouse Position
3. Take screenshot and use image editing software to measure

### 3. Wait Actions

Wait actions add delays between other actions to ensure proper timing.

**Purpose:**

- Allow animations to complete
- Prevent actions from being too fast for the game
- Add realistic human-like timing

**Recommended Timings:**

- Between key presses: 100-200ms
- After skill casts: 500-1000ms
- Between different action types: 50-100ms
- For potion drinking: 200-500ms

## Best Practices

### 1. Timing Considerations

- **Too Fast**: Actions may not register properly
- **Too Slow**: Macro becomes inefficient
- **Sweet Spot**: 100-200ms between most actions

### 2. Game State Awareness

- Ensure character is in correct state before running macro
- Account for network latency
- Consider cooldowns and resource costs

### 3. Coordinate Reliability

- Use consistent game resolution
- Test coordinates in different game states
- Account for UI scaling and window position

### 4. Error Handling

- Test macros thoroughly before use
- Start with simple 1-2 step macros
- Build complexity gradually

## Example Macros

### Example 1: Health Potion Macro

```txt
Step 1: Keyboard Action
- Action: key-press
- Value: H
- Wait After: 100ms
```

### Example 2: Skill Combo

```txt
Step 1: Keyboard Action
- Action: key-press
- Value: Q
- Wait After: 200ms

Step 2: Keyboard Action
- Action: key-press
- Value: W
- Wait After: 200ms

Step 3: Keyboard Action
- Action: key-press
- Value: E
- Wait After: 100ms
```

### Example 3: Click and Use Item

```txt
Step 1: Mouse Action
- Action: click
- Value: 500,400
- Wait After: 100ms

Step 2: Keyboard Action  
- Action: key-press
- Value: Space
- Wait After: 200ms
```

### Example 4: Inventory Management

```txt
Step 1: Keyboard Action (Open Inventory)
- Action: key-press
- Value: I
- Wait After: 300ms

Step 2: Mouse Action (Click Item)
- Action: right-click
- Value: 450,350
- Wait After: 200ms

Step 3: Keyboard Action (Close Inventory)
- Action: key-press
- Value: I
- Wait After: 100ms
```

## Troubleshooting

### Common Issues

**Macro Not Working:**

- Ensure DSO is running and focused
- Check if coordinates are correct for your screen resolution
- Verify game window title matches "Nebula3::MainWindow"

**Actions Too Fast:**

- Increase wait times between steps
- Add buffer time after opening menus

**Wrong Coordinates:**

- Verify screen resolution settings
- Check if game is in fullscreen or windowed mode
- Recalibrate coordinate positions

**Keys Not Registering:**

- Ensure key names match supported format
- Check for typos in key values
- Verify game is accepting keyboard input

### Performance Tips

1. **Keep Macros Simple**: Start with basic actions
2. **Test Incrementally**: Add one step at a time
3. **Use Appropriate Delays**: Balance speed with reliability
4. **Monitor Game State**: Ensure macro fits current game situation

## Safety and Ethics

- Use macros responsibly and in accordance with game terms of service
- Avoid using macros for unfair advantages in PvP
- Test macros in safe environments first
- Be mindful of other players when using macros in public areas

## Advanced Tips

### Conditional Logic

While not directly supported, you can create different macros for different situations and use keybindings to quickly switch between them.

### Macro Chains

Create multiple short macros that can be triggered in sequence rather than one very long macro.

### Backup and Restore

- Export your custom macros regularly
- Keep backup copies of working macro configurations
- Document your macro purposes and usage scenarios
