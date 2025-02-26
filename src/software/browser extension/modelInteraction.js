//prompts dictionary
//TODO: think about prompts more carefully
let enPrompts = {
  H1: {
    0: "h1",
    1: "heading 1",
    2: "heading level 1",
    3: "title heading level 1",
  }, //verbosity levels - low, medium, high, didactic
  H2: {
    0: "h2",
    1: "heading 2",
    2: "heading level 2",
    3: "chapter heading level 2",
  },
  H3: {
    0: "h1",
    1: "heading 3",
    2: "heading level 3",
    3: "subtitle heading level 3",
  },
  H4: {
    0: "h4",
    1: "heading 4",
    2: "heading level 4",
    3: "small subtitle heading level 4",
  },
  IMG: {
    0: "image",
    1: "image",
    2: "image",
    3: "image",
  },
  INPUT: {
    0: "input",
    1: "input",
    2: "input",
    3: "input",
  },
  BUTTON: { 0: "button", 1: "button", 2: "button", 3: "button" },
  A: {
    0: "link",
    1: "link",
    2: "link",
    3: "link",
  },
  of: { 0: "of", 1: "of", 2: "of", 3: "of" },
  percent: {
    0: "percent",
    1: "percent",
    2: "percent",
    3: "percent",
  },
  connected: {
    0: "connected",
    1: "connected",
    2: "connected",
    3: "connected",
  },
};

let help = {
  1: {
    tap: "Tapping the first row button anounces the element on that row. You can also double tap, press and hold or tap and press this button for more help.",
    doubleTap:
      "Double tap the first row button to navigate to the element on that row. Similar to JAWS TAB shortcut. Your computer cursor will scroll to that position in the page and your screen reader will anounce the element. The element will appear pulsating on the first row of the new group shown on your device vibrator. ",
    longPress:
      "Press and hold the first row button adds the element of that row to your favorites. Similar to JAWS landmark functions. Access your favorite elements of this page on your device by tapping the star button until you are in the favorites operation mode.",
    tapLongPress:
      "Tap and Press the first row button will trigger a different function depending on the type of element. If the element is a heading, it will read back a summary of the contents inside. If the element is an image, it will read back the description, if no description is available it will generate a description using artificial intelligence. If the element is a link, it will open the url on your browser tab. If the element is a button, it will activate the button. If the element is a table or list, it will open it on the table and list exploration mode. work in progress.",
  },
  2: {
    tap: "Tapping the second row button anounces the element on that row. You can also double tap, press and hold or tap and press this button for more help.",
    doubleTap:
      "Double tap the second row button to navigate to the element on that row. Similar to JAWS TAB shortcut. Your computer cursor will scroll to that position in the page and your screen reader will anounce the element. The element will appear pulsating on the second row of the new group shown on your device vibrator. ",
    longPress:
      "Press and hold the second row button adds the element of that row to your favorites. Similar to JAWS landmark functions. Access your favorite elements of this page on your device by tapping the star button until you are in the favorites operation mode.",
    tapLongPress:
      "Tap and Press the second row button will trigger a different function depending on the type of element. If the element is a heading, it will read back a summary of the contents inside. If the element is an image, it will read back the description, if no description is available it will generate a description using artificial intelligence. If the element is a link, it will open the url on your browser tab. If the element is a button, it will activate the button. If the element is a table or list, it will open it on the table and list exploration mode. work in progress.",
  },
  3: {
    tap: "Tapping the third row button anounces the element on that row. You can also double tap, press and hold or tap and press this button for more help.",
    doubleTap:
      "Double tap the third row button to navigate to the element on that row. Similar to JAWS TAB shortcut. Your computer cursor will scroll to that position in the page and your screen reader will anounce the element. The element will appear pulsating on the third row of the new group shown on your device vibrator. ",
    longPress:
      "Press and hold the third row button adds the element of that row to your favorites. Similar to JAWS landmark functions. Access your favorite elements of this page on your device by tapping the star button until you are in the favorites operation mode.",
    tapLongPress:
      "Tap and Press the third row button will trigger a different function depending on the type of element. If the element is a heading, it will read back a summary of the contents inside. If the element is an image, it will read back the description, if no description is available it will generate a description using artificial intelligence. If the element is a link, it will open the url on your browser tab. If the element is a button, it will activate the button. If the element is a table or list, it will open it on the table and list exploration mode. work in progress.",
  },
  4: {
    tap: "Tapping the forth row button anounces the element on that row. You can also double tap, press and hold or tap and press this button for more help.",
    doubleTap:
      "Double tap the forth row button to navigate to the element on that row. Similar to JAWS TAB shortcut. Your computer cursor will scroll to that position in the page and your screen reader will anounce the element. The element will appear pulsating on the forth row of the new group shown on your device vibrator. ",
    longPress:
      "Press and hold the forth row button adds the element of that row to your favorites. Similar to JAWS landmark functions. Access your favorite elements of this page on your device by tapping the star button until you are in the favorites operation mode.",
    tapLongPress:
      "Tap and Press the forth row button will trigger a different function depending on the type of element. If the element is a heading, it will read back a summary of the contents inside. If the element is an image, it will read back the description, if no description is available it will generate a description using artificial intelligence. If the element is a link, it will open the url on your browser tab. If the element is a button, it will activate the button. If the element is a table or list, it will open it on the table and list exploration mode. work in progress.",
  },
  F: {},
  P: {
    tap: "Tapping the Plus button to show more elements of the page in your device. Less relevant elements like links, buttons, images and tables are not shown by default, unless you increase their visibility level with this button.  You can also double tap, press and hold or tap and press this button for more help.",
    doubleTap:
      "Double tap the Plus button to show all of the elements of the page in your device.",
    longPress:
      "Press and hold the Plus button to increase the verbosity level. A higher verbosity will include more details about each element and actions during normal, favorite and group by type opertion modes.  Similar to JAWS command INSERT V.",
    tapLongPress:
      "Tap and Press the Plus button to increase the speech rate of the text to speech engine.",
  },
  M: {
    tap: "Tapping the Minus button to show less elements of the page in your device. Less relevant elements like links, buttons, images and tables, followed by heading levels 3 and 2 can be hidden if you decrease their visibility level with this button.  You can also double tap, press and hold or tap and press this button for more help.",
    doubleTap:
      "Double tap the Minus button to hide all of the elements of the page in your device, except for headings level 1.",
    longPress:
      "Press and hold the Minus button to decrease the verbosity level. A lower verbosity will include less details about each element and actions during normal, favorite and group by type opertion modes.  Similar to JAWS command INSERT V.",
    tapLongPress:
      "Tap and Press the Minus button to decrease the speech rate of the text to speech engine.",
  },
  U: {
    tap: "Tapping the Up arrow button shows the previous group of elements if available on your device. The previous groups of elements is is higher up in the page. Use this to explore the page, then double tap an interesting element to navigate to that position. You can also double tap, press and hold or tap and press this button for more help.",
    doubleTap:
      "Double tap the Up arrow button shows the previous 5 group of elements if available on your device. Use this in long pages to quickly explore higher sections of the page. It doesnt navigate to that position, so you and your cursor keep the same position on the page.",
    longPress:
      "Press and hold the Up arrow shows  show the first group of elements on your device.",
    tapLongPress:
      "Tap and Press the Up arrow button to auto present all of the groups of elements in that page, one by one starting from the first element up to your current position on the page. The groups will be presented in your device vibrators and anounced by the application. Press any button to cancel the auto presentation. ",
  },
  D: {
    tap: "Tapping the Down arrow button shows the next group of elements if available on your device. The next groups of elements is is lower Down in the page. Use this to explore the page, then double tap an interesting element to navigate to that position. You can also double tap, press and hold or tap and press this button for more help.",
    doubleTap:
      "Double tap the Down arrow button shows the next 5 group of elements if available on your device. Use this in long pages to quickly explore lower sections of the page. It doesnt navigate to that position, so you and your cursor keep the same position on the page. To navigate to that position double tap a row button from the group you are interested in.",
    longPress:
      "Press and hold the Down arrow shows  show the last group of elements on your device.",
    tapLongPress:
      "Tap and Press the Down arrow button to auto present all of the groups of elements in that page, one by one starting from your current position on the page down to the last group of elements of the page. The groups will be presented in your device vibrators and anounced by the application. Press any button to cancel the auto presentation. ",
  },
  N: {
    tap: "Tapping the right arrow button navigates to the next element on your device. Similar to JAWS shift period, but only for those elements that are visible on your device. You can change hide and show less or more elements on your device by tapping the plus and minus buttons. You can also double tap, press and hold or tap and press this button for more help.",
    doubleTap:
      "Double tap the right arrow button navigates to the previous element on your device. Similar to JAWS shift comma, but only for those elements that are visible on your device",
    longPress:
      "Press and hold the right arrow navigates to the next element of a different type on your device. Similar to JAWS D shortcut, but only for those elements that are visible on your device. You can change hide and show less or more elements on your device by tapping the plus and minus buttons.",
    tapLongPress:
      "Tap and Press the right arrow navigates to the previous element of a different type on your device. Similar to JAWS Shift D shortcut, but only for those elements that are visible on your device. You can change hide and show less or more elements on your device by tapping the plus and minus buttons.",
  },
};
//TODO: add fr prompts
let frPrompts = enPrompts;

