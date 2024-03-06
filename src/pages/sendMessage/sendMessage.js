import logo from "../../logo.svg";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../index.css";
import "../../tailwind.css";

export default function SendMessage() {
  const [message, setMessage] = React.useState("");
  const [params] = useSearchParams();

  function onTapSend() {
    if (window.webkit !== undefined) {
      window.webkit.messageHandlers.sendCallback.postMessage(
        `{"value": "${message}"}`
      );
    }
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
      <Link
        to={"/?isPop=true" + (params.get("from") === "bbl" ? "&from=bbl" : "")}
      >
        Back to Home
      </Link>
    </main>
  );
}
