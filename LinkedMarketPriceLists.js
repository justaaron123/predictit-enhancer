$(document).ready(function(){
    var showPrices = function(e) {
        var $cPrice = $(this);
        var pos = $cPrice.offset();
        var $parentRow = $cPrice.parents('tr');
        var contractUrl = $parentRow.find('.outcome-title a').attr('href');
        contractUrl = (contractUrl.indexOf("http") == -1) 
            ? document.location.protocol + '//' + document.location.host + contractUrl
            : contractUrl;
        $.get(contractUrl + "#openoffers #openoffers1", function(data) {
            $('#price_table').remove();
            var priceClass = $cPrice.hasClass('sharesUp') ? '.panel-success' : '.panel-danger';
            var pricesHtml = $(data).find('#openoffers1 ' + priceClass).parent().html();
            var priceTable = $('<div id="price_table"></div>');
            priceTable.show()
            .append(pricesHtml)
            .css('position', 'absolute')
            .css('top', pos.top - 150 + 'px')
            .css('left', pos.left - 250 + 'px')
            .css('z-index', '100001')
            .appendTo('body');
		});
		$('body').on('mouseleave', '#price_table', function(){$('#price_table').remove();});
	};
	$('body').on('mouseenter', '.sharesUp, .sharesDown', showPrices);
	$('body').on('mouseleave', '.sharesUp, .sharesDown, #contractListTable tr', function(){$('#price_table').remove();});
});
