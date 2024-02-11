// Adapted from https://github.com/bahmutov/console-log-div

// Prefixes used for different log types.
const INFO_PREFIX                = '[INFO]';
const WARN_PREFIX                = '[WARNING]';
const ERROR_PREFIX               = '[ERROR]';
const EXCEPTION_PREFIX           = '[EXCEPTION]';

// Caption we use by default.
const DEFAULT_CAPTIONTEXT        = 'Log2Div Output: ';

// Base project prefix for IDs etc so can change in one place.
const BASE_PROJECT_ID            = 'log2div';

// The id of the div that will contain the log messages.
const MESSAGES_DIV_ID            = 'console-log-messages-div';
const CONSOLE_DIV_ID             = 'console-log-div';
const CONSOLE_LOG_CAPTION_ID     = 'console-log-caption';

// Class, IDs for controls and their text.
const BUTTON_CLASS               = BASE_PROJECT_ID + '-button';
const CHECKBOX_CLASS             = BASE_PROJECT_ID + '-checkbox';
const CLEAR_BUTTON_ID            =  '-clear-button';
const CLEAR_BUTTON_TEXT          = 'Clear';
const COPY_TEXT_BUTTON_ID        = BASE_PROJECT_ID + '-copy-text-button';
const COPY_TEXT_BUTTON_TEXT      = 'Copy Text';
const COPY_HTML_BUTTON_ID        = BASE_PROJECT_ID + '-copy-html-button';
const COPY_HTML_BUTTON_TEXT      = 'Copy HTML';
const ENABLED_CHECKBOX_ID        = BASE_PROJECT_ID + '-enabled-checkbox';
const ENABLED_LABEL_TEXT         = 'Enabled';

// Defaults for boolean options so they are easy to change.
const DEFAULT_SHOWCAPTION         = true;
const DEFAULT_SHOWCLEARBUTTON     = true;
const DEFAULT_SHOWCOPYTEXTBUTTON  = true;
const DEFAULT_SHOWCOPYHTMLBUTTON  = true;
const DEFAULT_SHOWENABLEDCHECKBOX = true;
const DEFAULT_LOGINFO             = true;
const DEFAULT_LOGWARN             = true;
const DEFAULT_LOGERROR            = true;
const DEFAULT_LOGEXCEPTION        = true;
const DEFAULT_LOGTABLE            = true;

// Globals.
let _log2div_enabled = true;

