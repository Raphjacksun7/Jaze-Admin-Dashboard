import firebase from 'firebase'

// initialize database

export const firebaseConfig = {
    apiKey: "AIzaSyB4doNKXWJ25mm_n6bsAD9XEsX8URLqWbo",
    authDomain: "jaze-appli.firebaseapp.com",
    databaseURL: "https://jaze-appli.firebaseio.com",
    projectId: "jaze-appli",
    storageBucket: "",
    messagingSenderId: "654446007464",
    appId: "1:654446007464:web:0dd81339e53a8891"
};

firebase.initializeApp(firebaseConfig)
export default firebase