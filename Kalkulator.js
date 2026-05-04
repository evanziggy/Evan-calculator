let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousValue = null;

function appendNumber(num) {
    // Prevent multiple decimal points
    if (num === '.' && currentInput.includes('.')) {
        return;
    }
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    
    if (operator !== null && previousValue !== null) {
        calculate();
    }
    
    operator = op;
    previousValue = currentInput;
    currentInput = '';
}

function calculate() {
    if (operator === null || previousValue === null || currentInput === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentInput);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                display.value = 'Error: Division by 0';
                currentInput = '';
                operator = null;
                previousValue = null;
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;
    currentInput = result.toString();
    operator = null;
    previousValue = null;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousValue = null;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '+') appendOperator('+');
    if (e.key === '-') appendOperator('-');
    if (e.key === '*') appendOperator('*');
    if (e.key === '/') {
        e.preventDefault();
        appendOperator('/');
    }
    if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    }
    if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }
    if (e.key === 'Escape') clearDisplay();
});
