// jshint esversion: 11
//variables
var btcbal = "0",
  rpbal = "0",
  countdown = "0",

  //html elems
  fpbtn_elem = document?.getElementById("free_play_form_button") || null,
  captcha_elem = document?.getElementById("play_without_captchas_button") || 0,
  countdown_elem = document?.getElementsByTagName("title")[0] || 0,
  btcbal_elem = document?.getElementById("balance") || 0,
  rpbal_elem = document?.getElementsByClassName("reward_table_box br_0_0_5_5 user_reward_points font_bold")[0]?.innerHTML.replace(",", ""),
freeBTCBonusDiv = document?.getElementById("bonus_container_fp_bonus") || null,
lottoBonusDiv = document?.getElementById("bonus_container_free_lott") || null,
funBonusDiv = document?.getElementById("bonus_container_fun_token") || null,
wofBonusDiv = document?.getElementById("bonus_container_free_wof") || null;

//rp bonus functions
function freeBTC1000() {
  window.wrappedJSObject.RedeemRPProduct('fp_bonus_1000');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fp_bonus_1000'));
}

function freeBTC500() {
  window.wrappedJSObject.RedeemRPProduct('fp_bonus_500');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fp_bonus_500'));
}

function freeBTC100() {
  window.wrappedJSObject.RedeemRPProduct('fp_bonus_100');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fp_bonus_100'));
}

function lotto100() {
  window.wrappedJSObject.RedeemRPProduct('free_lott_100');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_lott_100'));
}

function lotto50() {
  window.wrappedJSObject.RedeemRPProduct('free_lott_50');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_lott_50'));
}

function lotto25() {
  window.wrappedJSObject.RedeemRPProduct('free_lott_25');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_lott_25'));
}

function fun5() {
  window.wrappedJSObject.RedeemRPProduct('fun_token_5');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fun_token_5'));
}

function fun4() {
  window.wrappedJSObject.RedeemRPProduct('fun_token_4');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fun_token_4'));
}

function fun3() {
  window.wrappedJSObject.RedeemRPProduct('fun_token_3');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fun_token_3'));
}

function fun2() {
  window.wrappedJSObject.RedeemRPProduct('fun_token_2');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fun_token_2'));
}

function fun1() {
  window.wrappedJSObject.RedeemRPProduct('fun_token_1');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fun_token_1'));
}

function wof5() {
  window.wrappedJSObject.RedeemRPProduct('free_wof_5');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_wof_5'));
}

function wof4() {
  window.wrappedJSObject.RedeemRPProduct('free_wof_4');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_wof_4'));
}

function wof3() {
  window.wrappedJSObject.RedeemRPProduct('free_wof_3');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_wof_3'));
}

function wof2() {
  window.wrappedJSObject.RedeemRPProduct('free_wof_2');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_wof_2'));
}

function wof1() {
  window.wrappedJSObject.RedeemRPProduct('free_wof_1');
  XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_wof_1'));
}
//check if free play avail
function check() {
  update(); //update vars
  //if free roll button hidden
  if (fpbtn_elem && fpbtn_elem.style.display == "none") {
    //send title countdown to background
    browser.runtime.sendMessage(countdown);
    //if rp bonus counter hidden
    var rp = parseFloat(rpbal_elem);
    switch (true) {
      case freeBTCBonusDiv == null && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[23].textContent.replace(',', '')):
        browser.runtime.sendMessage('freebtc1000');
        break;
      case freeBTCBonusDiv == null && parseFloat(document.getElementsByClassName("reward_dollar_value_style")[23].textContent.replace(',', '')) > rp && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[24].textContent.replace(',', '')):
        browser.runtime.sendMessage('freebtc500');
        break;
      case freeBTCBonusDiv == null && parseFloat(document.getElementsByClassName("reward_dollar_value_style")[24].textContent.replace(',', '')) > rp && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[25].textContent.replace(',', '')):
        browser.runtime.sendMessage('freebtc100');
        break;
      case lottoBonusDiv == null && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[27].textContent.replace(',', '')):
        browser.runtime.sendMessage('lotto100');
        break;
      case lottoBonusDiv == null && parseFloat(document.getElementsByClassName("reward_dollar_value_style")[27].textContent.replace(',', '')) > rp && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[28].textContent.replace(',', '')):
        browser.runtime.sendMessage('lotto50');
        break;
      case lottoBonusDiv == null && parseFloat(document.getElementsByClassName("reward_dollar_value_style")[28].textContent.replace(',', '')) > rp && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[29].textContent.replace(',', '')):
        browser.runtime.sendMessage('lotto25');
        break;
      case funBonusDiv == null && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[32].textContent.replace(',', '')):
        browser.runtime.sendMessage('fun5');
        break;
      case funBonusDiv == null && parseFloat(document.getElementsByClassName("reward_dollar_value_style")[32].textContent.replace(',', '')) > rp && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[33].textContent.replace(',', '')):
        browser.runtime.sendMessage('fun4');
        break;
      case funBonusDiv == null && parseFloat(document.getElementsByClassName("reward_dollar_value_style")[33].textContent.replace(',', '')) > rp && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[34].textContent.replace(',', '')):
        browser.runtime.sendMessage('fun3');
        break;
      case funBonusDiv == null && parseFloat(document.getElementsByClassName("reward_dollar_value_style")[34].textContent.replace(',', '')) > rp && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[35].textContent.replace(',', '')):
        browser.runtime.sendMessage('fun2');
        break;
      case funBonusDiv == null && parseFloat(document.getElementsByClassName("reward_dollar_value_style")[35].textContent.replace(',', '')) > rp && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[36].textContent.replace(',', '')):
        browser.runtime.sendMessage('fun1');
        break;
      case wofBonusDiv == null && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[37].textContent.replace(',', '')):
        browser.runtime.sendMessage('wof5');
        break;
      case wofBonusDiv == null && parseFloat(document.getElementsByClassName("reward_dollar_value_style")[37].textContent.replace(',', '')) > rp && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[38].textContent.replace(',', '')):
        browser.runtime.sendMessage('wof4');
        break;
      case wofBonusDiv == null && parseFloat(document.getElementsByClassName("reward_dollar_value_style")[38].textContent.replace(',', '')) > rp && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[39].textContent.replace(',', '')):
        browser.runtime.sendMessage('wof3');
        break;
      case wofBonusDiv == null && parseFloat(document.getElementsByClassName("reward_dollar_value_style")[39].textContent.replace(',', '')) > rp && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[40].textContent.replace(',', '')):
        browser.runtime.sendMessage('wof2');
        break;
      case wofBonusDiv == null && parseFloat(document.getElementsByClassName("reward_dollar_value_style")[40].textContent.replace(',', '')) > rp && rp >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[41].textContent.replace(',', '')):
        browser.runtime.sendMessage('wof1');
        break;
        default:
          var noRP = [];
          for (var i = 23; i < 41; i++){

            if(rp < parseFloat(document.getElementsByClassName("reward_dollar_value_style")[i].textContent.replace(',', ''))){
              noRP.push(true);
            }
            else{
              noRP.push(false);
            }
          }
          if(!noRP.contains(false)){
            console.log("RP too low to claim any bonuses!");
          }
