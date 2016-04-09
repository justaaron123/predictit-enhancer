$(document).ready(function(){
    var showPrices = function(e, $cPrice) { 
        var pos = $cPrice.offset();
        var $parentRow = $cPrice.parents('tr');
        var contractUrl = $parentRow.find('.outcome-title a').attr('href');
        contractUrl = (contractUrl.indexOf("http") == -1) 
            ? document.location.protocol + '//' + document.location.host + contractUrl
            : contractUrl;
        $.get(contractUrl + "#openoffers #openoffers1", function(data) {
            $('#price_table').remove();
            if (!$cPrice.hasClass('showPrice')) return;
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
            setTimeout(function() {
                if ($cPrice.hasClass('showPrice')) {
                    showPrices(e, $cPrice);
                }
            }, 3000);
        });
    };
    $('body').on('mouseenter', 'a.sharesUp, a.sharesDown', function(e) {
        $cPrice = $(this);
        $cPrice.addClass('showPrice');
         var timeoutId = setTimeout(function() {
            if ($cPrice.hasClass('showPrice')) {
                showPrices(e, $cPrice);
            }
        }, 200);
    });
    $('body').on('mouseleave', 'a.sharesUp, a.sharesDown, #contractListTable tr', function(){
        $(this).removeClass('showPrice');
        $('#price_table').remove();
    });
});
