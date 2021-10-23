/*jshint esversion:6 */
var isOpen = [],
 open,
 rpclaimed = 0,
 btcclaimed = 0,
 rpbal = '',
 state = "",
 countdown = '',
 btcbal = '';
set("btcclaimed", parseFloat(0));
set("rpclaimed", parseFloat(0));

function logTabs(tabs) {
  for (let tab of tabs) {
    const taburl = tab.url;
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
    browser.tabs.create({
      url: 'https://freebitco.in/?op=home'
    });
    open = true;
    console.log(open);
  }
}
openIfNeeded();

function onError(error) {
  console.log(`Error: ${error}`);
}

function onRemoved(tab) {
  console.log(`Removed tab: ${tab.id}`);
  openIfNeeded();
  isOpen = [];
}

function onCreated(tab) {
  console.log(`Created new tab: ${tab.id}`);
}

function openIfNeeded() {
  let querying = browser.tabs.query({});
  querying.then(logTabs, onError);
  isOpen = [];
  setTimeout(() => {
    openIfNeeded();
  }, ((Math.random() * 1000) * 20) + 1000);
}
// Send data to tabs
function sendData(send, callback) {
  if (callback == null) callback = () => {};
  browser.tabs
    .query({
      url: '*://*.freebitco.in/*'
    })
    .then(tabs => {
      for (let tab of tabs) {
        browser.tabs
          .sendMessage(tab.id, send)
          .then(function(response){
            callback(response);
          })
          .catch(function(error){
            console.error(`Error: ${error}`);
          });
      }
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
}


// Get data from tab
browser.runtime.onMessage.addListener(response => {
  if (response == 'roll') {
    console.log(`response: ${response}`);

   get("status");
    if (state == 'on') {
      sendData('roll', null);
      addCount();
    }
  }
  if (response == 'captcha') {
    console.log(`response: ${response}`);
    get("status");
    if (state == 'on') {
      sendData('captcha', null);
    }
  }
  /*if (response == 'fp_100') {
    console.log(`response: ${response}`);
    get("status");
    if (state == 'on') {
      sendData('fp_100', null);
      addCountrp();
    }
  }
  if (response == 'fp_50') {
    console.log(`response: ${response}`);
    get("status");
    if (state == 'on') {
      sendData('fp_50', null);
      addCountrp();
    }
  }
  if (response == 'fp_25') {
    console.log(`response: ${response}`);
    get("status");
    if (state == 'on') {
      sendData('fp_25', null);
      addCountrp();
    }
  }
  if (response == 'fp_10') {
    console.log(`response: ${response}`);
    get("status");
    if (state == 'on') {
      sendData('fp_10', null);
      addCountrp();
    }
  }
  if (response == 'fp_1') {
    console.log(`response: ${response}`);
    get("status");
    if (state == 'on') {
      sendData('fp_1', null);
      addCountrp();
    }
  }*/
  if (response.btcbal) {
    console.log(`response: ${response.btcbal}`);
    console.log(`set new balance: ${response.btcbal}`);
    set("btcbal",response.btcbal);
  }
  if (response.rpbal) {
    console.log(`response: ${response.rpbal}`);
    console.log(`set new rp balance: ${response.rpbal}`);
    set("rpbal",response.rpbal);
  }
  if (response.countdown) {
    set("countdown",response.countdown);
  }
});


function set(item, value) {
  var setter = browser.storage.local.set({
    [item]: value
  }).then(() => {
    console.log(`Set ${item} : ${value}`);
  }, onError);
}

function get(item) {
  var getter = browser.storage.local.get(item.toString()).then(result => { 
  
    let value = result[item];

    console.log(value);
    got(item,value);
  },onError);

}
function got(item, value) {
  switch (item) {
    case "status":
      state = value;
      break;
    case "btcbal":
      btcbal = value;
      break;
    case "rpbal":
      rpbal = value;
      break;
    case "btcclaimed":
      btcclaimed = value;
      break;
    case "rpclaimed":
      rpclaimed = value;
      break;
    case "countdown":
      countdown = value;
      break;
  }
}
function onError(err) {
  console.log(`Error: ${err}`);
}



// Count get and set
function addCount() {
  get("btcclaimed");
    set("btcclaimed", btcclaimed+1);

}

function addCountrp() {
  get("rpclaimed");
  set("rpclaimed", rpclaimed+1);
  
}




// Set initial status
set("status", "on");