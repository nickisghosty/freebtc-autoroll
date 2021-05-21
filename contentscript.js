//firefox or chrome
var b = typeof browser !== "undefined" ? browser : chrome; 
chrome.runtime.sendMessage('test', response => {
  console.log(response);
});

//variables
var btcbal = "0",
  rpbal = "0",
  countdown = "0",

//html elems
  fpbtn_elem = document.getElementById("free_play_form_button"),
  countdown_elem = document.getElementsByTagName("title")[0],
  btcbal_elem = document.getElementById("balance"),
  rpbal_elem = document.getElementsByClassName("reward_table_box br_0_0_5_5 user_reward_points font_bold")[0].innerHTML.replace(",", "");

//rp bonus functions
function hundredrp() {
  window.wrappedJSObject.RedeemRPProduct("free_points_100");
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct("free_points_100"));
}
function fiftyrp() {
  window.wrappedJSObject.RedeemRPProduct("free_points_50");
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct("free_points_50"));
}
function twentyfiverp() {
  window.wrappedJSObject.RedeemRPProduct("free_points_25");
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct("free_points_25"));
}
function tenrp() {
  window.wrappedJSObject.RedeemRPProduct("free_points_10");
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct("free_points_10"));
}
function onerp() {
  window.wrappedJSObject.RedeemRPProduct("free_points_1");
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct("free_points_1"));
}

//check if free play avail
function check() {
  update();//update vars
  //if free roll button hidden
  if (fpbtn_elem && fpbtn_elem.style.display == "none") {
    //send title countdown to background
    b.runtime.sendMessage(countdown);
    //if rp bonus counter hidden
    if (!document.getElementById("bonus_container_free_points")) {
      //if value of rp bal > 1200 claim 100 rp / hr bonus
      var rp = parseFloat(rpbal_elem)
      switch (true) {
        case rp >= 1200:
          b.runtime.sendMessage('fp_100');//send rp bonus to bg
          break;
        case 1200 > rp >= 600:
          b.runtime.sendMessage('fp_50');//send rp bonus to bg
          break;
        case 600 > rp >= 300:
          b.runtime.sendMessage('fp_25');//send rp bonus to bg
          break;
        case 300 > rp >=120:
          b.runtime.sendMessage('fp_10');//send rp bonus to bg
          break;
          case 120 > rp >= 12:
            b.runtime.sendMessage('fp_1');//send rp bonus to bg
          break;
        default:console.log("Not enough RP for any bonus")
          break;
      }
     
    }
    // if free roll button visable
  } else if (fpbtn_elem && fpbtn_elem.style.display == "") {
    b.runtime.sendMessage('roll');//send free play roll to bg
    console.log("rollllll");
  }
}

//update vars
function update() {
  btcbal_ = btcbal_elem ? btcbal_elem.innerHTML : "0.00000000";
  rpbal_ = rpbal_elem ? rpbal_elem : "0";
  countdown_ = countdown_elem ? countdown_elem.innerHTML : "0";

  if (btcbal !== btcbal_elem && btcbal !== btcbal_) {
    btcbal = btcbal_;
    b.runtime.sendMessage({ btcbal: btcbal });//send bal to bg
    console.log("new balance: " + btcbal);
  }
  if (rpbal !== rpbal_elem || rpbal !== rpbal_) {
    rpbal = rpbal_;
    b.runtime.sendMessage({ rpbal: rpbal });//send bal to bg
    console.log("new RP Balance: " + rpbal);
  }
  if ((countdown !== null || countdown_elem !== null) && (countdown !== countdown_elem || countdown !== countdown_)) {
    countdown = countdown_;
    b.runtime.sendMessage({ countdown: countdown });//send countdown to bg
  }
}
setInterval(check, 1000);//loop check for free play/update vars

// click elem function
function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent("on" + etype);
  } else {
    var evObj = document.createEvent("Events");
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
//listen  for messages from bg
b.runtime.onMessage.addListener(request => {

  switch (request) {
    case "roll":
      eventFire(fpbtn_elem, "click");//click free roll
      console.log("roll !");
      //  return null;
      break;
  case "fp_100":
    hundredrp();//click redeem rp bonus 100
    console.log("bonus 100");
    break;
    case "fp_50":
      fiftyrp();//click redeem rp bonus 100
      console.log("bonus 50");
      break;
      case "fp_25":
        twentyfiverp();//click redeem rp bonus 100
        console.log("bonus 25");
        break;
        case "fp_10":
          tenrp();//click redeem rp bonus 100
          console.log("bonus 10");
          break;
          case "fp_1":
            onerp();//click redeem rp bonus 100
            console.log("bonus 1");
            break;
            default:
      break;
  }
  
});
