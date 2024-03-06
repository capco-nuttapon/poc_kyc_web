import React from "react";
import "../../tailwind.css";
import "../../index.css";
import { Link, useSearchParams } from "react-router-dom";

export default function Home() {
  const [params] = useSearchParams();

  function backToBBL() {
    if (window.webkit !== undefined) {
      window.webkit.messageHandlers.backCallback.postMessage("back to BBL app");
    }
  }

  function backToPreviousWebPage() {
    window.location.href = "https://45b9-125-25-38-184.ngrok-free.app/";
  }

  function backToPrevious() {
    if (params.get("from") === "bbl") {
      backToBBL();
    } else {
      backToPreviousWebPage();
    }
  }

  return (
    <main
      className={
        "page flex min-h-screen flex-col items-center justify-start pt-16 bg-white " +
        (params.get("isPop") === "true"
          ? "pop-animation"
          : params.get("isPush") === "true"
          ? "push-animation"
          : "")
      }
    >
      <div className="text-xl font-semibold mb-8">KYC screen</div>
      <Link
        className="text-white bg-black px-4 py-1 rounded-md mb-8"
        to={"/send-message" + (params.get("from") === "bbl" ? "?from=bbl" : "")}
      >
        Go to Send message screen
      </Link>
      <button
        className="text-white bg-purple-600 px-4 py-1 rounded-md"
        onClick={backToPrevious}
      >
        Back to Previous screen
      </button>
    </main>
  );
}
