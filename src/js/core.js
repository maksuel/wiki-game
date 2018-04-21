let config = {
    delayToCall: 1000
};

// Classes
function callbackOnceWithDelay(delay = 0) {

    let timeOut;

    this.call = function(callback) {

        if(timeOut) {
            clearTimeout(timeOut);
        }

        timeOut = setTimeout(callback, delay);

        return timeOut;
    };
}

function inputBox(inputID, boxID) {

    let callbackOnce = new callbackOnceWithDelay(config.delayToCall);
    let input = jQuery(inputID);
    let box = jQuery(boxID);
    let searched = '';

    input.keyup( function(event) {

        let value = input.val().toLowerCase().replace(/\s+/g,' ').trim();

        callbackOnce.call( function() {

            if(value && value !== searched) {

                jQuery.ajax({
                    url: `https://pt.wikipedia.org/w/api.php?action=opensearch&search=${value}&limit=10&namespace=0&format=json`,
                    dataType: 'jsonp'
                }).done( function(res) {

                    console.log('done');

                    box.empty();

                    $(res[1]).each( function(index, item) {
                        let p = $('<p>').text(item);
                        box.append(p);
                    });

                    searched = value;

                }).fail( function() {

                    console.log(arguments);
                });
            }
        });
    });

    this.adjustBoxHeight = function() {

        box.height(
            outerHeight - box.offset().top - 15
        );

        return this;
    };
}






function genericClass(id) {

    let body = jQuery(id);
    let button = body.find('button');

    this.show = function() {
        body.show();
        return this;
    };

    this.hide = function() {
        body.hide();
        return this;
    };

    this.click = function(func) {
        button.click(func);
        return this;
    };
}

function infoClass(id) {

    let body = jQuery(id);
    let score = body.find('span.score');
    let urls = body.find('span.urls');

    this.show = function() {
        body.show();
        return this;
    };

    this.hide = function() {
        body.hide();
        return this;
    };

    this.score = function(text) {
        score.text(text);
        return this;
    };

    this.urls = function(array) {
        let text = '';
        jQuery(array).each( function(index, url) {
            text += text.length === 0 ? url : ` / ${url}`;
        });
        urls.text(text);
        return this;
    };
}

function nameClass(id) {

}



jQuery(document).ready( function() {

    

    let logo = jQuery('#logo');
    let nav = new genericClass('#nav');
    let info = new infoClass('#info');
    let welcome = new genericClass('#welcome');
    let adsense = jQuery('#adsense');
    let name = new genericClass('#name');
    let start = new genericClass('#start');

    welcome.click( function(event) {
        event.preventDefault();
        welcome.hide();
        name.show();
    });

    name.click( function(event) {
        event.preventDefault();
        name.hide();
        adsense.hide();
        nav.show().click( function(event) {
            event.preventDefault();
            nav.hide();
            start.hide();
            name.show();
            adsense.show();
        });
        start.show();
    });


    // ADJUST HEIGHT
    setInterval( function() {
        jQuery('.equalsAdsense').height(
            adsense.height()
        );
    }, 500);
});

// jQuery(window).resize();