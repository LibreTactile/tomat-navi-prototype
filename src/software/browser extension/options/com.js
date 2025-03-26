// Handles the logic of connection and communication with device.
// Listens for connection & TX directive
// Sends a connected request when connection successfully established & RX request when received data from hardware

//https://web.dev/usb/
debugCOM = true;

//COMM section
var port;
var reader;
var inputDone;
var outputDone;
var inputStream;
var outputStream;
var connected = false;
var rxbuffer = "";
var protocol = "serial"; // Default protocol
var wsSocket; // WebSocket instance

//Check if serial is supported
if ("serial" in navigator) {
  // The Web Serial API is not supported.
} else {
  serialOk = false;
  console.log("Web Serial is NOT supported in your browser :(");
}

async function connect() {
  if (protocol === "serial") {
    // WebUSB Serial connection
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });

    const encoder = new TextEncoderStream();
    outputDone = encoder.readable.pipeTo(port.writable);
    outputStream = encoder.writable;

    const decoder = new TextDecoderStream();
    inputDone = port.readable.pipeTo(decoder.writable);
    inputStream = decoder.readable;

    reader = inputStream.getReader();
    readLoop();
    connected = true;

    writeToStream("0*");
    if (debugCOM) console.log("COMM: Serial connection established!");
  } else if (protocol === "websocket") {
    // WebSocket connection
    const wsIp = await getStoredSetting("wsIp", "192.168.12.3");
    const wsPort = await getStoredSetting("wsPort", "8765");
    wsSocket = new WebSocket(`ws://${wsIp}:${wsPort}`);

    wsSocket.onopen = () => {
      connected = true;
      if (debugCOM) console.log("COMM: WebSocket connection established!");
    };

    wsSocket.onmessage = (event) => {
      const message = event.data;
      if (debugCOM) console.log("COMM: Received via WebSocket:", message);
      chrome.runtime.sendMessage({
        request: "received from device",
        data: message,
      });
    };

    wsSocket.onerror = (error) => {
      console.error("COMM: WebSocket error:", error);
    };

    wsSocket.onclose = () => {
      connected = false;
      if (debugCOM) console.log("COMM: WebSocket connection closed.");
    };
  }
}

async function disconnect() {
  if (protocol === "serial") {
    writeToStream("0*");
    reader.cancel();
    await inputDone.catch(() => {});
    await outputDone.catch(() => {});
    await port.close();
    connected = false;
    if (debugCOM) console.log("COMM: Serial connection closed.");
  } else if (protocol === "websocket" && wsSocket) {
    wsSocket.close();
    connected = false;
    if (debugCOM) console.log("COMM: WebSocket connection closed.");
  }
}

async function readLoop() {
  // CODELAB: Add read loop here.

  while (true) {
    const { value, done } = await reader.read();
    if (value) {
      // log.textContent += value + "\n";
      if (debugCOM) {
        console.log(
          "COMM: Read this from port: '" +
            value +
            "' with this on buffer: '" +
            rxbuffer +
            "' "
        );
      }
      rxbuffer += value;
      if (rxbuffer.includes("*")) {
        //buffer to ensure recieved all serial message, until termination char *
        rxbuffer = rxbuffer.split("*")[0];
        rxbuffer = rxbuffer.trim();
        chrome.runtime.sendMessage({
          request: "received from device",
          data: rxbuffer,
        }); // send only value before "*"
        if (debugCOM) {
          console.log(
            "COMM received the following message: '" + rxbuffer + "'"
          );
        }
        rxbuffer = ""; //clear input buffer
      }
    }
    if (done) {
      if (debugCOM) console.log("COMM: [readLoop] DONE", done);
      reader.releaseLock();
      break;
    }
  }
}

function writeToStream(outText) {
  if (!connected) return;

  if (protocol === "serial") {
    const writer = outputStream.getWriter();
    if (debugCOM) console.log("COMM: [SEND via Serial]", outText);
    writer.write(outText + "\n");
    writer.releaseLock();
  } else if (protocol === "websocket" && wsSocket) {
    // Parse serial string to JSON format
    const jsonData = parseSerialToJson(outText);
    if (debugCOM) console.log("COMM: [SEND via WebSocket]", jsonData);
    wsSocket.send(JSON.stringify(jsonData));
  }
}

function parseSerialToJson(serialString) {
  // Remove termination character and split by commas
  const cleanString = serialString.replace(/\*$/, '');
  const parts = cleanString.split(',');
  
  const jsonData = {
    rows: []
  };

  // Process each row value
  parts.forEach((value, rowIndex) => {
    const rowData = {
      row: rowIndex,
      buttons: []
    };

    // Check for Pulsating state (ends with 'P')
    if (value.endsWith('P')) {
      const buttonId = parseInt(value.replace('P', ''), 10);
      rowData.buttons.push({
        id: buttonId-1,
        state: "PULSATING"
      });
    } 
    // Regular Active state
    else if (value) {
      const buttonId = parseInt(value, 10);
      rowData.buttons.push({
        id: buttonId-1,
        state: "ACTIVE"
      });
    }

    jsonData.rows.push(rowData);
  });

  return jsonData;
}

async function getStoredSetting(key, defaultValue) {
  return new Promise((resolve) => {
    chrome.storage.sync.get({ [key]: defaultValue }, (items) => {
      resolve(items[key]);
    });
  });
}

//https://web.dev/serial/
//https://glitch.com/edit/#!/observant-knotty-silver?path=script.js%3A105%3A1
