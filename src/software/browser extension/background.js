// It runs in the background and is always listening for events that happen anywhere in the browser
// 1. TTS (speaks out the message)
// 2. active tab detection
// 3. message passing
// 4. command keyboard
var previousTabId = 0;
var optionsTabId = 0;
var speechRate = 1.5;

//TTS

function speakInputText(input_string, language = "en-US") {
  /*
   * all tts options: https://developer.chrome.com/extensions/tts#type-TtsOptions
   * https://developer.chrome.com/docs/extensions/reference/tts/
   */
  const ttsOptions = {
    lang: language,
    enqueue: false,
    rate: speechRate,
    volume: 1.0,
    /*
     * all event types: https://developer.chrome.com/extensions/tts#type-TtsEvent
     */
    requiredEventTypes: ["end"],
    onEvent: function (event) {
      // event format:  https://developer.chrome.com/extensions/tts#type-TtsEvent
      // do something with the event
      // console.log("Event " + event.type);
      if (event.type == "end") {
        //  console.log('Err: ' + event.errorMessage);
        //send active window event
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              command: "tts ended",
            });
          }
        );
      }
    },
  };
  chrome.tts.speak(input_string, ttsOptions);
}

function ChangeSpeechRate(direction = "more") {
  //more, less, max, min
  console.log("Changing speech rate, to get " + direction + " speed");

  if (direction == "more") {
    if (speechRate > 0.5) {
      speechRate -= 0.25;

      speakInputText("Speech rate set at " + speechRate * 100 + " percent.");
    } else {
      console.log("Speech rate at minimum 50% ");
      speakInputText("Speech rate at minimum 50%");
    }
  } else {
    if (speechRate < 2.5) {
      speechRate += 0.25;
      speakInputText("Speech rate set at " + speechRate * 100 + " percent.");
    } else {
      console.log("Speech rate at maximum 250% ");
      speakInputText("Speech rate at maximum 250%");
    }
  }
}

//--------------------------------------------------------------------------------------------------------//
//START Navigation on active tab change
chrome.tabs.onActivated.addListener(function (activeTabInfo) {
  //getTabInfo((activeTabInfoId = activeInfo.tabId), "onActivated");

  // console.log("tab activated!", activeTabInfo);
  chrome.tabs.get(activeTabInfo.tabId, function (tab) {
    //start navigation for those who have their tabs loaded
    //console.log(tab);
    if (tab.status == "complete") {
      // tab has already loaded, send start navigation no problem
      chrome.tabs.sendMessage(tab.id, { command: "start navigation" });
      // console.log(
      //   "tab activated: " +
      //     activeTabInfo.tabId +
      //     " title: " +
      //     tab.title +
      //     " url: " +
      //     tab.url
      // );
    } else {
      console.log(
        "tab not loaded yet, dont send command, it will autoload on start if focused"
      );
    }
  });
});

//------------------------------------------------------------------------//
// messages
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.request) {
    switch (request.request) {
      case "sync mode":
        chrome.tabs.query({}, function (tabs) {
          tabs.forEach((element) => {
            chrome.tabs.sendMessage(
              element.id,
              { command: "sync mode", data: request.data } //triggered by options page or hardware
            );
          });
        });
        break;
      case "update settings":
        //propagate message
        //send command to all tabs to update their settings

        chrome.tabs.query({}, function (tabs) {
          tabs.forEach((element) => {
            chrome.tabs.sendMessage(
              element.id,
              { command: "update settings", trigger: request.trigger } //triggered by options page or hardware
            );
          });
        });
        //speakInputText("Options saved.");
        return;
      case "tts":
        speakInputText(request.data, request.lang);
        return;
      case "return to tab":
        // bring focus to the previous tab, before opening the options page
        optionsTabId = request.optionsTabId;
        chrome.tabs.update(previousTabId, { active: true }, (tab) => {});
        chrome.tabs.update(optionsTabId, { pinned: true }, (tab) => {});
        return;

      case "received from device":
        // console.log('RECEIVED THE FOLLOWING: + '+request.buttonEvent);
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
              command: "received from device",
              data: request.data,
            });
          }
        );
        return;
      case "send to device":
        chrome.tabs.query({}, function (tabs) {
          console.log(tabs, optionsTabId);
          for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].id == optionsTabId) {
              chrome.tabs.sendMessage(tabs[i].id, {
                command: "send to device",
                data: request.data,
              });
            }
          }
        });
        return;
      case "change speech rate":
        ChangeSpeechRate(request.direction);
        return;

      default:
        // helps debug when request
        console.log("Unmatched request from script to background.js");
        console.log(request);
        return;
    }
  }
});

//------------------------------------------------------------------------//
// 4.0 Command keyboard
chrome.commands.onCommand.addListener((command) => {
  //save the tab where the command was launched
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    previousTabId = tabs[0].id;
  });
  chrome.runtime.openOptionsPage();
});

//------------------------------------------------------------------------//
// Actions

chrome.action.onClicked.addListener((tab) => {
  chrome.runtime.openOptionsPage();
});