// 1. button logic:
// 2. nav functions (trigger tts)
// 3. display functions [auto detect scroll] (trigger settings update from hw)
// 4. extra functions

//-----------------------------------------------------------------------------------------//
//variables definition, so they can be used both in modeler and in modelinteraction.js
//#region variables
//modeler section
var verb = "1"; // 0 = low, 1= medium, 2= high
var lang = "en"; //settings
var onTabRefocus = "reset"; //settings - or "continue"
var mode = "basic"; //operation modes, basic/favorite/type -- didactique

var tabFocused = false;
var debugMDL = false;

var modeler = new Set(["H1", "H2", "H3", "A", "IMG", "SVG", "BUTTON", "INPUT"]);
var basicModel = []; //elements
var favModel = []; //elements
var typeView = {}; // {tagName:element}

//Windower section
let wIndex = 0; //start of the visible model index
let cursor = 0;

var visibleModel = [];

var level0Modeler = new Set(["H1"]);
var level1Modeler = new Set(["H1", "H2"]);
var level2Modeler = new Set(["H1", "H2", "H3"]);
var level3Modeler = new Set(["H1", "H2", "H3", "A"]);

var displayChar0 = new Set(["H1"]);
var displayChar1 = new Set(["H2"]);
var displayChar2 = new Set(["H3"]);
var displayChar3 = new Set(["A", "IMG", "SVG", "BUTTON", "INPUT"]);

var visibilityLevel = 3; //levels: 0 is h1, 1 is h2, 2 is h3, 3 is a, 4 is the plain modeler

var animating = false;
var currentAnimationFrame = 0;
var totalAnimationFrames = 0;
var groupEnede = false;
//#endregion variables
//-----------------------------------------------------------------------------------------------------------//
//1. BUTTONS
//Possible button names= '1','2','3','4' for row bottons ; 'F':star, 'P':+, 'M':-,"U":Up,'D':down,

//#region buttonlogic
//variables for the timeout logic for each button
var timer;
const timeOutValue = 400; //long press duration

var currentButton = ""; //holds value of button currently being examined
var inputGestureState = "idle";

function ComMessageReceived(msg) {
  // check the message (possible button event report or keep alive signal)
  // Keep alive signal = "a"
  // Button report event. "Bxs*"  x= button name (1,2,3,4,U,D,M,P,F), s= status (U= released or D= pressed)

  //keep alive signal
  if (msg[0] == "a") {
    //ping signal
    //if (debugMDL) console.log("MDL: ping");
    //send pong
    chrome.runtime.sendMessage({
      request: "send to device",
      data: "b*",
    });
    return;
  }
  //if (debugMDL) console.log("MDL: button event: " + msg);
  //if we received a button event, determine input gesture (through state machine)
  if (msg[0] == "B") {
    ButtonEvent(msg);

    //any button will stop the window animation
  }
}

