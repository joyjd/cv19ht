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

export const createHospitalProfile = async (h_name, h_data) => {
  const hospRef = firestore.doc(`hospitals/${h_name}`);

  const snapShot = await hospRef.get();

  //console.log(firestore.doc("hospitals/abc"));
  if (!snapShot.exists && (h_data !== null || h_data !== undefined || h_data !== "" || h_data !== {})) {
    try {
      await hospRef.set({
        ...h_data,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return hospRef;
};

export const getHospitalProfileAll = async () => {
  const snapshot = await firebase.firestore().collection("hospitals").get();
  const collection = {};
  snapshot.forEach((doc) => {
    collection[doc.id] = doc.data();
  });
  return collection;
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export default firebase;
