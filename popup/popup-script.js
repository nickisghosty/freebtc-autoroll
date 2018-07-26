var status_ck = document.getElementById("status_ck");

var countdown = localStorage.getItem("countdown");
var regex = /\d+\D\W\d+\D/;
var regtime = countdown.match(regex);

// Refresh text ON/OFF
function refreshStatusText() {
  if (!status_ck.checked) {
    document.getElementById("status").innerHTML = "OFF";
    document.getElementById("status").style.color = "#ccc";
  } else {
    document.getElementById("status").innerHTML = "ON";
    document.getElementById("status").style.color = "#803333";
  }
}

// On change status
status_ck.onchange = function() {
  localStorage.setItem("activate", status_ck.checked ? "on" : "off");

  refreshStatusText();
};

// Refresh data
function refresh() {
  document.getElementById("btcclaimed").innerHTML = "Rolls: " + (localStorage.getItem("btcclaimed") || "0");
    console.log("refresh rolls: "+ btcclaimed);
  document.getElementById("btcbal").innerHTML = (localStorage.getItem("btcbal") || "0.00000000") + " BTC";
    console.log("refresh btcbal: "+ btcbal);    
  document.getElementById("rpclaimed").innerHTML = "Bonuses: " + (localStorage.getItem("rpclaimed") || "0");
    console.log("refresh bonuses: "+ rpclaimed);    
  document.getElementById("rpbal").innerHTML = (localStorage.getItem("rpbal") || "0") + " RP";
    console.log("refresh rpbal: "+ rpbal);
  document.getElementById("countdown").innerHTML = (regtime || "") + " remaining";
    console.log("refresh countdown: "+ regtime);
    
}
// Set start values
status_ck.checked = localStorage.getItem("activate") == "on" ? true : false;
refreshStatusText();
refresh();

// Refresh loop (5 sec)
setInterval(refresh, 1000);
