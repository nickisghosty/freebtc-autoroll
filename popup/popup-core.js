var status_ck = document.getElementById("status_ck");

// Refresh text ON/OFF
function refreshStatusText(){
	if (!status_ck.checked){
		document.getElementById("status").textContent = "OFF";
		document.getElementById("status").style.color = "#ccc";
	}
	else{
		document.getElementById("status").textContent = "ON";
		document.getElementById("status").style.color = "#feba00";
	}
}

// On change status
status_ck.onchange = function(){
	localStorage.setItem("activate", status_ck.checked?"on":"off");

	refreshStatusText();
};

// Refresh data
function refresh(){
	document.getElementById("rolls").textContent = "Rolls: "+(localStorage.getItem("count") || "0");
	document.getElementById("balance").textContent = (localStorage.getItem("balance") || "0.00000000")+" BTC";
}

// Set start values
status_ck.checked = (localStorage.getItem("activate")=="on"?true:false);
refreshStatusText();
refresh();

// Refresh loop (5 sec)
setInterval(function(){
	refresh();
}, 5000);