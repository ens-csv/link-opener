# Link Opener Firefox Extension

## Description
This Firefox extension allows you to open all links matching a specific CSS selector from a given URL.

## Installation
1. Clone or download this repository.
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
3. Click on "Load Temporary Add-on" and select any file in your extension directory.

## How to Use
1. Click on the extension icon in the toolbar.
2. A popup will appear with a button labeled "Open Links."
3. Click the "Open Links" button to fetch the HTML content of the current tab, parse it to find all links matching the specified CSS selector, and then open each link in a new tab.

## Customization
You can customize the CSS selector used to find links by modifying the `background.js` file.

## License
This project is licensed under the [MIT License](LICENSE).
