import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_ii2adM1PY-s8kmKx0WC2lQ1XO0zykUQ",
  authDomain: "uploade-file.firebaseapp.com",
  projectId: "uploade-file",
  storageBucket: "uploade-file.appspot.com",
  messagingSenderId: "259824332734",
  appId: "1:259824332734:web:79310be778c6a315f6d3ef",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
