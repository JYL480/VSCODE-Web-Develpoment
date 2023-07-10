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
  getDatabase,ref,update
} from 'firebase/database'

import{
  getAuth,
  signOut, signInWithEmailAndPassword,updateProfile,
  onAuthStateChanged
}from 'firebase/auth'


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const database = getDatabase(app)

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {

        const user = cred.user
        const dt = new Date()

        update(ref(database, 'users/' + user.uid),{
            last_login: dt,
        })

        // const userNameGet = ref(database, 'users/' +  user.uid + '/username');
        //   onValue(userNameGet, (snapshot) => {
        //     const data = snapshot.val();
        //     updateProfile( auth.currentUser, {
        //       displayName: data
        //     })
        //   });
          


        console.log('user logged in:', cred.user)
        alert('User Logged In!')
        
        // best to use the location.replace

        if (user !== null) {
          user.providerData.forEach((profile) => {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
          });
        }
        setTimeout(function () {
          window.location.href = '/src/landing_page/landing_page.html';
      }, 500);

    })
    .catch(error => {
      
      const errorCode = error.code
      const errorMessage = error.message
      console.log(error.code+error.message)
      alert(errorCode+errorMessage)
    })
})