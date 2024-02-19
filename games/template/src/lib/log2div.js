// Adapted from https://github.com/bahmutov/console-log-div

// Single place to change the project name if needed.
const PROJECT_NAME               = 'Log2Div';

// Caption we use by default if not changed in the options.
const DEFAULT_CAPTIONTEXT        = PROJECT_NAME + ' Output: ';

// Base project prefix for IDs etc.
const BASE_PROJECT_ID            = PROJECT_NAME.toLowerCase();

// The id of the element that will contain everything.
const CONSOLE_CONTAINER_ID       = BASE_PROJECT_ID + '-container';

// Visibility of the whoole container.
const CONSOLE_CONTAINER_SHOW     = BASE_PROJECT_ID + '-container-show';
const CONSOLE_CONTAINER_HIDE     = BASE_PROJECT_ID + '-container-hide';

// The id of the element that will contain the log messages.
const MESSAGES_CONTAINER_ID      = BASE_PROJECT_ID + '-log-messages-container';

// The id of the heading element that will contain the caption and buttons.
const CONSOLE_LOG_HEADING_ID     = BASE_PROJECT_ID + '-heading';

// The id of the caption.
const CAPTION_ID                 = BASE_PROJECT_ID + '-caption';

// The class for the log row.
const LOG_ROW_CLASS              = BASE_PROJECT_ID + '-log-row';

// The id we use to set the row number of the log row message. Ends in - because we add a number for each row.
// Note that this ID is very similar to the class above.
const LOG_ROW_NUMBER_ID          = BASE_PROJECT_ID + '-log-row-';

// Class for controls.
const BUTTON_CLASS               = BASE_PROJECT_ID + '-button';
const CHECKBOX_CONTAINER_CLASS   = BASE_PROJECT_ID + '-checkbox-container';
const LOG_ROW_BADGE_CLASS        = BASE_PROJECT_ID + '-log-row-badge';

// IDs for the buttons and their text.
const CLEAR_BUTTON_ID            = BASE_PROJECT_ID + '-clear-button';       const CLEAR_BUTTON_TEXT          = 'Clear';
const COPY_TEXT_BUTTON_ID        = BASE_PROJECT_ID + '-copy-text-button';   const COPY_TEXT_BUTTON_TEXT      = 'Copy Text';
const COPY_HTML_BUTTON_ID        = BASE_PROJECT_ID + '-copy-html-button';   const COPY_HTML_BUTTON_TEXT      = 'Copy HTML';
const ENABLED_CHECKBOX_ID        = BASE_PROJECT_ID + '-enabled-checkbox';   const ENABLED_LABEL_TEXT         = 'Enabled';
const CLOSE_BUTTON_ID            = BASE_PROJECT_ID + '-close-button';       const CLOSE_BUTTON_TEXT          = 'Close';

// Class for log types
const INFO_CLASS                 = BASE_PROJECT_ID + '-info';
const WARN_CLASS                 = BASE_PROJECT_ID + '-warning';
const ERROR_CLASS                = BASE_PROJECT_ID + '-error';
const EXCEPTION_CLASS            = BASE_PROJECT_ID + '-exception';

// Prefixes used for different log types.
const INFO_PREFIX                = '[INFO]';
const WARN_PREFIX                = '[WARNING]';
const ERROR_PREFIX               = '[ERROR]';
const EXCEPTION_PREFIX           = '[EXCEPTION]';

// Defaults for boolean options so they are easy to change. If you are a user you can change these via options.
const DEFAULT_SHOW_CONTAINER      = false;
const DEFAULT_SHOWCAPTION         = true;
const DEFAULT_SHOWCLEARBUTTON     = true;
const DEFAULT_SHOWCOPYTEXTBUTTON  = true;
const DEFAULT_SHOWCOPYHTMLBUTTON  = true;
const DEFAULT_SHOWENABLEDCHECKBOX = true;
const DEFAULT_SHOWCLOSEBUTTON     = true;
const DEFAULT_LOGENABLED          = true;
const DEFAULT_LOGINFOENABLED      = true;
const DEFAULT_LOGWARNENABLED      = true;
const DEFAULT_LOGERRORENABLED     = true;
const DEFAULT_LOGEXCEPTIONENABLED = true;
const DEFAULT_LOGTABLEENABLED     = true;

