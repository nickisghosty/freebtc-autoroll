/*jshint esversion: 11*/
const status_ck = document.getElementById("status_ck"),
 randomDelay = document.getElementById('randomdelay'),
 valueDelay = document.getElementById('valuedelay'),
 delayValue = document.getElementById('delayvalue'),
 freeBTCBonus = document.getElementById('freebtc'),
 lottoBonus = document.getElementById('lotto'),
 funBonus = document.getElementById('funtokens'),
 wofBonus = document.getElementById('wof');

var countdown = '',
 btcclaimed = 0,
 rpbal = '',

 rpclaimed = 0,
 state = "",
 _freeBTCBonus = true,
 _lottoBonus = false,
 _funBonus = true,
 _wofBonus = false,
 _randomDelay = true,
 _valueDelay = false,
 _delayValue=0,
 btcbal = '';



const regex = /\d+\D\W\d+\D/;

const regtime = () => {
  get("countdown");
  const cd = countdown.toString();
  return cd.match(regex);
};
window.onclick=function(e){
  var target = e.target;
  if(target.matches('.tab')){
    Array.from(document.querySelectorAll('.active')).forEach(function(el) { 
      el.classList.remove('active');
  });

    var clicked = e.target.id;
    var element = document.getElementById(clicked);
    element.classList.add('active');
    var tabcontent = `${clicked}-content`;
    var contentelement = document.getElementById(tabcontent);
    contentelement.classList.add('active');
  }
};
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

    console.log(`got ${item} : ${value}`);
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
                  case "delayvalue":
                    _delayValue = value;
  }
}
function onError(err) {
  console.log(`Error: ${err}`);
}


// Refresh text ON/OFF
function refreshStatusText() {
  if (state == "off") {
    document.getElementById("status").textContent = "OFF";
    document.getElementById("status").style.color = "#ccc";
    status_ck.checked = false;
  } else {
    document.getElementById("status").textContent = "ON";
    document.getElementById("status").style.color = "#803333";
    status_ck.checked = true;
  }
  if(_freeBTCBonus == true){
    freeBTCBonus.checked = true;
  } else{ freeBTCBonus.checked = false; }
  if(_lottoBonus == true){
    lottoBonus.checked = true;
  }else{ lottoBonus.checked = false; }
  if(_funBonus == true){funBonus.checked = true; } else{ funBonus.checked = false; }
  if(_wofBonus == true){wofBonus.checked = true; } else{ wofBonus.checked = false;}
if(_valueDelay == true){valueDelay.checked = true; } else{ valueDelay.checked = false; }
if(_randomDelay == true){randomDelay.checked = true; } else{ randomDelay.checked = false;}
}

// On change status
status_ck.onchange = () => {
  let value;
  if (status_ck.checked === true) {
    value = "on";
  } else {
    value = "off";
  }
set("status", value);
};

freeBTCBonus.onchange = () => {
  let value;
  if(freeBTCBonus.checked === true) {
    value =true;
  }else{value=false;  }
  set("freebtcbonus", value);
};
lottoBonus.onchange = () => {
  let value;
  if(lottoBonus.checked === true) {
    value=true;
  } else {value=false;}
  set("lottobonus", value);
  
};
funBonus.onchange = () => {
  let value;
  if(funBonus.checked === true) {
    value =true;
  } else{
    value=false;
  }
  set("funbonus", value);
};
wofBonus.onchange = () => {
  let value;
  if(wofBonus.checked === true) {
    value= true;
  }else{value=false;}
  set("wofbonus", value);
};
randomDelay.onchange = () => {
  let value;
  if(randomDelay.checked === true){
    value = true;}
    else{value=false;}
    set("randomdelay", value);
  
};
valueDelay.onchange = () => {
  let value;
  if(valueDelay.checked === true){
    value = true;} else{ value = false; }
    set("valuedelay", value);
  
};
function toggleStatus() {
  let value;
  if (status_ck.checked) {
    value = "on";
  } else {
    value = "off";
  }
  set("status",value);


refreshStatusText();
}


// Refresh data
function refresh() {
  get("btcbal");
  get("btcclaimed");
  get("rpbal");
  get("rpclaimed");
  get("status");
  get("countdown");
  get("freebtcbonus");
  get("lottobonus");
  get("funbonus");
  get("wofbonus");
  get("randomdelay");
  get("valuedelay");
   if(document.getElementById("rpbal"))document.getElementById("rpbal").textContent = `${rpbal} RP`;
 
  if(document.getElementById("btcbal")){document.getElementById("btcbal").textContent = `${btcbal} BTC`;}
  if(document.getElementById("btcclaimed")){document.getElementById("btcclaimed").textContent = `Rolls: ${btcclaimed}`;}
  if(document.getElementById("rpclaimed")){document.getElementById("rpclaimed").textContent = `Bonuses: ${rpclaimed}`;}
  let cd = countdown.toString().match(regex);
  if(document.getElementById(`countdown`)){document.getElementById(`countdown`).textContent = `${cd || ""} remaining`;}
  console.log(`refresh rolls: ${btcclaimed}`);
  console.log(`refresh btcbal: ${btcbal}`);
  console.log(`refresh bonuses: ${rpclaimed}`);
  console.log(`refresh rpbal: ${rpbal}`);
  console.log(`refresh countdown: ${countdown}`);
  console.log(`status: ${state}`);
  console.log(`refresh _freeBTCBonus: ${_freeBTCBonus}`);
  console.log(`refresh _lottoBonus: ${_lottoBonus}`);
  console.log(`refresh _funBonus: ${_funBonus}`);
  console.log(`refresh _wofBonus: ${_wofBonus}`);
  console.log(`refresh _randomDelay: ${_randomDelay}`);
  console.log(`refresh _valueDelay: ${_valueDelay}`);
   refreshStatusText();
}
get("btcbal");
get("btcclaimed");
get("rpbal");
get("rpclaimed");
get("status");
get("freebtcbonus");
get("lottobonus");
get("funbonus");
get("wofbonus");

get("randomdelay");
get("valuedelay");
status_ck.checked = state == "on" ? true : false;
freeBTCBonus.checked = _freeBTCBonus == true ? true : false;
lottoBonus.checked = _lottoBonus == true ? true : false;
funBonus.checked = _funBonus == true ? true : false;
wofBonus.checked = _wofBonus == true ? true : false;
randomDelay.checked = _randomDelay == true ? true : false;
valueDelay.checked = _valueDelay == true ? true: false;
refreshStatusText();
refresh();

// Refresh loop (5 sec)
setInterval(() => {
  refresh();
  refreshStatusText();

}, 250);