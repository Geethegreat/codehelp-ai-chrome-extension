chrome.commands.onCommand.addListener((command) => {
  if (command === "open-analyzer-tab") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("popup.html") // Or popup.html if you want
    });
  }
});
