jQuery(document).ready( function($) {

    $('#bug button[data-toggle="popover"]').first().popover({
        trigger: 'focus',
        html: true,
        placement: 'top',
        container: 'body',
        title: $('#bug').find('.bug-title').remove().html(),
        content: $('#bug').find('.bug-content').remove().html()
    });

    let pl = new preloading('#preloading'),
        lg = new logo('#logo'),
        bk = new back('#back'),
        wl = new welcome('#welcome'),
        nm = new name('#name'),
        st = new startTarget('#start', 'start'),
        tg = new startTarget('#target', 'target'),
        ck = new check('#check'),
        wp = new wikipedia('#info', '#wikipedia');

    // REMOVE LOAD SCREEN
    pl.fadeOut( function() {
        wl.fadeIn( function() {
            pl.remove();
        }).focus();
    });

    // BACK BINDS
    bk.bind('backToName', function() {
        bk.fadeOut();
        st.fadeOut( function() {
            nm.fadeIn().focus();
        });
    });
    bk.bind('backToStart', function() {
        tg.fadeOut( function() {
            bk.setClick('backToName');
            st.fadeIn().focus();
        });
    });
    bk.bind('backToTarget', function() {
        ck.fadeOut( function() {
            bk.setClick('backToStart');
            tg.fadeIn().focus();
        });
    });

    // 1 WELCOME
    wl.click( function() {
        wl.fadeOut( function() {
            nm.fadeIn().focus();
        });
    });

    // 2.1 NAME
    nm.click( function() {
        gameData.user = nm.val();
        nm.fadeOut( function() {
            bk.setClick('backToName').fadeIn();
            st.fadeIn().focus();
        });
    });

    // 2.2 START
    st.keyup( function(results) {

        jQuery(results).each( function(index, result) {

            st.addOption(result, function(event) {

                ck.setStartPoint(result);

                st.fadeOut( function() {
                    bk.setClick('backToStart');
                    tg.fadeIn().focus();
                });
            });
        });
    });

    // 2.3 TARGET
    tg.keyup( function(results) {

        jQuery(results).each( function(index, result) {

            if(gameData.startPoint.url != result.url) {

                tg.addOption(result, function(event) {
 
                    ck.setTargetPoint(result);

                    tg.fadeOut( function() {
                        bk.setClick('backToTarget');
                        ck.fadeIn();
                    });
                });
            }
        }); 
    });

    // https://pt.wikipedia.org/w/api.php?action=parse&prop=text&page=pizza&format=json
    // https://pt.wikipedia.org/wiki/Casa?useformat=mobile
    // https://pt.wikipedia.org/w/api.php?action=mobileview&prop=text&sections=all&page=Casa&format=json

    // 2.4 CHECK
    ck.click( function() {
        lg.fadeOut();
        bk.fadeOut();
        ck.fadeOut( function() {
            // GAME
            wp.getContent(gameData.startPoint.page).fadeIn();
        });
    });
});