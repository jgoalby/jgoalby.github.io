// Adapted from https://github.com/bahmutov/console-log-div

// Prefixes used for different log types.
const INFO_PREFIX      = 'INFO:';
const WARN_PREFIX      = 'WARNING:';
const ERROR_PREFIX     = 'ERROR:';
const EXCEPTION_PREFIX = 'EXCEPTION:';

// Caption we use by default.
const DEFAULT_CAPTION = 'Console Output';

// The id of the div that will contain the log messages.
const MESSAGES_DIV_ID        = 'console-log-messages-div';
const CONSOLE_DIV_ID         = 'console-log-div';
const CONSOLE_LOG_CAPTION_ID = 'console-log-caption';

// Defaults for boolean options so they are easy to change.
const DEFAULT_SHOWCAPTION        = true;
const DEFAULT_SHOWCOPYTEXTBUTTON = true;
const DEFAULT_SHOWCOPYHTMLBUTTON = true;
const DEFAULT_LOGINFO            = true;
const DEFAULT_LOGWARN            = true;
const DEFAULT_LOGERROR           = true;
const DEFAULT_LOGEXCEPTION       = true;
const DEFAULT_LOGTABLE           = true;

function initConsoleLogDiv(options) {
  // If the console.logToDiv flag is set, then we have already overridden the console functions.
  if (console.logToDiv) { return; }

  // We have made it here so assume that everything else will succeed and functions overridden. If
  // it fails for any reason, there's not much more we can do and not running again may be best anyway.
  console.logToDiv = true;

  // If the options parameter is not set, then set it to an empty object so we do not fail later.
  if (!options) { options = {}; }

  // If the copyToBrowserConsole flag is set, then we will copy the log messages to the browser console.
  const copyToBrowserConsole = options.copyToBrowserConsole || true;

  // If we want to see the caption and specify what it says.
  const showCaption = options.showCaption || DEFAULT_SHOWCAPTION;
  const showCopyTextButton = options.showCopyTextButton || DEFAULT_SHOWCOPYTEXTBUTTON;
  const showCopyHTMLButton = options.showCopyHTMLButton || DEFAULT_SHOWCOPYHTMLBUTTON;
  const logCaption = options.logCaption || DEFAULT_CAPTION;

  // If we want to see various log messages.
  const logInfo = options.logInfo || DEFAULT_LOGINFO;
  const logWarn = options.logWarn || DEFAULT_LOGWARN;
  const logError = options.logError || DEFAULT_LOGERROR;
  const logException = options.logException || DEFAULT_LOGEXCEPTION;
  const logTable = options.logTable || DEFAULT_LOGTABLE;

  // The id of the div that will contain the log messages.
  const consoleId = options.consoleId || CONSOLE_DIV_ID;

  // Capture the original console functions so we can call them from our overridden functions.
  const log = console.log.bind(console);
  const error = console.error.bind(console);
  const warn = console.warn.bind(console);
  const table = console.table ? console.table.bind(console) : null;
  
  // Create or retrieve the Console Div container.
  function createOuterElement(id) {
    // See if the user has already created an element with the id.
    let outer = document.getElementById(id);

    // If there isn't an existing element with the id, create one.
    if (!outer) {
      // Create the element, give it an id, and append it to the body.
      outer = document.createElement('div');
      outer.id = id;
      document.body.appendChild(outer);
    }

    // Return the outer element that existed or that we created.
    return outer;
  }

  // Create the logging div and adornments. This happens once as it is immediately invoked. 
  // The returned element is where the future log messages will be written.
  const logTo = (function createLogDiv() {
    // Create the outer element.
    const outer = createOuterElement(consoleId);

    // If we have been asked to show the caption or the copy button, then create the caption container.
    if (showCaption || showCopyTextButton || showCopyHTMLButton) {
      // We need a DIV to put caption next to the button.
      const captionContainer = document.createElement('div');
      captionContainer.id = CONSOLE_LOG_CAPTION_ID;

      // If we have been asked to show the caption, then create it and add it to the outer element.
      if (showCaption) {
        // The div for the caption.
        const legend = document.createElement('div');
        legend.id = "legend";

        // The text for the caption.
        const caption = document.createTextNode(logCaption);
        legend.appendChild(caption);
        captionContainer.appendChild(legend);
      }

      if (showCopyTextButton) {
        // Create a copy to clipboard button.
        const copyButton = document.createElement('button')
        copyButton.textContent = 'Copy Text';
        //copyButton.addEventListener('click', copyLogDivMessages);
        copyButton.addEventListener('click', copyLogDivTextMessages);
        captionContainer.appendChild(copyButton);
      }

      if (showCopyHTMLButton) {
        // Create a copy to clipboard button.
        const copyButton = document.createElement('button')
        copyButton.textContent= 'Copy HTML';
        //copyButton.addEventListener('click', copyLogDivMessages);
        copyButton.addEventListener('click', copyLogDivHTMLMessages);
        captionContainer.appendChild(copyButton);
      }

      // Now add the caption container to the outer element.
      outer.appendChild(captionContainer);
    }

    // This is where log rows will be added.
    const logToDiv = document.createElement('div');
    logToDiv.id = MESSAGES_DIV_ID;

    // Add the log div to the outer element and return the log div for future messages.
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









  console.log("!!!!we are here!!!!!");

  // Get canvas can add an event handler for the click event.
  //const canvas = document.getElementById("canvas");
  //const canvas = document.querySelector('canvas');
  //const canvi = document.getElementsByTagName('canvas');
  //const canvas = canvi[0];
  const main = document.getElementById(consoleId);
  main.addEventListener("click", copyCanvasContentsToClipboard);

  async function copyCanvasContentsToClipboard() {
    const canvi = document.getElementsByTagName('canvas');
    const canvas = canvi[0];

    console.log("111111");
    console.log(canvas);
    console.log(canvi);

    canvas.toBlob(async (blob) => {
      console.log("222222");
      const newImg = document.createElement("img");
      const url = URL.createObjectURL(blob);
    
      newImg.onload = () => {
        console.log("3333333");
        // no longer need to read the blob so it's revoked
        URL.revokeObjectURL(url);
      };
    
      newImg.src = url;
      document.body.appendChild(newImg);
      
      console.log("444444");

      try {
        console.log("blobby blobby blobby");
        console.log(blob.type);
        console.log(blob);

        // Create ClipboardItem with blob and it's type, and add to an array
        const data = [new ClipboardItem({ [blob.type]: blob })];

        console.log("data is coming");
        console.log(data);

        // Write the data to the clipboard
        //await navigator.clipboard.write(data);

        setTimeout(() => {
          navigator.clipboard.write(data)
        }, 0)
      }
      catch (ex) {
        console.warn("Exception.", ex);
        console.warn("Exception.", ex.message);
      }

      console.log("55555");
    });
  }
}

function toggleVisibility() {
  const elem = document.getElementById(CONSOLE_DIV_ID);
  if (elem.style.display === "block") {
    elem.style.display = "none";
  } else {
    elem.style.display = "block";
  }
}

// Clear the log div of all messages.
function clearConsoleLogDiv() {
  // Get the element where we add log messages.
  const logDivElement = document.getElementById(MESSAGES_DIV_ID);

  // Defensive check to make sure the log div element exists.
  if (logDivElement) {
    // This removes all the children of the log div.
    logDivElement.replaceChildren();
  }
}

function getLogDivTextMessages() {
  // Get the element where we add log messages and return text.
  return document.getElementById(MESSAGES_DIV_ID).innerText;
}

function getLogDivHTMLMessages() {
  // Get the element where we add log messages and return HTML.
  return document.getElementById(MESSAGES_DIV_ID).innerHTML;
}

function copyLogDivMessages(logMessages) {
  // This might not be present in some cases. One reason is if using HTTP rather than HTTPS.
  if (navigator.clipboard) {
    try {
      // If the log text starts with a "word" followed by a colon, then we need to add a CR to the
      // beginning of the text so that the text is not made into a single encoded line. No idea why.
      // This happened because the first line started with INFO:.
      const adjustedLogMessages = "\n" + logMessages;
      navigator.clipboard.writeText(adjustedLogMessages).then(function() {
        // console.log('navigator.clipboard.writeText successful!');
      }, function(err) {
        // console.error('navigator.clipboard.writeText failed: ', err);
      });
    } catch (ex) {
      // console.log('navigator.clipboard.writeText exception: ', ex);
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
      }
      catch (ex) {
        // console.warn("document.execCommand failed.", ex);
      }
      finally {
        // We added a child earlier, so remove it now we don't need it.
        document.body.removeChild(textarea);
      }
    }
  }
}

function copyLogDivTextMessages() {
  copyLogDivMessages(getLogDivTextMessages());
}

async function copyLogDivHTMLMessages() {
  //copyLogDivMessages(getLogDivHTMLMessages());

  const html = getLogDivHTMLMessages();
  //const text = getLogDivTextMessages();

  const blobHTML = new Blob([html], { type: 'text/html' });
  const blobText = new Blob([html], { type: 'text/plain' });
  const data = [new ClipboardItem({ 'text/html': blobHTML, 'text/plain': blobText})];

  try {
      //await navigator.clipboard.write(data);
      setTimeout(() => {
        navigator.clipboard.write(data)
      }, 0)
  } catch (err) {
    console.error('Failed to copy: ', err);
  }

  /*function handler (event){
    console.log("Somehow we are here");
    var textString = 'This is plain text';
    var htmlString = `<p>${textString}
        new line here</p><p>new paragraph</p>`;
    var clipboardDataEvt = event.clipboardData;
    console.log(clipboardDataEvt);
    console.log(clipboardDataEvt.getData('text/plain'));
    console.log(clipboardDataEvt.getData('text/html'));
    clipboardDataEvt.setData('text/plain', textString);
    clipboardDataEvt.setData('text/html', htmlString);

    document.removeEventListener('copy', handler, true);
  }

  document.addEventListener('copy', handler, true);
  document.execCommand('copy');*/
}

export {
  initConsoleLogDiv,
  clearConsoleLogDiv,
  toggleVisibility,
  getLogDivTextMessages,
  getLogDivHTMLMessages,
  copyLogDivTextMessages,
  copyLogDivHTMLMessages
}
