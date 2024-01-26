# TODOs

- Work on preloader scene next
- Put the text in the middle of the scene
- Figure out resizing with the scene
- Make the logo scale of 1

- Still trying to get rid of "game" and replace perhaps with "main"

- Slow the page down so that the preloader can be seen
- Move the progress bar to the bottom of the screen
- Make it work while resizing the page
- Press space to start the game and leave the logo on the screen
- What about having the logo scale depending on the size of the screen?

- Make all uses of the button use the callback version and then delete non-callback version
- Can I set the origin of the button somehow? I tried on container but it doesn't have setOrigin
- Should the button instead derive from Phaser.GameObjects.GameObject?
- I feel I really should look at other components before I go too far with this one.
- Make a radio button from the code in the options scene

- Need to work on the leaderboard scene I suppose
- Scale it to the screen size?
- Does that mean I need to scale the button as well?
- Make the table a component perhaps?
- Could potentially make it not a DOM element and just use graphics?
- Is making a table that hard? Most likely it is. What about Rex?
- Make the leaderboard table scrollable perhaps?
- Leaderboard should also manage actual score data from local storage
- So need a way to get the local storage and maybe use ECS to manage the data?

- With the credits screen, it does not take into account the amount of text in the credits
- So I should check the amount and adjust the scene based on that

- Do I need the scale for the camera?
- Maybe don't have a launch screen as I am using caching and have a splash screen in the game.
- Clean up manifest if possible. What fields and icons etc are really needed.

- Start using _ for private variables
- Need a version for the application. Can Github provide a version somehow?
- Perhaps github can deploy or create a file that can be read in by the code?

- Add ECS feature to the game
- Do I need to look into state machines?
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
- See if I can get full screen to work using F11 (theres some code in the game for this already)
  - Saw it here:
    - https://github.com/shimozurdo/mobile-game-base-phaser3

# Testing TODOs

## General
- Favicon
- Full screen
- Slow connection so we can see preloader working

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
