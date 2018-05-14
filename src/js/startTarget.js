function startTarget(id,pageName) {

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

    this.fadeIn = function(callback) {
        returnToTop(`/${pageName}`);
        body.fadeIn(config.fadeInDuration, callback);
        return this;
    };

    this.fadeOut = function(callback) {
        body.fadeOut(config.fadeOutDuration, callback);
        return this;
    };

    this.focus = function() {
        input.focus();
        return this;
    };

    this.addOption = function(result, clickFunc) {

        if(nav.find('li').length < config.limitStartTarget) {

            if(nothingFound.is(":visible")) {
                nothingFound.hide();
            }

            window.scrollTo(0,
                parseInt(
                    input.offset().top - parseInt(input.css('marginBottom'))
                )
            );

            let option = li.clone();
            option.find('a').text(result.heading).attr('href', result.url).click( function(event) {
                event.preventDefault();
                clickFunc(event);
            });
            option.find('p').text(result.description);

            nav.append(option);
        }
        return this;
    };

    this.keyup = function(callback) {

        input.keyup( function(event) {

            let value = input.val().toLowerCase().replace(/\s+/g,' ').trim();
    
            callbackOnce.call( function() {
    
                if(value && value !== searched) {

                    nothingFound.hide();
                    researching.show();

                    new getRemote({
                        action: 'opensearch',
                        search: value,
                        limit: config.limitStartTarget + 2
                    }).success( function(response) {

                        nav.empty();
                        researching.hide();
    
                        if(response.length === 4 && response[0] == value && response[3].length > 0) {

                            let results = [];

                            jQuery(response[3]).each( function(index, url) {
                                results.push({
                                    heading: response[1][index],
                                    description: response[2][index],
                                    url: url
                                });
                            });

                            callback(results);
                        } else {
                            nothingFound.show();
                        }
    
                        searched = value;
    
                    }).error( function() {
                        console.log(arguments);
                    }).exec();
                }
            });
        });
        return this;
    };
}