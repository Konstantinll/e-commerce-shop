import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeeuV7PPRLuMCcMmKh9ckOzrUFy07Ekaw",
  authDomain: "magaz-ecom.firebaseapp.com",
  projectId: "magaz-ecom",
  storageBucket: "magaz-ecom.appspot.com",
  messagingSenderId: "590102606683",
  appId: "1:590102606683:web:80102801a0d89a5676207e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
