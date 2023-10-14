// Import ng mga kinakailangang functions mula sa Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, push, set, onValue, remove, update, onChildAdded } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Firebase configuration para sa iyong proyektong Firebase
const firebaseConfig = {
    // I-paste dito ang iyong Firebase project configuration
};

// Initialize ng Firebase app gamit ang konfigurasyon
const app = initializeApp(firebaseConfig);

// Kunin ang references para sa authentication at database
const auth = getAuth(app);
const database = getDatabase(app);

// Kunin ang mga elements mula sa HTML
var inp = document.getElementById("Name");
var descri = document.getElementById("Description");
var status = document.getElementById("Status");

// Function para magdagdag ng task sa database
window.sendtodo = function () {
    var obj = {
        task: inp.value,
        description: descri.value,
        status: status.value,
        uid: localStorage.getItem("uid")
    };

    // Validation para sa mga input fields
    if (obj.task == "" || obj.description == "" || obj.status == "") {
        alert("All Fields Are Required");
        return false;
    } else {
        // Kunin ang reference para sa task at magdagdag ng data
        const keyRef = ref(database, 'todotask', 'Users');
        obj.id = push(keyRef).key;
        const references = ref(database, `todotask/${obj.id}/`);

        // I-save ang data sa database
        set(references, obj)
            .then(() => {
                console.log(obj.id);
                console.log(obj);
                alert("Data Added Successfully");
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    }
};

// Function para kunin ang data mula sa database
window.getdata = function () {
    const taskRef = ref(database, 'todotask/');
    onChildAdded(taskRef, function (data) {
        list.push(data.val());
        renderData();
    });
}

// Function para i-delete ang task
window.delTask = function (y) {
    let UID = y.parentElement.getAttribute("id");
    remove(ref(database, `todotask/${UID}`))
        .then(() => {
            alert("Data Removed Successfully");
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
    y.parentElement.parentElement.remove();
}

// Function para i-edit ang task
window.editask = function (y) {
    let Value = prompt("Please Enter New Name", y.parentElement.value);
    let Value2 = prompt("Please Enter New Description", y.parentElement.value);
    let Value3 = prompt("Please Enter New Status", y.parentElement.value);
    let UID = y.parentElement.getAttribute("id");
    const REF = ref(database, `todotask/${UID}`);
    update(REF, {
        task: Value,
        description: Value2,
        status: Value3
    })
        .then(() => {
            alert("Data Updated Successfully");
            var parent = document.getElementById('parent');
            parent.innerHTML = "";
            getdata();
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// Function para i-logout ang user
window.logout = function () {
    signOut(auth)
        .then(function () {
            alert("Logout Successfully");
            window.location.href = "/html/firstweb.html";
        })
        .catch(function (err) {
            console.log(err);
        });
};

// Function para i-check ang authentication state ng user
function checkAuthentication() {
    onAuthStateChanged(auth, function (user) {
        if (user) {
            const uid = user.uid;
            console.log(uid);
        } else {
            window.location.href = "/html/firstweb.html";
        }
    });
}

// I-tawag ang checkAuthentication function upang i-check ang authentication state
checkAuthentication();
