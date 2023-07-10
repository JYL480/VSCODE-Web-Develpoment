// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa8m8RSFyN-cL__OyZXCEU8Bnslyl1AfE",
  authDomain: "zi-char-project.firebaseapp.com",
  databaseURL: "https://zi-char-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zi-char-project",
  storageBucket: "zi-char-project.appspot.com",
  messagingSenderId: "646748018366",
  appId: "1:646748018366:web:325400ac3597ecbe4630ef",
  measurementId: "G-GP3RKLHE8D"
};


import {
  getDatabase,ref,set
} from 'firebase/database'

import {
  collection,
  getFirestore, getDocs,
  serverTimestamp, addDoc, deleteDoc,
  onSnapshot,setDoc,doc,orderBy
} from 'firebase/firestore'


import{
  getAuth,
  createUserWithEmailAndPassword,updateProfile,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged
}from 'firebase/auth'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const database = getDatabase(app)
const dbFirestore = getFirestore(app)



const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value // All these .value is to get the value that was keyed in
  const password = signupForm.password.value
  const username = signupForm.username.value
  // const 

  createUserWithEmailAndPassword(auth,email,password)
    .then((cred)=>{

      const user = cred.user
      // var database_ref = database.ref()
      
      // Add to realtime database
      set(ref(database, 'users/' + user.uid),{
        username: username,
        email: email
      })
      updateProfile( auth.currentUser, {
        displayName: username
      })
      
      //Add to firebase database

      const docRef = doc(dbFirestore, 'Users', email)
      // const addDetails = document.querySelector('.addDetails')
      // addDetails.addEventListener('submit', (e) => {
      //   e.preventDefault()
      
        const data = {
          email: email,
          username: username,
          createdAt: serverTimestamp()
      };
      
      setDoc(docRef, data)
      .then(() => {
          console.log("Document has been added successfully")
      })
      .catch(error => {
          console.log(error);
      })

        console.log('user created',cred.user)
        alert("User Created!")
        // signupForm.reset()

        setTimeout(function () {
          window.location.href='/src/login_page/login.html';
      }, 500);

      // '/src/login_page/login.html';

    })
    .catch((error)=>{
      const errorCode = error.code
      const errorMessage = error.message
      console.log(error.code+error.message)
      alert(errorCode+errorMessage)
    })

})


