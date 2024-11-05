const fields = {
  fname: document.getElementById('fname'),
  group: document.getElementById('group'),
  phone: document.getElementById('phone'),
  idCard: document.getElementById('idCard'),
  faculty: document.getElementById('faculty'),
};
const submitButton = document.getElementById('submit-button');

const validationRegex = {
  fname: /^[А-ЯІЄЇ][а-яієї]+ [А-ЯІЄЇ]{1}\.\s?[А-ЯІЄЇ]{1}\.$/,
  group: /^[А-ЯІЇЄ]{2}-\d{2}$/,
  phone: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
  idCard: /^[А-ЯІЄЇ]{2} №\d{6}$/,
  faculty: /^[А-ЯІЇЄ ]+$/,
};

Object.values(fields).forEach(field => {
  field.addEventListener('input', e => {
    e.target.style.borderColor = '';
  });
});

function handleSubmit(event) {
  event.preventDefault();
  let isError = false;
  const data = {};

  for (const [key, field] of Object.entries(fields)) {
    const value = field.value.trim();
    data[key] = value;

    if (!validationRegex[key].test(value)) {
      isError = true;
      field.style.borderColor = '#f00';
    }
  }

  if (!isError) {
    localStorage.setItem('formData', JSON.stringify(data));
    window.location.href = 'output.html';
  }
}

submitButton.addEventListener('click', handleSubmit);

function genRandomHexCode() {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
}

function getColumnCells(tableId, columnIndex) {
  const table = document.getElementById(tableId);
  const cells = [];

  const cellsNumberByOrder = columnIndex % 6;

  for (let row of table.rows) {
    for (let i = 0; i < row.cells.length; i++) {
      if (i === cellsNumberByOrder) {
        cells.push(row.cells[i]);
      }
    }
  }
  return cells;
}

function setCellEventHandlers(cell, index) {
  cell.isBackgroundColorSet = false;
  cell.staticBackgroundColor = '';

  function handleEvent(eventType) {
    return function (e) {
      if (eventType === 'mouseenter') {
        e.target.style.backgroundColor = genRandomHexCode();
      } else if (eventType === 'mouseleave') {
        if (!cell.isBackgroundColorSet) {
          e.target.style.backgroundColor = '';
        } else if (cell.staticBackgroundColor) {
          e.target.style.backgroundColor = cell.staticBackgroundColor;
        }
      } else if (eventType === 'click') {
        const color = document.getElementById('favcolor').value;
        e.target.style.backgroundColor = color;
        cell.isBackgroundColorSet = true;
        cell.staticBackgroundColor = color;
      } else if (eventType === 'dblclick') {
        const cells = getColumnCells('mytable', index);
        const color = document.getElementById('favcolor').value;
        cells.forEach(cell => {
          cell.style.backgroundColor = color;
          cell.isBackgroundColorSet = true;
          cell.staticBackgroundColor = color;
        });
      }
    };
  }

  cell.addEventListener('mouseenter', handleEvent('mouseenter'));
  cell.addEventListener('mouseleave', handleEvent('mouseleave'));
  cell.addEventListener('click', handleEvent('click'));
  cell.addEventListener('dblclick', handleEvent('dblclick'));
}

const tds = document.getElementsByTagName('td');
Array.from(tds).forEach((cell, index) => {
  setCellEventHandlers(cell, index);
});