function initLog2Div(options) {
  // If this flag is set, then we have already overridden the console functions.
  if (console.log2DivHasBeenInitialized) { return; }

  // We have made it here so assume that everything else will succeed and functions overridden. If
  // it fails for any reason, there's not much more we can do and not running again may be best anyway.
  console.log2DivHasBeenInitialized = true;

  // If the options parameter is not set, then set it to an empty object so we do not fail later.
  if (!options) { options = {}; }

  // If the copyToBrowserConsole flag is set, then we will maintain the normal functionality by copying
  // the log messages to the browser console.
  const copyToBrowserConsole = options.copyToBrowserConsole || true;

  // If we want to set various options.
  const showLog2DivContainer = options.showLog2DivContainer || DEFAULT_SHOW_CONTAINER;
  const showCaption          = options.showCaption          || DEFAULT_SHOWCAPTION;
  const showClearButton      = options.showClearButton      || DEFAULT_SHOWCLEARBUTTON;
  const showCopyTextButton   = options.showCopyTextButton   || DEFAULT_SHOWCOPYTEXTBUTTON;
  const showCopyHTMLButton   = options.showCopyHTMLButton   || DEFAULT_SHOWCOPYHTMLBUTTON;
  const showEnabledCheckbox  = options.showEnabledCheckbox  || DEFAULT_SHOWENABLEDCHECKBOX;
  const showCloseButton      = options.showCloseButton      || DEFAULT_SHOWCLOSEBUTTON;
  const captionText          = options.captionText          || DEFAULT_CAPTIONTEXT;

  // Booleans have to be checked for undefined as they can be set to false.
  if (options.enabled !== undefined) {
    setLog2DivEnabled(options.enabled);
  } else {
    setLog2DivEnabled(DEFAULT_LOGENABLED);
  }

  // If we want to see various log message types.
  const logInfoEnabled       = options.logInfoEnabled      || DEFAULT_LOGINFOENABLED;
  const logWarnEnabled       = options.logWarnEnabled      || DEFAULT_LOGWARNENABLED;
  const logErrorEnabled      = options.logErrorEnabled     || DEFAULT_LOGERRORENABLED;
  const logExceptionEnabled  = options.logExceptionEnabled || DEFAULT_LOGEXCEPTIONENABLED;
  const logTableEnabled      = options.logTableEnabled     || DEFAULT_LOGTABLEENABLED;

  // The id of the element that will contain everything.
  const consoleId            = options.consoleId           || CONSOLE_CONTAINER_ID;

  // Capture the original console functions so we can call them from our overridden functions.
  const log = console.log.bind(console);
  const error = console.error.bind(console);
  const warn = console.warn.bind(console);
  const table = console.table ? console.table.bind(console) : null;
  
  /**
   * Create or retrieve the Console container. The id can be created by the user or we can create it.
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
      if (showLog2DivContainer) {
        outer.classList.add(CONSOLE_CONTAINER_SHOW);
      } else {
        outer.classList.add(CONSOLE_CONTAINER_HIDE);
      }

      // Add it to the DOM.
      document.body.appendChild(outer);
    }

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

  // Create the logging div and adornments. This happens once as it is immediately invoked. IIFE.
  // The returned element is where the future log messages will be written.
  const logTo = (function createLogDiv() {
    // Create the outer element.
    const outer = createOuterElement(consoleId);

    // If we have been asked to show something in the header.
    if (showCaption || showClearButton || showCopyTextButton || showCopyHTMLButton || showEnabledCheckbox || showCloseButton) {
      // We need a DIV to put hearder stuff.
      const headerContainer = document.createElement('div');
      headerContainer.id = CONSOLE_LOG_HEADING_ID;

      // If we have been asked to show the caption, then create it and add it to the outer element.
      if (showCaption) {
        // The div for the caption.
        const caption = document.createElement('div');
        caption.id = CAPTION_ID;

        // The text for the caption.
        caption.appendChild(document.createTextNode(captionText));
        headerContainer.appendChild(caption);
      }

      // Each of the buttons we may show in the header.
      if (showClearButton)     { headerContainer.appendChild(createButton(CLEAR_BUTTON_TEXT, CLEAR_BUTTON_ID, clearLog2Div)); }
      if (showCopyTextButton)  { headerContainer.appendChild(createButton(COPY_TEXT_BUTTON_TEXT, COPY_TEXT_BUTTON_ID, copyPlainLog2DivMessages)); }
      if (showCopyHTMLButton)  { headerContainer.appendChild(createButton(COPY_HTML_BUTTON_TEXT, COPY_HTML_BUTTON_ID, copyRichLog2DivMessages)); }
      // And a checkbox for enabled.
      if (showEnabledCheckbox) { headerContainer.appendChild(createCheckbox(ENABLED_LABEL_TEXT, ENABLED_CHECKBOX_ID, getLog2DivEnabled(), enabledChanged)); }
      if (showCloseButton)     { headerContainer.appendChild(createButton(CLOSE_BUTTON_TEXT, CLOSE_BUTTON_ID, hideLog2Div)); }

      // Now add the caption container to the outer element.
      outer.appendChild(headerContainer);
    }

    // This is where log rows will be added.
    const logToDiv = document.createElement('div');
    logToDiv.id = MESSAGES_CONTAINER_ID;

    // Add the log div to the outer element and return the log div for future messages.
    // The outer div is not actually important other than to house everything.
    outer.appendChild(logToDiv);
    return logToDiv;
  }());

  /**
   * Simple one argument function to convert any value to a string in map.
   * 
   * @param {Object} x An object to convert to a string.
   * @returns {string} A string representation of the object passed in.
   */
  function toString(x) { return typeof x === 'string' ? x : JSON.stringify(x); }

  // Holder for the current row number.
  let _rowNumber = 0;

  /**
   * Create a log row with a badge and return it.
   * 
   * @param {string} logType The type of log we are looking at (INFO, WARN, ERROR, EXCEPTION).
   * @returns {HTMLElement} The log row element.
   */
  function createLogRow(logType) {
    // Create a new log row to put our message in.
    const item = document.createElement('div');
    item.id = LOG_ROW_NUMBER_ID + _rowNumber++;
    item.classList.add(LOG_ROW_CLASS);
    addClassForLogType(item, logType);

    // Create a badge for the log row. This shows the number of repeated messages.
    const badge = document.createElement('div');
    addClassForLogType(badge, logType);
    badge.classList.add(LOG_ROW_BADGE_CLASS);
    badge.textContent = "1";

    // Add the badge to the log row, and then return log row.
    item.appendChild(badge);
    return item;
  }

  /**
   * Add the class for the type of log to the passed in element.
   * 
   * @param {HTMLElement} elen The element to add the class to.
   * @param {string} logType The type of log we are looking at (INFO, WARN, ERROR, EXCEPTION).
   * @returns {void}
   */
  function addClassForLogType(elen, logType) {
    // Add CSS class based on the log type.
    switch (logType) {
      case INFO_PREFIX:      elen.classList.add(INFO_CLASS);      break;
      case WARN_PREFIX:      elen.classList.add(WARN_CLASS);      break;
      case ERROR_PREFIX:     elen.classList.add(ERROR_CLASS);     break;
      case EXCEPTION_PREFIX: elen.classList.add(EXCEPTION_CLASS); break;
    }
  }

  function logMessageWithStyles(logType, text, ...styles) {
    // Concatenate the first argument with the second separated by a space.
    const message = logType + ' ' + text;

    // Split the message on '%c' to get the text parts
    const parts = message.split('%c');

    // Create the log row and add CSS class based on the log type.
    const logRow = createLogRow(logType);

    // Go through every split part of the message.
    parts.forEach((part, index) => {
      // Create a span for every part of the message.
      const span = document.createElement('span');;
      span.textContent = part;

      // First part is always unstyled. Subsequent parts may have styles
      if (index !== 0) {
        // Apply corresponding style if it exists
        if (styles[index - 1]) {
          span.style.cssText = styles[index - 1];
        }
      }

      // Add the span.
      logRow.appendChild(span);
    });

    // Add the log row to the log div.
    logTo.appendChild(logRow);
  }

  // Keep track of the last message output so we check if the same message is being output. We also
  // save the ID of the last row so that we can update the badge if the same message is being output.
  let _lastMessageOutput = '';
  let _lastMessageRowID = '';

  function printToDiv() {
    // If there are no arguments, then do nothing.
    if (arguments.length === 0) { return; }

    // The user has decided we do not want to generate output.
    if (! getLog2DivEnabled()) { return; }

    // We get (INFO...) (text with %c) (styles...)
    if (arguments.length > 2) { 
      if (arguments[1].includes('%c')) {
        logMessageWithStyles.apply(null, arguments);
        return;
      }
    }

    // Get the message by concatenating the arguments.
    const msg = Array.prototype.slice.call(arguments, 0).map(toString).join(' ');

    // If the message is the same as the last message, then do not output it again.
    // Update the badge instead. And then we can be done here.
    if (msg === _lastMessageOutput) {
      // Get the most recent row, and then the badge in that row, and update the count.
      const lastRow = document.getElementById(_lastMessageRowID);
      const lastBadge = lastRow.querySelector('.' + LOG_ROW_BADGE_CLASS);
      lastBadge.textContent = String(parseInt(lastBadge.textContent) + 1);
      return;
    }

    // Save this new unique message for comparison next time.
    _lastMessageOutput = msg;

    // Create a new log row to put our message in. Save the new ID for later.
    const logRow = createLogRow(arguments[0]);
    _lastMessageRowID = logRow.id;

    // Put the log message in a span and add it to the log row. We use a span to match the same
    // structure as the styled output so that it is consistent.
    const styledSpan = document.createElement('span');
    styledSpan.textContent = msg;
    logRow.appendChild(styledSpan);

    // Add the log row to the log div.
    logTo.appendChild(logRow);
  }

  /**
   * Override the log function.
   */
  console.log = function logInfoMessage() {
    // If we continue to let normal console do its thing.
    if (copyToBrowserConsole) { log.apply(null, arguments); }

    if (logInfoEnabled) {
      // Get the arguments so we can prepend to them and then log the message.
      const args = Array.prototype.slice.call(arguments, 0);
      args.unshift(INFO_PREFIX);
      printToDiv.apply(null, args);
    }
  };

  /**
   * Override the warn function.
   */
  console.warn = function logWarnMessage() {
    // If we continue to let normal console do its thing.
    if (copyToBrowserConsole) { warn.apply(null, arguments); }

    if (logWarnEnabled) {
      // Get the arguments so we can prepend to them and then log the message.
      const args = Array.prototype.slice.call(arguments, 0);
      args.unshift(WARN_PREFIX);
      printToDiv.apply(null, args);
    }
  };

  /**
   * Override the error function.
   */
  console.error = function logErrorMessage() {
    // If we continue to let normal console do its thing.
    if (copyToBrowserConsole) { error.apply(null, arguments); }

    if (logErrorEnabled) {
      // Get the arguments so we can prepend to them and then log the message.
      const args = Array.prototype.slice.call(arguments, 0);
      args.unshift(ERROR_PREFIX);
      printToDiv.apply(null, args);
    }
  };

  function printTable(objArr, keys) {
    // The user has decided we do not want to generate output.
    if (! getLog2DivEnabled()) { return; }

    // TODO: Go through this function and see if we can use print to div function above.
    //       the enabled code looks a little clunky being in 2 places right now.

    const numCols = keys.length;
    const len = objArr.length;
    const $table = document.createElement('table');
    $table.style.width = '100%';
    $table.setAttribute('border', '1');
    const $head = document.createElement('thead');
    let $tdata = document.createElement('td');
    $tdata.innerHTML = 'Index';
    $head.appendChild($tdata);

    for (let k = 0; k < numCols; k++) {
      $tdata = document.createElement('td');
      $tdata.innerHTML = keys[k];
      $head.appendChild($tdata);
    }
    $table.appendChild($head);

    for (let i = 0; i < len; i++) {
      const $line = document.createElement('tr');
      $tdata = document.createElement('td');
      $tdata.innerHTML = String(i);
      $line.appendChild($tdata);

      for (let j = 0; j < numCols; j++) {
        $tdata = document.createElement('td');
        $tdata.innerHTML = objArr[i][keys[j]];
        $line.appendChild($tdata);
      }
      $table.appendChild($line);
    }

    // Add to the same place that the messages go.
    const logToDiv = document.getElementById(MESSAGES_CONTAINER_ID);
    logToDiv.appendChild($table);
  }

  /**
   * Override the table function.
   */
  console.table = function logTableMessage() {
    // If we continue to let normal console do its thing.
    if (copyToBrowserConsole) {
      // Make sure it is a function before calling it.
      if (typeof table === 'function') { table.apply(null, arguments); }
    }

    if (!logTableEnabled) {
      const objArr = arguments[0];
      let keys;

      if (typeof objArr[0] !== 'undefined') {
        keys = Object.keys(objArr[0]);
      }

      printTable(objArr, keys);
    }
  };

  // We only want to add a listener if the exception logging is enabled.
  if (logExceptionEnabled) {
    // If we didn't do this then exceptions would go to the regular console and we would not see them
    // inside our console. At least with this we have a fighting chance of seeing them.
    window.addEventListener('error', function (err) {
      printToDiv(EXCEPTION_PREFIX, err.message + '\n  ' + err.filename, err.lineno + ':' + err.colno);
      printToDiv(EXCEPTION_PREFIX, err.error);      
      printToDiv(EXCEPTION_PREFIX, err);
    });
  }
}

