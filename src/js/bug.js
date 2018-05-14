function bug(id) {

    this.report = function() {
        console.log({
            time: new Date(),
            id: ID,
            url: window.location.href,
            userAgent: navigator.userAgent,
            height: window.innerHeight,
            width: window.innerWidth,
            gameData: gameData
        });
    };
}