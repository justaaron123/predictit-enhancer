init();

function init(){
  document.getElementsByClassName("outcome-title")[0].children[0].children[0].id = "first_market";
  for (i = 0; i < $('.sharesMarket').length; i++) { 
    var thingy2 = document.getElementsByClassName("outcome-title")[i].children[0].children[0];
    thingy2.onmouseover = function(){showPrices(this)};
    thingy2.onmouseout = function(){$('#price_tables').remove()};
  }
}

function showPrices(element) { 
  var newDiv = document.createElement("div");
  newDiv.setAttribute("id","price_tables");
  document.body.appendChild(newDiv);
  newDiv.style.position = "absolute";
  var eTop = $('#first_market').offset().top - 220;
  var eLeft = $('#first_market').offset().left + 230;
  newDiv.style.left = eLeft+"px";
  newDiv.style.top = eTop+"px";
  newDiv.style.backgroundColor = 'white';
  
  that = element.parentNode.parentNode;
  var URL = that.children[0]+"#openoffers #openoffers1";

  $('#price_tables').load(URL);
  newDiv.style.border = '1px solid #dddddd';
}

canary = document.createElement("span");
canary.setAttribute("id","canary");
document.getElementsByClassName("outcome-title")[0].children[0].children[0].id = "first_market";
document.getElementById("first_market").appendChild(canary);
var checkId = setInterval(check, 100);

function check(){
  if(!$("#canary").length){
    clearInterval(checkId); 
    init(); 
  }
}