// Button gesture detection
function ButtonEvent(msg) {
  //IDLE STATE
  if (inputGestureState == "idle") {
    //IDLE -> TorHorTTH :  button down
    if (msg[2] == "D") {
      currentButton = msg[1];
      inputGestureState = "TorHorTTH";
      //start timer
      timer = window.setTimeout(StateTimeout, timeOutValue); //create a timeout
      // if (debugMDL)
      //   console.log(
      //     "MDL: entering " +
      //       inputGestureState +
      //       " state with: " +
      //       currentButton +
      //       msg[2]
      //   );
    }
    // TorHorTTH STATE
  } else if (inputGestureState == "TorHorTTH") {
    //TorHorTTH -> TorTTH : same button up
    if (msg[2] == "U" && currentButton == msg[1]) {
      window.clearTimeout(timer); //reset timer
      timer = window.setTimeout(StateTimeout, timeOutValue); //create a timeout

      inputGestureState = "TorTTH";
      // if (debugMDL)
      //   console.log(
      //     "MDL: entering " +
      //       inputGestureState +
      //       " state with: " +
      //       currentButton +
      //       msg[2]
      //   );
    }
    //TorHorTTH -> T, then TorHorTTH : different button down
    if (msg[2] == "D" && currentButton != msg[1]) {
      window.clearTimeout(timer); //reset timer
      timer = window.setTimeout(StateTimeout, timeOutValue); //create a timeout

      inputGestureState = "TorHorTTH";
      Tap(currentButton);
      currentButton = msg[1];
      // if (debugMDL)
      //   console.log(
      //     "MDL: entering " +
      //       inputGestureState +
      //       " state with: " +
      //       currentButton +
      //       msg[2]
      //   );
    }
    //TorHorTTH -> H,idle :  timeout
    //TorTTH STATE
  } else if (inputGestureState == "TorTTH") {
    //TorTTH -> TTorTH : same button down
    if (msg[2] == "D" && currentButton == msg[1]) {
      window.clearTimeout(timer); //reset timer
      timer = window.setTimeout(StateTimeout, timeOutValue); //create a timeout

      inputGestureState = "TTorTH";
      // if (debugMDL)
      //   console.log(
      //     "MDL: entering " +
      //       inputGestureState +
      //       " state with: " +
      //       currentButton +
      //       msg[2]
      //   );
    }

    //TorTTH -> T, then TorHorTTH : different button down
    if (msg[2] == "D" && currentButton != msg[1]) {
      window.clearTimeout(timer); //reset timer
      timer = window.setTimeout(StateTimeout, timeOutValue); //create a timeout

      inputGestureState = "TorHorTTH";
      Tap(currentButton);
      currentButton = msg[1];
      // if (debugMDL)
      //   console.log(
      //     "MDL: entering " +
      //       inputGestureState +
      //       " state with: " +
      //       currentButton +
      //       msg[2]
      //   );
    }
    //TorTTH -> T, then idle :  timeout
  } else if (inputGestureState == "TTorTH") {
    //TTorTH -> TT, then idle : same button up
    if (msg[2] == "U" && currentButton == msg[1]) {
      window.clearTimeout(timer); //reset timer
      DoubleTap(currentButton);
      inputGestureState = "idle";
      currentButton = "";
      // if (debugMDL)
      //   console.log(
      //     "MDL: entering " +
      //       inputGestureState +
      //       " state with: " +
      //       currentButton +
      //       msg[2]
      //   );
    }
    //TTorTH -> TT, then TorHorTTH : different button down
    if (msg[2] == "D" && currentButton != msg[1]) {
      window.clearTimeout(timer); //reset timer
      DoubleTap(currentButton);
      timer = window.setTimeout(StateTimeout, timeOutValue); //create a timeout

      inputGestureState = "TorHorTTH";

      currentButton = msg[1];
      // if (debugMDL)
      //   console.log(
      //     "MDL: entering " +
      //       inputGestureState +
      //       " state with: " +
      //       currentButton +
      //       msg[2]
      //   );
    }
    //TTorTH -> TH, then idle :  timeout
  }
}
// Timeout for button gesture detection
function StateTimeout() {
  if (inputGestureState == "TorHorTTH") {
    //TorH -> (H) idle:  timeout
    LongPress(currentButton);
    inputGestureState = "idle";
    currentButton = ""; //clear current button
    window.clearTimeout(timer); //clear timer
  } else if (inputGestureState == "TorTTH") {
    //TorTTH -> T, then idle :  timeout
    Tap(currentButton);
    inputGestureState = "idle";
    currentButton = ""; //clear current button
    window.clearTimeout(timer); //clear timer
  } else if (inputGestureState == "TTorTH") {
    //TTorTH -> TH, then idle :  timeout
    TapLongPress(currentButton);
    inputGestureState = "idle";
    currentButton = ""; //clear current button
    window.clearTimeout(timer); //clear timer
  }
}
// Detected gestures
function Tap(button) {
  animating = false;
  if (mode == "help") {
    if (button == "F") {
      CycleOperatingMode();
    }

    Help(button, "tap");
    return;
  }
  switch (button) {
    case "1":
      TTSElement(1);
      break;

    case "2":
      TTSElement(2);
      break;

    case "3":
      TTSElement(3);
      break;

    case "4":
      TTSElement(4);
      break;

    case "F":
      CycleOperatingMode();
      break;

    case "P":
      ChangeDisplayLevel("more");
      break;

    case "M":
      ChangeDisplayLevel("less");
      break;
    case "D":
      ShowWindow(1, "next");
      break;
    case "U":
      ShowWindow(1, "previous");
      break;
    case "N":
      NavNextElement(true, "next", 1);
      break;

    default:
      break;
  }
}

function DoubleTap(button) {
  animating = false;
  if (debugMDL) console.log("MDL: double tap: " + button);
  if (mode == "help") {
    Help(button, "doubleTap");
    return;
  }
  switch (button) {
    case "1":
      Nav2element(1);
      break;

    case "2":
      Nav2element(2);
      break;

    case "3":
      Nav2element(3);
      break;

    case "4":
      Nav2element(4);
      break;

    case "F":
      mode = "help";
      chrome.runtime.sendMessage({
        request: "send to device",
        data: "0*",
      });
      let msg = { request: "sync mode", data: mode };
      // console.log("message: ", msg);
      chrome.runtime.sendMessage(msg);
      chrome.runtime.sendMessage({
        request: "tts",
        data: "entering help mode ... tap any button to learn about it or Tap the start button to exit.",
      });

      break;

    case "P":
      ChangeDisplayLevel("max");
      break;

    case "M":
      ChangeDisplayLevel("min");
      break;
    case "D":
      ShowWindow(5, "next");
      break;
    case "U":
      ShowWindow(5, "previous");
      break;
    case "N":
      NavNextElement(false, "next", 1);
      break;

    default:
      break;
  }
}

function LongPress(button) {
  animating = false;
  if (debugMDL) console.log("MDL: longpress: " + button);
  if (mode == "help") {
    Help(button, "longPress");
    return;
  }
  switch (button) {
    case "1":
      AddRemoveFavs(0);
      break;

    case "2":
      AddRemoveFavs(1);
      break;

    case "3":
      AddRemoveFavs(2);
      break;

    case "4":
      AddRemoveFavs(3);
      break;

    case "F":
      AI();
      break;

    case "P":
      ChangeVerbosity("more");
      break;

    case "M":
      ChangeVerbosity("less");
      break;
    case "U":
      ShowWindow(1, "first");
      break;
    case "D":
      ShowWindow(1, "last");
      break;
    case "N":
      NavNextElement(true, "previous", 1);
      break;

    default:
      break;
  }
}
function TapLongPress(button) {
  animating = false;
  if (debugMDL) console.log("MDL: tap longpress: " + button);
  if (mode == "help") {
    Help(button, "tapLongPress");
    return;
  }
  switch (button) {
    case "1":
      elementExtraF(1);
      break;

    case "2":
      elementExtraF(2);

      break;

    case "3":
      elementExtraF(3);

      break;

    case "4":
      elementExtraF(4);

      break;

    case "F":
      extraF();
      break;

    case "P":
      // increase speech rate

      // console.log("message: ", msg);
      chrome.runtime.sendMessage({
        request: "change speech rate",
        direction: "more",
      });
      break;

    case "M":
      //decrease speech rate
      chrome.runtime.sendMessage({
        request: "change speech rate",
        direction: "less",
      });
      break;
    case "U":
      StartWindowAnimation("upto");
      break;
    case "D":
      StartWindowAnimation("from");

      break;
    case "N":
      NavNextElement(false, "previous", 1);
      break;

    default:
      break;
  }
}

