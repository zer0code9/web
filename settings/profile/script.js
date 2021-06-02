'use strict';
// Change
let userNow;
auth.onAuthStateChanged(function(user) {
    if (user) {
      userNow = auth.currentUser;
      firestore.collection("users").doc(user.uid).collection('settings').doc('account').get()
        .then(data => {
            const userData = data.data()
            if (userData.displayName == "" || !userData.displayName) {userData.displayName = userData.username}
            document.getElementById("helloUser").innerText = `Hello ` + userData.displayName || userData.username;
            document.getElementById("meDName").value = userData.displayName || "";
            document.getElementById("meEmail").innerText = userData.email;
            document.getElementById("meURL").value = userData.url || "";
            document.getElementById("meCompany").value = userData.company || "";
        })
    }
  })
function saveProfile() {
    const displayName = document.getElementById('meDName').value;
    const URL = document.getElementById('meURL').value;
    const company = document.getElementById('meCompany').value;
    if (userNow) {
        firebase.firestore().collection("users").doc(userNow.uid).collection('settings').doc('account')
          .set({
            displayName: displayName || "",
            url: URL,
            company: company,
          }, {merge: true})
    }
}