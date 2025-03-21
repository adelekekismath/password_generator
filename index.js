const passwordDisplay = document.getElementById("password-display");
const lengthInput = document.getElementById("password-length");
const lengthValue = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateBtn = document.getElementById("generate-btn");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");
const copyBtn = document.getElementById("copy-btn");

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "~`!@#$%^&*()_-+={[}]|:;<>,.?/";

lengthInput.addEventListener("input", () => {
    lengthValue.textContent = lengthInput.value;
});

generateBtn.addEventListener("click", () => {
    const length = parseInt(lengthInput.value);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    let characters = "";
    if (includeUppercase) characters += uppercaseLetters;
    if (includeLowercase) characters += lowercaseLetters;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    passwordDisplay.textContent = password;
    updateStrengthIndicator(password);
});

copyBtn.addEventListener("click", copyPassword);

function updateStrengthIndicator(password) {
    const strength = calculatePasswordStrength(password);
    strengthBar.style.width = `${strength * 25}%`;
    strengthText.textContent = ["WEAK", "MEDIUM", "STRONG", "VERY STRONG"][strength - 1];
}

function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
}

function copyPassword() {
    const password = passwordDisplay.textContent;
    if(!password) return;
    navigator.clipboard.writeText(password).then(() => {
        showCopiedMessage();
    });
}

function showCopiedMessage() {
    const copiedMessage = document.createElement("div");
    copiedMessage.id = "copied-message";
    copiedMessage.textContent = "Copied!";
    document.body.appendChild(copiedMessage);

    setTimeout(() => {
        copiedMessage.remove();
    }, 2000);
}