import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');

chrome.webNavigation.onCompleted.addListener(async details => {
  const link = new URL(details.url).hostname;
  if (['new-tab-page', 'localhost:5173'].find(element => element === link)) {
    console.log(link);
  } else {
    console.log(link);
    const user = await chrome.storage.local.get('oauth');
    if (user.oauth) {
      console.log(user);
      const response = await fetch(`http://localhost:8000/user/user_by_email/${user.oauth.email}`);
      console.log(response);
      if (response.ok) {
        const email = JSON.parse(await response.text());
        await fetch('http://localhost:8000/user/save_url', {
          method: 'POST',
          body: JSON.stringify({
            user: email._id,
            link,
            risk: 0,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }
  }

  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'page loaded',
    message: 'Completed loading: ' + details.url + ' at ' + details.timeStamp + ' milliseconds since the epoch.',
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    console.log(token);
    fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.ok) {
        response.json().then(result => {
          chrome.storage.local
            .set({
              oauth: result,
            })
            .then(() => {
              sendResponse(result);
            });
        });
      } else {
        response.text().then(result => console.log(result));
      }
    });
  });
  return true;
});

chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
  chrome.storage.local.get('oauth').then(result => {
    if (result.oauth) {
      console.log(result);
      fetch(`http://localhost:8000/user/user_by_email/${result.oauth.email}`).then(response => {
        if (response.ok) {
          response.text().then(text => {
            const email = JSON.parse(text);
            sendResponse(email._id);
          });
        }
      });
    }
  });
  return true;
});
