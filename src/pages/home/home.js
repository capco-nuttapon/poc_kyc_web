import React from "react";
import "../../tailwind.css";
import "../../index.css";
import { Link, useSearchParams } from "react-router-dom";

export function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}

export default function Home() {
  const [params] = useSearchParams();

  function backToBBL() {
    if (getMobileOperatingSystem() === "Android") {
      if (window.KYC !== undefined) {
        window.KYC.postMessage("back to BBL app");
      }
    } else if (getMobileOperatingSystem() === "iOS") {
      if (window.webkit !== undefined) {
        window.webkit.messageHandlers.backCallback.postMessage(
          "back to BBL app"
        );
      }
    }
  }

  function backToPreviousWebPage() {
    window.location.replace(
      "https://capco-nuttapon.github.io/poc_other_web_for_kyc/"
    );
    // window.location.href = "https://capco-nuttapon.github.io/poc_other_web_for_kyc/";
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
