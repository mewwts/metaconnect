import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

var connected = false
const provider = new WalletConnectProvider({
    infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // Required
    bridge: "https://bridge.walletconnect.org/"
});
var a = function() {
	function connect() {

    //  Enable session (triggers QR Code modal)
    if (!connected) {
      provider.enable()
        .then(()=>{
          console.log("yup")
          console.log(provider)
          window.web3 = new Web3(provider);
          window.web3.setProvider(provider);
          console.log(window.web3);
          connected = true
        })
        .catch(console.log)
    }
	}

	function disconnect() {
    console.log("disconnect");
    provider.close()
      .then(() => {
        connected = false
        console.log("disconnected")
      })
      .catch(console.log)
	}

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
  */
  console.log("running");
  browser.runtime.onMessage.addListener((message) => {
    console.log(message);
    if (message.command === "connect") {
      connect()
    } else if (message.command === "disconnect") {
			disconnect();
    }
  });
}
a();
