
import { initializeApp } from 'firebase/app'


import{
    getAuth,
    signOut,
    onAuthStateChanged
  }from 'firebase/auth'

  import {
    getDatabase,ref,update
  } from 'firebase/database'


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


initializeApp(firebaseConfig)


// init services

const auth = getAuth()
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)


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


onAuthStateChanged(auth, (user)=>{
  console.log('user state changed',user)
  
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    console.log(displayName)
    document.getElementById('userName').innerHTML = displayName
  }
})

// document.getElementById('userName').innerHTML = displayName


// const auth = getAuth();
// const user = auth.currentUser;
// if (user !== null) {
//   user.providerData.forEach((profile) => {
//     console.log("  Provider-specific UID: " + profile.uid);
//     console.log("  Name: " + profile.displayName);
//   });
// }