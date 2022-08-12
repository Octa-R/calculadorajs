class Calculator {
  previousNumber = "";
  currentNumber = "";
  previousDisplay;
  currentDisplay;
  operation = undefined;
  result = undefined;
  operationChar = "";

  constructor(curr, prev) {
    this.previousDisplay = prev;
    this.currentDisplay = curr;
  }

  map = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "/": (a, b) => a / b,
    "*": (a, b) => a * b,
    "^": (a, b) => Math.pow(a, b)
  };

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
      )} ${this.operationChar}`;
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

  setOperation(operationChar) {
    if (this.currentNumber === "") return;
    if (this.previousNumber !== "") {
      this.compute();
    }
    this.operation = this.map[operationChar];
    this.operationChar = operationChar;
    this.previousNumber = this.currentNumber;
    this.currentNumber = "";
    this.updateDisplay();
  }

  compute() {
    const prev = parseFloat(this.previousNumber);
    let curr = parseFloat(this.currentNumber);
    if (isNaN(prev) || isNaN(curr)) return;
    this.currentNumber = this.operation(prev, curr);
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


function main() {
  const numberButtons = document.querySelectorAll("[data-number]");
  const operationButtons = document.querySelectorAll("[data-operation]");
  const sqrtButton = document.querySelector("[data-sqrt]");
  const equalsButton = document.querySelector("[data-equals]");
  const deleteButton = document.querySelector("[data-delete]");
  const allClearButton = document.querySelector("[data-all-clear]");

  numberButtons.forEach((e) => {
    e.addEventListener("click", () => {
      calculator.appendNumber(e.innerText);
    });
  });

  operationButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const operationChar = e.target.innerText;
      calculator.setOperation(operationChar);
    });
  });

  deleteButton.addEventListener("click", (e) => {
    calculator.delete();
  });

  equalsButton.addEventListener("click", (e) => {
    calculator.compute();
  });

  allClearButton.addEventListener("click", function () {
    calculator.clear();
  });

  sqrtButton.addEventListener("click", () => {
    calculator.sqrt();
  });

  const previousDisplay = document.querySelector("[data-previous-operand]");
  const currentDisplay = document.querySelector("[data-current-operand]");
  const calculator = new Calculator(currentDisplay, previousDisplay);
}

main();