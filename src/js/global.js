const config = {
    locale: jQuery('html').attr('lang'),
    delayToCall: 700,
    limitStartTarget: 10,
    fadeInDuration: 400,
    fadeOutDuration: 400,
    initialScore: 7
};

let gameData = {
    locale: config.locale,
    user: '',
    startPoint: {},
    targetPoint: {},
    score: config.initialScore,
    duration: 0,
    way: []
};

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBgq6Wco3GcCZ7DJtsXmDPgMopgWaEmx8k",
    authDomain: "maks-wikigame.firebaseapp.com",
    databaseURL: "https://maks-wikigame.firebaseio.com",
    projectId: "maks-wikigame",
    storageBucket: "",
    messagingSenderId: "972469210984"
});