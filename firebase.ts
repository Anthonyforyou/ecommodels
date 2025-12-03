// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAvSpQQ5UQn-ya0rxaDKtnLgM78MtGi7Lw",
  authDomain: "clothingai-3ea86.firebaseapp.com",
  projectId: "clothingai-3ea86",
  storageBucket: "clothingai-3ea86.firebasestorage.app",
  messagingSenderId: "284495395734",
  appId: "1:284495395734:web:247747fd72af6205157bb7",
  measurementId: "G-3D18LDCEGD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

isSupported()
  .then((supported) => {
    if (supported) {
      getAnalytics(app);
      console.log("Firebase Analytics initialized");
    }
  })
  .catch((err) => {
    console.log("Firebase Analytics not supported in this environment", err);
  });

export default app;