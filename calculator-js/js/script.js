const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // Add digit to calculator screen
  addDigit(digit) {
    // Check if division by zero was done
    if (this.currentOperationText.innerText === "Infinity") {
      this.currentOperationText.innerText = "0";
      this.previousOperationText.innerText = "";
    }

    // Check if current operation already has a dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    if (this.currentOperationText.innerText === "0" && digit !== ".") {
      this.currentOperationText.innerText = "";
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // Process all calculator operations
  processOperation(operation) {
    // Check if current is empty
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Change opeeration
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }

      return;
    }

    // Get current and previous valaue
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        this.currentOperationText.innerText = "0";
        break;

      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        this.currentOperationText.innerText = "0";
        break;

      case "×":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        this.currentOperationText.innerText = "0";
        break;

      case "÷":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        this.currentOperationText.innerText = "0";
        break;

      case "DEL":
        this.processDelOperator();
        break;

      case "CE":
        this.processClearCurrentOperation();
        break;

      case "C":
        this.processClearOperation();
        break;

      case "=":
        this.processEqualOperator();
        break;

      default:
        return;
    }
  }

  // Change values of the calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Check if value is zero, if it is just add current value
      if (previous === 0) {
        operationValue = current;
      }

      // Add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Change math operation
  changeOperation(operation) {
    const mathOperation = ["+", "-", "×", "÷"];

    if (!mathOperation.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Delete the last digit
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);

    if (this.currentOperationText.innerText === "") {
      this.currentOperationText.innerText = "0";
    }
  }

  // Clear current operation
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "0";
  }

  // Clear all operations
  processClearOperation() {
    this.currentOperationText.innerText = "0";
    this.previousOperationText.innerText = "";
  }

  // Process an operation
  processEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
    this.currentOperationText.innerText =
      previousOperationText.innerText.split(" ")[0];
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
