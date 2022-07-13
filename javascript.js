const displayResult = document.querySelector('.display');
const content = document.createElement('p');
content.textContent = '0';
displayResult.appendChild(content);

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
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action; 
        }
        if(action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const secondValue = displayedNum;
            const operator = calculator.dataset.operator;

            content.textContent = operate(firstValue, secondValue, operator);
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
        result = parseFloat(num1) / parseFloat(num2);
    }
    return result;
}