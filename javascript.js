const displayResult = document.querySelector('.display');
const content = document.createElement('p');
content.textContent = '0';
displayResult.appendChild(content);

let hasOperator = false;

const calculator = document.querySelector('.calculator');
const keys = calculator.querySelectorAll('button');
keys.forEach((button) => {
    button.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = content.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        const firstValue = calculator.dataset.firstValue;
        const secondValue = displayedNum;
        const operator = calculator.dataset.operator;

        if (!action) {
            if(displayedNum === '0' || previousKeyType === 'operator') {
                content.textContent = keyContent;
                calculator.dataset.previousKeyType = 'number';
            } else {
                content.textContent = displayedNum + keyContent;
                calculator.dataset.previousKeyType = 'number';
            }
        }    
        if (action === 'clear') {
            content.textContent = '';
        }
        if(action === 'decimal') {
            if(!displayedNum.includes('.')) {
                content.textContent = displayedNum + '.';
            }
        }
        if(action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            if(hasOperator === false) {
                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.firstValue = displayedNum;
                calculator.dataset.operator = action; 
                hasOperator = true;
            }
            else {
                console.log(firstValue, secondValue, operator);
                const result = operate(firstValue, secondValue, operator);
                content.textContent = result;
                calculator.dataset.firstValue = result;
                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.operator = action;
            }
        }
        if(action === 'calculate') {
            content.textContent = operate(firstValue, secondValue, operator);
            hasOperator = false;
        }
    }
});
});

function operate(num1, num2, operator) {
    let result = '';
    if(operator === 'add') {
        result = parseFloat(num1) + parseFloat(num2);
    } else if(operator === 'subtract') {
        result = parseFloat(num1) - parseFloat(num2);
    } else if(operator === 'multiply') {
        result = parseFloat(num1) * parseFloat(num2);
    } else if(operator === 'divide') {
        let secondNum = parseFloat(num2);
        if(secondNum === '0') {
            result = 'Cannot divide by 0';
        } else {
            result = round((parseFloat(num1) / parseFloat(num2)), 3);
        }
    }
    return result;
}
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}