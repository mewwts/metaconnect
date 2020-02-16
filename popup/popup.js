function listenForClicks() {
  document.addEventListener("click", (e) => {
    console.log("click")
    if (e.target.id === "connect") { 
      console.log("click: connect")
      browser.tabs.query({active: true, currentWindow: true})
        .then((tabs) => {
          console.log("click: connect: send")
          connected = true
          return browser.tabs.sendMessage(tabs[0].id, {
            command: "connect",
          });
        })
        .catch(console.log)
		} else if (e.target.id  === "disconnect") {
      browser.tabs.query({active: true, currentWindow: true})
        .then((tabs) => {
          browser.tabs.sendMessage(tabs[0].id, {
            command: "disconnect",
          });
          connected = false;
        })
        .catch(console.log)
    }
  });
}

browser.tabs.executeScript({file: "/metaconnect.js"})
  .then(listenForClicks)
  .catch(console.log);
