// GLOBAL
let config = {
    locale: 'pt',
    delayToCall: 700,
    limitStartTarget: 10,
    fadeInDuration: 400,
    fadeOutDuration: 400
};
let gameData = {
    user: '',
    startPoint: {},
    targetPoint: {},
    score: 0,
    duration: 0,
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

function getRemote(query) {

    query.format = 'json';
    let url = `https://${config.locale}.wikipedia.org/w/api.php`;
    let callbackSuccess;
    let callbackError;

    let params = [];
    for (let key in query) {
        params.push(
            encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
        );
    }
    params = params.join('&');

    this.success = function(callback) {
        callbackSuccess = callback;
        return this;
    };

    this.error = function(callback) {
        callbackError = callback;
        return this;
    };

    this.exec = function() {
        if(callbackSuccess) {
            jQuery.ajax({
                url: url + '?' + params,
                dataType: 'jsonp'
            })
            .done(callbackSuccess)
            .fail(callbackError);
        }
        return this;
    };
}

function getPageName(url) {
    let page = new String(url).substring(url.lastIndexOf('/') + 1); 
    if(page.lastIndexOf('?') != -1) {
        page = page.substring(0, page.lastIndexOf('?'));
    } else if(page.lastIndexOf('#') != -1) {
        page = page.substring(0, page.lastIndexOf('#'));
    }
    return page;
};

// CLASSES
function genericClass(id) {

    let body = jQuery(id);
    let button = body.find('button');
    let action = 'default';

    button.click( function(event) {
        event.preventDefault();
        button.trigger(action);
    });

    this.fadeIn = function(callback) {
        body.fadeIn(config.fadeInDuration, callback);
        return this;
    };

    this.fadeOut = function(callback) {
        body.fadeOut(config.fadeOutDuration, callback);
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
// TODO: adjust duration fadeIn/fadeOut to global config like genericClass
// TODO: create class for all elements
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
    let researching = body.find('div.box').find('p.researching').hide();
    let nothingFound = body.find('div.box').find('p.nothingFound').hide();
    let nav = body.find('div.box').find('ul');
    let li = nav.find('li').clone();

    let searched = '';

    input.keypress( function(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
            input.blur();
        }
    });

    nav.empty();

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

    this.addOption = function(name, url, description) {
        nothingFound.hide();
        let element = li.clone();
        element.find('a').text(name).attr('href', url);
        element.find('p').text(description);
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

                    nothingFound.hide();
                    researching.show();

                    new getRemote({
                        action: 'opensearch',
                        search: value,
                        limit: config.limitStartTarget
                    }).success( function(response) {

                        nav.empty();
                        researching.hide();
    
                        if(response.length === 4 && response[1].length > 0) {
                            callbackDone(event, value, response);
                        } else {
                            nothingFound.show();
                        }
    
                        searched = value;
    
                    }).error(callbackFail).exec();
                }
            });
        });
        return this;
    };
}

function checkClass(id) {

    let body = jQuery(id);
    let button = body.find('button');
    let startPoint = body.find('div.startPoint');
    let targetPoint = body.find('div.targetPoint');

    this.fadeIn = function(duration, complete) {
        body.fadeIn(duration, complete);
        return this;
    };

    this.fadeOut = function(duration, complete) {
        body.fadeOut(duration, complete);
        return this;
    };

    this.click = function(callback) {
        button.click( function(event) {
            event.preventDefault();
            callback(event);
        });
        return this;
    };

    this.setStartPoint = function(heading, url, description) {
        startPoint.find('strong.heading').text(heading);
        startPoint.find('p.description').text(description);
        startPoint.find('span.url').text(url);

        // SAVE DATA
        gameData.startPoint = {
            heading: heading,
            url: url,
            description: description,
            page: getPageName(url)
        };
        return this;
    };

    this.setTargetPoint = function(heading, url, description) {
        targetPoint.find('strong.heading').text(heading);
        targetPoint.find('p.description').text(description);
        targetPoint.find('span.url').text(url);

        // SAVE DATA
        gameData.targetPoint = {
            heading: heading,
            url: url,
            description: description,
            page: getPageName(url)
        };
        return this;
    };
}

// GAME
jQuery(document).ready( function() {

    let loading = jQuery('#loading');
    let logo = jQuery('#logo');
    let welcome = new genericClass('#welcome');
    let back = new genericClass('#back');
    let name = new nameClass('#name');
    let start = new startTargetClass('#start');
    let target = new startTargetClass('#target');
    let check = new checkClass('#check');
    let info = new infoClass('#info');
    let wikipedia = jQuery('#wikipedia');
    // let buttons = jQuery('#buttons');
    // let adsense = jQuery('#adsense');

    // REMOVE LOAD SCREEN
    loading.fadeOut(undefined, function() {
        welcome.fadeIn( function() {
            loading.remove();
            welcome.focus();
        });
    });

    // 1 WELCOME
    welcome.bind(undefined, function() {
        welcome.fadeOut( function() {
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
        let heading = response[1];
        let description = response[2];
        let url = response[3];

        jQuery(url).each( function(index, item) {
            start.addOption(heading[index], item, description[index]);
        });

        start.getNav().find('a').click( function(event) {
            event.preventDefault();
            let element = jQuery(event.target);

            check.setStartPoint(
                element.text(),
                element.attr('href'),
                element.siblings('p').text()
            );

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
    });

    // 2.3 TARGET
    target.keyup( function(event, value, response) {

        let query = response[0];
        let heading = response[1];
        let description = response[2];
        let url = response[3];

        jQuery(url).each( function(index, item) {
            if(gameData.startPoint.url != item) {
                target.addOption(heading[index], item, description[index]);
            }
        });

        target.getNav().find('a').click( function(event) {
            event.preventDefault();
            let element = jQuery(event.target);

            check.setTargetPoint(
                element.text(),
                element.attr('href'),
                element.siblings('p').text()
            );

            target.fadeOut(undefined, function() {
                back.setClick('targetBack');
                back.bind('targetBack', function() {
                    check.fadeOut(undefined, function() {
                        back.setClick('startBack');
                        target.fadeIn(undefined, function() {
                            target.focus();
                        });
                    });
                });
                check.fadeIn();
            });
        });  
    });

    // https://pt.wikipedia.org/w/api.php?action=parse&prop=text&page=pizza&format=json
    // https://pt.wikipedia.org/wiki/Casa?useformat=mobile
    // https://pt.wikipedia.org/w/api.php?action=mobileview&prop=text&sections=all&page=Casa&format=json

    // 2.4 CHECK
    check.click( function() {
        logo.fadeOut();
        back.fadeOut();
        check.fadeOut(undefined, function() {
            info.fadeIn();
            wikipedia.fadeIn(undefined, function() {
                new getRemote({
                    action: 'parse',
                    prop: 'displaytitle|text|modules|jsconfigvars',
                    page: gameData.startPoint.page,
                    redirects: true
                }).success( function(response) {
           
                    console.log(response);

                    wikipedia.find('h1').text(response.parse.displaytitle);
                    wikipedia.append(response.parse.text['*']);

                    wikipedia.find('a').each( function(index, item) {
                        item = jQuery(item);

                        if(item.attr('href').substring(0,6) == '/wiki/') {
                            console.log(item.attr('href'));
                            item.click( function(event) {
                                event.preventDefault();
                                console.log(this.href);
                            });
                        } else if(item.attr('href').substring(0,1) == '#') {
                            item.addClass('text-success');
                        } else {
                            item.addClass('text-dark').css({
                                'pointer-events': 'none',
                                opacity: .65
                            });
                        }
                    });
                }).exec();
            });
        });
    });
});