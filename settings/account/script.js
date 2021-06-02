'use strict';
// Change
auth.onAuthStateChanged(function(user) {
    if (user) {
      firestore.collection("users").doc(user.uid).collection('settings').doc('account').get()
        .then(data => {
            const userData = data.data()
            if (userData.displayName == "" || !userData.displayName) {userData.displayName = userData.username}
            document.getElementById("helloUser").innerText = `Hello ` + userData.displayName || userData.username
            document.getElementById("meUsername").value = userData.username;
            document.getElementById("meFName").value = userData.firstName;
            document.getElementById("meLName").value = userData.lastName;
            document.getElementById("meBirthdate").value = userData.birthdate;
        })
    }
  })