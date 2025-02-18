
document.addEventListener("DOMContentLoaded", function () {
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    console.log(emailError);
    console.log(passwordError);

    emailError.innerHTML=''
    passwordError.innerHTML=''

});



document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let isEmailValid = validateEmail(email);
    let isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
        alert("Login Successful ✅");
        window.location.href="http://localhost:3000/private"
    }
    else{
        alert('Error occured')
    }
});

function validateEmail(email) {
    let emailError = document.getElementById("emailError");
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.style.display = "block";
        emailError.innerHTML='Invalid email address'
        return false;
    } else {
        emailError.style.display = "none";
        return true;
    }
}

function validatePassword(password) {
    let passwordError = document.getElementById("passwordError");

    if (password.length < 6) {
        passwordError.style.display = "block";
        passwordError.innerHTML='Invalid password'
        return false;
    } else {
        passwordError.style.display = "none";
        return true;
    }
}