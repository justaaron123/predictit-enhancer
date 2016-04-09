$(document).ready(function(){
    var autoRefresh = false;

    $('body').on('click', 'a.refresh', function() {
        setTimeout(function() {
            appendCheckbox();
        }, 1000);
    });

    $('body').on('click', '#refreshPrices', refreshPrices);

    function appendCheckbox() {
        $('<span> \
            <input id="refreshPrices" type="checkbox" \
            name="autorefresh" value="1" style="margin: 0 3px;" \
            ' + ((autoRefresh) ? 'checked="checked"' : '') + '> \
            <label style="margin: 0px;" for="refreshPrices">Auto Refresh</label> \
            </span>').appendTo('th.contract-title');
    }

    function refreshPrices() {
        $refresher = $('#refreshPrices');

        if (!$refresher.is(':checked')) { 
            autoRefresh = false;
            return; 
        }

        autoRefresh = true;

        $('a.refresh').trigger('click');

        setTimeout(function() {
            refreshPrices()();
        }, 6500);

    }

    appendCheckbox();
});
