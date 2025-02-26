// 1 Model webpage
// 2 save & restore favs & settings
// 3 listen for message.commands: "update settings", "trigger remodeling", "update visibility", "update mode", "receive from device"
// send the following message.request: n/a

// On page load, model page and load favorites
ModelPageDOM();

//if document loaded while tab had focus
if (!document.hidden) {
  // start navigation
  wIndex = 0;
  // if (mode == "favorite") {
  //   RestoreFavs(); // refresh visible mode called if you are in mode favorite
  // }
  RefreshVisibleModel();
  RefreshWindow();
  RestoreFavs();

  // console.log("STARTiNG NAV on page LOAD!, because I have focus!");
  // StartWindowAnimation("from");
}

//-----------------------------------------------------------------------------------------------------------//
//1 MODEL
//#region model

function ModelPageDOM() {
  //TODO: improve modeling pipeline
  //prepare typeview dictionary
  modeler.forEach((type) => {
    typeView[type] = [];
  });

  // get all elements of page
  var domElem = document.getElementsByTagName("*");

  // Traverse the dom, and add appropiate elements to model
  Array.from(domElem).forEach((element) => {
    //element will be added to model
    if (modeler.has(element.tagName)) {
      //TODO: aria hidden = true, then skip element

      if (element.ariaHidden == "true") {
        // console.log(element);
        // continue //to skip modeling
      }

      let eq = ElementEquivalence(element);

      if (eq != "NONE") {
        //save element to models
        element.setAttribute("model-index", basicModel.length);
        basicModel.push(element);
        typeView[eq].push(basicModel.length - 1); //push to the equivalent list in dictionary

        //TODO: should tabindex be 0? how does jaws and tab react to change in tab indexes?
        // https://webaim.org/techniques/keyboard/tabindex

        //provide tab index only to those elements in my model that are not programatically focusble (like some hs)
        let tabindex = element.getAttribute("tabindex");
        if (tabindex == null) {
          // console.log(
          //   element.tagName + " old tab index: ",
          //   element.getAttribute("tabindex")
          // );
          element.setAttribute("tabindex", "-1"); //make element focusable by extension
          // console.log(
          //   element.tagName + " new tab index: ",
          //   element.getAttribute("tabindex")
          // );
          // console.log(element);
        }
      }
    }
  });

  //delete any typeview key with no values
  for (const [key, value] of Object.entries(typeView)) {
    if (value.length < 1) {
      //delete null value
      //console.log("deleting empty group");
      delete typeView[key];
    }
  }

  // console.log(
  //   basicModel[0],
  //   basicModel[0].hasAttribute("model-index"),
  //   basicModel[0].getAttribute("model-index")
  // );
  // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  console.log(typeView);
  //console.log(basicModel);
}

