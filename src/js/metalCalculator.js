import {controlsValue, toCurrency} from './utils';
import {isValid, inputsValidation, controlsValidation} from './validations';

export function metalCalculator(form) {
  const controls = {
    metalThickness: [isValid, inputsValidation],
    metalLength: [isValid, inputsValidation],
    metalWidth: [isValid, inputsValidation],
    priceOfMetal: [isValid, inputsValidation],
  };
  const textFields = ['#metalWeight', '#costOfMetal'];

  calcPrice(form, controls, textFields);
  controlsValidation(form, controls, textFields);
}

function calcPrice(form, controls, textFields) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const values = controlsValue(form, controls, textFields);

    const metalWeight =
      (((((values.metalThickness / 1000) * values.metalLength) / 1000) *
        values.metalWidth) /
        1000) *
      7800;
    const costOfMetal = metalWeight * values.priceOfMetal;

    form.querySelector('#metalWeight').textContent = isNaN(metalWeight)
      ? 0
      : metalWeight.toFixed(2);

    form.querySelector('#costOfMetal').textContent = isNaN(costOfMetal)
      ? 0
      : toCurrency(costOfMetal);
  });
}