/**
 * Toggle the visibility of the log div.
 * 
 * @returns {void}
 */
function toggleLog2DivVisibility() {
  const elem = document.getElementById(CONSOLE_CONTAINER_ID);

  if (elem.classList.contains(CONSOLE_CONTAINER_SHOW)) {
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
function isLog2DivVisible() {
  // Get the main container for log2div.
  const elem = document.getElementById(CONSOLE_CONTAINER_ID);

  // If it already has the show class, then we are visible.
  return elem.classList.contains(CONSOLE_CONTAINER_SHOW);
}

/**
 * Show the log div.
 * 
 * @returns {void}
 */
function showLog2Div() {
  // Get the main container for log2div.
  const elem = document.getElementById(CONSOLE_CONTAINER_ID);

  // If it already has the show class, then we do not need to do anything.
  if (elem.classList.contains(CONSOLE_CONTAINER_SHOW)) { return; }

  // Add the show class and remove the hide class.
  elem.classList.add(CONSOLE_CONTAINER_SHOW);
  elem.classList.remove(CONSOLE_CONTAINER_HIDE);
}

/**
 * Hide the log div.
 * 
 * @returns {void}
 */
function hideLog2Div() {
  // Get the main container for log2div.
  const elem = document.getElementById(CONSOLE_CONTAINER_ID);

  // If it already has the hide class, then we do not need to do anything.
  if (elem.classList.contains(CONSOLE_CONTAINER_HIDE)) { return; }

  // Add the hide class and remove the show class.
  elem.classList.remove(CONSOLE_CONTAINER_SHOW);
  elem.classList.add(CONSOLE_CONTAINER_HIDE);
}

/**
 * Clear the log div of all messages.
 * 
 * @returns {void}
 */
function clearLog2Div() {
  // Get the element where we add log messages.
  const logDivElement = document.getElementById(MESSAGES_CONTAINER_ID);

  // Defensive check to make sure the element exists.
  if (logDivElement) {
    // This removes all the children of the log div.
    logDivElement.replaceChildren();
  }
}

/**
 * Event handler for when the enabled checkbox is changed. Someone clicked the box.
 * 
 * @param {Event & { target: HTMLInputElement }} event The change event.
 * @returns {void}
 */
function enabledChanged(event) {
  // Make sure the event is for a checkbox.
  if ((!event.target) || (event.target.type !== 'checkbox')) { return; }

  // Set the enabled flag based on the checkbox state.
  setLog2DivEnabled(event.target.checked);
}

/**
 * Start messages being added to the log div.
 * 
 * @returns {void}
 */
function startLog2Div() {
  setLog2DivEnabled(true);
}

/**
 * Stop messages being added to the log div.
 * 
 * @returns {void}
 */
function stopLog2Div() {
  setLog2DivEnabled(false);
}

/**
 * Get the current state of log2div.
 * 
 * @returns {boolean} Whether the log2div is enabled or not.
 */
function getLog2DivEnabled() {
  return console.log2div_enabled;
}

/**
 * Set the current state of log2div.
 * 
 * @param {boolean} enabled Whether to enable or disable log2div.
 * @returns {void}
 */
function setLog2DivEnabled(enabled) {
  console.log2div_enabled = enabled;
}

/**
 * Return the text of the log div.
 * 
 * @returns {string} The text of the log div.
 */
function getLog2DivTextMessages() {
  // Get the element where we add log messages and return text.
  return document.getElementById(MESSAGES_CONTAINER_ID).innerText;
}

/**
 * Return the HTML of the log div.
 * 
 * @returns {string} The HTML of the log div.
 */
function getLog2DivHTMLMessages() {
  // Get the element where we add log messages and return HTML.
  return document.getElementById(MESSAGES_CONTAINER_ID).innerHTML;
}

/**
 * Copy the text of the log2div to the clipboard.
 * 
 * @returns {void}
 */
function copyPlainLog2DivMessages() {
  // Get the text of the log div.
  const logMessages = getLog2DivTextMessages();

  // This might not be present in some cases. One reason is if using HTTP rather than HTTPS.
  if (navigator.clipboard) {
    try {
      // If the log text starts with a "word" followed by a colon, then we need to add a CR to the
      // beginning of the text so that the text is not made into a single encoded line. No idea why.
      // Presumably the clipboard api sees that and does something different. Couldn't find an explanation.
      // This happened because when I had the first line begin with INFO: I have since changed the prefixes
      // so that this is less likely to happen, but it is best to keep this check in place just in case.
      const beginsWithProblemText = /^\S+:/.test(logMessages);

      // Make the change if the problem exists, otherwise we leave the same.
      const adjustedLogMessages = beginsWithProblemText ? ("\n" + logMessages) : logMessages;

      // Write the messages to the clipboard as text.
      navigator.clipboard.writeText(adjustedLogMessages).then(function() {
        // console.log('navigator.clipboard.writeText successful!');
      }, function(err) {
        // console.error('navigator.clipboard.writeText failed: ', err);
      });
    } catch (ex) {
      // console.error('navigator.clipboard.writeText exception: ', ex);
    }
  } else {
    // This is a deprecated method of copying to the clipboard, but does work in some situations such as when using HTTP.
    if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      // Create a textarea element, set the value to the log messages, and then select the text.
      const textarea = document.createElement("textarea");
      textarea.textContent = logMessages;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        // This will hopefully copy the selected text to the clipboard.
        document.execCommand("copy");
      } catch (ex) {
        // console.error("document.execCommand failed.", ex);
      } finally {
        // We added a child earlier, so remove it now we don't need it.
        document.body.removeChild(textarea);
      }
    }
  }
}

