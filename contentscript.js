/* jshint esversion:6 */

var btcBalElem = () => document.getElementById("balance").textContent,
    rpBalElem = () => document.getElementsByClassName("reward_table_box br_0_0_5_5 user_reward_points font_bold")[0].innerText.replace(",", ""),
    countdownElem = () => document.getElementsByTagName("title")[0].text,
    fpButtonElem = document.getElementById("free_play_form_button"),
    captchaButtonElem = document.getElementById("play_without_captchas_button"),
    freeBTCBonusDivElem = document.getElementById("bonus_container_fp_bonus"),
    lottoBonusDivElem = document.getElementById("bonus_container_free_lott"),
    funBonusDivElem = document.getElementById("bonus_container_fun_token"),
    wofBonusDivElem = document.getElementById("bonus_container_free_wof"),
    port = browser.runtime.connect({ name: "freebtc-port" }),
sameIPElem = document.getElementById("same_ip_error"),

    regex = /\d+\D\W\d+\D/;
var _countdown,
    _freeBTC = false,
    _lotto = false,
    _funTokens = false,
    _wof = false,
    _randomDelay = true,
    _status = true,
    _valueDelay = false,
    _delaySeconds = 0;

regtime = () => {
    const cd = countdownElem();
    return cd.match(regex) ? cd.match(regex) : "0";
};
_countdown = () => regtime()[0];



