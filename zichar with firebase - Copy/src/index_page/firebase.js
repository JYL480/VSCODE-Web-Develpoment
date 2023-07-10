

import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";


import{
  getAuth,
  signOut,
  onAuthStateChanged
}from 'firebase/auth'

import {
  getDatabase,ref,update
} from 'firebase/database'

import {
    collection,
    getFirestore, getDocs,
    serverTimestamp, addDoc, deleteDoc,
    onSnapshot,doc
} from 'firebase/firestore'

// import{
//   EmailAuthProvider,PROVIDER_ID,onAuthStateChanged,getAuth

// }from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCa8m8RSFyN-cL__OyZXCEU8Bnslyl1AfE",
    authDomain: "zi-char-project.firebaseapp.com",
    projectId: "zi-char-project",
    storageBucket: "zi-char-project.appspot.com",
    messagingSenderId: "646748018366",
    appId: "1:646748018366:web:325400ac3597ecbe4630ef",
    measurementId: "G-GP3RKLHE8D"
  };



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const user = auth.currentUser;

// authentication
// Initialize the FirebaseUI Widget using Firebase.




// initiailise the services
const db = getFirestore()



// collection reference

// const colRef_food = collection(db,'food order')

const coldRef_delivery = collection(db,'Users')

const colRef_users = collection(db,'Users')

// Real time snap shot
// onSnapshot(colRef_food, (snapshot) => {
//     let foodOrder = []
//     snapshot.docs.forEach(doc => {
//         foodOrder.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(foodOrder)
//   })
  


// to print and show?
// get collection data
// getDocs(coldRef_delivery)
//   .then(snapshot => {
//     let deliverDetails = []
//     snapshot.docs.forEach(doc => {
//         deliverDetails.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(deliverDetails)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })


// ---- To print out the documne

  // onSnapshot(colRef_users, (snapshot) => {
  //   snapshot.docs.forEach(doc => {
  //       const userID = doc.id;
  //       console.log(userID)
  //   })
  // })
  

  onAuthStateChanged(auth, (user)=>{
    console.log('user state changed',user)})

    
// To add the address

const deliverDetails = document.querySelector('.addDetails')
  deliverDetails.addEventListener('submit', (e) => {
    e.preventDefault()
    const auth = getAuth()
    const user = auth.currentUser;
    if (user !== null) {
      const docRef_users = doc(db, "Users", user.email);
      const coldRef_delivery = collection(docRef_users, "deliveryDetials")
            console.log(user.email)
            addDoc(coldRef_delivery, {
              PhoneNumber: deliverDetails.phoneNumber.value,
              streetName: deliverDetails.streetName.value,
              postalCode: deliverDetails.postalCode.value,
              others: deliverDetails.others.value,
              createdAt: serverTimestamp(),
        })
    }
    deliverDetails.reset()
  })


  onAuthStateChanged(auth, (user)=>{

    
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      // console.log(displayName)
      document.getElementById('userName').innerHTML = displayName
    }
  })

  const logoutButton = document.querySelector('.logOutThing')
logoutButton.addEventListener('click', () => {

  // const user = cred.user
  // const dt = new Date()

  // update(ref(database, 'users/' + user.uid),{
  //     last_logOut: dt,
  // })
  signOut(auth) // Most of this method are asynchronous which has a promise, so you can add .then to create another function 
    .then((cred) => {
      console.log('User Logged Out')
      alert('User Logged Out')

            setTimeout(function () {
        window.location.href = '/src/login_page/login.html';
    }, 500);    
    })
    .catch(err => {
      console.log(err.message)
    })
})

export default function addToCart(list_item){
  console.log(list_item)
  const foodOrders1 = document.querySelector(".list .item .buttonAdd1")
  foodOrders1.addEventListener('click', (e) => {
  e.preventDefault()
  
  const auth = getAuth()
  const user = auth.currentUser;
  if (user !== null) {
      const docRef_users = doc(db, "Users", user.email);
      const coldRef_delivery = collection(docRef_users, "FoodOrder")
      var foodName = document.getElementsByClassName('buttonAdd1')
          console.log(user.email)
          addDoc(coldRef_delivery, {
              foodOrder: foodName.subject.value,
              createdAt: serverTimestamp(),
              })
      }
  })

}