//#endregion
//---------------------
// HELP MODE

function Help(button, inputGesture) {
  console.log(inputGesture + " the following button: " + button);

  let msg = { request: "tts", data: help[button][inputGesture] };
  // console.log("message: ", msg);
  chrome.runtime.sendMessage(msg);
}

//-----------------------------------------------------------------------------------------------------------//
//2. navFunctions

//#region navFunctions

function TTSElement(button) {
  /*console.log(
    "TTS element " + button + " according to settings: verbosity and language ",
    verb,
    lang
  );*/

  if (wIndex + button > visibleModel.length) {
    //if we have gone past the last element
    console.log("Button " + button + " out of bounds, cant voice");
    return;
  }

  if (visibleModel[wIndex + button - 1] >= 0) {
    //regular element
    let element = basicModel[visibleModel[wIndex + button - 1]];
    // console.log(element);

    //voice according to element tag - verbosity level and language
    let msg = { request: "tts", data: ElementToVoice(element), lang: lang };
    // console.log("message: ", msg);
    chrome.runtime.sendMessage(msg);
  } else {
    //grouptype element -1
    let childElement = basicModel[visibleModel[wIndex + button]]; //next element (button is not 0 based)
    //console.log("child element, wIndex, button", childElement, wIndex, button);
    //voice according to element tag - verbosity level and language
    let msg = {
      request: "tts",
      data:
        "group of " +
        typeView[ElementEquivalence(childElement)].length +
        FeedBackToVoice(ElementEquivalence(childElement)),
      lang: lang,
    };
    // console.log("message: ", msg);
    chrome.runtime.sendMessage(msg);
  }
}

function WindowToVoice(window) {
  let windowString = "";
  //get each element to be voiced, (animated window starting index)
  for (
    let index = 0;
    index + window * 4 < visibleModel.length && index < 4;
    index++
  ) {
    if (visibleModel[window * 4 + index] >= 0) {
      //regular element
      const element = basicModel[visibleModel[index + window * 4]];
      windowString += ElementToVoice(element) + "... ";
    } else {
      //group type element -1

      let childElement = basicModel[visibleModel[index + 1 + window * 4]]; //next element (button is not 0 based)
      //voice according to element tag - verbosity level and language
      // console.log(
      //   "visiblemodel[n], n, index, window, child element",
      //   visibleModel[index + 1 + window * 4],
      //   index + 1 + window * 4,
      //   index,
      //   window,
      //   childElement
      // );
      windowString +=
        "group of " +
        typeView[ElementEquivalence(childElement)].length +
        FeedBackToVoice(ElementEquivalence(childElement)) +
        "...";
    }
  }
  //get the 4 elements to voice, and return a string contianing the voicing of each one of them.
  return windowString;
}
function ElementToVoice(element) {
  //check each element and return the appropiate voice string representation accoridng to verbosity level ---language doesnt change the content of the element
  let eq = ElementEquivalence(element);
  let elementString = "";
  //TODO: implement multiple verbosity levels
  //voice according to equivalent element
  if (eq == "H1" || eq == "H2" || eq == "H3") {
    if (verb >= "0") {
      //low
      elementString += element.textContent;
    }

    // if (verb >="1") { //medium add more info
    //   elementString += ((element.getAttribute('model-index')/(basicModel.length-1)*100) + FeedBackToVoice("percent");
    // }

    // if (verb >="2") { // high add more info ..etc
    // }

    // if (verb == "3") {// didactic add more info ..etc
    // }
  } else {
    switch (eq) {
      case "BUTTON":
        if (verb >= "0") {
          //low
          if (
            element.getAttribute("aria-label") != "undefined" &&
            element.getAttribute("aria-label") != null
          ) {
            elementString += element.getAttribute("aria-label");
          } else {
            elementString += element.textContent;
          }
        }
        break;
      case "IMG":
        if (
          element.getAttribute("alt") != "undefined" &&
          element.getAttribute("alt") != null
        ) {
          if (element.getAttribute("alt") == "") {
            elementString += " without label";
          } else {
            elementString += element.getAttribute("alt");
          }
        }
        break;
      case "A":
        if (
          element.getAttribute("aria-label") != "undefined" &&
          element.getAttribute("aria-label") != null
        ) {
          elementString += element.getAttribute("aria-label");
        } else if (
          element.getAttribute("title") != "undefined" &&
          element.getAttribute("title") != null
        ) {
          elementString += element.getAttribute("title");
          // } else if (
          //   element.textContent != "undefined" &&
          //   element.textContent != null
          // ) {
          //  elementString += element.textContent;
        } else if (
          element.getAttribute("alt") != "undefined" &&
          element.getAttribute("alt") != null
        ) {
          elementString += element.getAttribute("alt");
          // } else if (
          //   element.textContent != "undefined" &&
          //   element.textContent != null
          // ) {
          //  elementString += element.textContent;
        } else if (
          element.textContent != "undefined" &&
          element.textContent != null
        ) {
          elementString += element.textContent;
          // } else if (
          //   element.textContent != "undefined" &&
          //   element.textContent != null
          // ) {
          //  elementString += element.textContent;
        } else {
          elementString += "no description";
          //elementString += element.getAttribute("href");
        }
        break;
      case "INPUT":
        if (
          element.getAttribute("aria-label") != "undefined" &&
          element.getAttribute("aria-label") != null
        ) {
          elementString += element.getAttribute("aria-label");
        } else {
          elementString += element.type + " " + element.textContent;
        }
        break;

      default:
        break;
    }
  }

  // add prompt (from type of element) then add element content
  return FeedBackToVoice(eq) + " " + elementString;
}
function FeedBackToVoice(prompt) {
  //TODO: turn to diccionary
  //check each type of audio feedback prompt to be given to the user and return ropiate voice string representation accoridng to verbosity level and language
  //load prompt dictionary
  //console.log(verb, lang);
  if (lang == "en") {
    prompt = enPrompts[prompt][verb]; //set according to verbosity
  }
  if (lang == "fr") {
    prompt = frPrompts[prompt][verb]; //set according to verbosity
  }

  return prompt;
}
function Nav2element(button) {
  // console.log("navigating to element in row: ", button);
  if (wIndex + button > visibleModel.length) {
    //if we have gone past the last element
    console.log("Button " + button + " out of bounds, cant navigate");
    let msg = { request: "tts", data: "no element to navigate", lang: lang };
    chrome.runtime.sendMessage(msg);
    return;
  }

  if (visibleModel[wIndex + button - 1] > 0) {
    //not a group type from typeview
    ScrollToElement(visibleModel[wIndex + button - 1]);
    // chrome.runtime.sendMessage({
    //   request: "tts",
    //   data: "going to element in row " + button,
    //   lang: "en",
    // });
  }
}

