# TODOs

https://github.com/phaserjs/examples/blob/master/public/assets/ui/nine-slice.json


# Next
- Fix the button for clear cache. Make a form button?

# hmmmm.
- What about if I add callbacks to buttons for the x and y positions?
  - And then resize would just call a position function for each control on the scene?
  - But how to cope with the menu buttons list as each button does not know where it is?

# morph
- Could I get it to make buttons for me for example?
- Could I get it to modify the intro text for the game?
- Simply update the text on a button?
- Do I need to integrate with Firebase to get this all working?

# Range Button
- When click label move to the next button
- What if I have 2 labels, one for up and one for down? Or a + and a -?

# More stuff to do
- For the input screen, make it so you can use the keyboard if you like, but can also click to get text.
  - Also could generate a username for the user? Random words.
- Make the get input scene not use keyboard to get the username, but use mouse based text input instead.
- Could make a base container that contains code to always call events and clean up etc.
- Could also make a base plugin that does the same thing and registers settings etc.
- Need to display some kind of toast notification when notifications happen.
- What about implementing a scrolling area for the settings? Might neeed at some point anyway.
- Have tabs for the settings and catagories so like settings go into the same tab
  - Can start with audio as I have 2 of those. The intrpspection could be another
- Need to add TweakPane to the project and get that going to see how well it works
- Make the service worker a plugin?
- Why is the console blurry on desktop?
- Find a way to deal with firebase better. Right now there are files for firebase in the html
  - and when the firebase plugin is disabled, they are still there. So it would be nice if firebase was 
  - just in a single place.

# Potnential scrolling help?
- Scolling camera for options perhaps?
- https://github.com/jjcapellan/Phaser3-ScrollingCamera/blob/master/demo/js/scenes/test.js

# Next: Settings
Include the settings enum in the settings plugin itself and then access simpler and remove import.
Download TweakPane and state machine to the libs folder
Test tweakpane and when it works remove datgui from libs and from readme
Settings
  Move the constants to the appropriate places, audio and introspect
  Change settings plugin to have a register function
  Update settings to be able to store settings objects
  Have a category for each setting, audio for example
  Have a way to get the settings from the settings plugin

# Next: General
- Enemy sounds through audio plugin via world
- Investigate more game programming patterns I can use like state machine
- Continue to remove the word game from the project
- Continue with the firebase coding
- Zones idea for a scene specifying areas buttons can go

# Zones
In creating these images with Dall-e, I wonder if I can create a fluid interface somehow. One that changes based on the size and shape of the window. And perhaps is not deterministic although that might not be a great user experience?!!!! Or maybe it isn't prescribed in the code, but is deterministic when implemented? Let's say you add 2 groups of buttons to a page. And then you define areas of the page where buttons can go. And it decides where to put them based on the page constraints. Maybe could make zones where stuff can go and it gets put there.

# Keyboard stuff
- Perhaps have a way to specify keyboard shortcuts in settings for things like the console
- Have a quit button in the game
- Assign keys to the other buttons as well, and use escape to go backwards perhaps, and enter to continue?
- How to define the keys for buttons?

- Make player info a plugin? Does that make sense? And then remove globals from main.
- Make events a plugin next?
- Need to have real background music instead of what I have now
- Need to fix enemy fire sound to be in the audio plugin
- Settings from and to local storage.
- Add list of settings so that they can be put onto the settings screen easier.
- Need to have the sound option be observed. Put the make sound in the audio file?
- Do I play music from the audio file? How could I do that? 
- Have a way to set the music volume
- Fix globals somehow for settings.
  - this.sys.game.globals.settings.getValue
  - window.game isn't much better. Is that how I should reference it though? Look it up.
- Make some kind of custom console instance
- If score is on global, why is health not? They should be in the same place I think.

- Fix the stupid jsconfig.json error
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
  - health is an option
- Should I need the .js in the imports?

- Have an issue when I update code and it is cached. Need to fix the inscrutible service worker.
- I think I want to have it always get the content from the network and only from cache if failed.
- But does that cause the interaction to be very slow when offline? I presume so.
- So, how to update content properly when it is updated on the server?

- Think about using service worker with firebase and messaging
- Not entirely sure of the use case. There's a PWA book from Packt I should look at.
- I want to also make sure that when the site is offline, that the firebase functionality still works.

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
- Could https://stenciljs.com be used to create web components for the game?
    - Are web components a good idea for the game?
    - Maybe just the concepts would be useful?

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

## Console and Clipboard
- Specify various options to the console and see if they work
- Test copying to clipboard using HTTP site as well as HTTPS because Safari does not like HTTP
- Test wordwrapping
- Test badges

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
