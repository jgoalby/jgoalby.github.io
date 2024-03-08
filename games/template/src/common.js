/**
 * Get the current active scene.
 * 
 * @param {Phaser.Scenes.SceneManager} [sceneManager=undefined] 
 * @returns {Phaser.Scene | undefined} The active scene.
 */
function getActiveScene(sceneManager = undefined) {
  // Figure out which scene manager to use based on if one was passed in or not.
  const sceneMgr = sceneManager ? sceneManager : window.game.scene;

  // Get the active scenes in reverse.
  const allActiveScenes = sceneMgr.getScenes(true, true);

  // Check how many active scenes we have. Hopefully just one would be nice.
  if (allActiveScenes.length == 1) {
    // There's a chosen one.
    return allActiveScenes[0];
  } else if (allActiveScenes.length == 0) {
    // Nothing to choose.
    return undefined;
  } else {
    // Go through all of the active scenes.
    for (let i = 0; i < allActiveScenes.length; i++) {
      // If this one is visible, let's return it.
      if (allActiveScenes[i].scene.isVisible()) {
        return allActiveScenes[i];
      }
    }

    // Just return the first one (which is the last one because we reversed order) even though it isn't visible?
    return allActiveScenes[0];
  }
}

export {
  getActiveScene,
}