function ScrollToElement(elementIndex) {
  let element = basicModel[elementIndex];

  element.focus();
  element.scrollIntoView();
}

function NavNextElement(sameType = true, direction = "next", offset = 1) {
  //1-10
  //next previous
  let cursorType = basicModel[cursor].tagName;
  if (cursorType == "SVG") cursorType = "IMG";
  //cursor should be somewhere in the window, right? wrong... we could've moved the window to explore but now just want to jump to different elements
  //so find the index of visible model that contains cursor and move in the appropiate direction

  let visibleCursor = VisibleModelIndexOfCursor();
  //TODO: other modeling equivalences, for buttons, inputs, etc.
  let foundElement = false;

  if (sameType) {
    //NAVIGATE SAME ELEMENT
    //DISBLE SAME TYPE JUST NAVIGATE TO NEXT
    // console.log(
    //   direction +
    //     offset +
    //     " " +
    //     " element of same type. With cursor type= " +
    //     cursorType +
    //     " visible model points to: " +
    //     visibleModel[visibleCursor] +
    //     " while cursor points to " +
    //     cursor,
    //   "visible model element: ",
    //   basicModel[visibleModel[visibleCursor]],
    //   " basic model element from cursor: ",
    //   basicModel[cursor]
    // );

    switch (direction) {
      case "next":
        //traverse visible model [starting from visibleCursor in the direction of direction] to find the basic model element that is of the same element as the cursor

        /*for (
          let index = visibleCursor + 1;
          index < visibleModel.length;
          index++
        ) {
          //going up starting from visible cursor
          const element = basicModel[visibleModel[index]]; //the basic model element that we are pointing right now according to the visible model
          let newElementType = element.tagName;
          if (newElementType == "SVG") newElementType = "IMG"; //TODO: MAKE A FUNCTION FOR CALCULATING EQUIVALENCES other equivalent elements

          if (newElementType == cursorType || true) {
            //disble 'same type' just move to the next element
            //elements are same
            foundElement = true;
            //scroll to element
            chrome.runtime.sendMessage({
              request: "tts",
              data: "next element ", //of same type",
              lang: lang,
            });

            ScrollToElement(visibleModel[index]);

            console.log(
              "found " + direction + " element: ",
              visibleModel[index]
            );

            break;
          }
        }

        if (!foundElement) {
          //did not find another element, alert user, dont scroll
          chrome.runtime.sendMessage({
            request: "tts",
            data: "no other elements ", //of the same type",
            lang: lang,
          });
        }*/

        if (visibleCursor + 1 < visibleModel.length) {
          chrome.runtime.sendMessage({
            request: "tts",
            data: "", //of same type",
            lang: lang,
          });
          ScrollToElement(visibleCursor + 1);
        } else {
          //did not find another element, alert user, dont scroll
          chrome.runtime.sendMessage({
            request: "tts",
            data: "no other elements ", //of the same type",
            lang: lang,
          });
        }
        break;
      case "previous":
        //traverse visible model [starting from visibleCursor in the direction of direction] to find the basic model element that is of the same element as the cursor

        for (let index = visibleCursor - 1; index >= 0; index--) {
          //going down starting from visible cursor
          const element = basicModel[visibleModel[index]]; //the basic model element that we are pointing right now according to the visible model
          let newElementType = element.tagName;
          if (newElementType == "SVG") newElementType = "IMG"; //TODO: MAKE A FUNCTION FOR CALCULATING EQUIVALENCES other equivalent elements
          if (newElementType == cursorType || true) {
            //disble prev same type, just previous element is ok
            foundElement = true;
            //scroll to element
            chrome.runtime.sendMessage({
              request: "tts",
              data: " ", //of same type",
              lang: lang,
            });

            ScrollToElement(visibleModel[index]);
            break;
          }
        }

        if (!foundElement) {
          //did not find another element, alert user, dont scroll
          chrome.runtime.sendMessage({
            request: "tts",
            data: "no other previous elements ", //of the same type",
            lang: lang,
          });
        }

        break;
      case "first":
        //traverse all the visible model looking for elements with the same type, starting from the start going up
        for (let index = 0; index < visibleModel.length; index++) {
          const element = basicModel[visibleModel[index]]; //the basic model element that we are pointing right now according to the visible model
          let newElementType = element.tagName;
          if (newElementType == "SVG") newElementType = "IMG"; //TODO: MAKE A FUNCTION FOR CALCULATING EQUIVALENCES other equivalent elements
          if (newElementType == cursorType) {
            // foundElement = true;
            //scroll to element
            chrome.runtime.sendMessage({
              request: "tts",
              data: "first element of same type",
              lang: lang,
            });

            ScrollToElement(visibleModel[index]);
            break;
          }
        }

        break;
      case "last":
        //traverse all the visible model looking for elements with the same type, starting from the end going down
        for (let index = visibleModel.length; index >= 0; index--) {
          const element = basicModel[visibleModel[index]]; //the basic model element that we are pointing right now according to the visible model
          let newElementType = element.tagName;
          if (newElementType == "SVG") newElementType = "IMG"; //TODO: MAKE A FUNCTION FOR CALCULATING EQUIVALENCES other equivalent elements
          if (newElementType == cursorType) {
            // foundElement = true;
            //scroll to element
            chrome.runtime.sendMessage({
              request: "tts",
              data: "last element of same type",
              lang: lang,
            });

            ScrollToElement(visibleModel[index]);
            break;
          }
        }
        break;
      default:
        break;
    }
  } else {
    // Navigate to different element
    console.log(
      direction +
        offset +
        " " +
        "element of different type. With cursor type= " +
        cursorType +
        " visible model points to: " +
        visibleModel[visibleCursor] +
        " while cursor points to " +
        cursor,
      "visible model element: ",
      basicModel[visibleModel[visibleCursor]],
      " basic model element from cursor: ",
      basicModel[cursor]
    );

    switch (direction) {
      case "next":
        //traverse visible model [starting from visibleCursor in the direction of direction] to find the basic model element that is of the same element as the cursor

        for (
          let index = visibleCursor + 1;
          index < visibleModel.length;
          index++
        ) {
          //going up starting from visible cursor
          const element = basicModel[visibleModel[index]]; //the basic model element that we are pointing right now according to the visible model
          let newElementType = element.tagName;
          if (newElementType == "SVG") newElementType = "IMG"; //TODO: MAKE A FUNCTION FOR CALCULATING EQUIVALENCES other equivalent elements

          if (newElementType != cursorType) {
            //elements are same
            foundElement = true;
            //scroll to element
            chrome.runtime.sendMessage({
              request: "tts",
              data: "",
              lang: lang,
            });

            ScrollToElement(visibleModel[index]);

            console.log(
              "found " + direction + " element: ",
              visibleModel[index]
            );

            break;
          }
        }

        if (!foundElement) {
          //did not find another element, alert user, dont scroll
          chrome.runtime.sendMessage({
            request: "tts",
            data: "no other elements of different type",
            lang: lang,
          });
        }
        break;
      case "previous":
        //traverse visible model [starting from visibleCursor in the direction of direction] to find the basic model element that is of the same element as the cursor

        for (let index = visibleCursor - 1; index >= 0; index--) {
          //going down starting from visible cursor
          const element = basicModel[visibleModel[index]]; //the basic model element that we are pointing right now according to the visible model
          let newElementType = element.tagName;
          if (newElementType == "SVG") newElementType = "IMG"; //TODO: MAKE A FUNCTION FOR CALCULATING EQUIVALENCES other equivalent elements
          if (newElementType != cursorType) {
            foundElement = true;
            //scroll to element
            chrome.runtime.sendMessage({
              request: "tts",
              data: "",
              lang: lang,
            });

            ScrollToElement(visibleModel[index]);
            break;
          }
        }

        if (!foundElement) {
          //did not find another element, alert user, dont scroll
          chrome.runtime.sendMessage({
            request: "tts",
            data: "no other previous elements of the different type",
            lang: lang,
          });
        }

        break;
      case "first":
        //traverse all the visible model looking for elements with the same type, starting from the start going up
        for (let index = 0; index < visibleModel.length; index++) {
          const element = basicModel[visibleModel[index]]; //the basic model element that we are pointing right now according to the visible model
          let newElementType = element.tagName;
          if (newElementType == "SVG") newElementType = "IMG"; //TODO: MAKE A FUNCTION FOR CALCULATING EQUIVALENCES other equivalent elements
          if (newElementType != cursorType) {
            // foundElement = true;
            //scroll to element
            chrome.runtime.sendMessage({
              request: "tts",
              data: "first element of different type",
              lang: lang,
            });

            ScrollToElement(visibleModel[index]);
            break;
          }
        }

        break;
      case "last":
        //traverse all the visible model looking for elements with the same type, starting from the end going down
        for (let index = visibleModel.length; index >= 0; index--) {
          const element = basicModel[visibleModel[index]]; //the basic model element that we are pointing right now according to the visible model
          let newElementType = element.tagName;
          if (newElementType == "SVG") newElementType = "IMG"; //TODO: MAKE A FUNCTION FOR CALCULATING EQUIVALENCES other equivalent elements
          if (newElementType != cursorType) {
            // foundElement = true;
            //scroll to element
            chrome.runtime.sendMessage({
              request: "tts",
              data: "last element of different type",
              lang: lang,
            });

            ScrollToElement(visibleModel[index]);
            break;
          }
        }
        break;
      default:
        break;
    }
  }

  // if (wIndex + button > visibleModel.length) {
  //   //if we have gone past the last element
  //   console.log("Out of bounds, cant voice");
  //   let msg = { request: "tts", data: "no more elements", lang: lang };
  //   return;
  // }

  // let element = basicModel[visibleModel[wIndex + button - 1]];

  // element.focus();
  // element.scrollIntoView();

  //Going to the next different element by offset3
}

