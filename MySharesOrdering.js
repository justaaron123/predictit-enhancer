//Retrieve previous view from storage

chrome.storage.sync.get('currentView', function(x){currentView=x.currentView;
	if(currentView==null){
		currentView={};
	}
	init();
	});

var scriptToInject = function(){
	OldLoadShares = LoadShares;
	
	LoadShares = function(){
		OldLoadShares();
		
		window.postMessage("Please run init.", "*")
	}
}
injectScript(scriptToInject);

function injectScript(func) {
	var actualCode = '(' + func + ')();'
  var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
}

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data== "Please run init.") {
		console.log("message received")
		init();
  }
}, false);

function init(){
	
	console.log("I called init");

	Markets = document.getElementsByClassName("panel panel-default activity hidden-xs")

	Markets = Array.prototype.slice.call(Markets)
	//Find all markets in which user has shares or offers
	

	Secrets = document.getElementsByClassName("shares-mobile")
	//Find all hidden mobile markets
	
	if(Markets.length==0 || Secrets.length==0){
		setTimeout(init, 100);
		return;
	}

	for(i=Secrets.length-1; i>=0; i--){
		Secrets[i].parentNode.removeChild(Secrets[i]);
	}
	//Remove hidden mobile markets
	
	var counter = Object.keys(currentView).length;
	
	// Setup for Price List displaying
	document.getElementsByClassName("outcome-title")[0].children[0].children[0].id = "ref_point";
	for (i=0; i < document.getElementsByClassName("outcome-title").length; i++){
      var thingy2 = document.getElementsByClassName("outcome-title")[i].children[0].children[0];
      thingy2.onmouseover = function(){showPrices(this)};
      thingy2.onmouseout = function(){$('#price_tables').remove()};
	}	
	
	for(i=0; i<Markets.length; i++){
      if(currentView[getName(Markets[i])]==null){
        currentView[getName(Markets[i])]=[counter, false];
        counter++;
      }
      //Set a view position for new markets that were not included at last load, 
      //automatically sent to bottom of viewpage
		
      makeButtons(Markets[i]);	
	}
	save();
	reorder(Markets);
}


//Adds up and down buttons, Collapse/expand button for linked markets

function makeButtons(market){
	x = market.getElementsByClassName("margin-title");

	down = makeDown(x[0], market);
	up = makeUp(x[0], market);

	if(market.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild !=null){
		collapse = makeCollapse(x[0], market);
	}
		
	x[0].insertBefore(up, x[0].firstChild);	
	x[0].insertBefore(down, x[0].firstChild);	
}



//Make a down button

function makeDown(x, market){
	var down = document.createElement("span");
	down.innerText = '\u2B07';
	down.onmouseenter = function(){down.style.color="white";down.style.cursor="pointer";};
	down.onmouseout = function(){down.style.color = "";down.style.cursor="auto";};
	
	
	down.addEventListener("click", function(){
		if(currentView[getName(market)][0] != currentView.length){
			temp = 	currentView[getName(market)][0]
			currentView[getName(market)][0]=currentView[getName(market.nextElementSibling)][0];
			currentView[getName(market.nextElementSibling)][0] = temp;
			market.parentElement.insertBefore(market.nextElementSibling,market);
		}
		//onclick: swap the ordering with market and its nextElementSibling, reset values in currentView
		
		save();
	});

	return down;
}


//Make an up button

function makeUp(x, market){
	var up = document.createElement("span");
	up.innerText = '\u2B06';
	up.onmouseenter = function(){up.style.color="white";up.style.cursor="pointer";};
	up.onmouseout = function(){up.style.color="";up.style.cursor="auto";};
	up.addEventListener("click", function(){
		if(currentView[getName(market)][0] != 0){
			temp = currentView[getName(market)][0]
			currentView[getName(market)][0] = currentView[getName(market.previousElementSibling)][0];
			currentView[getName(market.previousElementSibling)][0]= temp;
			market.parentElement.insertBefore(market, market.previousElementSibling);
		}
		
		//onclick: swap the ordering with market and its previousElementSibling, reset values in currentView	
		
		save();
	});
	return up;
}


//Make a Collapse and Expand button. Only applies to linked markets.

function makeCollapse(x, market){
	var collapse = document.createElement("span");
	collapse.innerText=" Collapse";
	collapse.onmouseenter = function(){collapse.style.color="white";collapse.style.cursor="pointer";};
	collapse.onmouseout = function(){collapse.style.color="";collapse.style.cursor="auto";};

//onclick: find rows that are to be collapsed/expanded. Check current mode, switch to other mode.
	collapse.addEventListener("click", function(){	
		body = market.getElementsByTagName("tbody");
		rows = body[0].getElementsByTagName("tr");
		
		if(currentView[getName(market)][1]==false){
			for(i=0; i<rows.length-1; i++){
				rows[i].hidden = true;
			}
			collapse.innerText=" Expand";
			currentView[getName(market)][1] = true;
			save();
		}
		
		else{
			for(i=0; i<rows.length-1; i++){
				rows[i].hidden = false;
			}
			collapse.innerText=" Collapse";
			currentView[getName(market)][1] = false;
			save();
		}
		
		});
	
	x.insertBefore(collapse, x.firstChild);
}


//Find the title that PI gives to each market as identifier.

function getName(market){
	headBar = market.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
	if(headBar==null){
		name=market.firstElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.firstElementChild.nextElementSibling.innerText
	}else{
		name=headBar.innerText;
	}
	name=name.trim();
	return name;

}


//Restore previous view options

function reorder(Markets){
	len = Object.keys(currentView).length;
	
	//looking for the item that should be in position j, send that item to top
	for(j=len-1; j>=0; j--){
		for(k=0; k<Markets.length; k++){
			if(currentView[getName(Markets[k])][0]==j){
				Markets[k].parentElement.insertBefore(Markets[k], Markets[k].parentElement.firstElementChild.nextElementSibling);		
			}
		}		
	}
	
	console.log(currentView);
	
	//collapse those markets that were previously collapsed. Repeat code, clean up eventually.
	for(k=0; k<Markets.length; k++){
		if(currentView[getName(Markets[k])][1]==true){
			body = Markets[k].getElementsByTagName("tbody");
			rows = body[0].getElementsByTagName("tr");
			for(i=0; i<rows.length-1; i++){
				rows[i].hidden = true;
			}
			x=Markets[k].getElementsByClassName("margin-title")[0];
			x.firstElementChild.nextElementSibling.nextElementSibling.innerText=" Expand"
		}
	}

}


//Save current view options

function save(){
	chrome.storage.sync.set({'currentView': currentView}, function() {
		console.log('Settings saved');
  });
}


// show share prices for a given market
function showPrices(element) { 
  var newDiv = document.createElement("div");
  newDiv.setAttribute("id","price_tables");
  document.body.appendChild(newDiv);
  newDiv.style.position = "fixed";
  newDiv.style.left = "500px";
  newDiv.style.top = "150px";
  newDiv.style.backgroundColor = 'white';
  
  that = element.parentNode.parentNode;
  var URL = that.children[0]+"#openoffers #openoffers1";

  $('#price_tables').load(URL);
  newDiv.style.border = '1px solid #dddddd';
}