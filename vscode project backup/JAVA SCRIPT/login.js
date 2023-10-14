// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHJJl87lTVRoX0gadRX4C3ZKuv9gdvlPo",
    authDomain: "graduates-mapping.firebaseapp.com",
    projectId: "graduates-mapping",
    storageBucket: "graduates-mapping.appspot.com",
    messagingSenderId: "763130009223",
    appId: "1:763130009223:web:1c16560d1540a7089d0a22",
    measurementId: "G-S1442WP8Y1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Define the login function
window.login = function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

  
// Log the user in
signInWithEmailAndPassword(auth, email, password).then((cred) => {
    // Alert the user that login was successful
    alert('Login successful!');

    // Redirect to another page after a successful login:
    window.location.href = '/html/home.html';
        
    // Reset the login form fields (optional, since you are redirecting away from the page)
    event.target.reset();
}).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(errorCode, errorMessage);
    
    if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
        alert('Incorrect email or password. Please try again.');
    } else {
        alert('Error: ' + errorMessage);
    }
});


}
