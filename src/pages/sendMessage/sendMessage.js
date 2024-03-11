import logo from "../../logo.svg";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../index.css";
import "../../tailwind.css";
import { getMobileOperatingSystem } from "../home/home";

export default function SendMessage() {
  const [message, setMessage] = React.useState("");
  const [params] = useSearchParams();

  // React.useEffect(() => {
  //   onScreenAppeared();
  // }, [])
  
  function onScreenAppeared() {
    if (getMobileOperatingSystem() === "Android") {
      if (window.kyc !== undefined) {
        window.kyc.postMessage("");
      }
    } else if (getMobileOperatingSystem() === "iOS") {
      if (window.webkit !== undefined) {
        window.webkit.messageHandlers.sendMessageScreenAppeared.postMessage("");
      }
    }
  }

  function onTapSend() {
    if (getMobileOperatingSystem() === "Android") {
      if (window.kyc !== undefined) {
        window.kyc.postMessage("back to BBL app");
      }
    } else if (getMobileOperatingSystem() === "iOS") {
      if (window.webkit !== undefined) {
        window.webkit.messageHandlers.sendCallback.postMessage(
          `{"value": "${message}"}`
        );
      }
    }
  }

  function onTapSave() {
    if (getMobileOperatingSystem() === "Android") {
      if (window.kyc !== undefined) {
        window.kyc.tapSave();
      }
    } else if (getMobileOperatingSystem() === "iOS") {
      if (window.webkit !== undefined) {
        window.webkit.messageHandlers.saveCallback.postMessage("");
      }
    }
  }

  window.addEventListener("message", receiveMessage);

  function receiveMessage(event) {
    setMessage(event.data);
  }

  return (
    <main className="page flex min-h-screen flex-col items-center justify-start pt-16 bg-white push-animation">
      <img src={logo} className="App-logo" alt="logo" />
      <input
        className="mb-8 text-black bg-white px-2 border-2 border-black rounded-md"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="text-white bg-black px-4 py-1 rounded-md mb-8"
        onClick={onTapSend}
      >
        Send
      </button>
      <button
        className="text-white bg-sky-600 px-4 py-1 rounded-md mb-8"
        onClick={onTapSave}
      >
        Save
      </button>
      <Link
        to={"/?isPop=true" + (params.get("from") === "bbl" ? "&from=bbl" : "")}
      >
        Back to Home
      </Link>
    </main>
  );
}
