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
  var protocol = document.getElementById("protocol").value;
  var wsIp = document.getElementById("ws-ip").value;
  var wsPort = document.getElementById("ws-port").value;

  // store new values
  chrome.storage.sync.set(
    {
      verbosity: verb,
      language: lang,
      protocol: protocol,
      wsIp: wsIp,
      wsPort: wsPort,
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
  // Use default value verbosity = 'medium', language = 'en', protocol = 'websocket', wsIp = '192.168.12.3', wsPort = '8765'.

  chrome.storage.sync.get(
    {
      verbosity: "medium",
      language: "en",
      protocol: "websocket",
      wsIp: "192.168.12.3",
      wsPort: "8765",
    },
    function (items) {
      document.getElementById("verbosity").value = items.verbosity;
      document.getElementById("language").value = items.language;
      document.getElementById("protocol").value = items.protocol;
      document.getElementById("ws-ip").value = items.wsIp;
      document.getElementById("ws-port").value = items.wsPort;
      toggleWebSocketSettings(items.protocol);
    }
  );
}

function toggleWebSocketSettings(protocol) {
  var wsSettings = document.getElementById("websocket-settings");
  if (protocol === "websocket") {
    wsSettings.style.display = "block";
  } else {
    wsSettings.style.display = "none";
  }
}

async function request_connection(e) {
  const selectedProtocol = document.getElementById("protocol").value;
  chrome.storage.sync.set({ protocol: selectedProtocol }, async () => {
    protocol = selectedProtocol; // Update protocol in com.js
    await connect();

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.runtime.sendMessage({
        request: "return to tab",
        optionsTabId: tabs[0].id,
      });
    });
  });
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
// when protocol changes, toggle WebSocket settings visibility
document.getElementById("protocol").addEventListener("change", function() {
  toggleWebSocketSettings(this.value);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  //console.log("Received this message ", message);
  if (message.command) {
    switch (message.command) {
      case "update settings":
        console.log(
          "[options] Settings updated, triggered by: ",
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
          if (debugCOM) console.log("[options] sending " + message.data);
          writeToStream(message.data);
        } else {
          if (debugCOM)
            console.log(
              "[options] got asked to send this without connection: " + message.data
            );
        }
        break;
      case "start navigation":
        console.log("[options] wont start navigation on options page for MVP, try a different tab");
        break;
      case "received from device":
        console.log("[options] Data received from device:", message.data);
        // Add any additional handling logic here if needed
        break;
      default:
        // debugging commands
        console.warn(
          "[options] Unmatched command of '",
          message,
          "' from background.js options scripts from ",
          sender
        );
        return;
    }
  }
});
