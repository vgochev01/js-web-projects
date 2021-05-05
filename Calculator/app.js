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
let a = '';
let b = '';
let activeNumber = 'a';
let decimalAdded = false;

calculatorButtons.addEventListener('click', (ev) => {
    const selectedValue = ev.target.value;
    if(a != '0' && ev.target.classList.contains('operator') && selectedValue != '='){
        operationFn = operations[selectedValue];
        activeNumber = 'b';
        decimalAdded = false;
    } else if(activeNumber == 'a' && ev.target.classList.contains('nonNumber') == false && selectedValue != undefined){
        if(a == '0' && selectedValue != '0'){
            a = selectedValue;
        } else if(a != '0'){
            a += selectedValue;
        }
        updateDisplay(a);
    } else if(activeNumber == 'b' && ev.target.classList.contains('nonNumber') == false && selectedValue != undefined){
        if(b == '0' && selectedValue != '0'){
            b = selectedValue;
        } else if(b != '0'){
            b += selectedValue;
        }
        updateDisplay(b);
    } else if(ev.target.id == 'clearBtn'){
        a = '';
        b = '';
        activeNumber = 'a';
        operationFn = undefined;
        decimalAdded = false;
        updateDisplay('0');
    } else if(selectedValue == '=' && operationFn != undefined){
        const result = operationFn(Number(a), Number(b));
        a = result.toString();
        b = '';
        operationFn = undefined;
        activeNumber = 'a';
        decimalAdded = a.includes('.');
        updateDisplay(result);
    } else if(selectedValue == '.' && decimalAdded == false){
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
})

function updateDisplay(n){
    calculatorDisplay.textContent = n;
}