var b = (typeof browser !== 'undefined')?browser:chrome


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

// Web elements
var eButton = document.getElementById('free_play_form_button');
var eBalance = document.getElementById("balance");
var randomInterval = function(){
	var i = ((Math.random()*1000)*20)+5000;
	console.log(i);
	return i;
	};
// Check loop
var timeout= function(){
	return setTimeout(function(){
	console.log("check if can roll...");
	if (eButton && eButton.style.display != "none"){
		b.runtime.sendMessage("roll");
	}
	timeout();
}, randomInterval());
};
timeout();

// Roll listener (to check if the addon is on)
b.runtime.onMessage.addListener(request => {
	if (request = "roll"){
		eventFire(eButton, 'click');
		console.log("roll !");
		return null;
	}
});

// Balance refresh loop
var balance = "0";
setInterval(function(){
	balance_ = eBalance?eBalance.innerHTML:"0.00000000";
	console.log("check changes in balance...");
	if (balance_ != balance){
		balance = balance_;
		b.runtime.sendMessage({"balance":balance});
		console.log("send new balance");
	}
}, 5000);