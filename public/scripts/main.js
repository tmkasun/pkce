if ("serviceWorker" in navigator) {
  window.addEventListener("load", function (params) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service worker registers done !!");
      })
      .catch((error) => {
        console.log("something went wrong registering SW");
      });
  });
}
