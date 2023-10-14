// name of file log_in.js 

  document.addEventListener("DOMContentLoaded", function () {
    var passwordInput = document.querySelector("input[name='password']");
    var showPasswordCheckbox = document.getElementById("showPasswordCheckbox");

    showPasswordCheckbox.addEventListener("change", function () {
        if (showPasswordCheckbox.checked) {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });
});



