// Import necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';
import { getFirestore, doc, setDoc, deleteDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHJJl87lTVRoX0gadRX4C3ZKuv9gdvlPo",
    authDomain: "graduates-mapping.firebaseapp.com",
    projectId: "graduates-mapping",
    storageBucket: "graduates-mapping.appspot.com",
    messagingSenderId: "763130009223",
    appId: "1:763130009223:web:1c16560d1540a7089d0a22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.onload = () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            setupUI();
            
            const userDocRef = doc(db, 'users', user.uid);
            onSnapshot(userDocRef, (docSnapshot) => {
                if (docSnapshot.exists) {
                    renderUserData(docSnapshot.data());
                }
            });
        } else {
            window.location.href = '/login.html';
        }
    });
};

function setupUI() {
    document.getElementById('add-user').addEventListener('click', addOrUpdateUser);
    document.getElementById('update-user').addEventListener('click', addOrUpdateUser);


    document.getElementById('log-out').addEventListener('click', logOutUser);
}

async function logOutUser() {
    try {
        // Attempt to sign out the user
        await auth.signOut();
        
        // Display a success message
        alert('You have been logged out!');
        
        // Redirect the user to the login page
        window.location.href = '/html/login.html';
    } catch (error) {
        // Handle errors, if any
        console.error("Error signing out: ", error);
        alert(error.message);
    }
}


function renderUserData(data) {
    document.getElementById('firstname').value = data.firstname || '';
    document.getElementById('lastname').value = data.lastname || '';
    document.getElementById('age').value = data.age || '';
    document.getElementById('birthday').value = data.birthday || '';
    document.getElementById('course').value = data.course || '';
    document.getElementById('gender').value = data.gender || '';
    document.getElementById('worklocation').value = data.worklocation || '';
}

async function addOrUpdateUser() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        alert('No authenticated user found!');
        return;
    }

    try {
        await setDoc(doc(db, 'users', currentUser.uid), {
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            age: document.getElementById('age').value,
            birthday: document.getElementById('birthday').value,
            course: document.getElementById('course').value,
            gender: document.getElementById('gender').value,
            worklocation: document.getElementById('worklocation').value,
            added_at: new Date()
        }, { merge: true });

        alert('Data successfully added or updated!');
    } catch (error) {
        console.error("Error adding or updating data: ", error);
        alert(error.message);
    }
}

function deleteUser() {
    const userId = document.getElementById('document').value;
    if (userId) {
        deleteDoc(doc(db, 'users', userId)).catch(error => {
            console.error("Error deleting document: ", error);
        });
    } else {
        alert('No user selected for deletion.');
    }
}