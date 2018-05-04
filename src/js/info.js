function info(id) {

    let body = jQuery(id);
    let score = body.find('span.score');
    let urls = body.find('span.urls');

    this.fadeIn = function(callback) {
        body.fadeIn(config.fadeInDuration, callback);
        return this;
    };

    this.fadeOut = function(callback) {
        body.fadeOut(config.fadeOutDuration, callback);
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