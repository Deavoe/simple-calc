// MATH FUNCTIONS
function add(a,b) {
    return (+a) + (+b)
}
function subtract(a,b) {
    return (+a) - (+b)
}
function multiply(a,b) {
    return (+a) * (+b)
}
function divide(a,b) {
    return (+a) / (+b)
}
function operate(op,a,b) {
    if (op === "add" || op === "+" ) {
        return add(a,b)
    } else if (op === "subtract" || op === "-" ) {
        return subtract(a,b)
    } else if (op === "multiply" || op === "*" ) {
        return multiply(a,b)
    } else if (op === "divide" || op === "/" ) {
        return divide(a,b)
    }
}

// CHECKLIST
// [X] HTML/CSS
// [X] Functions that add onto the display
// [X] ^ also works with keyboard
// [] Error display when dividing by 0 or trying to operate without perimeters
// [] Round decimals to a certain place
// [X] BUTTONS => Input characters (numbers & period)
// [] BUTTONS => Operators and operate (equal)
// [X] BUTTON => Clear current input
// [] BUTTON => ALL Clear
// [X] BUTTON => Convert to percentage
// [X] BUTTON => Toggle positive/negative

let disText = document.querySelector(".display")
let display = ""
let inputA = null
let inputB = null
let total = null

function animKey(key) {
    if (key.classList.contains("ch")) {
        !key.classList.contains("playing") ? key.classList.toggle("playing") : key.classList.remove("playing")
    } else {
        !key.classList.contains("playing2") ? key.classList.toggle("playing2") : key.classList.remove("playing2")
    }
}

function resetDis() {
    if (disText.textContent.length > 0) {
        disText.textContent = ""
    }
}
document.querySelector(".clear").addEventListener("click",resetDis);

let pkey = document.querySelector(".percent")
function percent() {
    if (disText.textContent.length > 0) {
        let num = parseFloat((+disText.textContent/100).toFixed(15)) 
        let str = num.toString()
        if (str.length >= 23) {
            str.slice(0,23-str.length)
            console.log(str)
        }
        disText.textContent = str
        animKey(pkey)
    }
}
pkey.addEventListener("click",percent);

let nkey = document.querySelector(".negative")
function toggleSign() {
    if (disText.textContent.length > 0 && disText.textContent[0] !== "-") {
        disText.textContent = "-" + disText.textContent
        animKey(nkey)
    } else if (disText.textContent.length > 0) {
        disText.textContent = disText.textContent.substring(1)
        animKey(nkey)
    }
}
nkey.addEventListener("click",toggleSign);

function addChar(e,bool) {
    let tc = null
    // console.log(e)
    e.target ? tc = e.target.textContent : tc = e.textContent 
    // e.target.classList ? animKey(e.target) : animKey(e)
    if (tc === "." && disText.textContent.includes(".")) {return}
    if (disText.textContent.length >= 22) { return }
    disText.textContent += tc
    if (e.target !== undefined) {animKey(e.target)}
}
function processKey(e) {
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (key === null) {return}
    if (key.classList.contains("ch")) {
        // !key.classList.contains("playing") ? key.classList.toggle("playing") : key.classList.remove("playing")
        animKey(key)
        addChar(key)
    } else if (e.keyCode === 8) { // Backspace
        disText.textContent = disText.textContent.slice(0,-1);
        if (disText.textContent.length === 1 && disText.textContent[0] === "-") {
            disText.textContent = ""
        }
    } else if (e.keyCode === 53) { // Percent
        percent()
    } else if (e.keyCode === 67) { // Clear
        resetDis()
    } else if (e.keyCode === 78) { // Toggle positive/negative
        toggleSign()
    }
}
document.querySelectorAll(".ch").forEach((el) => el.addEventListener("click",addChar)  );

function removeTransition(e) {
    // console.log(e)
    if (e.target.classList.contains("playing") ) { //(e.propertyName !== 'box-shadow') return;
    e.target.classList.remove('playing');
    } else if (e.target.classList.contains("playing2")) {
        e.target.classList.remove('playing2');
    }
  }
const keys = Array.from(document.querySelectorAll('.gb'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', processKey);
