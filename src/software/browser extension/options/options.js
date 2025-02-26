// save and propagate settings
// restore settings
// trigger connection and request return to tab after connection
// trigger RX to the hardware device
//-> https://developer.chrome.com/docs/extensions/mv3/options/
//use com.js : connect(), writeToStream(outputData)

// SAVE & propagate SETTINGS
function save_options() {
  // get new values
  var verb = document.getElementById("verbosity").value;
  var lang = document.getElementById("language").value;

  // store new values
  chrome.storage.sync.set(
    {
      verbosity: verb,
      language: lang,
    },
    function () {
      chrome.runtime.sendMessage({
        request: "update settings",
        trigger: "options",
      });

      //FOR DEBUG: Update status to let dev know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Settings saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
}

// restore settings
function restore_options() {
  // Use default value verbosity = 'medium' and language = 'en'.

  chrome.storage.sync.get(
    {
      verbosity: "medium",
      language: "en",
    },
    function (items) {
      document.getElementById("verbosity").value = items.verbosity;
      document.getElementById("language").value = items.language;
    }
  );
}

async function request_connection(e) {
  //TODO: catch connection erros
  await connect();

  //get the options page tabId
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.runtime.sendMessage({
      request: "return to tab",
      optionsTabId: tabs[0].id,
    });
  });
  //TODO: could something like this work ?
  //const tab = await chrome.tabs.get(tabId);
}

// EVENT LISTENERS

//When document loaded, restore saved options
document.addEventListener("DOMContentLoaded", restore_options);
//When save clicked, save the settings
document.getElementById("save").addEventListener("click", save_options);
// when connect clicked, connect to hardware device
document
  .getElementById("connect")
  .addEventListener("click", request_connection);

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  //console.log("Received this message ", message);
  if (message.command) {
    switch (message.command) {
      case "update settings":
        console.log(
          "Settings updated, triggered by: ",
          message.trigger,
          message
        );
        if (message.trigger == "hardware")
          //as oposed to options
          restore_options();

        //Synchronous response to storage updates
        //https://developer.chrome.com/docs/extensions/reference/storage/#synchronous-response-to-storage-updates
        break;
      case "update visibility":
        // console.log("trigger remodeling");
        //ModelPageDOM();
        // visibilityLevel = message.data;
        //RefreshVisibleModel();
        //RefreshWindow();
        console.log("");
        break;
      case "send to device":
        if (connected) {
          if (debugCOM) console.log("COMM: sending " + message.data);
          writeToStream(message.data);
        } else {
          if (debugCOM)
            console.log(
              "COMM: got asked to send this without connection: " + message.data
            );
        }
        break;
      case "start navigation":
        console.log("wont start navigation on options page for MVP");
        break;
      default:
        // debugging commands
        console.warn(
          "Unmatched command of '",
          message,
          "' from background.js options scripts from ",
          sender
        );
        return;
    }
  }
});
