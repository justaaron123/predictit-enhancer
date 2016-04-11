$(document).ready(function(){
    var autoRefresh = false;

    $('body').on('click', '#refreshPrices', refreshPrices);

    $('body').on('click', 'a.refresh', function() {
        setTimeout(function() {
            appendCheckbox();
        }, 1450);
    });

    function appendCheckbox() {
        if ($('#refreshPrices').length > 0) {
            $('#refreshPrices').remove();
        }

        $('<span> \
            <input id="refreshPrices" type="checkbox" \
            name="autorefresh" value="1" style="margin: 0 3px;" \
            ' + ((autoRefresh) ? 'checked="checked"' : '') + '> \
            <label style="margin: 0px;" for="refreshPrices">Auto Refresh</label> \
            </span>').appendTo('th.contract-title');

    }


    window.addEventListener("message", function(event) {
      // We only accept messages from ourselves
      if (event.source != window)
        return;
    
      if (event.data == 'pauseRefresh') {
            $('#refreshPrices').addClass('pause');
      }

      if (event.data == 'unpauseRefresh') {

          setTimeout(function() {
              if ($('#refreshPrices').hasClass('pause') && !$('.showPrice').length) {
                  $('#refreshPrices').removeClass('pause');

                  refreshPrices();
              }
          }, 1000);
      }

    }, false);

    function preventRefresh($refresher) {
        if (!$refresher.is(':checked')) { 
            autoRefresh = false;
            return true; 
        }

        if (!$refresher.is(':checked') || $refresher.hasClass('refreshing') || $refresher.hasClass('pause')) { 
            return true;
        }

        return false;
    }

    function refreshPrices() {
        $refresher = $('#refreshPrices');

        if (preventRefresh($refresher)) { 
            return; 
        }

        $('span.sharesUp, span.sharesDown').removeClass('showPrice');

        autoRefresh = true;

        $refresher.addClass('refreshing');

        setTimeout(function() {

            $refresher.removeClass('refreshing');

            if (preventRefresh($refresher)) { 
                return;
            }

            $('a.refresh').first().trigger('click');

        }, 300);


        $refresher.addClass('refreshing');

        setTimeout(function() {

            $refresher.removeClass('refreshing');

            if (!preventRefresh($refresher)) { 
                refreshPrices();
            }

        }, 6500);

    }

    appendCheckbox();
});
