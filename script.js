const log = (e) => console.log(e);
const sub = (a, b) => a - b;
const add = (a, b) => a + b;
const divide = (a, b) => a / b;
const multiply = (a, b) => a * b;
const pow = (a, b) => Math.pow(a, b);
window.onload = function () {
	const previousDisplay = document.querySelector("[data-previous-operand]");
	const currentDisplay = document.querySelector("[data-current-operand]");
	const calculator = new Calculator(previousDisplay, currentDisplay);

	document.querySelectorAll("[data-number]").forEach((e) => {
		e.addEventListener("click", () => {
			calculator.appendNumber(e.innerText);
		});
	});
	document.querySelectorAll("[data-operation]").forEach((e) => {
		e.addEventListener("click", function (evt) {
			switch (evt.target.innerText) {
				case "÷":
					calculator.setOperation(divide, "÷");
					break;
				case "+":
					calculator.setOperation(add, "+");
					break;
				case "-":
					calculator.setOperation(sub, "-");
					break;
				case "*":
					calculator.setOperation(multiply, "*");
					break;
				case "^":
					calculator.setOperation(pow, "^");
					break;
			}
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
};

class Calculator {
	previousNumber = "";
	currentNumber = "";
	previousDisplay;
	currentDisplay;
	operation = undefined;
	operationChar = "";
	result = undefined;
	constructor(previous, current) {
		this.previousDisplay = previous;
		this.currentDisplay = current;
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
		this.currentDisplay.innerText = this.getDisplayNumber(
			this.currentNumber
		);
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
	setOperation(operation, opChar) {
		if (this.currentNumber === "") return;
		if (this.previousNumber !== "") {
			this.compute();
		}
		this.operation = operation;
		this.operationChar = opChar;
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

/*
funcionamiento calculadora
esperando datos
  si es numero
    lo muestra en pantalla y lo almacena pasa a esperando datos
  si no es numero, es operando [si hay un solo operando]
    muestra la operacion en pantalla seguida al nro ingresado pasa a esperando datos
  si no es nro, es operando [ no hay operando ]
    no hace nada
  si es igual u otro operador  [hay dos operandos y operacion]
    resuelve la cuenta y la muestra en pantalla
    setea el resultado como operando1 y seguido muestra la operacion
    fin
  si es raiz cuadrada[hay un solo operando]
    resuelve la razi cuadrada y la muestra en pantalla
  si raiz cuadrada [ hay dos operandos ]
    error
  si no es nro [CE]
    se borra todo en pantalla
*/