function TriggerExplorationMode(button) {
  console.log("triggering exploration mode by the following button: " + button);
  //not in MVP
}

//#endregion

//-----------------------------------------------------------------------------------------------------------//
//3. display functions - functions that require remodeling or directly updating visible model / change operation mode or verbosity

//#region displayFunctions
function AddRemoveFavs(button) {
  // console.log("favmodel, visible model", favModel, visibleModel);

  if (mode == "favorite") {
    //remove selected element from fav view
    // console.log("REMOVING element having this windex: " + wIndex);
    // console.log("removing element to favorites", button);
    if (wIndex + button > visibleModel.length) {
      //if we have gone past the last element
      console.log("Out of bounds, cant add to favorites");
      let msg = { request: "tts", data: "element out of bounds", lang: lang };

      chrome.runtime.sendMessage(msg);
      return;
    } else {
      let i = favModel.indexOf(visibleModel[wIndex + button]);

      if (i >= 0) {
        //found element
        favModel.splice(i, 1); //remove 1 element
        // console.log("favorites: ", favModel);
        let msg = { request: "tts", data: "favorite removed", lang: lang };
        chrome.runtime.sendMessage(msg);
        SaveFavorites();
        RefreshVisibleModel();
        RefreshWindow();
      } else {
        // console.log(
        //   "fav not found, index, favmodel, windex,button , visiblemodel[button+windex]",
        //   i,
        //   favModel,
        //   button,
        //   wIndex,
        //   visibleModel[button + wIndex]
        // );
      }
    }
  } else {
    //get element and insert it in the proper place in the favModel
    // console.log(
    //   "Adding element to favorites, button, element index",
    //   button,
    //   visibleModel[button + wIndex]
    // );

    //
    if (wIndex + button > visibleModel.length) {
      //if we have gone past the last element
      console.log("Out of bounds, cant add to favorites");
      let msg = { request: "tts", data: "element out of bounds", lang: lang };

      chrome.runtime.sendMessage(msg);
      return;
    } else {
      // console.log(
      //   "adding element pointed by visible model to to favs: ",
      //   visibleModel[wIndex + button] + " , " + button
      // );

      if (visibleModel[wIndex + button] >= 0) {
        //not a group name
        if (!favModel.includes(visibleModel[wIndex + button])) {
          favModel.push(visibleModel[wIndex + button]);
          favModel.sort();
          // console.log("favorites: ", favModel);
          let msg = {
            request: "tts",
            data: "saving new favorite ",
            lang: lang,
          };
          chrome.runtime.sendMessage(msg);
        } else {
          let msg = {
            request: "tts",
            data: "element already in favorites ",
            lang: lang,
          };
          chrome.runtime.sendMessage(msg);
        }

        //then save the favModel
        SaveFavorites();
      } else {
        console.log("cant save a group to favorites");
      }
    }
  }
}

