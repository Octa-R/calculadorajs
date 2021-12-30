document.querySelectorAll("[data-number]").forEach((e) => {
  e.addEventListener("click", () => {
    calculator.appendNumber(e.innerText);
  });
});

document.querySelector("[data-delete").addEventListener("click", (e) => {
  calculator.delete();
});
document.querySelector("[data-equals]").addEventListener("click", (e) => {
  calculator.compute();
});
document
  .querySelector("[data-all-clear]")
  .addEventListener("click", function () {
    calculator.clear();
  });
document.querySelector("[data-sqrt]").addEventListener("click", () => {
  calculator.sqrt();
});

class Calculator {
  previousNumber = "";
  currentNumber = "";
  previousDisplay;
  currentDisplay;
  operation = undefined;
  result = undefined;
  constructor(curr, prev) {
    this.previousDisplay = prev;
    this.currentDisplay = curr;
  }
  clear() {
    this.previousNumber = "";
    this.currentNumber = "";
    this.operation = undefined;
    this.updateDisplay();
  }
  delete() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1);
    this.updateDisplay();
  }
  updateDisplay() {
    this.currentDisplay.innerText = this.getDisplayNumber(this.currentNumber);
    if (this.operation != null) {
      this.previousDisplay.innerText = `${this.getDisplayNumber(
        this.previousNumber
      )} ${this.operation.char}`;
    } else {
      this.previousDisplay.innerText = "";
    }
  }
  getDisplayNumber(number) {
    const strNum = number.toString();
    const intDigits = parseFloat(strNum.split(".")[0]);
    const decDigits = strNum.split(".")[1];
    let intDisplay;
    if (isNaN(intDigits)) {
      intDisplay = "";
    } else {
      intDisplay = intDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decDigits != null) {
      return `${intDisplay}.${decDigits}`;
    } else {
      return intDisplay;
    }
  }
  appendNumber(number) {
    this.currentNumber += number.toString();
    this.updateDisplay();
  }
  setOperation(operation) {
    if (this.currentNumber === "") return;
    if (this.previousNumber !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousNumber = this.currentNumber;
    this.currentNumber = "";
    this.updateDisplay();
  }
  compute() {
    const prev = parseFloat(this.previousNumber);
    let curr = parseFloat(this.currentNumber);
    if (isNaN(prev) || isNaN(curr)) return;
    this.currentNumber = this.operation.operation(prev, curr);
    this.operation = undefined;
    this.previousNumber = "";
    this.updateDisplay();
  }
  sqrt() {
    if (this.currentNumber === "") return;
    this.currentNumber = Math.sqrt(parseFloat(this.currentNumber));
    this.updateDisplay();
  }
}

const sub = {
  char: "-",
  operation: (a, b) => a - b,
};
const add = {
  char: "+",
  operation: (a, b) => a + b,
};
const divide = {
  char: "÷",
  operation: (a, b) => a / b,
};
const multiply = {
  char: "*",
  operation: (a, b) => a * b,
};
const pow = {
  char: "^",
  operation: (a, b) => Math.pow(a, b),
};

const operationClick = (op) => {
  calculator.setOperation(op);
};

const previousDisplay = document.querySelector("[data-previous-operand]");
const currentDisplay = document.querySelector("[data-current-operand]");
const calculator = new Calculator(currentDisplay, previousDisplay);
