// Adapted from https://github.com/bahmutov/console-log-div

const INFO_PREFIX = 'INFO:';
const WARN_PREFIX = 'WARNING:';
const ERROR_PREFIX = 'ERROR:';
const EXCEPTION_PREFIX = 'EXCEPTION:';

const LOG_DIV_ID = 'console-log-div';

function initConsoleLogDiv(options) {
  'use strict';

  // If the console.logToDiv flag is set, then we have already overridden the console functions.
  if (console.logToDiv) { return; }

  // We have made it here so assume that everything else will succeed and functions overridden. If
  // it fails for any reason, there's not much more we can do and not running again may be best anyway.
  console.logToDiv = true;

  // If the options parameter is not set, then set it to an empty object so we do not fail later.
  if (!options) { options = {}; }

  // If the copyToBrowserConsole flag is set, then we will copy the log messages to the browser console.
  let copyToBrowserConsole = options.copyToBrowserConsole || true;

  // If we want to see the caption and specify what it says.
  let showCaption = options.showCaption || true;
  let logCaption = options.logCaption || 'Console Output';

  // If we want to see various log messages.
  let logInfo = options.logInfo || true;
  let logWarn = options.logWarn || true;
  let logError = options.logError || true;
  let logException = options.logException || true;
  let logTable = options.logTable || true;

  // The id of the div that will contain the log messages.
  let consoleId = 'console-log-div';

  // Capture the original console functions so we can call them from our overridden functions.
  let log = console.log.bind(console);
  let error = console.error.bind(console);
  let warn = console.warn.bind(console);
  let table = console.table ? console.table.bind(console) : null;
  
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

    // Return the outer element.
    return outer;
  }

  // Create the logging div and adornments. This happens once as it is immediately invoked. 
  // The returned element is where the future log messages will be written.
  let logTo = (function createLogDiv() {
    // Create the outer element.
    let outer = createOuterElement(consoleId);

    // If we have been asked to show the caption, then create it and add it to the outer element.
    if (showCaption) {
      // The div for the caption.
      let legend = document.createElement('div');
      legend.id = "legend";

      // The text for the caption.
      let caption = document.createTextNode(logCaption);
      legend.appendChild(caption);

      // Add the caption to the outer element.
      outer.appendChild(legend);
    }

    // This is where log rows will be added.
    let logDiv = document.createElement('div');
    logDiv.id = LOG_DIV_ID;

    // Add the log div to the outer element and return the log div for future messages.
    outer.appendChild(logDiv);
    return logDiv;
  }());

  // Simple one argument function to convert any value to a string in map.
  function toString(x) { return typeof x === 'string' ? x : JSON.stringify(x); }

  function printToDiv() {
    // Create a log row based on the concatenation of the arguments.
    let msg = Array.prototype.slice.call(arguments, 0).map(toString).join(' ');
    let item = document.createElement('div');
    item.textContent = msg;
    item.classList.add('log-row');
    item.classList.add('wordwrap');

    // Should always be true, but just in case.
    if (arguments.length >= 1) {
      // Add CSS class based on the log type.
      if (arguments[0] === ERROR_PREFIX) {
        item.classList.add('error');
      } else if (arguments[0] === WARN_PREFIX) {
        item.classList.add('warning');
      } else if (arguments[0] === EXCEPTION_PREFIX) {
        item.classList.add('exception');
      } else if (arguments[0] === INFO_PREFIX) {
        item.classList.add('info');
      }
    }

    // Add the log row to the log div.
    logTo.appendChild(item);
  }

  // Override the log function.
  console.log = function logInfoMessage() {
    if (copyToBrowserConsole) {
      log.apply(null, arguments);
    }

    if (logInfo) {
      // Get the arguments so we can prepend to them and then log the message.
      let args = Array.prototype.slice.call(arguments, 0);
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
      let args = Array.prototype.slice.call(arguments, 0);
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
      let args = Array.prototype.slice.call(arguments, 0);
      args.unshift(ERROR_PREFIX);
      printToDiv.apply(null, args);
    }
  };

  function printTable(objArr, keys) {
    let numCols = keys.length;
    let len = objArr.length;
    let $table = document.createElement('table');
    $table.style.width = '100%';
    $table.setAttribute('border', '1');
    let $head = document.createElement('thead');
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
      let $line = document.createElement('tr');
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
    let div = document.getElementById('console-log-text');
    div.appendChild($table);
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
      let objArr = arguments[0];
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
    });
  }
};

function clearConsoleLogDiv() {
  // Get the element where we add log messages.
  let logDivElement = document.getElementById(LOG_DIV_ID);

  // This removes all the children of the log div.
  logDivElement.replaceChildren();  
}

export {
  initConsoleLogDiv,
  clearConsoleLogDiv
}