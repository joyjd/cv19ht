import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBuRtnSpkl16_gayi7CkRj3xh98BNzWGKM",
  authDomain: "cv19ht.firebaseapp.com",
  databaseURL: "https://cv19ht.firebaseio.com",
  projectId: "cv19ht",
  storageBucket: "cv19ht.appspot.com",
  messagingSenderId: "848826688923",
  appId: "1:848826688923:web:2f264f379c627668fb2d3e",
  measurementId: "G-JLY08JDRW4",
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
