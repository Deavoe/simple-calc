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
// [] Error display when dividing by 0 or trying to operate without perimeters
// [] Round decimals to a certain place
// [] BUTTONS => Input characters (numbers & period)
// [] BUTTONS => Operators and operate (equal)
// [] BUTTON => Clear current input
// [] BUTTON => ALL Clear
// [] BUTTON => Convert to percentage
// [] BUTTON => Toggle positive/negative