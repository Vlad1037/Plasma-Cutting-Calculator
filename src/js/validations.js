export function isValid(form, control, textFields) {
  if (!form[control].value) {
    form[control].classList.add('is-invalid');
  } else {
    form[control].classList.remove('is-invalid');
  }

  form.querySelector('#reset').addEventListener('click', () => {
    form[control].classList.remove('is-invalid');
    textFields.forEach((field) => {
      form.querySelector(field).textContent = 0;
    });
  });
}

export function controlsValidation(form, controls, textFields) {
  Object.keys(controls).forEach((control) => {
    controls[control].forEach((fn) => {
      form[control].addEventListener('input', () => {
        fn(form, control, textFields);
      });
    });
  });
}

export function inputsValidation(form, control) {
  form[control].value = form[control].value
    .replace(/^.*?((\d+\.?|\.)\d*).*|.+/, '$1')
    .replace(/^0*(?!\.|$)/, '')
    .replace(/^\.$|^(\.)/, '0$1');
}
