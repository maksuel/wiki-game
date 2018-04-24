
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



// GLOBAL
let config = {
    delayToCall: 1000
};
let gameData = {
    user: '',
    startPoint: '',
    targetPoint: '',
    score: 0,
    way: []
};

// CLASS
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

function genericClass(id) {

    let body = jQuery(id);
    let button = body.find('button');

    this.fadeIn = function(duration, complete) {
        body.fadeIn(duration, complete);
        return this;
    };

    this.fadeOut = function(duration, complete) {
        body.fadeOut(duration, complete);
        return this;
    };

    this.focus = function() {
        button.focus();
    };

    this.click = function(callback) {
        button.click( function(event) {
            event.preventDefault();
            callback(event);
        });
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

    let body = jQuery(id);
    let input = body.find('input');
    let button = body.find('button');

    input.keypress( function(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
            button.trigger('click');
        }
    });

    this.fadeIn = function(duration, complete) {
        body.fadeIn(duration, complete);
        return this;
    };

    this.fadeOut = function(duration, complete) {
        body.fadeOut(duration, complete);
        return this;
    };

    this.focus = function() {
        input.focus();
    };

    this.val = function(value) {
        if(value) {
            input.val(value);
        } else {
            return input.val();
        }
    };

    this.click = function(callback) {
        button.click( function(event) {
            event.preventDefault();
            callback(event);
        });
        return this;
    };
}


function startTargetClass(id) {

    let callbackOnce = new callbackOnceWithDelay(config.delayToCall);
    let body = jQuery(id);
    let input = body.find('input');
    let box = body. find('div.box');
    let searched = '';

    input.keypress( function(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
        }
    });

    this.fadeIn = function(duration, complete) {
        body.fadeIn(duration, complete);
        return this;
    };

    this.fadeOut = function(duration, complete) {
        body.fadeOut(duration, complete);
        return this;
    };

    this.focus = function() {
        input.focus();
    };

    this.keyup = function(callbackDone, callbackFail) {

        input.keyup( function(event) {

            let value = input.val().toLowerCase().replace(/\s+/g,' ').trim();
    
            callbackOnce.call( function() {
    
                if(value && value !== searched) {
    
                    jQuery.ajax({
                        url: `https://pt.wikipedia.org/w/api.php?action=opensearch&search=${value}&limit=10&namespace=0&format=json`,
                        dataType: 'jsonp'
                    }).done( function(response) {
    
                        callbackDone(event, value, response, box);
    
                        searched = value;
    
                    }).fail(callbackFail);
                }
            });
        });
        return this;
    };
}


jQuery(document).ready( function() {

    let loading = jQuery('#loading');
    let logo = jQuery('#logo');
    let nav = new genericClass('#nav');
    let info = new infoClass('#info');
    let welcome = new genericClass('#welcome');
    let name = new nameClass('#name');
    let start = new startTargetClass('#start');
    let target = new startTargetClass('#target');
    let check = jQuery('#check');
    let game = jQuery('#game');
    let buttons = jQuery('#buttons');
    let adsense = jQuery('#adsense');

    // REMOVE LOAD SCREEN
    loading.fadeOut(undefined, function() {
        welcome.fadeIn(undefined, function() {
            welcome.focus();
            loading.remove();
        });
    });

    // 1 WELCOME
    welcome.click( function() {
        welcome.fadeOut(undefined, function() {
            name.fadeIn(undefined, function() {
                name.focus();
            });
        });
    });

    // 2.1 NAME
    name.click( function() {
        gameData.user = name.val();
        name.fadeOut(undefined, function() {
            nav.click( function() {
                nav.fadeOut();
                start.fadeOut(undefined, function() {
                    name.fadeIn(undefined, function() {
                        name.focus();
                    });
                });
            }).fadeIn();
            start.fadeIn(undefined, function() {
                start.focus();
            });
        });
    });

    // 2.2 START
    start.keyup( function(event, value, response, box) {

        box.empty();

        $(response[1]).each( function(index, item) {
            let a = $('<a>').text(item);
            box.append($('<p>').append(a));
        });

        box.find('a').click( function() {
            console.log(arguments);
        });
    });

    // 2.3 TARGET
    target.keyup( function(event, value, response, box) {
    });
});