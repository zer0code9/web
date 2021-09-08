"use strict";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAdditionalUserInfo, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getModularInstance } from "@firebase/util";

const firebaseConfig = {
  apiKey: "AIzaSyCvNfXHq0g3ETXeHPOs5V6MkNyiWfUu1-c",
  authDomain: "slashdevus.firebaseapp.com",
  projectId: "slashdevus",
  storageBucket: "slashdevus.appspot.com",
  messagingSenderId: "724081280496",
  appId: "1:724081280496:web:601b30f1e963f40c2a0935",
  measurementId: "G-FW7RNJTMYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();
const analytics = getAnalytics(app);

    function signUp() {
      //const = document.getElementById('').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const birthdate = document.getElementById('birthdate').value;
      const email = document.getElementById('email').value;
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const log = document.getElementById('log');
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          try {
            const docRef = await addDoc(collection(firestore, "users"), {
              username: username,
              password: password,
              birthdate: birthdate,
              email: email,
              firstName: firstName,
              lastName: lastName,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        })
        .catch(function (error) {log.innerHTML = error.message;})
    }
  function signIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const log = document.getElementById('log');
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      firestore.collection("users").doc(user.uid).collection('settings').doc('account').get()
      .then(data => {
        const userData = data.data()
        if (username == userData.username) {
          log.innerHTML = "Success!"
        } else {
          app.auth().signOut()
          log.innerHTML = "Wrong Username"
        }
      })
    })
  }
    const log = document.getElementById('log');

  document.body.innerHTML += `<div id="loading-area"><i class="fas fa-spinner fa-spin" id="loading"></i></div>`
    // Sign Out
    function signOutEmail() {
      firebase.auth().signOut().then(() => {
        document.getElementById('account-nav').innerHTML = `<a class="fa fa-sign-in" id="signin" href="https://account-6ick.pages.dev/signin"></a>`
      }).catch((error) => {
        log.innerHTML = error.message;
      });
    }

    auth.onAuthStateChanged(function(user) {
      document.getElementById('account-nav').innerHTML = `<div id="load-area"><i class="fas fa-spinner fa-spin" id="load"></i></div>`
      if (user) {
        firestore.collection("users").doc(user.uid).collection('settings').doc('account').get()
          .then(data => {
            $('#loading').hide();
            const userData = data.data()
              document.getElementById('account-nav').innerHTML = `<img src="" id="profilePicture" class="ok" width=150><button onclick="signOutEmail()">Sign out</button>`
              document.getElementById("profilePicture")
                .setAttribute("src", "data:image/png;base64," + userData.profilePicture)

            
          }) 
        } else {
          document.getElementById('account-nav').innerHTML = `<a class="fa fa-sign-in" id="signin" href="https://account-6ick.pages.dev/signin"></a>`
          document.getElementById('loading-area').innerHTML = `<i class="fas fa-exclamation-triangle" id="loading"></i>`
        }
      })
      var user = auth.currentUser;
  
  function supportSlash() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        firestore.collection("users").doc(user.uid).set({
          supporter: true,
        }, {merge: true})
        .then(console.log("Thanks for supporting Slash!"))
      }
    })
  }
  function subscribeSlash() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        firestore.collection("users").doc(user.uid).set({
          subscriber: true,
        }, {merge: true})
        .then(console.log("Thanks for subscribing to Slash!"))
      }
    })
  }
module.exports = signIn, signUp, signOutEmail, subscribeSlash, supportSlash;