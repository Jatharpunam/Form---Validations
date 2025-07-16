//***Password Generator***
function generatePassword() {
    const length = +document.getElementById("length").value;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSpecial = document.getElementById("includeSpecial").checked;
    const excludeAmbiguous = document.getElementById("excludeAmbiguous")?.checked;

    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeSpecial) charset += "!@#$%^&*()_+";
    if (excludeAmbiguous) {
        charset = charset.replace(/[l1I0O]/g, "");
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    const output = document.getElementById("result");
    output.value = password;

    evaluateStrength(password);
}

function evaluateStrength(password) {
    const strengthBar = document.getElementById("strengthBar");
    const strengthText = document.getElementById("strengthText");
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = ["", "Weak", "Medium", "Strong", "Very Strong"];
    const colors = ["", "bg-danger", "bg-warning", "bg-info", "bg-success"];

    strengthBar.style.width = strength * 25 + "%";
    strengthBar.className = "progress-bar " + colors[strength];
    strengthText.textContent = levels[strength];
}

// Copy to Clipboard
function copyPassword() {
    const resultInput = document.getElementById("result");
    resultInput.select();
    resultInput.setSelectionRange(0, 99999); // For mobile
    document.execCommand("copy");
    alert("Password copied to clipboard!");
}

// Show/Hide Password
function togglePasswordVisibility() {
    const input = document.getElementById("result");
    input.type = input.type === "password" ? "text" : "password";
}


//***OTP Generator***
let generatedOTP = "";

function goToNext(self, next) {
    if (self.value.length == 1) {
        document.getElementById(next).focus()
    }
}

function generateOTP() {
    generatedOTP = Math.floor((Math.random() + 1) * 1000)
    console.log(generatedOTP, "otp")
    document.querySelector("#showOTP").textContent = generatedOTP

    document.getElementById('digit1').value = '';
    document.getElementById('digit2').value = '';
    document.getElementById('digit3').value = '';
    document.getElementById('digit4').value = '';
    document.getElementById('digit1').focus();

    document.getElementById("successMsg").classList.add("d-none");
    document.getElementById("errorMsg").classList.add("d-none");
}

document.getElementById('submitBTN').addEventListener('click', () => {

    userOTP = ''

    userOTP = document.getElementById('digit1').value +
        document.getElementById('digit2').value +
        document.getElementById('digit3').value +
        document.getElementById('digit4').value

    document.getElementById("successMsg").classList.add("d-none");
    document.getElementById("errorMsg").classList.add("d-none");

    if (userOTP === generatedOTP.toString()) {
        document.getElementById("successMsg").classList.remove("d-none");
    } else {
        document.getElementById("errorMsg").classList.remove("d-none");
    }
})
