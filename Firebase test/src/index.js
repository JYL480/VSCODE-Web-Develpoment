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
  apiKey: "AIzaSyCb6iGj8Ta1oztx-3Zm5HlyWVEYUBJXWEA",
  authDomain: "db-test-593d7.firebaseapp.com",
  projectId: "db-test-593d7",
  storageBucket: "db-test-593d7.appspot.com",
  messagingSenderId: "503785327813",
  appId: "1:503785327813:web:c3979557f7c8f10acb34ac"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// // collection ref
 
const colRef = collection(db,'books')

// TO specify what to delete queries
const q = query(colRef, orderBy('createdAt'))
// fetch me any document where the author is dam brown, so it searches and filters for you

// get collection data
// getDocs(colRef)
//   .then(snapshot => {
//     let books = []
//     snapshot.docs.forEach(doc => {
//       books.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(books)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })


// NOw we will have a real time collection data, when the website will update in real time 

// const unsubCol = 
onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

// get a single document

// This docRef will not interfere with one above, because the above is a local variable witin the funciton 
const docRef = doc(db,'books','IJcMR0TZXawqmDocvpXO')

// getDoc(docRef)
//   .then((doc)=>{
//     console.log(doc.data(),doc.id)
//   })

const unsubDoc = onSnapshot(docRef, (doc)=> {
  console.log(doc.data(),doc.id)
})

// Update existing form 
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })
})


// SIgning up users

const signupForm = document.querySelector('.sidgnup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value // All these .value is to get the value that was keyed in
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth,email,password)
    .then((cred)=>{
      // console.log('user created',cred.user)
      signupForm.reset()
    })
    .catch((err)=>{
      console.log(err.message)
    })

})

// log in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth) // Most of this method are asynchronous which has a promise, so you can add .then to create another function 
    .then(() => {
      // console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      // console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

// subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user)=>{
  console.log('user state changed',user)
})

// unsubscribing from changes (auth & db)
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
  console.log('unsubscribing')
  unsubCol()
  unsubDoc()
  unsubAuth()
})

