function logo(id) {

    let body = jQuery(id);

    this.fadeOut = function(callback) {
        body.fadeOut(config.fadeOutDuration, callback);
        return this;
    };
} 