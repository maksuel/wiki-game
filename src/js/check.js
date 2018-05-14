function check(id) {

    let body = jQuery(id);
    let button = body.find('button');
    let startPoint = body.find('div.startPoint');
    let targetPoint = body.find('div.targetPoint');

    this.fadeIn = function(callback) {
        returnToTop('/check');
        body.fadeIn(config.fadeInDuration, callback);
        return this;
    };

    this.fadeOut = function(callback) {
        body.fadeOut(config.fadeOutDuration, callback);
        return this;
    };

    this.click = function(callback) {
        button.click( function(event) {
            event.preventDefault();
            callback(event);
        });
        return this;
    };

    this.setStartPoint = function(result) {
        startPoint.find('strong.heading').text(result.heading);
        startPoint.find('p.description').text(result.description);
        startPoint.find('span.url').text(result.url);

        // SAVE DATA
        gameData.startPoint = {
            heading: result.heading,
            url: result.url,
            description: result.description,
            page: getPageName(result.url)
        };
        return this;
    };

    this.setTargetPoint = function(result) {
        targetPoint.find('strong.heading').text(result.heading);
        targetPoint.find('p.description').text(result.description);
        targetPoint.find('span.url').text(result.url);

        // SAVE DATA
        gameData.targetPoint = {
            heading: result.heading,
            url: result.url,
            description: result.description,
            page: getPageName(result.url)
        };
        return this;
    };
}