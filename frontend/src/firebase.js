import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDA84qVkiUncc0UICxhwJE42BFRtBa5Jng",
  authDomain: "blog-app-6eb2c.firebaseapp.com",
  projectId: "blog-app-6eb2c",
  storageBucket: "blog-app-6eb2c.appspot.com",
  messagingSenderId: "960237831396",
  appId: "1:960237831396:web:cb023b6ad9ffe6a1e818f1"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Initialize Cloud Storage and get a reference to the service