setInterval(() => {
    port.postMessage({
        message: 'set',
        value: {
            '_countdown': _countdown(),
            '_btcBal': btcBalElem(),
            '_rpBal': rpBalElem()
        }
    });

    if (fpButtonElem && fpButtonElem.style.display == "inline-block" && sameIPElem.style.display == "none") {
        if (captchaButtonElem && captchaButtonElem.style.display == "block") {
            if (_randomDelay) {
                setTimeout(() => {
                    captchaButtonElem.trigger('click');
                    eventFire(captchaButtonElem, "click");

                }, 5000);
                setTimeout(() => {

                    console.log('captcha');
                    eventFire(fpButtonElem, "click");
                    fpButtonElem.click();
                }, (Math.random() * 10000) + 1000);
            } else if (_valueDelay) {
                setTimeout(() => {
                    console.log('captcha');
                    eventFire(captchaButtonElem, "click");
                    captchaButtonElem.trigger('click');
                    eventFire(fpButtonElem, "click");
                    fpButtonElem.trigger('click');

                }, _delaySeconds);
            }
            console.log("captcha");
        }
    }else if(sameIPElem.style.display == "none" || !sameIPElem){
            if (_randomDelay) {
                setTimeout(() => {
                    eventFire(fpButtonElem, "click");
                }, (Math.random() * 10000) + 10000);
            } else if (_valueDelay) {
                setTimeout(() => {
                    eventFire(fpButtonElem, "click");
                }, _delaySeconds);
            }

            console.log("rollllll");
        
        port.postMessage({ msg: 'roll' }); //send free play roll to bg


    }
    var _rpBal = rpBalElem();
    freeBTCBonusDivElem = document.getElementById("bonus_container_fp_bonus");
    lottoBonusDivElem = document.getElementById("bonus_container_free_lott");
    funBonusDivElem = document.getElementById("bonus_container_fun_token");
    wofBonusDivElem = document.getElementById("bonus_container_free_wof");
    if (_freeBTC) {
        if (freeBTCBonusDivElem == null) {
            switch (true) {
                case _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[23].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    freeBTC1000();
                    break;
                case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[23].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[24].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    freeBTC500();
                    break;
                case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[24].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[25].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    freeBTC100();
                    break;
                default:
                    console.log("not enough rp for freebtcbonus");
                    break;
            }
        }
        else {
            console.log("freebtcbonus already claimed");
        }
    }
    if (_lotto) {
        if (lottoBonusDivElem == null) {
            switch (true) {
                case _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[27].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    lotto100();
                    break;
                case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[27].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[28].textContent.replace(',', '')):
                    lotto50();
                    port.postMessage({ msg: 'bonus' });
                    break;
                case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[28].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[29].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    lotto25();
                    break;
                default:
                    console.log("not enough _rpBal for lottobonus");
                    break;

            }
        } else { console.log("lottobonus already running"); }


    }
    if (_funTokens) {
        if (!funBonusDivElem) {
            switch (true) {
                case _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[32].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    fun5();
                    break;
                case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[32].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[33].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    fun4();
                    break;
                case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[33].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[34].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    fun3();
                    break;
                case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[34].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[35].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    fun2();
                    break;
                case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[35].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[36].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    fun1();
                    break;
                default:
                    console.log('not enough _rpBal for funbouns');
                    break;
            }
        } else { console.log("funbonus already claimed"); }
    }
    if (_wof) {
        if (!wofBonusDivElem) {
            switch (true) {
                case _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[37].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    wof5();
                    break;
                case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[37].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[38].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    wof4();
                    break;
                case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[38].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[39].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    wof3();
                    break;
                case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[39].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[40].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    wof2();
                    break;
                case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[40].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[41].textContent.replace(',', '')):
                    port.postMessage({ msg: 'bonus' });
                    wof1();
                    break;
                default:
                    console.log("not enough rp for wofbonus");
                    break;
            }
        } else {
            console.log("wofbonus already claimed");
        }
    }
    if (_countdown() === 0|| _countdown() === "0") {
        if (_randomDelay) {
            eventFire(captchaButtonElem, "click");
            setTimeout(() => {
                eventFire(fpBUttonElem, "click");

            }, (Math.random() * 10000) + 10000);
        }
    }
}, 1000);
setInterval(() => {
        port.postMessage({
            message: 'get',
            value: ''

        });
    if (_status) {

        if (fpButtonElem && fpButtonElem.style.display == "inline-block") {
            if (captchaButtonElem && captchaButtonElem.style.display == "block") {
                if (_randomDelay) {
                    setTimeout(() => {
                        captchaButtonElem.trigger('click');
                        eventFire(captchaButtonElem, "click");

                    }, 5000);
                    setTimeout(() => {

                        console.log('captcha');
                        eventFire(fpButtonElem, "click");
                        fpButtonElem.click();
                    }, (Math.random() * 10000) + 10000);
                } else if (_valueDelay) {
                    setTimeout(() => {
                        console.log('captcha');
                        eventFire(captchaButtonElem, "click");
                        captchaButtonElem.trigger('click');
                        eventFire(fpButtonElem, "click");
                        fpButtonElem.trigger('click');

                    }, _delaySeconds);
                }
                console.log("captcha");
            } else {
                if (_randomDelay) {
                    setTimeout(() => {
                        eventFire(fpButtonElem, "click");
                    }, (Math.random() * 10000) + 10000);
                } else if (_valueDelay) {
                    setTimeout(() => {
                        eventFire(fpButtonElem, "click");
                    }, _delaySeconds);
                }

                console.log("rollllll");
            }
            port.postMessage({ msg: 'roll' }); //send free play roll to bg


        }
        var _rpBal = rpBalElem();
        freeBTCBonusDivElem = document.getElementById("bonus_container_fp_bonus");
        lottoBonusDivElem = document.getElementById("bonus_container_free_lott");
        funBonusDivElem = document.getElementById("bonus_container_fun_token");
        wofBonusDivElem = document.getElementById("bonus_container_free_wof");
        if (_freeBTC) {
            if (freeBTCBonusDivElem == null) {
                switch (true) {
                    case _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[23].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        freeBTC1000();
                        break;
                    case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[23].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[24].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        freeBTC500();
                        break;
                    case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[24].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[25].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        freeBTC100();
                        break;
                    default:
                        console.log("not enough rp for freebtcbonus");
                        break;
                }
            }
            else {
                console.log("freebtcbonus already claimed");
            }
        }
        if (_lotto) {
            if (lottoBonusDivElem == null) {
                switch (true) {
                    case _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[27].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        lotto100();
                        break;
                    case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[27].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[28].textContent.replace(',', '')):
                        lotto50();
                        port.postMessage({ msg: 'bonus' });
                        break;
                    case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[28].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[29].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        lotto25();
                        break;
                    default:
                        console.log("not enough _rpBal for lottobonus");
                        break;

                }
            } else { console.log("lottobonus already running"); }


        }
        if (_funTokens) {
            if (!funBonusDivElem) {
                switch (true) {
                    case _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[32].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        fun5();
                        break;
                    case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[32].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[33].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        fun4();
                        break;
                    case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[33].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[34].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        fun3();
                        break;
                    case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[34].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[35].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        fun2();
                        break;
                    case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[35].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[36].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        fun1();
                        break;
                    default:
                        console.log('not enough _rpBal for funbouns');
                        break;
                }
            } else { console.log("funbonus already claimed"); }
        }
        if (_wof) {
            if (!wofBonusDivElem) {
                switch (true) {
                    case _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[37].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        wof5();
                        break;
                    case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[37].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[38].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        wof4();
                        break;
                    case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[38].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[39].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        wof3();
                        break;
                    case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[39].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[40].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        wof2();
                        break;
                    case parseFloat(document.getElementsByClassName("reward_dollar_value_style")[40].textContent.replace(',', '')) > _rpBal && _rpBal >= parseFloat(document.getElementsByClassName("reward_dollar_value_style")[41].textContent.replace(',', '')):
                        port.postMessage({ msg: 'bonus' });
                        wof1();
                        break;
                    default:
                        console.log("not enough rp for wofbonus");
                        break;
                }
            } else {
                console.log("wofbonus already claimed");
            }
        }

    }
}, 10000);


