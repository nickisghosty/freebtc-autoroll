/*jshint esversion: 6 */
var _countdown = 0,
    _status = true,
    _fpRolls = 0,
    _btcBal = 0,
    _bonusesClaimed = 0,
    _randomDelay = true,
    _delaySeconds = 0,
    _valueDelay = false,
    _freeBTC = false,
    _rpBal = 0,
    _lotto = false,
    _funTokens = false,
    _wof = false,
    _bonuses = {};

set("_status", _status);
set("_randomDelay",_randomDelay);
set("_valueDelay", _valueDelay);
set("_delaySeconds",_delaySeconds);
set("_freeBTC",_freeBTC);
set("_lotto",_lotto);
set("_funTokens",_funTokens);
set("_wof", _wof);
set("_countdown", 0);
set("_fpRolls", 0);
set("_btcBal", 0);
set("_rpBal", 0);
set("_bonusesClaimed", 0);
openIfNeeded();

browser.runtime.onConnect.addListener((port) => {
    console.assert(port.name === "freebtc-port");
    port.onMessage.addListener((msg) => {
        if (msg.message === 'set') {
            console.log(`msg : ${msg.message}`);
            switch (true) {
                case msg.value._countdown !== _countdown:
                    _countdown = msg.value._countdown;
                    set("_countdown", _countdown);
                    if (_countdown === 0 || _countdown === "0") {
                        get('_freeBTC');
                        get('_lotto');
                        get('funTokens');
                        get('_wof');
                        if (_freeBTC == true) {
                            bonuses._freeBTC = true;
                        } else if (_freeBTC == false) {
                            bonuses._freeBTC = false;
                        }
                        if (_lotto == true) {
                            bonuses._lotto = true;
                        } else if (_lotto == false) {
                            bonuses._lotto = false;
                        }
                        if (_funTokens == true) {
                            bonuses._funTokens = true;
                        } else if (_funTokens == false) {
                            bonuses._funTokens = false;
                        }
                        if (_wof == true) {
                            bonuses._wof = true;
                        } else if (_wof == false) {
                            bonuses._wof = false;
                        }
                        if (_status) {
                            port.postMessage({
                                message: 'roll', value: bonuses
                            
                            });
                        }
                    }
                    break;
                case msg.value._btcBal !== _btcBal:
                    _btcBal = msg.value._btcBal;
                    set('_btcBal', _btcBal);
                    break;
                case msg.value._rpBal !== _rpBal:
                    _rpBal = msg.value._rpBal;
                    set('_rpBal', _rpBal);
                    break;
            }
            
        }
        else if (msg.message === 'get') {
            get('_freeBTC');
            get('_lotto');
            get('_funTokens');
            get('_status');
            get('_wof');
            port.postMessage({
                message: 'set', value: {
                    '_status': _status,
                    '_freeBTC': _freeBTC,
                    '_lotto': _lotto,
                    '_funTokens': _funTokens,
                    '_wof': _wof,
                    '_randomDelay': _randomDelay,
                    '_valueDelay': _valueDelay,
                    '_delaySeconds': _delaySeconds
                }
            });
        }
        else if (msg.message === 'roll') {
            get('_fpRolls');
            _fpRolls++;
            set('_fpRolls', _fpRolls);
        }
        else if (msg.message === 'bonus') {
            get('_bonusesClaimed');
            _bonusesClaimed++;
            set('_bonusesClaimed', _bonusesClaimed);
        }
    });
});


function set(item, value) {
    const setter = browser.storage.local.set({
        [item]: value
    }).then(() => {
        console.log(`Set ${item} : ${value}`);
    }, onError);
}
function get(item) {
    const getter = browser.storage.local.get(item.toString()).then(result => {

        const value = result[item];

        console.log(`get ${item} : ${value}`);
        got(item, value);
    }, onError);

}

function got(item, value) {
    console.log(`bg: got ${item} value: ${value}`);
    switch (item) {
        case '_status':
            _status = value;
            break;
        case '_randomDelay':
            _randomDelay = value;
            break;
        case '_delaySeconds':
            _delaySeconds = value;
            break;
        case '_rpBal':
            _rpBal = value;
            break;
        case '_btcBal':
            _btcBal = value;
            break;
        case '_countdown':
            _countdown = value;
            break;
        case '_valueDelay':
            _valueDelay = value;
            break;
        case '_freeBTC':
            _freeBTC = value;
            break;
        case '_lotto':
            _lotto = value;
            break;
        case '_funTokens':
            _funTokens = value;
            break;
        case '_wof':
            _wof = value;
            break;
    }
    
}

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

function onError(error) {
    console.log(`Error: ${error}`);
}
setInterval(update, 1000);

function update() {
    get("_status");

    if (_status) {
        get("_randomDelay");
        get("_valueDelay");
        get("_delaySeconds");
        get("_rpBal");
        get("_btcBal");
        get("_countdown");
        get("_freeBTC");
        get("_lotto");
        get("_funTokens");
        get("_wof");
    }
}