function ElementEquivalence(element) {
  //this function takes an html element from the DOM and determines its equivalence within the model elements.
  //i.e. takes a link or input that has the role of a button, and returns ["BUTTON"] or "NONE" if not found equivalence

  let equivalence = "NONE";
  //console.log(element);

  if (element.getAttribute("aria-hidden") == "true") {
    //console.log("element hidden: " + element.getAttribute("aria-hidden"));
    return "NONE"; //dont consider hidden elements
  }

  //check equivalence
  //
  //check equivalence to each one of the elements on modeler
  // ["H1", "H2", "H3", "A", "IMG", "SVG", "BUTTON", "INPUT"]

  switch (element.tagName) {
    case "H1":
      equivalence = "H1";
      break;
    case "H2":
      equivalence = "H2";
      break;
    case "H3":
      equivalence = "H3";
      break;
    case "IMG":
      if (
        element.style.visibility != "hidden" &&
        element.getBoundingClientRect().height > 0 &&
        element.getBoundingClientRect().width > 0
      )
        equivalence = "IMG";
      break;
    case "SVG":
      if (
        (element.style.visibility != "hidden" &&
          element.getBoundingClientRect().height > 0 &&
          element.getBoundingClientRect().width > 0) == false
      ) {
        return "NONE";
      }
      equivalence = "IMG";
      break;

    case "BUTTON":
      //https://css-tricks.com/a-complete-guide-to-links-and-buttons/
      if (
        (element.style.visibility != "hidden" &&
          element.getBoundingClientRect().height > 0 &&
          element.getBoundingClientRect().width > 0) == false
      ) {
        return "NONE";
      }

      equivalence = "BUTTON";
      break;

    //real problematics
    case "INPUT":
      //check element types and test others to include
      if (
        (element.style.visibility != "hidden" &&
          element.getBoundingClientRect().height > 0 &&
          element.getBoundingClientRect().width > 0) == false
      ) {
        return "NONE";
      }
      if (
        element.type == "button" ||
        element.type == "submit" ||
        element.type == "reset" ||
        element.type == "save"
      ) {
        // console.log("Input button", element);
        equivalence = "BUTTON";
      }

      if (
        element.getAttribute("type") == "text" || //to avoid those elements without explicit type='text' attribute that return text as their type property anyhow
        element.type == "email" ||
        element.type == "password" ||
        element.type == "search"
      ) {
        equivalence = "INPUT";
        // console.log("Input: " + element.type);
        // console.log(element);
      }
      break;
    case "A":
      let url = element.getAttribute("href");
      if (url != null && url.length > 1) {
        //not null and not empty, it links somewhere
        equivalence = "A";
        //TODO: link roles into account for equivalences
        //ROLE as button? -or aria role as button
        if (element.hasAttribute("aria-role")) {
          // console.log(
          //   "aria role: " + element.getAttribute("aria-role"),
          //   element
          // );
        } else if (element.hasAttribute("role")) {
          // console.log("role: " + element.getAttribute("role"), element); //menu item, button, etc...
        }
      } else {
        // console.log("link to nowhere: ", element); //learn more about links with no href
        // (skip to main content) can have no href attribute, a role of link and a tab index = 0
        if (element.getAttribute("tabIndex" == "0")) {
          equivalence = "A"; //acccessibility link
        }
      }
      break;

    default:
      break;
  }

  return equivalence;
}

function RefreshVisibleModel() {
  // esta funcion sirve para calcular el visible model, el  visibility level
  //filter out elements according to visibility level set
  // console.log("xxxxfavorites: ", favModel);
  //select filter
  let filter = modeler;

  switch (visibilityLevel) {
    case 0:
      filter = level0Modeler;

      break;

    case 1:
      filter = level1Modeler;
      break;

    case 2:
      filter = level2Modeler;
      break;

    case 3:
      filter = level3Modeler;
      break;

    default:
      filter = modeler;
      break;
  }

  visibleModel = [];
  switch (mode) {
    default: //"basic"
      // each model element will save its pointer in visible model if is in the filter
      for (let i = 0; i < basicModel.length; i++) {
        const element = basicModel[i];
        if (filter.has(element.tagName)) {
          //to be included in the visible model
          visibleModel.push(i);
        }
      }

      break;
    case "favorite":
      // each favorites pointer will be forwarded to the visible model
      // if the element it points to  is in the filter
      const modelF = favModel;
      //console.log("xxxxfavorites: ", modelF, modelF.length);

      for (let j = 0; j < modelF.length; j++) {
        //console.log("j", j);
        const element = basicModel[modelF[j]];
        //console.log("sssssssss: ", element, j);
        // console.log("tagName of restoring fav: ", element.tagName);
        if (filter.has(element.tagName)) {
          //to be included in the visible model
          visibleModel.push(modelF[j]);
        }
      }
      //console.log("favorite visible model calculated: ", visibleModel);
      break;
    case "type":
      for (const [type, values] of Object.entries(typeView)) {
        var group = typeView[type];
        //only if it is in current visibilty mode
        //  console.log(group);
        if (filter.has(type)) {
          //add a marker for type of elements of that group
          visibleModel.push(-1);

          // each group of elements of this type will iterate their values and forward if they are in filter
          for (let i = 0; i < group.length; i++) {
            if (filter.has(basicModel[group[i]].tagName)) {
              //to be included in the visible model
              visibleModel.push(group[i]);
            }
          }
        }
      }

      break;
  }
  // console.log(visibleModel);
}

