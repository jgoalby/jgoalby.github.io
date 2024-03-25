// Single place to change the project name if needed.
const PROJECT_NAME               = 'GenAIUI';

// Base project prefix for IDs etc.
const BASE_PROJECT_ID            = PROJECT_NAME.toLowerCase();

// The id of the element that will contain everything.
const GENAIUI_CONTAINER_ID       = BASE_PROJECT_ID + '-container';
const GENAIUI_CONTAINER_CLASS    = BASE_PROJECT_ID + '-container';

// Visibility of the whoole container.
const GENAIUI_CONTAINER_SHOW     = BASE_PROJECT_ID + '-container-show';
const GENAIUI_CONTAINER_HIDE     = BASE_PROJECT_ID + '-container-hide';

// Class for controls.
const BUTTON_CLASS               = BASE_PROJECT_ID + '-button';
const CHECKBOX_CONTAINER_CLASS   = BASE_PROJECT_ID + '-checkbox-container';

// Defaults for boolean options so they are easy to change. If you are a user you can change these via options.
const DEFAULT_SHOW_CONTAINER      = false;

// We need to set the default for the gen AI UI id, and change it later if the user specifies a different id.
let genAIUIId = GENAIUI_CONTAINER_ID;

function initGenAIUI(options) {
  // TODO: Check whether we are running more than once?

  // If the options parameter is not set, then set it to an empty object so we do not fail later.
  if (!options) { options = {}; }

  // If we want to set various options.
  const showGenAIUIContainer = options.showGenAIUIContainer || DEFAULT_SHOW_CONTAINER;

  // The id of the element that will contain everything.
  genAIUIId                  = options.genAIUIId            || GENAIUI_CONTAINER_ID;

  /**
   * Create or retrieve the container. The id can be created by the user or we can create it.
   * 
   * @param {string} id The id of the element that will contain everything.
   * @returns {HTMLElement} The outer element that existed or that we created.
   */
  function createOuterElement(id) {
    // See if the user has already created an element with the id.
    let outer = document.getElementById(id);

    // The user may have made their own container. If there isn't an existing element with the id, create one.
    if (!outer) {
      // Create the element, give it an id, and append it to the body.
      outer = document.createElement('div');
      outer.id = id;

      // Add the class for the container for initial visibility. It hasn't been added to the DOM yet
      // so we need to use classList rather than call the functions for show and hide. Could add it 
      // before, but then it might flash onto the screen, so this is cleaner.
      if (showGenAIUIContainer) {
        outer.classList.add(GENAIUI_CONTAINER_SHOW);
      } else {
        outer.classList.add(GENAIUI_CONTAINER_HIDE);
      }

      // Add it to the DOM.
      document.body.appendChild(outer);
    } else {
      // The user has provided an element, but we still want to show/hide it based on options.
      // We cannot do anything to prevent a flash as the user is in control of the element creation,
      // so its best to just use the same method as above to show/hide the element.
      if (showLog2DivContainer) {
        outer.classList.add(GENAIUI_CONTAINER_SHOW);
      } else {
        outer.classList.add(GENAIUI_CONTAINER_HIDE);
      }
    }

    // Add the class we need to the id whether we create it or not.
    outer.classList.add(GENAIUI_CONTAINER_CLASS);

    // Return the outer element that existed or that we created.
    return outer;
  }

  /**
   * Create a new button and return it.
   * 
   * @param {string} buttonText The text for the new button that we will create.
   * @param {string} buttonID The id for the new button that we will create.
   * @param {EventListener} clickHandler The click handler for the new button that we will create.
   * @returns {HTMLElement} The new button that we created.
   */
  function createButton(buttonText, buttonID, clickHandler) {
    // Make a button, set the text, give it an id, add the class, and give it a click handler.
    const button = document.createElement('button')
    button.textContent = buttonText;
    button.id = buttonID;
    button.classList.add(BUTTON_CLASS);
    button.addEventListener('click', clickHandler);
    return button;
  }

  /**
   * Create a new checkbox and return it.
   * 
   * @param {string} labelText The text for the label of the checkbox.
   * @param {string} checkboxID The id of the new checkbox.
   * @param {boolean} checked Whether the checkbox control should be checked or not.
   * @param {EventListener} changeHandler The change handler for the new checkbox that we will create.
   * @returns {HTMLElement} The new checkbox that we created.
   */
  function createCheckbox(labelText, checkboxID, checked, changeHandler) {
    // This is the actual box that the user will click on.
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.id = checkboxID;
    checkbox.addEventListener('change', changeHandler);

    // The label for the checkbox.
    const label = document.createElement('label');
    label.htmlFor = checkboxID;
    label.appendChild(document.createTextNode(labelText));

    // Appending the checkbox and label to a div container.
    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add(CHECKBOX_CONTAINER_CLASS);
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);

    // Return the container for the checkbox and label.
    return checkboxContainer;
  }

  // Create the div. This happens once as it is immediately invoked. IIFE.
  (function createGenAIUI() {
    // Create the outer element.
    const outer = createOuterElement(genAIUIId);
  }());
}

/**
 * Toggle the visibility of the log div.
 * 
 * @returns {void}
 */
function toggleGenAIUIVisibility() {
  const elem = document.getElementById(genAIUIId);

  if (elem.classList.contains(GENAIUI_CONTAINER_SHOW)) {
    hideLog2Div();
  } else {
    showLog2Div();
  }
}

/**
 * Return whether log2div is visible or not.
 * 
 * @returns {boolean}
 */
function isGenAIUIVisible() {
  // Get the main container for log2div.
  const elem = document.getElementById(genAIUIId);

  // If it already has the show class, then we are visible.
  return elem.classList.contains(GENAIUI_CONTAINER_SHOW);
}

/**
 * Show the log div.
 * 
 * @returns {void}
 */
function showGenAIUI() {
  // Get the main container for log2div.
  const elem = document.getElementById(genAIUIId);

  // If it already has the show class, then we do not need to do anything.
  if (elem.classList.contains(GENAIUI_CONTAINER_SHOW)) { return; }

  // Add the show class and remove the hide class.
  elem.classList.add(GENAIUI_CONTAINER_SHOW);
  elem.classList.remove(GENAIUI_CONTAINER_HIDE);
}

/**
 * Hide the log div.
 * 
 * @returns {void}
 */
function hideGenAIUI() {
  // Get the main container for log2div.
  const elem = document.getElementById(genAIUIId);

  // If it already has the hide class, then we do not need to do anything.
  if (elem.classList.contains(GENAIUI_CONTAINER_HIDE)) { return; }

  // Add the hide class and remove the show class.
  elem.classList.remove(GENAIUI_CONTAINER_SHOW);
  elem.classList.add(GENAIUI_CONTAINER_HIDE);
}

export {
  initGenAIUI,
  toggleGenAIUIVisibility,
  isGenAIUIVisible,
  showGenAIUI,
  hideGenAIUI,
}
