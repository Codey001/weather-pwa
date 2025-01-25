import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";


function showInstallPopup() {
    const installBanner = document.getElementById('install-banner');
    installBanner.style.display = 'block'; // Show the banner
  
    const installButton = document.getElementById('install-button');
    const dismissButton = document.getElementById('dismiss-button');
  
    // Handle "Install" button click
    installButton.addEventListener('click', () => {
      installBanner.style.display = 'none'; // Hide the banner
      if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null; // Clear the deferred prompt
        });
      }
    });
  
    // Handle "Dismiss" button click
    dismissButton.addEventListener('click', () => {
      installBanner.style.display = 'none'; // Hide the banner
    });
  }
  

let deferredPrompt; // Variable to hold the event

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Save the event so it can be triggered later
  deferredPrompt = e;
  // Show your custom install popup or banner here
  showInstallPopup();
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
