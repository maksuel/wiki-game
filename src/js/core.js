// GLOBAL
let config = {
    locale: 'pt',
    delayToCall: 1000,
    limitStartTarget: 10
};
let gameData = {
    user: '',
    startPoint: {
        name: '',
        url: '',
        description: ''
    },
    targetPoint: {
        name: '',
        url: '',
        description: ''
    },
    score: 0,
    way: []
};

// HELPERS
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

// CLASSES
function genericClass(id) {

    let body = jQuery(id);
    let button = body.find('button');
    let action = 'default';

    button.click( function(event) {
        event.preventDefault();
        button.trigger(action);
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
        button.focus();
        return this;
    };

    this.bind = function(clickName, callback) {
        if(!clickName) {
            clickName = action;
        }
        button.bind(clickName, callback);
        return this;
    };

    this.setClick = function(clickName) {
        action = clickName;
        return this;
    };
}

function infoClass(id) {

    let body = jQuery(id);
    let score = body.find('span.score');
    let urls = body.find('span.urls');

    this.fadeIn = function(duration, complete) {
        body.fadeIn(duration, complete);
        return this;
    };

    this.fadeOut = function(duration, complete) {
        body.fadeOut(duration, complete);
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
        return this;
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
    let nav = body.find('div.box').find('ul');
    let li = nav.find('li').clone();

    let searched = '';

    input.keypress( function(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
            input.blur();
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

    this.empty = function() {
        nav.empty();
        return this;
    };

    this.addOption = function(name, url, description) {
        let element = li.clone();
        if(name && url) {
            element.find('a').text(name).attr({
                href: url,
                'data-description': description
            });
        } else {
            element.html(
                jQuery('<p>').attr('class', element.find('a').attr('class')).text(name)
            );
        }
        nav.append(element);
        return this;
    };

    this.getNav = function() {
        return nav;
    };

    this.keyup = function(callbackDone, callbackFail) {

        input.keyup( function(event) {

            let value = input.val().toLowerCase().replace(/\s+/g,' ').trim();
    
            callbackOnce.call( function() {
    
                if(value && value !== searched) {
    
                    jQuery.ajax({
                        url: `https://${config.locale}.wikipedia.org/w/api.php?action=opensearch&search=${value}&limit=${config.limitStartTarget}&format=json`,
                        dataType: 'jsonp'
                    }).done( function(response) {
    
                        callbackDone(event, value, response);
    
                        searched = value;
    
                    }).fail(callbackFail);
                }
            });
        });
        return this;
    };
}

// GAME
jQuery(document).ready( function() {

    let loading = jQuery('#loading');
    let logo = jQuery('#logo');
    let back = new genericClass('#back');
    let info = new infoClass('#info');
    let welcome = new genericClass('#welcome');
    let name = new nameClass('#name');
    let start = new startTargetClass('#start');
    let target = new startTargetClass('#target');
    let check = jQuery('#check');
    let game = jQuery('#game');
    let buttons = jQuery('#buttons');
    let adsense = jQuery('#adsense');

    // PREPARE
    start.empty();
    target.empty();

    // REMOVE LOAD SCREEN
    loading.fadeOut(undefined, function() {
        welcome.fadeIn(undefined, function() {
            loading.remove();
            welcome.focus();
        });
    });

    // 1 WELCOME
    welcome.bind(undefined, function() {
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
            back.setClick('nameBack');
            back.bind('nameBack', function() {
                back.fadeOut();
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
    start.keyup( function(event, value, response) {

        let query = response[0];
        let text = response[1];
        let description = response[2];
        let url = response[3];

        start.empty();

        if(response[1].length === 0) {
            start.addOption('Nada encontrado, tente novamente.');
        } else {
            jQuery(response[1]).each( function(index, item) {
                start.addOption(text[index], url[index], description[index]);
            });

            start.getNav().find('a').click( function(event) {
                event.preventDefault();
                let element = jQuery(event.target);
                gameData.startPoint.name = element.text();
                gameData.startPoint.url = element.attr('href');
                gameData.startPoint.description = element.data('description');

                start.fadeOut(undefined, function() {
                    back.setClick('startBack');
                    back.bind('startBack', function() {
                        target.fadeOut(undefined, function() {
                            back.setClick('nameBack');
                            start.fadeIn(undefined, function() {
                                start.focus();
                            });
                        });
                    });
                    target.fadeIn(undefined, function() {
                        target.focus();
                    });
                });
            });
        }
    });

    // 2.3 TARGET
    target.keyup( function(event, value, response) {

        let query = response[0];
        let text = response[1];
        let description = response[2];
        let url = response[3];

        target.empty();

        if(response[1].length === 0) {
            target.addOption('Nada encontrado, tente novamente.');
        } else {
            jQuery(response[1]).each( function(index, item) {
                target.addOption(text[index], url[index], description[index]);
            });

            target.getNav().find('a').click( function(event) {
                event.preventDefault();
                let element = jQuery(event.target);
                gameData.targetPoint.name = element.text();
                gameData.targetPoint.url = element.attr('href');
                gameData.targetPoint.description = element.data('description');

            });
        }        
    });
});