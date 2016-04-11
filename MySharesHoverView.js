$(document).ready(function(){
	$('#contractList > p').html("<b>PredictIt Enhancer:</b><br>Hover over any share price below to see the full price table.<br>Hover over your owned shares and buy/sell offers to see details.");
	$('body').on('mouseenter', '.alert-danger, .alert-success, .alert-offers-red, .alert-offers-green', showShares);
	$('body').on('mouseleave', '.alert-danger, .alert-success, .alert-offers-red, .alert-offers-green, #contractListTable tr', function(){$('#share_table2').remove();});
	var shareTable = $('<div id="share_table"></div>');
	shareTable.hide()
	.appendTo('body');
});

showShares = function(f) {
	var $tShares = $(this);
	var pos = $tShares.offset();
	if ($('#price_table').length){
		$('#price_table').remove();
	}
	if ($('#share_table2').length){
		$('#share_table2').remove();
	}
	var shareTable2 = $('<div id="share_table2"></div>');
		shareTable2.hide()
		.css('position', 'absolute')
		.css('top', pos.top - 115 + 'px')
		.css('background-color','white')
		.css('border-radius','3px')
		.css('z-index', '100001')
		.appendTo('body');
	var classlist = $tShares.attr('class');
	if (classlist.indexOf('alert-success') == -1 && classlist.indexOf('alert-offers-green') == -1) {
		shareTable2.css('border','2px solid #d43f3a');
	} else {
		shareTable2.css('border','2px solid #3c763d');	
	}
	var $parentRow = $tShares.parents('tr');
	var contractUrl = $parentRow.find('.outcome-title a').attr('href');
	var indices = [];
	for (var i=0; i<contractUrl.length;i++) {
	    if (contractUrl[i] === "/") indices.push(i);
	}
	var n = Number(contractUrl.substring(indices[1]+1,indices[2]));
	var tableLoc = [].indexOf.call(this.parentNode.parentNode.parentNode.children, this.parentNode.parentNode);
	if (document.location == 'https://www.predictit.org/Profile/MyShares' && tableLoc <= 2) {
		var t = 'shares';$("#share_table").attr('offers','no');shareTable2.css('left', pos.left - 280 + 'px');
	} else if (tableLoc == 6) {
		var t = 'shares';$("#share_table").attr('offers','no');shareTable2.css('left', pos.left - 280 + 'px');
	}
	else {
		var t = 'offered';$("#share_table").attr('offers','yes');shareTable2.css('left', pos.left - 380 + 'px');
	}
	var i = {contractId:n,openPanel:t};
	var shareData = getShares(i);
	$('#share_table').html('ok');
	shareData.success(function(shareData){
		$('#share_table').html(shareData);
	});
	shareData.success(function(shareData){
		$('#share_table').html(shareData);
		if ($('#share_table').attr('offers') == 'no') {
			shareContainer = $('#myShares1');
		} else {
			$('#cancelAllOffers').parents('tr').remove();
			$('.cancelOrderBook').parents('td').remove();
			var shareContainer = $('#myOffers1');
		}
		var shareData2 = shareContainer.html();
		shareTable2.html(shareData2);
		shareTable2.show();
	});
};

function getShares(i) {
	return $.ajax({
		type:"GET",
		data:i,
		cache:"false",
		url:"/Profile/LoadOwnership",
		traditional:!0
	});
}
