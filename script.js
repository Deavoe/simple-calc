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
// [] BUTTONS => Input characters (numbers & period)
// [] BUTTONS => Operators and operate (equal)
// [X] BUTTON => Clear current input
// [] BUTTON => ALL Clear
// [] BUTTON => Convert to percentage
// [] BUTTON => Toggle positive/negative

let disText = document.querySelector(".display")
let display = "" // max of 11
let inputA = 0
let inputB = 0
let total = 0

function resetDis() {
    if (disText.textContent.length > 0) {
        disText.textContent = ""
    }
}
document.querySelector(".clear").addEventListener("click",resetDis);

function addChar(e) {
    let tc = null
    // console.log(e)
    e.target ? tc = e.target.textContent : tc = e.textContent
    if (tc === "." && disText.textContent.includes(".")) {return}
    if (disText.textContent.length >= 11) { return }
    disText.textContent += tc
}
function processKey(e) {
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (key === null) {return}
    if (key.classList.contains("ch")) {
        addChar(key)
    } else if (e.keyCode === 8) { // Backspace
        disText.textContent = disText.textContent.slice(0,-1);
    }
}
document.querySelectorAll(".ch").forEach((el) => el.addEventListener("click",addChar)  );

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }
const keys = Array.from(document.querySelectorAll('.gb'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', processKey);
