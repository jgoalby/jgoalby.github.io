# TODOs

- Add ECS feature to the game
- Do I need to look into state machines

- Do I need the scale for the camera?
- Maybe don't have a launch screen as I am using caching and have a splash screen in the game.
- Clean up manifest if possible. What fields and icons etc are really needed.

- What is the best way to get user input in Phaser 3?
- Currently do the dom stuff, but I wonder if that is optimal.
- Also I wonder if I can create more game looking assets for the input screen

- Fix errors in the javascript
  - this.sys.game.globals
- Should I need the .js in the imports?

- Extract colors as a constant especially the text colors
- Can the typescript types file be moved to lib?
  - Make sure that the types work when I move them
- Add a favicon
- Does jsconfig.json need to be in the root?
- Find something to replace bgmusic.ogg for bgMusic
- Can I replace paths with pathfinder?
- See if I can get full screen to work using F11
  - Saw it here:
    - https://github.com/shimozurdo/mobile-game-base-phaser3

# Testing TODOs

## General
- Favicon
- Full screen

## PWAs
- Offline
- iPad and iPhone
- Android
- Desktop
- Able to get latest changes to the game
- Resizing the browser window works for all scenes
- Splash screen works if added
- Adding the game to the home screen works
- When running from homescreen the game is full screen
- Make sure the correct icon show up on the homescreen

# General TODOs
- Add some native like features to the game for iOS And Android
  - <https://blog.ourcade.co/posts/2020/native-like-web-app-for-your-html5-game/>
- Check out the debug plugin to see what it offers
  - <https://github.com/englercj/phaser-debug>
- Screen rotation
  - <https://phaser.discourse.group/t/change-the-canvas-dimension-on-screen-rotation/2124>
  - <https://stackoverflow.com/questions/77401454/phaser3-how-to-force-screen-to-open-in-landscape-mode>
- Convert to use typescript and github actions to compile?
  - https://putridparrot.com/blog/building-and-testing-typescript-code-using-github-actions/
  - https://github.com/marketplace/actions/typescript-build
