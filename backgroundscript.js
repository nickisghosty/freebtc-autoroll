/*jshint esversion:6 */
var isOpen = [],
  open,
  rpclaimed = 0,
  btcclaimed = 0,
  rpbal = '',
  state = "",
  countdown = '',
  btcbal = '',
  _freeBTCBonus = false,
  _lottoBonus = false,
  _funBonus = false,
  _wofBonus = false,
_randomDelay = true,
_valueDelay = false;
set("btcclaimed", parseFloat(0));
set("rpclaimed", parseFloat(0));
set("freebtcbonus", false);
set("lottobonus", false);
set("funbonus", false);
set("wofbonus", false);
set("randomdelay", true);
set("valuedelay", false);

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
          .then(function (response) {
            callback(response);
          })
          .catch(function (error) {
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
  console.log(`response: ${response}`);
  get("status");
  get("freebtcbonus");
  get("lottobonus");
  get("funbonus");
  get("wofbonus");
  get("randomdelay");
  get("valuedelay");
  if (state == 'on') {
    switch (true) {
      case response == 'roll':
        sendData('roll', null);
        addCount();
        break;
      case response == 'captcha':
        sendData('captcha', null);
        break;
      case (_freeBTCBonus == true) && (response == 'freebtc1000'):
        sendData('freebtc1000', null);
        addCountrp();
        break;
      case (_freeBTCBonus == true) && (response == 'freebtc500'):
        sendData('freebtc500', null);
        addCountrp();

        break;
      case (_freeBTCBonus == true) && (response == 'freebtc100'):
        sendData('freebtc100', null);
        addCountrp();

        break;
      case (_lottoBonus == true) && (response == 'lotto100'):
        sendData('lotto100', null);
        addCountrp();

        break;
      case (_lottoBonus == true) && (response == 'lotto50'):
        sendData('lotto50', null);
        addCountrp();

        break;
      case (_lottoBonus == true) && (response == 'lotto25'):
        sendData('lotto25', null);
        addCountrp();

        break;
      case (_funBonus == true) && (response == 'fun5'):
        sendData('fun5', null);
        addCountrp();

        break;
      case (_funBonus == true) && (response == 'fun4'):
        sendData('fun4', null);
        addCountrp();

        break;
      case (_funBonus == true) && (response == 'fun3'):
        sendData('fun3', null);
        addCountrp();

        break;
      case (_funBonus == true) && (response == 'fun2'):
        sendData('fun2', null);
        addCountrp();

        break;
      case (_funBonus == true) && (response == 'fun1'):
        sendData('fun1', null);
        addCountrp();

        break;
      case (_wofBonus == true) && (response == 'wof5'):
        sendData('wof5', null);
        addCountrp();

        break;
      case (_wofBonus == true) && (response == 'wof4'):
        sendData('wof4', null);
        addCountrp();

        break;
      case (_wofBonus == true) && (response == 'wof3'):
        sendData('wof3', null);
        addCountrp();

        break;
      case (_wofBonus == true) && (response == 'wof2'):
        sendData('wof2', null);
        addCountrp();

        break;
      case (_wofBonus == true) && (response == 'wof1'):
        sendData('wof1', null);
        addCountrp();

        break;
      case (_randomDelay == true) && (response == "randomdelay"):
        sendData('randomdelay', null);
        break;
      case (_valueDelay == true) && (response == "valuedelay"):
        sendData('valuedelay', null);
        break;
      default:
        if (response.btcbal) {
          console.log(`response: ${response.btcbal}`);
          console.log(`set new balance: ${response.btcbal}`);
          set("btcbal", response.btcbal);
        }
        if (response.rpbal) {
          console.log(`response: ${response.rpbal}`);
          console.log(`set new rp balance: ${response.rpbal}`);
          set("rpbal", response.rpbal);
        }
        if (response.countdown) {
          set("countdown", response.countdown);
        }
    }
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
    got(item, value);
  }, onError);

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
    case "freebtcbonus":
      _freeBTCBonus = value;
      break;
    case "lottobonus":
      _lottoBonus = value;
      break;
    case "funbonus":
      _funBonus = value;
      break;
    case "wofbonus":
      _wofBonus = value;
      break;
    case "randomdelay":
      _randomDelay = value;
      break;
    case "valuedelay":
      _valueDelay = value;
      break;
  }
}

function onError(err) {
  console.log(`Error: ${err}`);
}



// Count get and set
function addCount() {
  get("btcclaimed");
  set("btcclaimed", btcclaimed + 1);

}

function addCountrp() {
  get("rpclaimed");
  set("rpclaimed", rpclaimed + 1);

}




// Set initial status
set("status", "on");