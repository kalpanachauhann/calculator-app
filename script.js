let expression = '';
let justCalculated = false;

function appendVal(val) {
  const operators = ['+', '-', '*', '/'];

  if (justCalculated) {
    if (operators.includes(val)) {
      justCalculated = false;
    } else {
      expression = '';
      justCalculated = false;
    }
  }

  const last = expression.slice(-1);
  if (operators.includes(val) && operators.includes(last)) return;

  expression += val;
  updateDisplay();
}

function clearAll() {
  expression = '';
  justCalculated = false;
  document.getElementById('result').textContent = '0';
  document.getElementById('expression').textContent = '';
}

function deleteLast() {
  if (justCalculated) { clearAll(); return; }
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  if (!expression) return;
  try {
    const formatted = expression.replace(/\//g, '/').replace(/\*/g, '*');
    const res = Function('"use strict"; return (' + formatted + ')')();
    document.getElementById('expression').textContent = expression + ' =';
    document.getElementById('result').textContent = parseFloat(res.toFixed(10));
    expression = String(parseFloat(res.toFixed(10)));
    justCalculated = true;
  } catch {
    document.getElementById('result').textContent = 'Error';
    expression = '';
  }
}

function updateDisplay() {
  const display = expression
    .replace(/\*/g, ' × ')
    .replace(/\//g, ' ÷ ')
    .replace(/\+/g, ' + ')
    .replace(/-/g, ' − ');
  document.getElementById('result').textContent = display || '0';
  document.getElementById('expression').textContent = '';
}

document.addEventListener('keydown', (e) => {
  if ('0123456789'.includes(e.key)) appendVal(e.key);
  else if (['+', '-', '*', '/'].includes(e.key)) appendVal(e.key);
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearAll();
  else if (e.key === '.') appendVal('.');
  else if (e.key === '%') appendVal('%');
});