const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let firstOperand = null;
let currentOperation = "";
const maxLength = 10; 

buttons.forEach(button => {
    button.addEventListener("click", () => handleButtonClick(button.textContent));
});

function handleButtonClick(value) {
    if(value === "C") {
        currentInput = "";
        firstOperand = null;
        currentOperation = "";
        display.textContent = "0";
        return;
    }

    if(value === "=") {
        if(firstOperand !== null && currentOperation !== "" && currentInput !== "") {
            let secondOperand = parseFloat(currentInput);
            let result;

           
            switch(currentOperation) {
                case "+":
                    result = firstOperand + secondOperand;
                    break;
                case "-":
                    result = firstOperand - secondOperand;
                    break;
                case "*":
                    result = firstOperand * secondOperand;
                    break;
                case "/":
                    result = firstOperand / secondOperand;
                    break;
                default:
                    result = "Error";
            }

            
            if (result > 9999999999 || result < -9999999999) {
                display.textContent = result.toExponential(3);
            } else {

                display.textContent = result.toString().slice(0, maxLength); 
            }

            currentInput = result.toString();
            firstOperand = null;
            currentOperation = "";
        }
        return;
    }

    if(currentInput.length < maxLength) { 
        currentInput += value;
        display.textContent = currentInput;
    }

    if(value === "+" || value === "-" || value === "*" || value === "/") {
        if(currentInput !== "") {
            firstOperand = parseFloat(currentInput);
            currentOperation = value;
            currentInput = "";
            display.textContent = value;
        }
    }
}
