
/*jshint esversion: 6 */

const countdownElem = document.getElementById("countdownValue"),
    stateElem = document.getElementById("state"),
    statusElem = document.getElementById("status"),
    fpRollsElem = document.getElementById("fpRollsValue"),
    btcBalElem = document.getElementById("btcBalValue"),
    rpBalElem = document.getElementById("rpBalValue"),
    bonusesClaimedElem = document.getElementById("bonusesClaimedValue"),
    randomDelayElem = document.getElementById("randomDelay"),
    delaySecondsElem = document.getElementById("delaySeconds"),
    valueDelayElem = document.getElementById("valueDelay"),
    freeBTCElem = document.getElementById("freeBTC"),
    lottoElem = document.getElementById("lotto"),
    funTokensElem = document.getElementById("funTokens"),
    wofElem = document.getElementById("wof");

var _countdown=0,
    _status = false,
    _fpRolls=0,
    _btcBal = 0.00000000,
    _rpBal = 0,
    _bonusesClaimed=0,
    _randomDelay = true,
    _delaySeconds = 0,
    _valueDelay=false,
    _freeBTC=false,
    _lotto=false,
    _funTokens=false,
    _wof=false;
    

statusElem.onchange = () => {
    
    let value;
    value = statusElem.checked;
    if (value == true) {
        _status = true;
        stateElem.textContent = "ON";
    }
    else {
        _status = false;
        stateElem.textContent = "OFF";
    }
    set("_status", _status);
    console.log(`status set to: ${value}`);
};
randomDelayElem.onclick = () => {
    let value;
    let value2; 
    value = randomDelayElem.checked === true ? true : false;
    value2 = valueDelayElem.checked === false ? false : true;
    if (value === true) {
        set("_delaySeconds", 0);
    }
    set("_randomDelay", value);
    set("_valueDelay", value2);
};
valueDelayElem.onclick = () => {
    let value;
    let value2;
    value = valueDelayElem.checked === true ? true : false;
    value2 = randomDelayElem.checked === false ? false : true;
    if (value2 === true) {
        set("_delaySeconds", 0);
    }
    set("_valueDelay", value);
    set("_randomDelay", value2);
};
freeBTCElem.onchange = () => {
    let value;
    value = freeBTCElem.checked === true ? true : false;
    set("_freeBTC", value);
};
lottoElem.onchange = () => {
    let value;
    value = lottoElem.checked === true ? true : false;
    set("_lotto", value);
};
funTokensElem.onchange = () => {
    let value;
    value = funTokensElem.checked === true ? true : false;
    set("_funTokens", value);
};
wofElem.onchange = () => {
    let value;
    value = wofElem.checked === true ? true : false;
    set("_wof", value);
};
delaySecondsElem.onchange = () => {
    let value;
    value = delaySecondsElem.value;
    if (_valueDelay === true) {
        set("_delaySeconds", value);
    }
};

window.onclick = (e) => {
    let target = e.target;
    if (target.matches('.tab')) {
        Array.from(document.querySelectorAll('.active')).forEach((el) => {
            el.classList.remove('active');
        });

        let clicked = e.target.id;
        let element = document.getElementById(clicked);
        element.classList.add('active');
        let tabcontent = `${clicked}-content`;
        let contentelement = document.getElementById(tabcontent);
        contentelement.classList.add('active');
    }
};
function set(item, value) {
    const setter = browser.storage.local.set({
        [item]: value
    }).then(() => {
        console.log(`Set ${item} : ${value}`);
    }, onError);
}
function get(item)  {
    const getter = browser.storage.local.get(item.toString()).then(result => {

        const value = result[item];

        console.log(`get ${item} : ${value}`);
        got(item, value);
    }, onError);

}
function got(item, value) {
    console.log(`got: item ${item} value ${value}`);
    switch (item) {
        case "_status":
            _status = value;
            break;
        case "_randomDelay":
            _randomDelay = value;
            break;
        case "_delaySeconds":
            _delaySeconds = value;
            break;
        case "_valueDelay":
            _valueDelay = value;
            break;
        case "_freeBTC":
            _freeBTC = value;
            break;
        case "_btcBal":
            _btcBal = value;
            break;
        case "_rpBal":
            _rpBal = value;
            break;
        case "_countdown":
            _countdown = value;
            break;
        case "_lotto":
            _lotto = value;
            break;
        case "_funTokens":
            _funTokens = value;
            break;
        case "_wof":
            _wof = value;
            break;
    }
}

setInterval(() => {
    if (_status) {
        refresh();
        console.log('refresh');
    }
}, 250);
function refresh() {
    get("_status");
    get("_randomDelay");
    get("_valueDelay");
    get("_delaySeconds");
    get("_freeBTC");
    get("_lotto");
    get("_funTokens");
    get("_wof");
    get("_countdown");
    get("_rpBal");
    get("_btcBal");
    get("_fpRolls");
    get("_bonusesClaimed");
    if (_status ==true) {
        statusElem.checked = true;
        stateElem.textContent = "ON";
    }
    else{
        statusElem.checked = false;
        stateElem.textContent = "OFF";
    }
    if (_randomDelay == true) {
        randomDelayElem.checked = true;
        valueDelayElem.checked = false;
        delaySecondsElem.value = delaySeconds;
    }
    else {
        randomDelayElem.checked = false;
        valueDelayElem.checked = true;
        delaySecondsElem.value = _delaySeconds;
    }
    if (_valueDelay == true) {
        valueDelayElem.checked = true;
        randomDelayElem.checked = false;
        delaySecondsElem.value = _delaySeconds;
    }
    else {
        valueDelayElem.checked = false;
        randomDelayElem.checked = true;
        delaySecondsElem.value = _delaySeconds;
    }
    if (_freeBTC == true) {
        freeBTCElem.checked = true;
    }
    else {
        freeBTCElem.checked = false;
    }
    if (_lotto == true) {
        lottoElem.checked = true;
    }
    else {
        lottoElem.checked = false;
    }
    if (_funTokens == true) {
        funTokensElem.checked = true;
    }
    else {
        funTokensElem.checked = false;
    }
    if (_wof == true) {
        wofElem.checked = true;
    }
    else {
        wofElem.checked = false;
    }
    if (_countdown !== countdownElem.innerText) {
        countdownElem.innerText = _countdown;
    }
    if (_rpBal !== rpBalElem.innerText) {
        rpBalElem.innerText = _rpBal.toString();
    }
    if (_btcBal !== btcBalElem.innerText) {
        btcBalElem.innerText = (parseFloat(_btcBal).toFixed(8)).toString();
    }
    if (_fpRolls.toString() !== fpRollsElem.innerText) {
        fpRollsElem.innerText = _fpRolls.toString();
    }
    if (_bonusesClaimed.toString() !== bonusesClaimedElem.innerText) {
        bonusesClaimedElem.innerText = _bonusesClaimed.toString();
    }
  
}
function onError(error) {
    console.log(`Error: ${error}`);
}

refresh();