/**
 * Copy the HTML of the log2div to the clipboard.
 * 
 * @returns {Promise<void>}
 */
async function copyRichLog2DivMessages() {
  // Get the HTML of the log div.
  const html = getLog2DivHTMLMessages();

  // We can support multiple mime types on the clipboard.
  const blobHTML = new Blob([html], { type: 'text/html' });
  const blobText = new Blob([html], { type: 'text/plain' });

  // Unfortunately, RTF is not a supported mime type in the clipboard API. Leave here for future.
  //const rtf = convert the html to rtf here.
  //const blobRTF = new Blob([rtf], { type: 'web text/rtf' });

  // Create the clipboard item from the blobs we made.
  const clipboardItemData = [new ClipboardItem({ [blobHTML.type]: blobHTML,
                                                 [blobText.type]: blobText,
                                                 //[blobRTF.type]: blobRTF
                                                })];

  try {
    // Calling the clipboard write directly didn't work very well so using a timeout.
    setTimeout(() => {
      // Write to the clipboard.
      navigator.clipboard.write(clipboardItemData)
    }, 0)
  } catch (err) {
    //console.error('navigator.clipboard.write failed: ', err);
  }
}

export {
  initLog2Div,
  clearLog2Div,
  toggleLog2DivVisibility,
  isLog2DivVisible,
  showLog2Div,
  hideLog2Div,
  getLog2DivTextMessages,
  getLog2DivHTMLMessages,
  copyPlainLog2DivMessages,
  copyRichLog2DivMessages,
  getLog2DivEnabled,
  startLog2Div,
  stopLog2Div
}