function ShowWindow(offset = 1, direction = "next") {
  //direction= next, previous, first, last
  console.log(
    "showing the " +
      direction +
      "  " +
      offset +
      " window(s) from wIndex: " +
      wIndex
  );

  //depending on direction move the window index

  switch (direction) {
    case "next":
      //if you can add the windows no problem, just do it, otherwise, alert
      if (wIndex + 4 * offset < visibleModel.length) {
        //can add
        wIndex += 4 * offset;
        //   var triggerWindow = Math.floor(wIndex / 4); //get the current window, which will be the one that triggered the animatino
        chrome.runtime.sendMessage({
          request: "tts",
          data:
            "group " +
            (Math.floor(wIndex / 4) + 1) +
            " of " +
            (1 + Math.floor(visibleModel.length / 4)),
          lang: lang,
        });
      } else {
        chrome.runtime.sendMessage({
          request: "tts",
          data: "cant advance " + offset + "group",
          lang: lang,
        });
      }

      break;
    case "previous":
      //if you can remove the groups no problem, just do it, otherwise, alert
      if (wIndex - 4 * offset >= 0) {
        //can add
        wIndex -= 4 * offset;
        chrome.runtime.sendMessage({
          request: "tts",
          data:
            "group " +
            (Math.floor(wIndex / 4) + 1) +
            " of " +
            (1 + Math.floor(visibleModel.length / 4)),
          lang: lang,
        });
      } else {
        chrome.runtime.sendMessage({
          request: "tts",
          data: "cant return " + offset + "group",
          lang: lang,
        });
      }
      break;
    case "first":
      if (wIndex > 0) {
        wIndex = 0;
        chrome.runtime.sendMessage({
          request: "tts",
          data: "showing first group",
          lang: lang,
        });
      } else {
        chrome.runtime.sendMessage({
          request: "tts",
          data: "already at the top of the page",
          lang: lang,
        });
      }
      break;
    case "last":
      if (wIndex < visibleModel.length - 5) {
        wIndex = visibleModel.length - 5;
        chrome.runtime.sendMessage({
          request: "tts",
          data: "showing last",
          lang: lang,
        });
      } else {
        chrome.runtime.sendMessage({
          request: "tts",
          data: "already at the bottom of the page",
          lang: lang,
        });
      }
      break;
    default:
      return;
  }

  ///  console.log("to group of wIndex: " + wIndex);
  //refresh window
  RefreshWindow();
}

function TTSEnded() {
  console.log("animating + groupeneded " + animating, groupEnede);
  if (animating && groupEnede) {
    console.log("next animation frame");
    groupEnede = false;
    NextAnimationFrame();
  }
}

function NextAnimationFrame() {
  //upto
  //check if we can continue animation
  if (totalAnimationFrames >= 0) {
    //continue animation

    console.log(
      " animating frame " +
        (currentAnimationFrame + 1) +
        " of " +
        (totalAnimationFrames + 1 + currentAnimationFrame)
    );
    chrome.runtime.sendMessage({
      request: "tts",
      data:
        "group" +
        (currentAnimationFrame + 1).toString() +
        "of" +
        (totalAnimationFrames + currentAnimationFrame + 1) +
        " ... " +
        WindowToVoice(currentAnimationFrame), //window of visible model to be voiced
      lang: lang,
    });
    currentAnimationFrame++;
    totalAnimationFrames--;
    groupEnede = true;
  } else {
    console.log("animation completed");
    animating = false;
    chrome.runtime.sendMessage({
      request: "tts",
      data: "animation completed",
      lang: lang,
    });
  }
}

function StartWindowAnimation(direction = "from") {
  //direction = "from"

  var triggerWindow = Math.floor(wIndex / 4); //get the current window, which will be the one that triggered the animatino
  var totalWindows = totalAnimationFrames;
  totalWindows = Math.floor(visibleModel.length / 4); // get total number of windows

  if (visibleModel.length % 4 > 0) {
    //if there is some reminder
    totalWindows++;
  }
  totalWindows -= 1; //0based index of frames

  console.log(
    "presenting windows  " +
      direction +
      "current window. total windows to animate: " +
      totalWindows
  );

  if (totalWindows < 0) {
    chrome.runtime.sendMessage({
      request: "tts",
      data: "no visible groups to animate",
      lang: lang,
    });
    return;
  }

  if (direction == "upto") {
    chrome.runtime.sendMessage({
      request: "tts",
      data:
        "showing groups up to " +
        (currentAnimationFrame + 1).toString() +
        " of " +
        (totalAnimationFrames + 1),
      lang: lang,
    });
    currentAnimationFrame = 0;
    totalAnimationFrames = triggerWindow; //  0 upto trigger window
  } else {
    //from current window to end

    chrome.runtime.sendMessage({
      request: "tts",
      data:
        "showing groups from " +
        (currentAnimationFrame + 1).toString() +
        " to " +
        (totalAnimationFrames + 1),
      lang: lang,
    });
    currentAnimationFrame = triggerWindow;
    totalAnimationFrames = totalWindows - triggerWindow; //final window from trigger window
  }

  NextAnimationFrame();
  animating = true;
}

function ChangeDisplayLevel(direction = "more") {
  //more, less, max, min
  // console.log(
  //   "Updating display window to show" +
  //     direction +
  //     "types of elements on window."
  // );
  let oldVisibilty = visibilityLevel;
  //change visibility level 0-4
  switch (direction) {
    case "more":
      if (visibilityLevel <= 3) {
        visibilityLevel++;
        chrome.runtime.sendMessage({
          request: "tts",
          data: "visibility level " + visibilityLevel,
          lang: lang,
        });
      } else {
        chrome.runtime.sendMessage({
          request: "tts",
          data: "cant increase visibility level anymore ",
          lang: lang,
        });
      }
      break;
    case "less":
      if (visibilityLevel >= 1) {
        visibilityLevel--;
        chrome.runtime.sendMessage({
          request: "tts",
          data: "visibility level " + visibilityLevel,
          lang: lang,
        });
      } else {
        chrome.runtime.sendMessage({
          request: "tts",
          data: "cant decrease visibility level anymore ",
          lang: lang,
        });
      }
      break;
    case "min":
      if (visibilityLevel > 0) {
        visibilityLevel = 0;
        chrome.runtime.sendMessage({
          request: "tts",
          data: "lowest visibility level",
          lang: lang,
        });
      } else {
        chrome.runtime.sendMessage({
          request: "tts",
          data: "already at minimum visibility level ",
          lang: lang,
        });
      }
      break;
    case "max":
      if (visibilityLevel < 4) {
        visibilityLevel = 4;
        chrome.runtime.sendMessage({
          request: "tts",
          data: "highest visibility level",
          lang: lang,
        });
      } else {
        chrome.runtime.sendMessage({
          request: "tts",
          data: "already at maximum visibility level ",
          lang: lang,
        });
      }
      break;

    default:
      break;
  }
  // console.log(
  //   "oldvisibility, new visibility = ",
  //   oldVisibilty + " , " + visibilityLevel
  // );
  console.log("visibility level: " + visibilityLevel);
  if (oldVisibilty != visibilityLevel) {
    //refresh visible model

    RefreshVisibleModel();

    //refresh cursor\
    let vmc = VisibleModelIndexOfCursor();
    if (visibleModel[vmc] > 0) {
      //not a type group
      cursor = visibleModel[vmc]; //get a new cursor & scroll to visible element

      ScrollToElement(visibleModel[vmc]);
      //refresh window
    }
    RefreshWindow();
    // console.log("visibility level: "+ visibilityLevel);
  }
}

