const view = (function() {
  const result = document.querySelector('.result');
  const digits = document.querySelectorAll('.digit');
  const operators = document.querySelectorAll('.op');
  const chain = document.querySelector('.chain');
  const equal = document.querySelector('.equal');
  const clear = document.querySelector('.clear');

  let operator = '';
  let currentValue = '';
  let total = Number(result.value);
  let inputs = [];

  let clearEvent = function() {
    result.value = '0';
    operator = '';
    currentValue = '';
    total = 0;
    inputs = [];
    chain.textContent = '';
  };

  let digitEvent = function(e) {

    let digit = e.target.textContent;
    currentValue = digit;
    operator = '';
    chain.textContent += digit;
    result.value += currentValue;
    if (result.value.startsWith('0')) {
      result.value = [...result.value].splice(1).join('');
    }
    inputs.push(currentValue);

  };

  let operatorEvent = function(e) {
    if (!operator) {
      operator = e.target.textContent;
      chain.textContent += operator;

      if (operator === '+') {
        result.value = '+';
        inputs.push('+');
      } else if (operator === '-') {
        result.value = '-';
        inputs.push('-');
      } else if (operator === 'X') {
        result.value = 'X';
        inputs.push('*');
      } else if (operator === '/') {
        result.value = '/';
        inputs.push('/');
      }
    }
    currentValue = '';
  }

  let equalEvent = function() {
    total = eval(inputs.join(''));
    //check if total exced 20 characters
    if(total.toString().length<=20) {
      result.value = total;
      chain.textContent = total;
    } else {
      result.value = 'Number to large';
      chain.textContent = 'Press clear for other calculations';
    }
    //Check if is made a division by 0
    if(total === Infinity || total === -Infinity) {
      result.value = ('Cant divide by 0');
    }

    inputs = [];
    inputs.push(total);
    operator = '';
  };

  return {
    btnsEvent(e) {
      if (e.target.classList.contains('digit')) {
        digitEvent(e);
      } else if (e.target.classList.contains('op')) {
        operatorEvent(e);
      } else if (e.target.classList.contains('equal')) {
        equalEvent();
      } else if (e.target.classList.contains('clear')) {
        clearEvent();
      }
    }
  };

}());

const btns = document.querySelector('.btns');

btns.addEventListener('click', view.btnsEvent);
