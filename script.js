let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.getElementById("screen");

// Handles numbers being pressed
function handleNumber(number) {
    if (buffer === "0") {
        buffer = number; // Replace initial "0"
    } else {
        buffer += number; // Append number to the buffer
    }
    updateScreen();
}

// Handles symbols (operators and special buttons)
function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            resetCalculator();
            break;
        case "←":
            buffer = buffer.length > 1 ? buffer.slice(0, -1) : "0";
            break;
        case "=":
            if (previousOperator !== null) {
                performCalculation(); // No argument needed
                previousOperator = null;
                buffer = runningTotal.toString();
                runningTotal = 0;
            }
            break;
        case "÷":
        case "×":
        case "-":
        case "+":
            handleMath(symbol);
            break;
    }
    updateScreen();
}

// Handles arithmetic operations
function handleMath(symbol) {
    if (buffer === "0") return;

    const bufferValue = parseFloat(buffer);
    if (runningTotal === 0) {
        runningTotal = bufferValue;
    } else {
        performCalculation(); // No argument needed
    }

    previousOperator = symbol;
    buffer = "0";
}

// Performs the calculation based on the previous operator
function performCalculation() {
    const bufferValue = parseFloat(buffer); // Get the value to calculate

    if (previousOperator === "+") {
        runningTotal += bufferValue;
    } else if (previousOperator === "-") {
        runningTotal -= bufferValue;
    } else if (previousOperator === "×") {
        runningTotal *= bufferValue;
    } else if (previousOperator === "÷") {
        if (bufferValue !== 0) {
            runningTotal /= bufferValue;
        } else {
            alert("Cannot divide by zero");
            resetCalculator();
        }
    }
}

// Resets the calculator to its initial state
function resetCalculator() {
    buffer = "0";
    runningTotal = 0;
    previousOperator = null;
    updateScreen();
}

// Updates the calculator screen
function updateScreen() {
    screen.innerText = buffer;
}

let eventListenersInitialized = false;

// Initializes the calculator with event listeners
function init() {
    if (eventListenersInitialized) {
        console.warn("Event listeners already initialized. Skipping.");
        return;
    }

    const buttons = document.querySelectorAll(".calc-button");

    buttons.forEach((button) => {
        button.removeEventListener("click", handleButtonClick); // Ensure no duplicate listeners
        button.addEventListener("click", handleButtonClick);
    });

    eventListenersInitialized = true;
    console.log("Calculator initialized.");
}

// Handles button clicks
function handleButtonClick(event) {
    const value = event.target.innerText.trim(); // Trim to remove extra spaces

    if (!isNaN(value)) {
        handleNumber(value); // Handle numbers
    } else {
        handleSymbol(value); // Handle symbols
    }
}

document.addEventListener("DOMContentLoaded", init);
