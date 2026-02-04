// save and propagate settings
// restore settings
// trigger connection and request return to tab after connection
// trigger RX to the hardware device
//-> https://developer.chrome.com/docs/extensions/mv3/options/
//use com.js : connect(), writeToStream(outputData)

let webrtcManager;
let currentSessionId;
let dataChannel;
let currentTargetPeerId;

// UI Elements
let messageInput = document.getElementById('message-input');
let sendBtn = document.getElementById('send-btn');
let logArea = document.getElementById('log');
let statusEl = document.getElementById('status');

function reconnect() {
  if (webrtcManager) {
    webrtcManager.close();
    webrtcManager = null;
  }
  // Simple reload to reset state for now, but logged
  console.log('Triggering reload for reconnection...');
  window.location.reload();
}

// SAVE & propagate SETTINGS
function save_options() {
  // get new values
  var verb = document.getElementById("verbosity").value;
  var lang = document.getElementById("language").value;
  var protocol = document.getElementById("protocol").value;

  // store new values
  chrome.storage.sync.set(
    {
      verbosity: verb,
      language: lang,
      protocol: protocol,
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
      protocol: "webusb",
    },
    function (items) {
      document.getElementById("verbosity").value = items.verbosity;
      document.getElementById("language").value = items.language;
      document.getElementById("protocol").value = items.protocol;

      if (items.protocol === 'webRTC') {
        initializeWebRTC();
      }
    }
  );
}

async function request_connection(e) {
  //TODO: catch connection erros
  var protocol = document.getElementById("protocol").value;
  if (protocol === 'webusb') {
    await connect();
  }

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

      // WebRTC Messages
      case 'answerReceived':
        if (webrtcManager && message.answer) {
          webrtcManager.handleAnswer(message.answer).then(() => {
            if (statusEl) statusEl.textContent = 'Negotiating connection...';
          }).catch(console.error);
        }
        break;
      case 'iceCandidateReceived':
        if (webrtcManager && message.candidate) {
          webrtcManager.handleIceCandidate(message.candidate).catch(console.error);
        }
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
  } else {
    // Handle messages that don't have 'command' but have 'type' (from background for WebRTC)
    if (message.type === 'answerReceived') {
      if (webrtcManager && message.answer) {
        webrtcManager.handleAnswer(message.answer).then(() => {
          if (statusEl) statusEl.textContent = 'Negotiating connection...';
        }).catch(console.error);
      }
    } else if (message.type === 'iceCandidateReceived') {
      if (webrtcManager && message.candidate) {
        webrtcManager.handleIceCandidate(message.candidate).catch(console.error);
      }
    }
  }
});

// UI Event Listeners for WebRTC
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const msg = messageInput?.value?.trim();
    if (msg && dataChannel && dataChannel.readyState === 'open') {
      dataChannel.send(msg);
      addToLog(msg, 'sent');
      if (messageInput) messageInput.value = '';
    }
  });
}

if (messageInput) {
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && sendBtn) {
      sendBtn.click();
    }
  });
}

// WebRTC Functions
function updateUIState(isConnected) {
  if (!messageInput || !sendBtn) return;
  messageInput.disabled = !isConnected;
  sendBtn.disabled = !isConnected;
  if (isConnected) {
    messageInput.focus();
  }
}

function addToLog(message, type = 'received') {
  if (!logArea) return;
  const time = new Date().toLocaleTimeString();
  const entry = `[${time}] ${type === 'sent' ? 'OUT: ' : 'IN:  '} ${message}\n`;
  logArea.textContent += entry;
  logArea.scrollTop = logArea.scrollHeight;
}

async function initializeWebRTC() {
  if (webrtcManager) {
    webrtcManager.close();
  }

  try {
    if (statusEl) statusEl.textContent = 'Initializing WebRTC...';

    // Wait a bit for background to init if needed
    await new Promise(r => setTimeout(r, 1000));

    const response = await chrome.runtime.sendMessage({ type: 'getPeers' });
    const peers = response || [];

    if (peers.length > 0) {
      peers.sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());
      const bestPeer = peers[0];
      currentTargetPeerId = bestPeer.peerId;
      await connectToPeer(bestPeer.peerId);
    } else {
      if (statusEl) statusEl.textContent = 'No peers found. Retrying in 3s...';
      updateUIState(false);
      setTimeout(reconnect, 3000);
    }
  } catch (error) {
    console.error('Failed to init WebRTC:', error);
    if (statusEl) statusEl.textContent = 'Connection failed. Retrying...';
    setTimeout(reconnect, 5000);
  }
}

async function connectToPeer(peerId) {
  try {
    if (statusEl) statusEl.textContent = `Connecting to ${peerId}...`;

    webrtcManager = new WebRTCManager({
      signalingDelegate: {
        sendIceCandidate: async (candidate) => {
          if (currentSessionId) {
            await chrome.runtime.sendMessage({
              type: 'sendIceCandidate',
              candidate,
              sessionId: currentSessionId
            });
          }
        }
      },
      onConnectionStateChange: (state) => {
        if (statusEl) statusEl.textContent = `Connection state: ${state}`;
        if (state === 'failed' || state === 'disconnected' || state === 'closed') {
          updateUIState(false);
          if (statusEl) statusEl.textContent = 'Connection lost. Reconnecting...';
          setTimeout(reconnect, 3000);
        }
      }
    });

    webrtcManager.initializePeerConnection();
    dataChannel = webrtcManager.createDataChannel('vibration-control');

    dataChannel.onopen = () => {
      if (statusEl) statusEl.textContent = `Connected to ${peerId}`;
      updateUIState(true);
    };

    dataChannel.onmessage = (event) => {
      addToLog(event.data, 'received');
    };

    dataChannel.onclose = () => {
      if (statusEl) statusEl.textContent = 'Data channel closed';
      updateUIState(false);
      setTimeout(reconnect, 3000);
    };

    const offer = await webrtcManager.createOffer();
    const response = await chrome.runtime.sendMessage({
      type: 'sendOffer',
      offer,
      peerId
    });

    if (response && response.sessionId) {
      currentSessionId = response.sessionId;
    } else {
      throw new Error('No session ID received');
    }

  } catch (error) {
    console.error('Connection failed:', error);
    if (statusEl) statusEl.textContent = 'Connection error. Retrying...';
    setTimeout(reconnect, 5000);
  }
}

// Handle closing
window.addEventListener('unload', () => {
  if (webrtcManager) {
    webrtcManager.close();
  }
  if (currentSessionId) {
    chrome.runtime.sendMessage({
      type: 'cleanupSession',
      sessionId: currentSessionId
    }).catch(() => { });
  }
});
