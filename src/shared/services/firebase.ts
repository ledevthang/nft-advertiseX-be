import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDXCeHBBaeVJYd1h6yvHCgUh21bHss9VMQ",

  authDomain: "nft-adv.firebaseapp.com",

  projectId: "nft-adv",

  storageBucket: "nft-adv.appspot.com",

  messagingSenderId: "743740949821",

  appId: "1:743740949821:web:69290ec4ddd9660fef7154",

  measurementId: "G-TZH2KXVK5Q",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
