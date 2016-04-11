$(document).ready(function(){

    $('#contractList div.modal').on('shown.bs.modal', function() {

        var $modal = $(this);

        setTimeout(function() {
            distinguishModal($modal);
        }, 400);

    });

    $('#contractList div.modal').on('click', '#tradeBack', function() {

        var $modal = $(this).closest('div.modal');

        setTimeout(function() {
            distinguishModal($modal);
        }, 400);
    });

    $('#contractList div.modal').on('click', '#submitSell', function() {

        var $modal = $(this).closest('div.modal');

        setTimeout(function() {
            var $submitBtn = $modal.find('button.btn:submit');
            $submitBtn.removeClass('btn-primary');
            $submitBtn.addClass('btn-danger');
        }, 400);
    });

    function distinguishModal($modal) {

        var modalTitle = $modal.find('#myModalLabel').text();

        var verb = (modalTitle.indexOf('Buy') !== -1) ? '<b class="text-info">Buy</b>' : '<b class="text-danger">Sell</b>';

        $modal.find('#submitBuy, #submitSell').html('Preview ' + verb);
        $modal.find('label[for="InputShares"]').html('Number of Shares to ' + verb);
        $modal.find('label[for="InputPrice"]').html('<label for="InputPrice">Maximum ' + verb + ' Price (1<span style="font-family: helvetica;">¢</span> to 99<span style="font-family: helvetica;">¢</span>)</label>');
        
    }

//tradeBack
});
