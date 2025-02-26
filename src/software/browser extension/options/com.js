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

//Check if serial is supported
if ("serial" in navigator) {
  // The Web Serial API is not supported.
} else {
  serialOk = false;
  console.log("Web Serial is NOT supported in your browser :(");
}

async function connect() {
  // CODELAB: Add code to request & open port here.
  // - Request a port and open a connection.
  port = await navigator.serial.requestPort();
  // - Wait for the port to open.
  await port.open({ baudRate: 115200 });
  // CODELAB: Add code setup the output stream here.
  const encoder = new TextEncoderStream();
  outputDone = encoder.readable.pipeTo(port.writable);
  outputStream = encoder.writable;
  // CODELAB: Send CTRL-C and turn off echo on REPL

  // CODELAB: Add code to read the stream here.
  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);
  inputStream = decoder.readable;

  reader = inputStream.getReader();
  readLoop();
  connected = true;

  writeToStream("0*");
  if (debugCOM) console.log("COMM: connection process ok!");
}

if (debugCOM) console.log("." + "\n COM: Revision no. 03 \n ".trim() + ".");

async function connect() {
  // CODELAB: Add code to request & open port here.
  // - Request a port and open a connection.
  port = await navigator.serial.requestPort();
  // - Wait for the port to open.
  await port.open({ baudRate: 115200 });
  // CODELAB: Add code setup the output stream here.
  const encoder = new TextEncoderStream();
  outputDone = encoder.readable.pipeTo(port.writable);
  outputStream = encoder.writable;
  // CODELAB: Send CTRL-C and turn off echo on REPL

  // CODELAB: Add code to read the stream here.
  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);
  inputStream = decoder.readable;

  reader = inputStream.getReader();
  readLoop();
  connected = true;
  if (debugCOM) console.log("COMM: connection process ok!");
  chrome.runtime.sendMessage({
    request: "tts",
    data: "Connected!",
    lang: "en-US",
  }); //en-US or fr-FR, rate: 2.0
}

async function disconnect() {
  // CODELAB: Close the input stream (reader).
  // CODELAB: Close the output stream.
  // CODELAB: Close the port.

  writeToStream("0*");
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
  // CODELAB: Write to output stream

  if (!connected) return;

  const writer = outputStream.getWriter();
  if (debugCOM) console.log("COMM: [SEND]", outText);
  writer.write(outText + "\n");

  writer.releaseLock();
}

//https://web.dev/serial/
//https://glitch.com/edit/#!/observant-knotty-silver?path=script.js%3A105%3A1
