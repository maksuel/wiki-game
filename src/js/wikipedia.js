function wikipedia(infoID, articleID) {

    let self = this;
    let info = jQuery(infoID);
    let body = jQuery(articleID);

    let score = info.find('span.score');
    let urls = info.find('span.urls');
    
    let calls = 0;

    function startGame() {
        gameData.date = new Date();
    }

    function stopGame() {
        gameData.itsOver = true;
        sendGameData();
    }

    function isTargetPoint(page) {
        return gameData.targetPoint.page == page;
    }

    function updateInfo() {
        score.text(gameData.score);
        let text = '';
        jQuery(gameData.way).each( function(index, obj) {
            text += text.length === 0 ? obj.page : ` / ${obj.page}`;
        });
        urls.text(text);
    }

    function updateScore() {
        gameData.score--;
    }

    function pushWay(page, validAnchors, clickTime) {
        gameData.way.push({
            clickTime: clickTime,
            validAnchors: validAnchors,
            page: page
        });
    }

    // WIKI PAGE
    let h1 = body.find('h1');
    let article = body.find('div.content');

    function setTitle(html) {
        h1.html(html);
    }

    function setArticle(page, html, clickTime) {
        let validAnchors = 0;
        let uniqueAnchors = [];

        article.html(html);

        article.find('a').each( function(index, element) { element = jQuery(element);
            
            let href = element.attr('href');

            if( !isTargetPoint(page) && typeof href != 'undefined' && href.substring(0,6) == '/wiki/') {
                let anchor = getWikipediaUrl(href);
                if(uniqueAnchors.indexOf(anchor) == -1) {
                    validAnchors++;
                    uniqueAnchors.push(anchor);
                }
                element.attr({
                    href: '#valid',
                    title: anchor,
                    'data-page': getPageName(href)
                }).click( function(event) {
                    event.preventDefault();
                    self.getContent(this.dataset.page);
                });
            } else if( !isTargetPoint(page) && typeof href != 'undefined' && href.substring(0,1) == '#') {
                element.addClass('text-success');
            } else {
                element.attr({
                    href: '#not-valid',
                    'data-href': href
                }).addClass('text-dark').css({
                    'pointer-events': 'none',
                    opacity: .65
                });
            }
        });

        // FIX IMG URL
        article.find('img').each( function(index, element) { element = jQuery(element);

            let src = element.attr('src');

            if(typeof src != 'undefined' && src.substring(0,3) == '/w/') {
                element.attr({
                    src: getWikipediaUrl(src),
                    'data-src': src
                });
            }
        });

        articleDEBUG = article;

        pushWay(page, validAnchors, clickTime);
    }

    // METHODS
    this.fadeIn = function(callback) {
        info.fadeIn(config.fadeInDuration);
        body.fadeIn(config.fadeInDuration, callback);
        jQuery('body').addClass('bg-light');
        return this;
    };

    this.fadeOut = function(callback) {
        info.fadeOut(config.fadeOutDuration);
        body.fadeOut(config.fadeOutDuration, callback);
        jQuery('body').removeClass('bg-light');
        return this;
    };

    this.getContent = function(page) {

        let clickTime = Date.now();

        new getRemote({
            action: 'parse',
            prop: 'displaytitle|text|modules|jsconfigvars',
            page: page,
            redirects: true
        }).success( function(json) {

            if( typeof json.parse.displaytitle !== 'undefined' && json.parse.displaytitle.length > 0 &&
                typeof json.parse.text['*']    !== 'undefined' && json.parse.text['*'].length    > 0 ) {

                calls++;
                
                if(calls == 1) {
                    startGame();
                } else {
                    updateScore();
                }

                returnToTop(page);
                setTitle(json.parse.displaytitle);
                setArticle(page, json.parse.text['*'], clickTime);

                updateInfo();

                if(isTargetPoint(page)) {
                    stopGame();
                } else {
                    sendGameData();
                }
            } else {
                console.log('ERROR', json);
            }
        }).exec();

        return this;
    };
}

let articleDEBUG;