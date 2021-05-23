var b = typeof browser !== 'undefined' ? browser : chrome;
var isOpen = [];
var open;
function logTabs(tabs) {
  for (let tab of tabs) {
    var taburl = tab.url;
    // tab.url requires the `tabs` permission or a matching host permission.
    if (
      taburl.indexOf('freebitco.in') !== -1 ||
      taburl.includes('freebitco.in')
    ) {
      isOpen.push(true);
    } else {
      isOpen.push(false);
    }
  }
  if (isOpen.includes(true) || isOpen.indexOf(true) !== -1) {
    open = true;
  } else {
    b.tabs.create({ url: 'https://freebitco.in/?op=home' });
    open = true;
  console.log(open);
}}
openIfNeeded();
function onError(error) {
  console.log(`Error: ${error}`);
}
function onRemoved(tab) {
  console.log(`Removed tab: ${tab.id}`);
openIfNeeded();
isOpen =[];
  }

function onCreated(tab) {
  console.log(`Created new tab: ${tab.id}`);
}
function openIfNeeded() {
  let querying = b.tabs.query({});
  querying.then(logTabs, onError);
isOpen = [];
  setTimeout(function() {openIfNeeded(); }, 5000);
}
// Send data to tabs
function sendData(send, callback) {
  if (callback == null) callback = function () { };
  b.tabs
    .query({ url: '*://*.freebitco.in/*' })
    .then(function (tabs) {
      for (let tab of tabs) {
        b.tabs
          .sendMessage(tab.id, send)
          .then(response => {
            callback(response);
          })
          .catch(function (error) {
            console.error(`Error: ${error}`);
          });
      }
    })
    .catch(function (error) {
      console.error(`Error: ${error}`);
    });
}
// Get data from tab
b.runtime.onMessage.addListener(function (response) {
  if (response == 'roll') {
    console.log('response: ' + response);
    if (getStatus() == 'on') {
      sendData('roll', null);
      addCount();
    }
  }
  if (response == 'fp_100') {
    console.log('response: ' + response);
    if (getStatus() == 'on') {
      sendData('fp_100', null);
      addCountrp();
    }
  }
  if (response == 'fp_50') {
    console.log('response: ' + response);
    if (getStatus() == 'on') {
      sendData('fp_50', null);
      addCountrp();
    }
  }
  if (response == 'fp_25') {
    console.log('response: ' + response);
    if (getStatus() == 'on') {
      sendData('fp_25', null);
      addCountrp();
    }
  }
  if (response == 'fp_10') {
    console.log('response: ' + response);
    if (getStatus() == 'on') {
      sendData('fp_10', null);
      addCountrp();
    }
  }
  if (response == 'fp_1') {
    console.log('response: ' + response);
    if (getStatus() == 'on') {
      sendData('fp_1', null);
      addCountrp();
    }
  }
  if (response.btcbal) {
    console.log('response: ' + response.btcbal);
    console.log('set new balance: ' + response.btcbal);
    setBalance(response.btcbal);
  }
  if (response.rpbal) {
    console.log('response: ' + response.rpbal);
    console.log('set new rp balance: ' + response.rpbal);
    setRPBalance(response.rpbal)
  }
  if (response.countdown) {
    setTime(response.countdown);
  }
});

// Status get and set
function setStatus(value) {
  localStorage.setItem('activate', value);
}
function getStatus() {
  return localStorage.getItem('activate') || 'off';
}

// Balance get and set
function setBalance(value) {
  localStorage.setItem('btcbal', value);
}

function getBalance() {
  return localStorage.getItem('btcbal') || 0;
}
function setTime(value) {
  localStorage.setItem('countdown', value);
}
function getTime() {
  return localStorage.getItem('countdown') || 0;
}
function setRPBalance(value) {
  localStorage.setItem('rpbal', value);
}

function getRPBalance() {
  return localStorage.getItem('rpbal') || 0;
}

// Count get and set
function addCount() {
  localStorage.setItem('btcclaimed', getCount() + 1);
}
function addCountrp() {
  localStorage.setItem('rpclaimed', getCountrp() + 1);
}
function getCount() {
  return parseInt(localStorage.getItem('btcclaimed')) || 0;
}
function getCountrp() {
  return parseInt(localStorage.getItem('rpclaimed')) || 0;
}

// Set initial status
setStatus('on');