function initLog2Div(options) {
  // If the console.logToDiv flag is set, then we have already overridden the console functions.
  if (console.log2DivHasBeenInitialized) { return; }

  // We have made it here so assume that everything else will succeed and functions overridden. If
  // it fails for any reason, there's not much more we can do and not running again may be best anyway.
  console.log2DivHasBeenInitialized = true;

  // If the options parameter is not set, then set it to an empty object so we do not fail later.
  if (!options) { options = {}; }

  // If the copyToBrowserConsole flag is set, then we will copy the log messages to the browser console.
  const copyToBrowserConsole = options.copyToBrowserConsole || true;

  // If we want to set various options.
  const showCaption          = options.showCaption || DEFAULT_SHOWCAPTION;
  const showClearButton      = options.showClearButton || DEFAULT_SHOWCLEARBUTTON;
  const showCopyTextButton   = options.showCopyTextButton || DEFAULT_SHOWCOPYTEXTBUTTON;
  const showCopyHTMLButton   = options.showCopyHTMLButton || DEFAULT_SHOWCOPYHTMLBUTTON;
  const showEnabledCheckbox  = options.showEnabledCheckbox || DEFAULT_SHOWENABLEDCHECKBOX;
  const captionText          = options.captionText || DEFAULT_CAPTIONTEXT;
  _log2div_enabled           = options.enabled || true;

  // If we want to see various log messages.
  const logInfo              = options.logInfo || DEFAULT_LOGINFO;
  const logWarn              = options.logWarn || DEFAULT_LOGWARN;
  const logError             = options.logError || DEFAULT_LOGERROR;
  const logException         = options.logException || DEFAULT_LOGEXCEPTION;
  const logTable             = options.logTable || DEFAULT_LOGTABLE;

  // The id of the div that will contain the log messages.
  const consoleId            = options.consoleId || CONSOLE_DIV_ID;

  // Capture the original console functions so we can call them from our overridden functions.
  const log = console.log.bind(console);
  const error = console.error.bind(console);
  const warn = console.warn.bind(console);
  const table = console.table ? console.table.bind(console) : null;
  
  // Create or retrieve the Console Div container.
  function createOuterElement(id) {
    // See if the user has already created an element with the id.
    let outer = document.getElementById(id);

    // The user may have made their own container. If there isn't an existing element with the id, create one.
    if (!outer) {
      // Create the element, give it an id, and append it to the body.
      outer = document.createElement('div');
      outer.id = id;
      document.body.appendChild(outer);
    }

    // Return the outer element that existed or that we created.
    return outer;
  }

  function createButton(buttonText, buttonID, clickHandler) {
    const button = document.createElement('button')
    button.textContent = buttonText;
    button.id = buttonID;
    button.classList.add(BUTTON_CLASS);
    button.addEventListener('click', clickHandler);
    return button;
  }

  function createCheckbox(labelText, checkboxID, checked, changeHandler) {
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.value = checked;
    checkbox.id = checkboxID;
    checkbox.classList.add(CHECKBOX_CLASS);
    checkbox.addEventListener('change', changeHandler);

    const label = document.createElement('label');
    label.htmlFor = checkboxID;
    label.appendChild(document.createTextNode(labelText));

    // appending the checkbox and label to div
    const checkboxContainer = document.createElement('div');
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);

    // Return the container for teh checkbox and label.
    return checkboxContainer;
  }

  // Create the logging div and adornments. This happens once as it is immediately invoked. 
  // The returned element is where the future log messages will be written.
  const logTo = (function createLogDiv() {
    // Create the outer element.
    const outer = createOuterElement(consoleId);

    // If we have been asked to show something in the header.
    if (showCaption || showClearButton || showCopyTextButton || showCopyHTMLButton || showEnabledCheckbox) {
      // We need a DIV to put hearder stuff.
      const headerContainer = document.createElement('div');
      headerContainer.id = CONSOLE_LOG_CAPTION_ID;

      // If we have been asked to show the caption, then create it and add it to the outer element.
      if (showCaption) {
        // The div for the caption.
        const legend = document.createElement('div');
        legend.id = "legend";

        // The text for the caption.
        const caption = document.createTextNode(captionText);
        legend.appendChild(caption);
        headerContainer.appendChild(legend);
      }

      // Each of the buttons we may show in the header.
      if (showClearButton)     { headerContainer.appendChild(createButton(CLEAR_BUTTON_TEXT, CLEAR_BUTTON_ID, clearLog2Div)); }
      if (showCopyTextButton)  { headerContainer.appendChild(createButton(COPY_TEXT_BUTTON_TEXT, COPY_TEXT_BUTTON_ID, copyPlainLogDivMessages)); }
      if (showCopyHTMLButton)  { headerContainer.appendChild(createButton(COPY_HTML_BUTTON_TEXT, COPY_HTML_BUTTON_ID, copyRichLogDivMessages)); }
      // And a checkbox for enabled.
      if (showEnabledCheckbox) { headerContainer.appendChild(createCheckbox(ENABLED_LABEL_TEXT, ENABLED_CHECKBOX_ID, _log2div_enabled, enabledChanged)); }

      // Now add the caption container to the outer element.
      outer.appendChild(headerContainer);
    }

    // This is where log rows will be added.
    const logToDiv = document.createElement('div');
    logToDiv.id = MESSAGES_DIV_ID;

    // Add the log div to the outer element and return the log div for future messages.
    // The outer div is not actually important other than to house everything.
    outer.appendChild(logToDiv);
    return logToDiv;
  }());

  // Simple one argument function to convert any value to a string in map.
  function toString(x) { return typeof x === 'string' ? x : JSON.stringify(x); }

  function createLogRow() {
    const item = document.createElement('div');
    item.classList.add('log-row'); // TODO Make better class constant and name etc.
    item.classList.add('wordwrap');
    return item;
  }

  function addClassForLogType(logRow, logType) {
    // Add CSS class based on the log type.
    switch (logType) {
      case ERROR_PREFIX:
        logRow.classList.add('error');
        break;
      case WARN_PREFIX:
        logRow.classList.add('warning');
        break;
      case EXCEPTION_PREFIX:
        logRow.classList.add('exception');
        break;
      case INFO_PREFIX:
        logRow.classList.add('info');
        break;
    }
  }

  function logMessageWithStyles(logType, text, ...styles) {
    // Concatenate the first argument with the second separated by a space.
    const message = logType + ' ' + text;

    // Split the message on '%c' to get the text parts
    const parts = message.split('%c');

    // Create the log row and add CSS class based on the log type.
    const logRow = createLogRow();
    addClassForLogType(logRow, logType);

    parts.forEach((part, index) => {
      if (index === 0) {
        // First part is always unstyled
        logRow.appendChild(document.createTextNode(part));
      } else {
        // Subsequent parts may have styles
        const styledSpan = document.createElement('span');
        styledSpan.textContent = part;

        // Apply corresponding style if it exists
        if (styles[index - 1]) {
          styledSpan.style.cssText = styles[index - 1];
        }

        logRow.appendChild(styledSpan);
      }
    });
  
    logTo.appendChild(logRow);
  }
  
  function printToDiv() {
    // If there are no arguments, then do nothing.
    if (arguments.length === 0) { return; }

    // The user has decided we do not want to generate output.
    if (!_log2div_enabled) { return; }

    // We get (INFO:) (text with %c) (styles...)
    if (arguments.length > 2) { 
      if (arguments[1].includes('%c')) {
        logMessageWithStyles.apply(null, arguments);
        return;
      }
    }

    // Create a log row based on the concatenation of the arguments.
    const msg = Array.prototype.slice.call(arguments, 0).map(toString).join(' ');
    const logRow = createLogRow();
    logRow.textContent = msg;

    // Should always be true, but just in case.
    if (arguments.length >= 1) {
      // Add CSS class based on the log type.
      addClassForLogType(logRow, arguments[0]);
    }

    // Add the log row to the log div.
    logTo.appendChild(logRow);
  }

  // Override the log function.
  console.log = function logInfoMessage() {
    if (copyToBrowserConsole) {
      log.apply(null, arguments);
    }

    if (logInfo) {
      // Get the arguments so we can prepend to them and then log the message.
      const args = Array.prototype.slice.call(arguments, 0);
      args.unshift(INFO_PREFIX);
      printToDiv.apply(null, args);
    }
  };

  // Override the warn function.
  console.warn = function logWarnMessage() {
    if (copyToBrowserConsole) {
      warn.apply(null, arguments);
    }

    if (logWarn) {
      // Get the arguments so we can prepend to them and then log the message.
      const args = Array.prototype.slice.call(arguments, 0);
      args.unshift(WARN_PREFIX);
      printToDiv.apply(null, args);
    }
  };

  // Override the error function.
  console.error = function logErrorMessage() {
    if (copyToBrowserConsole) {
      error.apply(null, arguments);
    }

    if (logError) {
      // Get the arguments so we can prepend to them and then log the message.
      const args = Array.prototype.slice.call(arguments, 0);
      args.unshift(ERROR_PREFIX);
      printToDiv.apply(null, args);
    }
  };

  function printTable(objArr, keys) {
    // The user has decided we do not want to generate output.
    if (!_log2div_enabled) { return; }

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
    const logToDiv = document.getElementById(MESSAGES_DIV_ID);
    logToDiv.appendChild($table);
  }

  // Override the table function.
  console.table = function logTableMessage() {
    if (copyToBrowserConsole) {
      // Make sure it is a function before calling it.
      if (typeof table === 'function') {
        table.apply(null, arguments);
      }
    }

    if (!logTable) {
      const objArr = arguments[0];
      let keys;

      if (typeof objArr[0] !== 'undefined') {
        keys = Object.keys(objArr[0]);
      }

      printTable(objArr, keys);
    }
  };

  if (logException) {
    // If we didn't do this then exceptions would go to the regular console and we would not see them
    // inside our console. At least with this we have a fighting chance of seeing them.
    window.addEventListener('error', function (err) {
      printToDiv(EXCEPTION_PREFIX, err.message + '\n  ' + err.filename, err.lineno + ':' + err.colno);
      printToDiv(EXCEPTION_PREFIX, err);
    });
  }
}

