var firebaseConfig = {
    apiKey: "AIzaSyBcaNWYhsVXe2UQEN29a2jo9kQ9-nHItLw",
    authDomain: "webyus-world.firebaseapp.com",
    projectId: "webyus-world",
    storageBucket: "webyus-world.appspot.com",
    messagingSenderId: "361296989622",
    appId: "1:361296989622:web:e8cd6770260641e66a0517",
    measurementId: "G-L8KF3GJKS8"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    function signUp() {
      //const = document.getElementById('').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const birthdate = document.getElementById('birthdate').value;
      const email = document.getElementById('email').value;
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const log = document.getElementById('log');
      auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
          let user = auth.currentUser;
          firestore.collection('users').doc(user.uid).collection('settings').doc('account').set({
            username: username,
            password: password,
            birthdate: birthdate,
            email: email,
            firstName: firstName,
            lastName: lastName,
          }, {merge: true})
          .then(function() {log.innerHTML = "Success!"})
          .catch(function(error) {log.innerHTML = error.message})
        })
        .catch(function (error) {log.innerHTML = error.message;})
    }
  function signIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const log = document.getElementById('log');
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      let user = auth.currentUser;
      firestore.collection("users").doc(user.uid).collection('settings').doc('account').get()
      .then(data => {
        const userData = data.data()
        if (username == userData.username) {
          log.innerHTML = "Success!"
        } else {
          firebase.auth().signOut()
          log.innerHTML = "Wrong Username"
        }
      })
    })
  }
    const log = document.getElementById('log');
    /*// Sign Up
    function signUpEmail() {
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;
      auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
          log.innerHTML = `Success`;
        })
        .catch(function (error) {
          log.innerHTML = error.message;
        })
    }*/
  document.body.innerHTML += `<div id="loading-area"><i class="fas fa-spinner fa-spin" id="loading"></i></div>`
  
    // Sign In
    function signInEmail() {
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;
      auth.signInWithEmailAndPassword(email, password)
        .catch(function (error) {
          log.innerHTML = error.message;
        })
    }
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
  
  function supportWeby() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        firestore.collection("users").doc(user.uid).set({
          supporter: true,
        }, {merge: true})
        .then(console.log("Thanks for supporting Weby!"))
      }
    })
  }
  function subscribeWeby() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        firestore.collection("users").doc(user.uid).set({
          subscriber: true,
        }, {merge: true})
        .then(console.log("Thanks for subscribing to Weby!"))
      }
    })
  }