"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
const firebaseConfig = {
    apiKey: "AIzaSyDXCeHBBaeVJYd1h6yvHCgUh21bHss9VMQ",
    authDomain: "nft-adv.firebaseapp.com",
    projectId: "nft-adv",
    storageBucket: "nft-adv.appspot.com",
    messagingSenderId: "743740949821",
    appId: "1:743740949821:web:69290ec4ddd9660fef7154",
    measurementId: "G-TZH2KXVK5Q",
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const analytics = (0, analytics_1.getAnalytics)(app);
//# sourceMappingURL=firebase.js.map