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
