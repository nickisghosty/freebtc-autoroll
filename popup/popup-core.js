// Local variable ON/OFF
var status = localStorage.getItem('status');

// Check box element ON/OFF
var status_ck = document.getElementById("status_ck");

// Refresh texto ON/OFF
function refreshStatusText(){
	if (!status_ck.checked){
		document.getElementById("status").innerHTML = "OFF";
		document.getElementById("status").style.color = "#ccc";
	}
	else{
		document.getElementById("status").innerHTML = "ON";
		document.getElementById("status").style.color = "#feba00";
	}
}

function sendStatus(){
	sendData({"status": status}, function(){});
}

// Checkbox ON/OFF - on change listener 
status_ck.onchange = function(){
	status = status_ck.checked;
	localStorage.setItem('status', status);

	refreshStatusText();
	sendStatus();
};

// Send data to tab
function sendData(send, callback){
	browser.tabs.query({
		url: "*://*.freebitco.in/*"
	}).then(function(tabs){
		for (let tab of tabs) {
		    browser.tabs.sendMessage(
		      tab.id,
		      send
		    ).then(response => {
		    	callback(response);
		    }).catch(function(){
		    	console.error(`Error: ${error}`);
		    });
		  }
	}).catch(function(error){
		console.error(`Error: ${error}`);
	});
}

// Get data from tab
browser.runtime.onMessage.addListener(function(response){
	if (response.rolls){
		document.getElementById("rolls").innerHTML = "Rolls: "+response.rolls;
	}
	if (response.balance){
		document.getElementById("balance").innerHTML = response.balance+" BTC";
	}
	if (response.status){
		sendStatus();
	}
});

// Get information from tab
function getInformation(){
	sendData({data:"start"}, function(response){
		document.getElementById("rolls").innerHTML = "Rolls: "+response.rolls;
		document.getElementById("balance").innerHTML = response.balance+" BTC";
	});
}

// Refresh information on start
status_ck.checked = (status=="true"?true:false);
refreshStatusText();
sendStatus();
getInformation();

// Get refreshed information every 1 min
setInterval(function(){getInformation()}, 60*1000);