function welcome(id) {

    let body = jQuery(id);
    let button = body.find('button');

    this.fadeIn = function(callback) {
        returnToTop('/welcome');
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

    this.click = function(callback) {
        button.click( function(event) {
            event.preventDefault();
            callback(event);
        });
        return this;
    };
}