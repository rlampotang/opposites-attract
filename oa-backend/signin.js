window.onload = (event) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location = 'journals.html';
        }
    });
};

function signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        window.location = './journals.html';
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode + ": " + errorMessage + " (email: " + email + ", credential: " + credential + ")");
    });
}

document.getElementById('signIn').addEventListener('click', signIn);