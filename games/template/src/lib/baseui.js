// Class for controls.
const BUTTON_CLASS_SUFFIX               = '-button';
const CHECKBOX_CONTAINER_CLASS_SUFFIX   = '-checkbox-container';

// The id of the element that will contain everything.
const CONTAINER_ID_SUFFIX       = '-container';

// The class of the element that will contain everything.
const CONTAINER_CLASS_SUFFIX    = '-container';

// Visibility of the whole container.
const CONTAINER_SHOW_SUFFIX     = '-container-show';
const CONTAINER_HIDE_SUFFIX     = '-container-hide';

export default class BaseUI {
  constructor(options) {
    // If the options parameter is not set, then set it to an empty object so we do not fail later.
    if (!options) { options = {}; }

    // If we want to set various options.
    this.baseProjectId = options.baseProjectId;
    this.showContainer = options.showContainer;

    // The id of the element that will contain everything.
    this.containerId = options.containerId || (this.baseProjectId + CONTAINER_ID_SUFFIX);

    // Create the outer element.
    this.outer = this.createOuterElement(this.containerId, this.showContainer);
  }

  /**
  * Create or retrieve the container. The id can be created by the user or we can create it.
  * 
  * @param {string} id The id of the element that will contain everything.
  * @param {boolean} show Whether to show the contained initially.
  * @returns {HTMLElement} The outer element that existed or that we created.
  */
  createOuterElement(id, show) {
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
      if (show) {
        outer.classList.add(this.baseProjectId + CONTAINER_SHOW_SUFFIX);
      } else {
        outer.classList.add(this.baseProjectId + CONTAINER_HIDE_SUFFIX);
      }

      // Add it to the DOM.
      document.body.appendChild(outer);
    } else {
      // The user has provided an element, but we still want to show/hide it based on options.
      // We cannot do anything to prevent a flash as the user is in control of the element creation,
      // so its best to just use the same method as above to show/hide the element.
      if (show) {
        outer.classList.add(this.baseProjectId + CONTAINER_SHOW_SUFFIX);
      } else {
        outer.classList.add(this.baseProjectId + CONTAINER_HIDE_SUFFIX);
      }
    }

    // Add the class we need to the id whether we create it or not.
    outer.classList.add(this.baseProjectId + CONTAINER_CLASS_SUFFIX);

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
  createButton(buttonText, buttonID, clickHandler) {
    // Make a button, set the text, give it an id, add the class, and give it a click handler.
    const button = document.createElement('button')
    button.textContent = buttonText;
    button.id = buttonID;
    button.classList.add(this.baseProjectId + BUTTON_CLASS_SUFFIX);
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
  createCheckbox(labelText, checkboxID, checked, changeHandler) {
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
    checkboxContainer.classList.add(this.baseProjectId + CHECKBOX_CONTAINER_CLASS_SUFFIX);
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);

    // Return the container for the checkbox and label.
    return checkboxContainer;
  }

  /**
  * Toggle the visibility of the div.
  * 
  * @returns {void}
  */
  toggleUIVisibility() {
    const elem = document.getElementById(this.containerId);

    if (elem.classList.contains(this.baseProjectId + CONTAINER_SHOW_SUFFIX)) {
      this.hideUI();
    } else {
      this.showUI();
    }
  }

  /**
  * Return whether div is visible or not.
  * 
  * @returns {boolean}
  */
  isUIVisible() {
    // Get the main container.
    const elem = document.getElementById(this.containerId);

    // If it already has the show class, then we are visible.
    return elem.classList.contains(this.baseProjectId + CONTAINER_SHOW_SUFFIX);
  }

  /**
  * Show the div.
  * 
  * @returns {void}
  */
  showUI() {
    // Get the main container.
    const elem = document.getElementById(this.containerId);

    // If it already has the show class, then we do not need to do anything.
    if (elem.classList.contains(this.baseProjectId + CONTAINER_SHOW_SUFFIX)) { return; }

    // Add the show class and remove the hide class.
    elem.classList.add(this.baseProjectId + CONTAINER_SHOW_SUFFIX);
    elem.classList.remove(this.baseProjectId + CONTAINER_HIDE_SUFFIX);
  }

  /**
  * Hide the div.
  * 
  * @returns {void}
  */
  hideUI() {
    // Get the main container.
    const elem = document.getElementById(this.containerId);

    // If it already has the hide class, then we do not need to do anything.
    if (elem.classList.contains(this.baseProjectId + CONTAINER_HIDE_SUFFIX)) { return; }

    // Add the hide class and remove the show class.
    elem.classList.remove(this.baseProjectId + CONTAINER_SHOW_SUFFIX);
    elem.classList.add(this.baseProjectId + CONTAINER_HIDE_SUFFIX);
  }
}
