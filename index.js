const characters =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g",
    "h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]

let password1Elt = document.getElementById("password-1");
let password2Elt = document.getElementById("password-2");
let passwordLenght = document.getElementById("password-lenght");
let symbolsElt = document.getElementById("symbols");
let numbersElt = document.getElementById("numbers");

function generatePasswords(){
    let lenght = parseInt(passwordLenght.value);
 
    lenght = lenght ? lenght: 15;
    lenght = symbolsElt.value ? lenght-1 : lenght;
    lenght = numbersElt.value ? lenght-1 : lenght;

    console.log(lenght);

    let firstPassword = "";
    let secondPassword = "";

    for(let i=0; i < lenght; i++ ){
        firstPassword += characters[getRandomIndex(characters.length)];
        secondPassword += characters[getRandomIndex(characters.length)];
    }

    if (symbolsElt.value) {
        firstPassword += symbols[getRandomIndex(symbols.length)]
        secondPassword += symbols[getRandomIndex(symbols.length)]
    }

    if (numbersElt.value) {
        firstPassword += numbers[getRandomIndex(numbers.length)]
        secondPassword += numbers[getRandomIndex(numbers.length)]
    }

    password1Elt.textContent = firstPassword;
    password2Elt.textContent = secondPassword;
}

function getRandomIndex(length){
    console.log(length);
    return Math.floor( Math.random() * length)
}

function copyOnClipBoard(password){
    navigator.clipboard.writeText(password);
    alert("Copied the text: " + password);
}

function copyOnClipBoardFirstPassword(){
    copyOnClipBoard(password1Elt.textContent);
}

function copyOnClipBoardSecondPassword(){
    copyOnClipBoard(password2Elt.textContent);
}