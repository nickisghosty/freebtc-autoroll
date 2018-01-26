var b = (typeof browser !== 'undefined')?browser:chrome

// Send data to tabs
function sendData(send, callback){
	if (callback == null)callback = function(){};
	b.tabs.query({
		url: "*://*.freebitco.in/*"
	}).then(function(tabs){
		for (let tab of tabs) {
		    b.tabs.sendMessage(
		      tab.id,
		      send
		    ).then(response => {
		    	callback(response);
		    }).catch(function(error){
		    	console.error(`Error: ${error}`);
		    });
		  }
	}).catch(function(error){
		console.error(`Error: ${error}`);
	});
}

// Get data from tab
b.runtime.onMessage.addListener(function(response){
	console.log("response: "+response);

	if (response == "roll"){
		if (getStatus() == "on"){
			sendData("roll", null);
			addCount();
		}
	}
	if (response.balance){
		console.log("set new balance: "+response.balance);
		setBalance(response.balance);
	}
});

// Status get and set
function setStatus(value){
	localStorage.setItem("activate", value);
}
function getStatus(){
	return localStorage.getItem("activate") || "off";
}

// Balance get and set
function setBalance(value){
	localStorage.setItem("balance", value);
}
function getBalance(){
	return localStorage.getItem("balance") || 0;
}

// Count get and set
function addCount(){
	localStorage.setItem("count", getCount()+1);
}
function getCount(){
	return parseInt(localStorage.getItem("count")) || 0;
}

// Set initial status
setStatus("on");