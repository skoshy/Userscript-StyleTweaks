// ==UserScript==
// @name         Style Tweaks
// @namespace    https://skoshy.com
// @version      0.6.0
// @description  Some style tweaks for various sites
// @author       SK
// @match        https://www.washingtonpost.com/*
// @match        https://www.tradingview.com/*
// @match        https://keep.google.com/*
// @match        https://docs.google.com/*
// @icon         https://i.imgur.com/FNMIdAP.png
// @updateURL    https://github.com/skoshy/Userscript-StyleTweaks/raw/main/src/userscript.user.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';

  if (window.location.href.includes('keep.google.com')) {
    // add blurring to Google Keep window when a single note is focused
    GM_addStyle(`
.notes-container[aria-hidden="true"] {
  filter: blur(20px);
}
.notes-container {
  transition: filter 100ms ease-in-out;
}
    `);
  }

  if (window.location.href.includes('tradingview.com')) {
    // Some mintor visual tweaks
    GM_addStyle(`
.widgetbar-widget-watchlist [class*="changeInPercents"],
.widgetbar-widget-watchlist [class*="prePostMarketNoPrice"] {
  font-size: 75%;
}

.widgetbar-widget-watchlist [class*="last-"] {
  font-size: 85%;
}

.widgetbar-widget-watchlist [class*="symbolName"] {
  padding-right: 2px;
  font-size: 90%;
}
    `);

    // Automatically hide Upgrade notifications
    const closeUpgradeNotificationInterval = setInterval(() => {
      const trialNotification = document.querySelector('[class*="trial-notification"]');

      if (trialNotification) {
        const closeButton = trialNotification.querySelector('[class*="close"]');
        closeButton.click();
      }
    }, 3000);
  }

  if (window.location.href.includes('docs.google.com')) {
    GM_addStyle(`
.active-account-dialog {
  display: none !important;
}
    `);

    const closeAccountDialogInterval = {
      count: 0,
      max: 20,
      interval: setInterval(() => {
        try {
          if (closeAccountDialogInterval.count > closeAccountDialogInterval.max) clearInterval(closeAccountDialogInterval.interval);
          closeAccountDialogInterval.count++;

          const dialog = document.querySelector('.active-account-dialog');
          if (dialog) {
            const okButton = document.querySelector('.active-account-dialog [class*="default"]');
            okButton.click();
            console.log('Clicked OK button on account dialog');
            clearInterval(closeAccountDialogInterval.interval);
          }
        } catch (e) {
          alert('There was an error closing the account dialog window. See userscript.');
        }
      }, 500),
    };
  }
})();
