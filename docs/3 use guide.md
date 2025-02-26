# 1 Setup

- Plug-in usb cable to computer and tomat navi device. No driver needs to be installed.   
- Install chrome extension  
  - Unzip `tomat navi 1.0 browser extension.zip`.  
  - Go to `` chrome://extensions/` `` on google chrome and enable the `developer mode` toggle on the top right  ![Load unpacked button](/docs/img/image.png)
  - Click on `Load unpacked` and select the folder that was just unzipped.![Load unpacked button](/docs/img/image-1.png)  
  - (optional) install/configure your screen reader software, we recommend the open-source [NVDA](https://www.nvaccess.org/download/) screen reader software. 

# 2 Start 

- Run the extension by clicking on the extension icon, or using the keyboard shortcut `ctrl + shift + q` .   
- Click connect to show available devices, and choose the `board CDC` device. ![Connect to device](/docs/img/image-2.png)  
- (optional) change extension verbosity level and language, then hit on `save` to store your settings across sessions. 

# 3 Usage example

- You are ready to navigate. Just open a tab and start navigating the webpage with tomat navigator, as soon as you switch tabs the extension will create a model of the page and send it to the interface for interaction.   
- Basic controls:  
  - Tapping next (right arrow) button will take you to the next element of the page.  
  - Tap row button reads the element content (according to verbosity setting)  
  - Double tapping row button will scroll/navigate to that element  
  - Press and hold row button would add to favorites for that page (persistent across sessions)  
  - Tapping star will cycle through the presentation modes (normal, favorites, help mode).   
  - Tapping \+ or \- will show more or less details in the interface (headings level 1 only, vs heading level 1,2,3 and links).   
  - Tapping up or down will move the part of the webpage that is display in the tactile matrix.   
- For example: searching for “assistive technology” in a new tab will present the (invisible) accessibility links in the tactile interface. ![Accessibility links example](/docs/img/image-3.png)

# 4 Troubleshooting

- You can show the console on the chrome extension (`ctrl + shift + i`) to review the system log, including what pages it has read, modeled and sent to the device, as well as what buttons the device has reported. ![Chrome extension console](/docs/img/image-4.png)

# 5 Extended use guide
... under construction