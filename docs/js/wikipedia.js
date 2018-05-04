function wikipedia(id) {

    let body = jQuery(id);
    let h1 = body.find('h1');
    let article = body.find('div');

    this.fadeIn = function(callback) {
        body.fadeIn(config.fadeInDuration, callback);
        return this;
    };

    this.fadeOut = function(callback) {
        body.fadeOut(config.fadeOutDuration, callback);
        return this;
    };

    this.setTitle = function(title) {
        h1.html(title);
        return this;
    };

    this.setArticle = function(html) {
        article.html(html);

        article.find('a').each( function(index, item) {
            item = jQuery(item);

            let href = item.attr('href');

            if(href && href.substring(0,6) == '/wiki/') {
                // console.log(href);
                item.click( function(event) {
                    event.preventDefault();
                    console.log(this.href);
                });
            } else if(href && href.substring(0,1) == '#') {
                item.addClass('text-success');
            } else {
                item.addClass('text-dark').css({
                    'pointer-events': 'none',
                    opacity: .65
                });
            }
        });

        article.find('img').each( function(index, item) {
            item = jQuery(item);

            let src = item.attr('src');

            if(src && src.substring(0,3) == '/w/') {
                item.attr('src', `https://${config.locale}.wikipedia.org${src}`);
            }
        });
        return this;
    };
}