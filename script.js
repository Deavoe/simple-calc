// VARIABLES

let disText = document.querySelector(".display")
let display = ""
let inputA = null
let inputB = null
let newOp = false
let total = null
let op = null

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

// TOP ROW BUTTONS

let ackey = document.querySelector(".Aclear")
function allClear() {
    inputA = null
    inputB = null
    total = 0
    newOp = false
    animKey(ackey)
    if (disText.textContent.length > 0) {
        disText.textContent = ""
    }
    if (op !== null) {
        op = null
        highlightOp(op)
    }
}
ackey.addEventListener("click",allClear);

let ckey = document.querySelector(".clear")
function resetDis() {
    if (disText.textContent.length > 0) {
        disText.textContent = ""
        animKey(ckey)
    }
    if (op !== null) {
        op = null
        highlightOp(op)
    }
}
ckey.addEventListener("click",resetDis);

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

// ANIMATIONS

function animKey(key) {
    if (key.classList.contains("ch") || key.classList.contains("equal") ) {
        !key.classList.contains("playing") ? key.classList.toggle("playing") : key.classList.remove("playing")
    } else {
        !key.classList.contains("playing2") ? key.classList.toggle("playing2") : key.classList.remove("playing2")
    }
}
function highlightOp(op) {
    document.querySelectorAll(".op").forEach((el) => el.classList.remove("playing2") )
    if (op === null || op === '' ) {return}
    document.querySelector(`.${op}`).classList.add("playing2")
}
function removeTransition(e) {
    // console.log(e)
    if (e.target.classList.contains("playing" ) ) { //(e.propertyName !== 'box-shadow') return;
    e.target.classList.remove('playing');
    } else if (e.target.classList.contains("playing2") && !e.target.classList.contains("op")) {
        e.target.classList.remove('playing2');
    }
  }
const keys = Array.from(document.querySelectorAll('.gb'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

// CHECKLIST
// [X] HTML/CSS
// [X] Functions that add onto the display
// [X] ^ also works with keyboard
// [X] Error display when dividing by 0 or trying to operate without perimeters
// [X] Round decimals to a certain place
// [X] BUTTONS => Input characters (numbers & period)
// [X] BUTTONS => Operators and operate (equal)
// [X] BUTTON => Clear current input
// [X] BUTTON => ALL Clear
// [X] BUTTON => Convert to percentage
// [X] BUTTON => Toggle positive/negative

// MAIN OPERATIONS

document.querySelectorAll(".op").forEach((el) => el.addEventListener("click",changeOp)  );
document.querySelectorAll(".ch").forEach((el) => el.addEventListener("click",addChar)  );
window.addEventListener('keydown', processKey);

let ekey = document.querySelector(".equal")
function operateGo() {
    if (inputA !== null && inputB === null && newOp === false ) {inputB = +disText.textContent }
    if (inputA === null || inputB === null || op === null ) {return}
    if ( (inputA === 0 || inputB === 0) && op === "divide" ) {
        allClear()
        disText.textContent = "Cannot divide by zero."
        newOp = true
        return
    }
    let operation = window[op](inputA,inputB)
    console.log("Op: " + operation)
    inputB = null
    let rounding = parseFloat(operation).toFixed(15)
    console.log("Rounding: " + rounding)
    if (total === null) {total = 0}
    total = Number(rounding)
    inputA = total
    disText.textContent = Number(total)
    op = null
    highlightOp(op)
    newOp = true
    animKey(ekey)
}
ekey.addEventListener("click",operateGo);

function addChar(e) {
    if (newOp === true) {newOp = false; disText.textContent = "" }
    let tc = null
    e.target ? tc = e.target.textContent : tc = e.textContent 
    if (tc === "." && disText.textContent.includes(".")) {return}
    if (disText.textContent.length >= 22) { return }
    disText.textContent += tc
    if (e.target !== undefined) {animKey(e.target)}
}

function changeOp(e) {
    let opk = null
    !e.target ? opk = e : opk = e.target
    if (disText.textContent.length <= 0) {return}
    if (opk.classList.contains("divide") && op !== "divide" ) {
        op = "divide"
    } else if (opk.classList.contains("multiply") && op !== "multiply") {
        op = "multiply"
    } else if (opk.classList.contains("add") && op !== "add") {
        op = "add"
    } else if (opk.classList.contains("subtract") && op !== "subtract") {
        op = "subtract"
    } else {
        operateGo()
        // op = null
        // highlightOp(op)
        // newOp = false
        // return
    }
    highlightOp(op)
    if (newOp === true) {return}
    if (inputA === null || newOp === false ) {
    inputA = parseFloat(disText.textContent).toFixed(15)
    newOp = true
    } else if (inputA !== null) {
    inputB = parseFloat(disText.textContent).toFixed(15)
    operateGo()
    }
}

function processKey(e) {
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (key === null) {return}
    if (key.classList.contains("ch")) { // Input characters
        animKey(key)
        addChar(key)
    } else if (e.keyCode === 8) { // Backspace
        disText.textContent = disText.textContent.slice(0,-1);
        if (disText.textContent.length === 1 && disText.textContent[0] === "-") {
            disText.textContent = ""
        }
    } else if (e.keyCode === 80) { // Percent
        percent()
    } else if (e.keyCode === 67) { // Clear
        resetDis()
    } else if (e.keyCode === 78) { // Toggle positive/negative
        toggleSign()
    } else if (e.keyCode === 65) { // ALL Clear
        allClear()
    } else if (key.classList.contains("op")) { // Operators
        changeOp(key)
    } else if (e.keyCode === 13) { // Equal key (operate)
        operateGo()
    }  
}