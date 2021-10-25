var adcontainer = document.createElement('div');

adcontainer.innerHTML = `<iframe data-aa="1120341" src="https://acceptable.a-ads.com/1120341" style="border:0px; padding:0; width:100%; height:100%; overflow:hidden; background-color: transparent;" ></iframe>`;



var adcont2 = document.createElement('div');
adcont2 = `<a href="https://a-ads.com?partner=1643535">Advertise with Anonymous Ads</a><br 
/><br />
<iframe data-aa="1643535" src="https://ad.a-ads.com/1643535?size=320x50" 
scrolling="no" style="width:320px; height:50px; border:0px; padding:10; 
overflow:hidden" allowtransparency="true"></iframe>`;
adcont2.style.margin = "auto";
adcont2.style.width = "320px";
adcont2.style.textAlign = "center";
document.body.firstChild.appendChild(adcont2);
adcontainer.style.margin = "auto";
adcontainer.style.width = "320px";
adcontainer.style.textAlign = "center";
document.body.appendChild(adcontainer);