//#endregion

//-----------------------------------------------------------------------------------------------------//
//2 FAVS
//#region favs
function SerializeFavorite(element) {
  var maxLenght = 100; //max lenght of element atribuites
  switch (element.tagName) {
    //images
    case "IMG": //images
      if (element.getAttribute("src")) {
        // console.log("image,", element);
        // console.log(
        //   element.getAttribute("src"),
        //   ",SRC,",
        //   element.getAttribute("src").slice(-maxLenght)
        // );
        return (
          element.tagName +
          ",,,,src,,," +
          element.getAttribute("src").slice(-maxLenght)
        );
      } else {
        //console.log("image,", element);
        // console.log(
        //   element.getAttribute("data-src"),
        //   ",data-SRC,",
        //   element.getAttribute("data-src").slice(-maxLenght)
        // );
        return (
          element.tagName +
          ",,,,data-src,,," +
          element.getAttribute("data-src").slice(-maxLenght)
        );
      }

    case "SVG": //images
      if (element.getAttribute("src")) {
        //  console.log("image svg,", element);
        // console.log(
        //   element.getAttribute("src"),
        //   ",SRC,",
        //   element.getAttribute("src").slice(-maxLenght)
        // );
        return (
          element.tagName +
          ",,,,src,,," +
          element.getAttribute("src").slice(-maxLenght)
        );
      } else {
        //console.log("image svg,", element);
        // console.log(
        //   element.getAttribute("data-src"),
        //   ",data-SRC,",
        //   element.getAttribute("data-src").slice(-maxLenght)
        // );
        return (
          element.tagName +
          ",,,,data-src,,," +
          element.getAttribute("data-src").slice(-maxLenght)
        );
      }

    //links
    case "A": //-links, -buttons?
      return (
        element.tagName +
        ",,,,href,,," +
        element.getAttribute("href").slice(-maxLenght)
      );

    //INPUTS
    case "BUTTON": // buttons
      if (
        element.getAttribute("aria-label") != null &&
        element.getAttribute("aria-label") != "undefined"
      ) {
        return (
          element.tagName +
          ",,,,aria-label,,," +
          element.getAttribute("aria-label").slice(-maxLenght)
        ); //aria label attribuite
      } else {
        return (
          element.tagName +
          ",,,,textContent,,," +
          element.textContent.slice(-maxLenght)
        ); //textContent
      }

    case "INPUT": //input
      if (
        element.getAttribute("aria-label") != null &&
        element.getAttribute("aria-label") != "undefined"
      ) {
        return (
          element.tagName +
          ",,,,aria-label,,," +
          element.getAttribute("aria-label").slice(-maxLenght)
        ); //aria label attribuite
      } else {
        return (
          element.tagName +
          ",,,,textContent,,," +
          element.textContent.slice(-maxLenght)
        ); //textContent
      }
    //console.log(">>arialabal textcontent||", ariaLbl, textContent);

    default: //H1, H2, H3
      //innerText? outertext? html?
      return (
        element.tagName +
        ",,,,textContent,,," +
        element.textContent.slice(-maxLenght) //textContent
      );
  }
}

