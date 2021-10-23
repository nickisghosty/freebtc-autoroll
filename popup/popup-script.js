/*jshint esversion: 11*/
const status_ck = document.getElementById("status_ck");

var countdown = '',
 btcclaimed = 0,
 rpbal = '',

 rpclaimed = 0,
 state = "",
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
}
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
  refreshStatusText();
}

get("status");
status_ck.checked = state == "on" ? true : false;
refreshStatusText();
refresh();

// Refresh loop (5 sec)
setInterval(() => {
  refresh();
  refreshStatusText();
}, 1000);