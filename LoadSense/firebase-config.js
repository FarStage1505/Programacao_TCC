import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


const firebaseConfig = {

    apiKey: "AIzaSyqV3lbeUMB6PXxJmeFi1qs9uEnJvXCtg",

    authDomain:
        "loadsense-4a175.firebaseapp.com",

    projectId:
        "loadsense-4a175",

    storageBucket:
        "loadsense-4a175.firebasestorage.app",

    messagingSenderId:
        "83126433941",

    appId:
        "1:83126433941:web:57c92a1084af009c94039c"

};


const app =
    initializeApp(
        firebaseConfig
    );


const auth =
    getAuth(
        app
    );


export {
    auth
};