break;
    }
    }
    // if free roll button visable
   else if (fpbtn_elem && fpbtn_elem.style.display == "") {
    if (captcha_elem && captcha_elem.style.display == "") {
      browser.runtime.sendMessage("captcha");
      console.log("captcha");
    } else {
      browser.runtime.sendMessage('roll'); //send free play roll to bg
      console.log("rollllll");
    }
  }
}

//update vars
function update() {
  btcbal_ = btcbal_elem ? btcbal_elem.innerHTML : "0.00000000";
  rpbal_ = rpbal_elem ? rpbal_elem : "0";
  countdown_ = countdown_elem ? countdown_elem.innerHTML : "0";

  if (btcbal !== btcbal_elem && btcbal !== btcbal_) {
    btcbal = btcbal_;
    browser.runtime.sendMessage({
      btcbal: btcbal
    }); //send bal to bg
    console.log("new balance: " + btcbal);
  }
  if (rpbal !== rpbal_elem || rpbal !== rpbal_) {
    rpbal = rpbal_;
    browser.runtime.sendMessage({
      rpbal: rpbal
    }); //send bal to bg
    console.log("new RP Balance: " + rpbal);
  }
  if ((countdown !== null || countdown_elem !== null) && (countdown !== countdown_elem || countdown !== countdown_)) {
    countdown = countdown_;
    browser.runtime.sendMessage({
      countdown: countdown
    }); //send countdown to bg
  }
  if(fpbtn_elem == null) {fpbtn_elem = document?.getElementById("free_play_form_button") || null;}
if(captcha_elem == 0){captcha_elem = document?.getElementById("play_without_captchas_button") || 0;}
 if(countdown_elem == 0) countdown_elem = document?.getElementsByTagName("title")[0] || 0;
  if(btcbal_elem ==0) btcbal_elem = document?.getElementById("balance") || 0;
 if(rpbal_elem ==0) rpbal_elem = document?.getElementsByClassName("reward_table_box br_0_0_5_5 user_reward_points font_bold")[0]?.innerHTML.replace(",", "")||0;
  if (freeBTCBonusDiv == null) freeBTCBonusDiv = document?.getElementById("bonus_container_fp_bonus") || null;
  if (lottoBonusDiv == null) lottoBonusDiv = document?.getElementById("bonus_container_free_lott") || null;
  if (funBonusDiv == null) funBonusDiv = document?.getElementById("bonus_container_fun_token") || null;
if(wofBonusDiv==null) wofBonusDiv = document?.getElementById("bonus_container_free_wof") || null;
}
setInterval(check, 1000); //loop check for free play/update vars

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
browser.runtime.onMessage.addListener((request) => {

  switch (request) {
    case "roll":
      eventFire(fpbtn_elem, "click"); //click free roll
      fpbtn_elem.trigger('click');
      console.log("roll !");
      //  return null;
      break;
    case "captcha":
      eventFire(captcha_elem, "click");
      captcha_elem.trigger('click');
      console.log("no captchas clicked");
      setTimeout(() => {
        eventFire(fpbtn_elem, "click");
      }, (Math.random() * 10000) + 10000);
      break;
      case "freebtc1000":
        freeBTC1000();
break;
case "freebtc500":
  freeBTC500();
  break;
  case "freebtc100":
    freeBTC100();
    break;
    case "lotto100":
      lotto100();
      break;
      case "lotto50":
        lotto50();
        break;
        case "lotto25":
          lotto25();
          break;

          case "fun5":
            fun5();
            break;
            case "fun4":
              fun4(); 
              break;
              case "fun3":
                fun3();
                break;
                case "fun2":
                  fun2();
                  break;
                  case "fun1":
                    fun1();
                    break;
                    
          case "wof5":
            wof5();
            break;
            case "wof4":
              wof4(); 
              break;
              case "wof3":
                wof3();
                break;
                case "wof2":
                  wof2();
                  break;
                  case "wof1":
                    wof1();
                    break;
                    /*case "fp_100":
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
          break;*/
  }

});