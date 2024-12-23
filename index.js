const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
const numbers = "0123456789".split("");
const symbols = "~`!@#$%^&*()_-+={[}]|:;<>,.?/".split("");

const password1Elt = document.getElementById("password-1");
const password2Elt = document.getElementById("password-2");
const passwordLength = document.getElementById("password-length");
const symbolsElt = document.getElementById("symbols");
const numbersElt = document.getElementById("numbers");
const copiedElt = document.getElementById("copied");
const generateButton = document.getElementById("generator-btn");

passwordLength.addEventListener("keydown", (event) => {
    const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
    if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
    }
});

generateButton.addEventListener("click", generatePasswords);


function generatePasswords() {
    let length = parseInt(passwordLength.value) || 15;
    if (symbolsElt.checked) length--;
    if (numbersElt.checked) length--;

    let firstPassword = generatePassword(length);
    let secondPassword = generatePassword(length);

    if (symbolsElt.checked) {
        firstPassword += getRandomElement(symbols);
        secondPassword += getRandomElement(symbols);
    }

    if (numbersElt.checked) {
        firstPassword += getRandomElement(numbers);
        secondPassword += getRandomElement(numbers);
    }

    appendPassword(password1Elt, firstPassword, copyOnClipBoardFirstPassword);
    appendPassword(password2Elt, secondPassword, copyOnClipBoardSecondPassword);
}

function generatePassword(length) {
    return Array.from({ length }, () => getRandomElement(characters)).join("");
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function appendPassword(element, password, copyFunction) {
    element.textContent = password;
    const copyIcon = createCopyIcon();
    copyIcon.addEventListener("click", copyFunction);
    element.appendChild(copyIcon);
}

function createCopyIcon() {
    const copyIcon = document.createElement("span");
    copyIcon.classList.add("copy-icon");
    copyIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18" width="15.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#63E6BE" d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>`;
    return copyIcon;
}

function copyOnClipBoard(password) {
    navigator.clipboard.writeText(password);
    copiedElt.hidden = false;
    setTimeout(() => {
        copiedElt.hidden = true;
    }, 3000);
}

function copyOnClipBoardFirstPassword() {
    copyOnClipBoard(password1Elt.textContent);
}

function copyOnClipBoardSecondPassword() {
    copyOnClipBoard(password2Elt.textContent);
}