function toggleLog2DivVisibility() {
  const elem = document.getElementById(CONSOLE_DIV_ID);
  if (elem.style.display === "block") {
    elem.style.display = "none";
  } else {
    elem.style.display = "block";
  }
}

// Clear the log div of all messages.
function clearLog2Div() {
  // Get the element where we add log messages.
  const logDivElement = document.getElementById(MESSAGES_DIV_ID);

  // Defensive check to make sure the log div element exists.
  if (logDivElement) {
    // This removes all the children of the log div.
    logDivElement.replaceChildren();
  }
}

// Start or stop messages being added through enabled.
function enabledChanged(value) {
  _log2div_enabled = value;
}

// Start messages being added.
function startLog2Div() {
  _log2div_enabled = true;
}

// Stop messages from being added.
function stopLog2Div() {
  _log2div_enabled = false;
}

function getLogDivTextMessages() {
  // Get the element where we add log messages and return text.
  return document.getElementById(MESSAGES_DIV_ID).innerText;
}

function getLogDivHTMLMessages() {
  // Get the element where we add log messages and return HTML.
  return document.getElementById(MESSAGES_DIV_ID).innerHTML;
}

function copyPlainLogDivMessages() {
  // Get the text of the log div.
  const logMessages = getLogDivTextMessages();

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
        return document.execCommand("copy");
      } catch (ex) {
        // console.error("document.execCommand failed.", ex);
      } finally {
        // We added a child earlier, so remove it now we don't need it.
        document.body.removeChild(textarea);
      }
    }
  }
}

async function copyRichLogDivMessages() {
  // Get the HTML of the log div.
  const html = getLogDivHTMLMessages();

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
  getLogDivTextMessages,
  getLogDivHTMLMessages,
  copyPlainLogDivMessages,
  copyRichLogDivMessages,
  startLog2Div,
  stopLog2Div
}
