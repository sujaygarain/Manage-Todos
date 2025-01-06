// // firebase.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"

// const firebaseConfig = {
//   apiKey: "AIzaSyDhwWuB4Lfaewgqwy1o2-A-cFAB7-BHrDs",
//   authDomain: "todo-context-ebcb5.firebaseapp.com",
//   projectId: "todo-context-ebcb5",
//   storageBucket: "todo-context-ebcb5.firebasestorage.app",
//   messagingSenderId: "866151393014",
//   appId: "1:866151393014:web:453fff4af41610c527aed7",
// //   measurementId: "G-NT0XJR6WHY"
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);

// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDhwWuB4Lfaewgqwy1o2-A-cFAB7-BHrDs",
  authDomain: "todo-context-ebcb5.firebaseapp.com",
  projectId: "todo-context-ebcb5",
  storageBucket: "todo-context-ebcb5.firebasestorage.app",
  messagingSenderId: "866151393014",
  appId: "1:866151393014:web:453fff4af41610c527aed7",
//   measurementId: "G-NT0XJR6WHY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

