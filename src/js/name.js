function name(id) {

    let body = jQuery(id);
    let input = body.find('input');
    let button = body.find('button');

    input.keypress( function(event) {
        if(event.keyCode == 13) {
            event.preventDefault();
            button.trigger('click');
        }
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
        input.focus();
        return this;
    };

    this.click = function(callback) {
        button.click( function(event) {
            event.preventDefault();
            callback(event);
        });
        return this;
    };

    this.val = function() {
        return input.val();
    };
}