function back(id) {

    let body = jQuery(id);
    let button = body.find('button');
    let trigger;

    button.click( function(event) {
        event.preventDefault();
        button.trigger(trigger);
    });

    this.fadeIn = function(callback) {
        body.fadeIn(config.fadeInDuration, callback);
        return this;
    };

    this.fadeOut = function(callback) {
        body.fadeOut(config.fadeOutDuration, callback);
        return this;
    };

    this.bind = function(clickName, callback) {
        button.bind(clickName, callback);
        return this;
    };

    this.setClick = function(action) {
        trigger = action;
        return this;
    };
}