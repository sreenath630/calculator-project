let display = document.getElementById('display');
let currentExpression = '';
let firstNumber = '';
let operator = '';
let waitingForSecondNumber = false;

function updateDisplay() {
    if (currentExpression === '') {
        display.textContent = '0';
    } else {
        display.textContent = currentExpression;
    }
}

function clearDisplay() {
    currentExpression = '';
    firstNumber = '';
    operator = '';
    waitingForSecondNumber = false;
    updateDisplay();
}

function deleteLast() {
    if (currentExpression.length > 0) {
        currentExpression = currentExpression.slice(0, -1);
    }
    updateDisplay();
}

function appendNumber(num) {
    // Prevent multiple decimals in current number
    if (num === '.') {
        let parts = currentExpression.split(/[\+\-×÷]/);
        let currentNum = parts[parts.length - 1];
        if (currentNum.includes('.')) {
            return;
        }
    }
    
    currentExpression += num;
    updateDisplay();
}

function appendOperator(op) {
    // If expression is empty, don't add operator
    if (currentExpression === '') {
        return;
    }
    
    // If last character is an operator, replace it
    let lastChar = currentExpression.slice(-1);
    if (['+', '-', '×', '÷'].includes(lastChar)) {
        currentExpression = currentExpression.slice(0, -1) + op;
    } else {
        currentExpression += op;
    }
    
    updateDisplay();
}

function calculate() {
    if (currentExpression === '') {
        return;
    }

    try {
        // Replace display operators with JavaScript operators
        let expression = currentExpression
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        
        // Check for division by zero
        if (expression.includes('/0')) {
            currentExpression = 'Error';
            updateDisplay();
            setTimeout(clearDisplay, 1500);
            return;
        }
        
        // Calculate result
        let result = eval(expression);
        
        // Round to avoid floating point errors
        result = Math.round(result * 100000000) / 100000000;
        
        currentExpression = result.toString();
        updateDisplay();
    } catch (error) {
        currentExpression = 'Error';
        updateDisplay();
        setTimeout(clearDisplay, 1500);
    }
}

// Initialize
updateDisplay();

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-') {
        appendOperator(key);
    } else if (key === '*') {
        appendOperator('×');
    } else if (key === '/') {
        event.preventDefault();
        appendOperator('÷');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});
