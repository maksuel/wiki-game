// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBgq6Wco3GcCZ7DJtsXmDPgMopgWaEmx8k",
    authDomain: "maks-wikigame.firebaseapp.com",
    databaseURL: "https://maks-wikigame.firebaseio.com",
    projectId: "maks-wikigame",
    storageBucket: "",
    messagingSenderId: "972469210984"
});

const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});
let ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '?developing&logged',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
});

// APP
const config = {
    locale: jQuery('html').attr('lang'),
    delayToCall: 700,
    limitStartTarget: 10,
    fadeInDuration: 400,
    fadeOutDuration: 400,
    initialScore: 7
};

let gameData = {
    date: 0,
    duration: 0,
    id: ID,
    itsOver: false,
    locale: config.locale,
    score: config.initialScore,
    startPoint: {},
    targetPoint: {},
    user: '',
    way: []
};