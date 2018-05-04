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
    let url = `//${config.locale}.wikipedia.org/w/api.php`;
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
    
    return decodeURIComponent(page);
}