function ChangeVerbosity(direction = "more") {
  //more, less

  if (direction == "more") {
    if (verb == "0") {
      verb = "1";
      SaveVerbosity();
      chrome.runtime.sendMessage({
        request: "tts",
        data: "verbosity increased to medium",
        lang: lang,
      });
    } else if (verb == "1") {
      verb = "2";
      SaveVerbosity();
      chrome.runtime.sendMessage({
        request: "tts",
        data: "verbosity increased to high",
        lang: lang,
      });
    } else if (verb == "2") {
      chrome.runtime.sendMessage({
        request: "tts",
        data: "cant increase verbosity anymore",
        lang: lang,
      });
    }
    // if (verb == "2") {
    //   chrome.runtime.sendMessage({
    //     request: "tts",
    //     data: "verbosity increased to didactic",
    //     lang: lang,
    //   });
    // }
    // if (verb == "3") {
    //   chrome.runtime.sendMessage({
    //     request: "tts",
    //     data: "cant increase verbosity anymore",
    //     lang: lang,
    //   });
    // }
  } else {
    if (verb == "0") {
      //already at highest verbosity
      chrome.runtime.sendMessage({
        request: "tts",
        data: "cant decrease verbosity anymore",
        lang: lang,
      });
    } else if (verb == "1") {
      verb = "0";
      SaveVerbosity();
      chrome.runtime.sendMessage({
        request: "tts",
        data: "verbosity decreased to low",
        lang: lang,
      });
    } else if (verb == "2") {
      verb = "1";
      SaveVerbosity();
      chrome.runtime.sendMessage({
        request: "tts",
        data: "verbosity decreased to medium",
        lang: lang,
      });
    }
    // if (verb == "3") {
    //   verb = "2";
    //   SaveVerbosity();
    //   chrome.runtime.sendMessage({
    //     request: "tts",
    //     data: "verbosity decreased to high",
    //     lang: lang,
    //   });
    // }
  }
}

function SaveVerbosity() {
  chrome.storage.sync.set(
    {
      verbosity: verb,
    },
    function () {
      chrome.runtime.sendMessage({
        request: "update settings",
        trigger: "hardware",
      });
    }
  );
}

function CycleOperatingMode() {
  //operating mode change - basic/favorite/type
  console.log(mode);
  if (mode == "basic") {
    mode = "favorite";
    chrome.runtime.sendMessage({
      request: "tts",
      data: "showing favorites only",
    });
  } else if (mode == "favorite") {
    mode = "type";
    chrome.runtime.sendMessage({ request: "tts", data: "grouping by type" });
  } else if (mode == "type" || mode == "help") {
    mode = "basic";
    chrome.runtime.sendMessage({
      request: "tts",
      data: "normal operation mode",
    });
  }

  //propagate operation mode
  //sync mode
  let msg = { request: "sync mode", data: mode };
  // console.log("message: ", msg);
  chrome.runtime.sendMessage(msg);

  console.log("cycling operating mode to: " + mode);

  RefreshVisibleModel();
  RefreshWindow();
}

//DETECT CHANGE OF FOCUS
//https://stackoverflow.com/questions/24644345/how-to-detect-focus-changed-event-in-js
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
//https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
//https://stackoverflow.com/questions/10035564/is-there-a-cross-browser-solution-for-monitoring-when-the-document-activeelement

document.addEventListener("focusin", () => {
  //TODO: query selectors? https://developer.mozilla.org/en-US/docs/Web/API/Element/closest add selectors instead of attributes to model?

  //stop animations on change of focus
  //animating = false;

  //console.log("focus changed", document.activeElement);

  let oldCursor = cursor;
  let element = document.activeElement;

  if (element.hasAttribute("model-index")) {
    //element in model, update cursor with its model index
    cursor = element.getAttribute("model-index");
  } else {
    //like some links/buttons in wikipedia are nested inside spans and are not returned by 'getElementsWithTag(*)' (because they dont have a tag?)
    //so check their parent/siblings nodes iteratively until you find a model index/closest model index - otherwise dont change the cursor
    let searchingIndex = true;
    let tempElement = element;

    //check siblings & check parents
    //while there are still parents and you havent finished your search,
    while (tempElement && searchingIndex) {
      sibling = tempElement; //first sibling is the temp element
      //console.log("sibling" + sibling.previousElementSibling);

      //check siblings of temp element
      while (sibling.previousElementSibling != null && searchingIndex) {
        //while there is a previous sibling
        sibling = sibling.previousElementSibling;
        if (sibling.hasAttribute("model-index")) {
          //sibling in model, update cursor with its model index
          cursor = sibling.getAttribute("model-index");
          //console.log("found sibling in model: ", sibling);
          searchingIndex = false;
        }
      }

      //check parent of temp element, if null, break;
      if (tempElement.parentElement != null) {
        tempElement = tempElement.parentElement;
        if (tempElement.hasAttribute("model-index")) {
          //tempElement in model, update cursor with its model index
          cursor = tempElement.getAttribute("model-index");
          //console.log("found parent in model : ", tempElement);
          searchingIndex = false;
        }
      } else {
        searchingIndex = false;
        console.log("sibling or parent with model index not found!");
      }
    }
  }
  //console.log(cursor);

  if (cursor != oldCursor) {
    //cursor changed, autoscroll please
    console.log("autoscrolling to new position ", cursor);
    AutoScrollWindow();
  }
});

// AUTOSCROLL CURSOR

function AutoScrollWindow() {
  //set wIndex as the index to the visiblemodel value that is closest but lower than the cursors value

  for (let tIndex = 0; tIndex < visibleModel.length; tIndex++) {
    //go through every visible model element and find the closest
    //TODO: optimize search?

    if (visibleModel[tIndex] <= cursor) {
      wIndex = tIndex; // save preliminary answer
    } else {
      break;
    }
  }

  //TODO: when the element is on the last window, dont let it start the wIndex, scroll back wIndex so that there are more elements in view on top.
  //on the last window, place the element at the end end of the window, not the start...

  RefreshWindow();
}

function VisibleModelIndexOfCursor() {
  //returns the closest element index of the visible model to that of the cursor.
  let vmc = 0;
  for (let tIndex = 0; tIndex < visibleModel.length; tIndex++) {
    //go through every visible model element and find the closest value to the cursor
    //TODO: optimize search?
    if (visibleModel[tIndex] <= cursor) {
      vmc = tIndex; // save preliminary answer
    } else {
      break;
    }
  }

  return vmc;
}
//#endregion
//-----------------------------------------------------------------------------------------------------------//
//3. extra functions

//#region extraFunctions

function AI() {
  console.log("ai in general: ");
  // reformat page with AI
  // summary from AI sections?
  // question/answer from NLP
}
function extraF() {
  console.log("extra function 2: ");
  // reformat page with AI
  // summary from AI sections?
  // question/answer from NLP
}
function elementExtraF(element) {
  console.log("extra function 2: ", element);

  //TODO: element dependant function
  // access semantic web/ web annotation servers
  // links: follow link -
  // img: get ai image description?, download?
  // btn: activate button
  // table: open table view
  // list: open list view
  // heading: metadata of content, summary of content?
}

//#endregion
