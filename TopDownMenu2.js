init3();

function init3(){
	var newDiv = document.createElement("div");
	newDiv.setAttribute("id","myshares");
	newDiv.setAttribute("class","mySharesPanel");
	document.body.appendChild(newDiv);
// NOTE Lots of the stuff below will go in a .css file
	newDiv.style.position = "fixed";
	newDiv.style.left = "200px";
	newDiv.style.top = "40px";
	newDiv.style.overflow = "scroll";
	newDiv.style.height = '85%';
	newDiv.style.border = "2px solid #333333";
	newDiv.style.borderRadius = "6px";
	newDiv.style.zIndex = "100000";
	newDiv.style.backgroundColor = 'white';
	$('#myshares').hide();

	var newDiv2 = document.createElement("div");
	newDiv2.setAttribute("id","mybutton");
	newDiv2.setAttribute("class","mySharesButton showPointer");
	$('#acct-value > a').parent().parent().prepend(newDiv2);
	newDiv2.style.height = "24px";
	newDiv2.style.width = "108px";
 	newDiv2.innerHTML = "MY SHARES";//"<span id='myspan' style='background-color:#d9534f;font-size:12px;color:white;font-weight:bold;'>MY SHARES</span>";
	newDiv2.style.color = "white";
	newDiv2.style.fontWeight = "bold";
	newDiv2.style.fontSize = "12px";
	newDiv2.style.backgroundColor = "#d9534f";
	// maybe add mouseover color:  #d2322d
	newDiv2.style.border = "1px solid #d43f3a";
	newDiv2.style.paddingRight = "20px";
	newDiv2.style.borderRadius = "3px";
	newDiv2.style.lineHeight = "8px";
	$('body').on('click', '#mybutton', toggleMyShares);
}

jQuery(document).ready(LoadShares);

$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
	window.location.hash = e.target.hash;
	window.scrollTo(0, 0);
});

// function TradeRefresh() {
// 	LoadShares();
// 	updateFundsMainNav(false);
// };

function LoadShares() {
	window.scrollTo(0, 0);
	$.ajax({
		type: 'GET',
    	url: '/Profile/GetSharesAjax',
    	cache: 'false',
		traditional: true,
		success: function(result) {
			$('#myshares').html(result);
		}
    });
    init();
};

function toggleMyShares(){ 
	LoadShares();
	$('#myshares > p').remove();
	$('#myshares').toggle();
}
