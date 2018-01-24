// Fake click function
function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

// Send information
function send_information(){
	browser.runtime.sendMessage({"rolls": rolls, "balance":document.getElementById("balance").innerHTML});
}

// Roll !
function roll(){
	var element = document.getElementById('free_play_form_button');
	if (element && element.style.display != "none"){
		eventFire(element, 'click');

		// send new data
		rolls++;
		send_information();	
	}
}

// Current rolls
var rolls = 0;

// Current addon status
var status = false;

// Interval check
var interval = 5; // minutes

// Loop check
setInterval(function(){
	if (status == "true") roll();
}, interval*60*1000);

// Popup data listener
browser.runtime.onMessage.addListener(request => {
	if (request.data == "start"){
		return Promise.resolve({"rolls": rolls, "balance":document.getElementById("balance").innerHTML});
	}
	if (request.status){
		status = request.status;
		return null;
	}
});

// Request for current status
browser.runtime.sendMessage("status");