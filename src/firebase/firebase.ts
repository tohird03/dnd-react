import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_BASE_API_KEY,
  authDomain: process.env.REACT_APP_BASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_BASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_BASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_BASE_APP_ID,
  measurementId: process.env.REACT_APP_BASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };
