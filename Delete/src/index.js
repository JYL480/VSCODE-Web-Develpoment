import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query, where,
  orderBy, serverTimestamp,
  getDoc,
  updateDoc
} from 'firebase/firestore'

import{
  getAuth,
  createUserWithEmailAndPassword,
  signOut, signInWithEmailAndPassword,
  onAuthStateChanged
}from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyB4Wy4kCjfwMZNYXB2RL3QvjsPcWZT60RI",
  authDomain: "zichar-test.firebaseapp.com",
  databaseURL: "https://zichar-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zichar-test",
  storageBucket: "zichar-test.appspot.com",
  messagingSenderId: "948719781555",
  appId: "1:948719781555:web:7a82657abebcbb152fd2c6",
  measurementId: "G-FBNQ6NXGFR"
};

// Initialize Firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()


// const signupForm = document.querySelector('.login100-form validate-form')

// signupForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   const username = signupForm.username.value
//   const email = signupForm.email.value // All these .value is to get the value that was keyed in
//   const password = signupForm.password.value

//   createUserWithEmailAndPassword(auth,email,password)
//     .then((cred)=>{
//       // console.log('user created',cred.user)
//       signupForm.reset()
//     })
//     .catch((err)=>{
//       console.log(err.message)
//     })

// })

const colRef = collection(db,'users')



const add = document.querySelector('.buttonTest')
add.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    email: "asd",
    country: "Japan"
  });

})

onSnapshot(colRef, (snapshot) => {
  snapshot.docs.forEach(doc => {
      const userID = doc.id;
      console.log(userID)
  })
  
  
})