function SaveFavorites() {
  // key= fav_url  - data = favStr;
  let key = "favs_" + document.URL;

  // console.log(typeView); // to see indexes of favoritable elements
  // favModel = [0, 1, 2, 5, 6, 40, 62];
  //fav model for this page test: https://www.google.com/search?q=hotdog&hl=en&sxsrf=ALiCzsYllEj80JTYuEKBiX32jCXhP9KwGg%3A1663706350592&source=hp&ei=7iQqY8LNIejk0PEP69WwwAU&iflsig=AJiK0e8AAAAAYyoy_uBCBxL10iB4oOHELopFoUl3uD76&ved=0ahUKEwjC_KOQnaT6AhVoMjQIHesqDFgQ4dUDCAk&uact=5&oq=hotdog&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECcyCgguELEDEIMBEEMyEAguEIAEEIcCELEDEIMBEBQyCwguEIAEEMcBEK8BMgsILhCABBDHARCvATIFCC4QgAQyBQguEIAEMgUIABCABDIFCAAQgAQyBQguEIAEOgcIIxDqAhAnOgQILhBDOgsIABCABBCxAxCDAToRCC4QgAQQsQMQgwEQxwEQ0QM6CwguEIAEELEDEIMBOgQIABADOhEILhCABBCxAxDHARDRAxDUAjoLCAAQgAQQsQMQyQM6BQgAEJIDOg4ILhCABBCxAxCDARDUAlDaAVjPCGC4CmgBcAB4AIABtgGIAacHkgEDMC42mAEAoAEBsAEK&sclient=gws-wiz
  //console.log("serializing model");
  let s = [];
  //serialize each element accoriding to its TAG
  favModel.forEach((elementIndex) => {
    s.push(SerializeFavorite(basicModel[elementIndex]));
  });

  // store new values
  chrome.storage.sync.set({ [key]: s }, function () {
    //console.log("saved favorites", { [key]: s });
  });
}

// restore favs
function RestoreFavs() {
  // key= fav_url  - data = favStr;
  let favKey = "favs_" + document.URL;
  //console.log(favModel);
  favModel = []; //reset favorites

  chrome.storage.sync.get({ [favKey]: [] }, function (items) {
    const serializedFavs = new Set();

    items[favKey].forEach((element) => {
      // console.log("fav)" + element);
      serializedFavs.add(element);
    });

    //look for dom elements in the fav set
    basicModel.forEach((element, index) => {
      //if serialized element is in serializedFavorites, add basic model element index to favorites
      //serialized in the form of element.tagName + ",,," + element.textContent/whatever

      //console.log(SerializeFavorite(element));
      const serializedElement = SerializeFavorite(element);

      if (serializedFavs.has(serializedElement)) {
        //console.log(index, " << found new favorite: " + serializedElement);
        favModel.push(index);
        serializedFavs.delete(serializedElement); //delete item serialiation from the list of serializedfavorites
      }
    });
    if (mode == "favorite") {
      // if you are in favorite mode, wait for model to be loaded before refreshing window

      RefreshVisibleModel();
      RefreshWindow();
    }
  });
  //console.log("RESTORED favModel: ", favModel);
}

function restore_options() {
  // Use default value verbosity = 'medium' and language = 'en'.

  console.log("restoring options");
  chrome.storage.sync.get(
    {
      verbosity: "medium",
      language: "en",
    },
    function (items) {
      verb = items.verbosity;
      lang = items.language;
      console.log(verb, lang);
    }
  );
}

//#endregion favs

//-----------------------------------------------------------------------------------------------------//
// 3 message handlers
//#region message
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command) {
    switch (message.command) {
      case "sync mode":
        mode = message.data;
        break;
      case "update settings":
        restore_options();
        break;
      case "start navigation":
        console.log("starting navigation");
        //ModelPageDOM(); unless you change the modeler in settings
        RefreshVisibleModel();

        // TODO: options for continue where you left off

        if (onTabRefocus == "reset") {
          wIndex = 0;
        }

        RefreshWindow();
        break;
      case "update visibility":
        // console.log("trigger remodeling");
        //ModelPageDOM();
        visibilityLevel = message.data;
        RefreshVisibleModel();
        RefreshWindow();

        break;
      case "update mode":
        // console.log("trigger remodeling");
        //ModelPageDOM();
        mode = message.data;
        break;

      case "received from device":
        ComMessageReceived(message.data);
        break;
      case "tts ended":
        TTSEnded();
        break;
      default:
        // debugging commands
        console.warn(
          "Unmatched command of '" +
            message.command +
            "' from background.js options scripts from " +
            sender
        );
    }
  }
});
//#endregion message

