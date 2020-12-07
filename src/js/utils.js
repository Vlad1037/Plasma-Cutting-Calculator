import {isValid} from './validations';

export function controlsValue(form, controls, textFields) {
  return Object.keys(controls).reduce((formControls, control) => {
    isValid(form, control, textFields);
    formControls[control] = parseFloat(form[control].value);
    return formControls;
  }, {});
}

export function toCurrency(number) {
  return new Intl.NumberFormat('uk-UA', {
    currency: 'UAH',
    style: 'currency',
  }).format(number);
}
