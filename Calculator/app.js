const calculatorEl = document.querySelector('.calculator');
const calculatorButtons = document.querySelector('.calculator-buttons');
const calculatorDisplay = document.querySelector('.calculator-display h1');

const operations = {
    '+': (a, b) => a+b,
    '-': (a, b) => a-b,
    '*': (a, b) => a*b,
    '/': (a, b) => a/b
}

let operationFn;
let a = '0';
let b = '0';
let activeNumber = 'a';
let decimalAdded = false;

function updateDisplay(n){
    calculatorDisplay.textContent = n;
}

function selectOperation(operation){
    operationFn = operations[operation];
    activeNumber = 'b';
    decimalAdded = false;
}

function updateValues(selectedValue){
    if(activeNumber == 'a'){
        if(a == '0' && selectedValue != '0'){
            a = selectedValue;
        } else if(a != '0'){
            a += selectedValue;
        }
        updateDisplay(a);
    } else if(activeNumber == 'b'){
        if(b == '0' && selectedValue != '0'){
            b = selectedValue;
        } else if(b != '0'){
            b += selectedValue;
        }
        updateDisplay(b);
    }
}

function resetAll(){
    a = '0';
    b = '0';
    activeNumber = 'a';
    operationFn = undefined;
    decimalAdded = false;
    updateDisplay('0');
}

function displayResult(){
    const result = operationFn(Number(a), Number(b));
    a = result.toString();
    b = '';
    operationFn = undefined;
    activeNumber = 'a';
    decimalAdded = a.includes('.');
    updateDisplay(result);
}

function addDecimal(){
    if(activeNumber == 'a'){
        if(a == ''){
            a = '0.';
        } else {
            a += '.'
        }
    } else if(activeNumber == 'b'){
        if(b == ''){
            b = '0.';
        } else {
            b += '.'
        }
    }
    updateDisplay(activeNumber == 'a' ? a : b);
    decimalAdded = true;
}

calculatorButtons.addEventListener('click', (ev) => {
    const selectedValue = ev.target.value;
    if(ev.target.classList.contains('operator') && selectedValue != '='){
        selectOperation(selectedValue);
    } else if(ev.target.classList.length == 0 && selectedValue != undefined){
        updateValues(selectedValue);
    } else if(ev.target.id == 'clearBtn'){
        resetAll();
    } else if(selectedValue == '=' && operationFn != undefined){
        displayResult()
    } else if(selectedValue == '.' && decimalAdded == false){
        addDecimal();
    }
})