//------------------------------------------------------------------------------//
//Window control
//#region window

function RefreshWindow() {
  //parse elementTags from visible model into window depending on mode & window start index (wIndex)
  //console.log("visible model: ", visibleModel, "mode: ", mode);
  let s = "";
  let vmCursor = VisibleModelIndexOfCursor();

  switch (mode) {
    //TODO: type view mapping
    case "type":
      //stay as close to where you where as possible while changing modes??
      //  wIndex = VisibleModelIndexOfCursor();

      if (wIndex >= visibleModel.length) {
        //in case you are out of bounds while changin mode
        wIndex = 0;
      }
      //
      //iterate until you finish the lenght of the array, or you fill your window (4 elements)
      //TODO: TYPEVIEWMAPPING
      for (let i = 0; wIndex + i < visibleModel.length && i < 4; i++) {
        if (visibleModel[wIndex + i] >= 0) {
          //this is not a group type indicatior
          s += "2,"; //in typeview elements are placed in the second column,
        } else {
          s += "1,"; //and group names are placed in the first column column,
        }
      }
      s = s.substring(0, s.length - 1);
      if (s.length == 0) {
        //in case empty model, dont send empty message, just turn off motors
        s = 0;
      }
      s += "*";

      break;

    default: //basic and favorites
      //
      //iterate until you finish the lenght of the array, or you fill your window (4 elements)

      //stay as close to where you where as possible while changing modes??
      // wIndex = VisibleModelIndexOfCursor();

      if (wIndex >= visibleModel.length) {
        //in case you are out of bounds while changin mode
        wIndex = 0;
      }

      for (let i = 0; wIndex + i < visibleModel.length && i < 4; i++) {
        let pulsating = wIndex + i == vmCursor; // is this your cursor? pulsate then!

        s +=
          MapElementToDisplay(
            basicModel[visibleModel[wIndex + i]].tagName,
            pulsating
          ) + ","; //from the start of the window onwards parse to string
      }
      s = s.substring(0, s.length - 1);
      if (s.length == 0) {
        //in case empty model, dont send empty message, just turn off motors
        s = 0;
      }
      s += "*";
      //console.log("s", s);
      break;
  }

  //send to device
  console.log("refreshing groups on device: ", s);
  chrome.runtime.sendMessage({
    request: "send to device",
    data: s,
  });
}
function TypeViewMapping() {
  //TODO: advance mapping, for example a link could be any of the 3 states left: (not considering the name of the group on the first column),
  //"2" visited , "3" non visited, "4" contains an image
}
function MapElementToDisplay(elementType, pulsating) {
  //TODO: pulsate on your cursor-- Using the cursor variable
  let s = "0";
  //console.log("mapping element: ", elementType);
  if (displayChar0.has(elementType)) {
    s = "1";
  }
  if (displayChar1.has(elementType)) {
    s = "2";
  }
  if (displayChar2.has(elementType)) {
    s = "3";
  }
  if (displayChar3.has(elementType)) {
    s = "4";
  }
  if (s > "0" && pulsating) {
    s += "P"; //pulsating element!
    // console.log("pulsating element!");
  }

  return s; //turn off motor otherwise
}
function SendWindow() {
  if (enabled) {
    // &&connected?
    //calculate window to be send

    win = ""; //transform 4 elements into string
    for (let index = 0; index < 4; index++) {
      //check if next value is within range of visibleModel
      if (visibleModel.length > wIndex + index) {
        //TODO: check if focused, so we can pulsate

        //map element type to display character/column + add to string
        win += MapElementToDisplay(visibleModel[wIndex + index]) + ",";
      } else {
        win += "0,";
      }
    }
    //trim trailing coma
    win = win.slice(0, -1);
    win += "*";

    console.log("sending this window: " + win);

    SendToPort(win);
  }
}

//#endregion window