port.onMessage.addListener(function (msg) {
    console.log(`${msg.message} : ${msg.value}`);
    if (msg.message === 'set') {
        switch (true) {
            case msg.value._status !== _status:
                _status = msg.value._status;
                break;
            case msg.value._freeBTC !== _freeBTC:
                _freeBTC = msg.value._freeBTC;
                break;
            case msg.value._lotto !== _lotto:
                _lotto = msg.value._lotto;
                break;
            case msg.value._funTokens !== _funTokens:
                _funTokens = msg.value._funTokens;
                break;
            case msg.value._wof !== _wof:
                _wof = msg.value._wof;
                break;
            case msg.value._randomDelay !== _randomDelay:
                _randomDelay = msg.value._randomDelay;
                break;
            case msg.value._valueDelay !== _valueDelay:
                _valueDelay = msg.value._valueDelay;
                break;
            case msg.value._delaySeconds !== _delaySeconds:
                _delaySeconds = msg.value._delaySeconds;
                break;
        }
    }

});
function clickRewardsTab(){
    document.getElementsByClassName("rewards_link")[0].click();

}

function freeBTC1000() {
    clickRewardsTab();
    window.wrappedJSObject.RedeemRPProduct('fp_bonus_1000');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fp_bonus_1000'));
}

function freeBTC500() {
    clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('fp_bonus_500');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fp_bonus_500'));
}

function freeBTC100() {
    clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('fp_bonus_100');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fp_bonus_100'));
}

function lotto100() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('free_lott_100');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_lott_100'));
}

function lotto50() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('free_lott_50');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_lott_50'));
}

function lotto25() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('free_lott_25');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_lott_25'));
}

function fun5() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('fun_token_5');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fun_token_5'));
}

function fun4() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('fun_token_4');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fun_token_4'));
}

function fun3() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('fun_token_3');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fun_token_3'));
}

function fun2() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('fun_token_2');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fun_token_2'));
}

function fun1() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('fun_token_1');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('fun_token_1'));
}

function wof5() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('free_wof_5');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_wof_5'));
}

function wof4() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('free_wof_4');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_wof_4'));
}

function wof3() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('free_wof_3');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_wof_3'));
}

function wof2() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('free_wof_2');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_wof_2'));
}

function wof1() {
        clickRewardsTab();

    window.wrappedJSObject.RedeemRPProduct('free_wof_1');
    XPCNativeWrapper(window.wrappedJSObject.RedeemRPProduct('free_wof_1'));
}

function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent("on" + etype);
    } else {
        var evObj = document.createEvent("Events");
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}