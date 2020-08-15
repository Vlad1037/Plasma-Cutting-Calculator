import {isValid, inputsValidation, conrtolsValidation} from './validations';

export function plasmaCuttingCalc(form) {
  const controls = {
    typeOfMetal: [],
    thickness: [],
    cuttingLength: [isValid, inputsValidation],
    numberOfPieces: [isValid, inputsValidation],
  };

  calcPrice(form, controls);
  conrtolsValidation(form, controls);
}

function calcPrice(form, controls) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valueForPrice = {
      steelPriceMeter: [7, 9, 12, 14, 16, 21, 28, 40, 53],
      steelPricePropal: [1, 1.5, 2, 2.5, 3, 4.5, 6, 8, 10],
      nonferusPriceMeter: [8.4, 10.8, 14.4, 16.8, 19.2, 25.2, 33.6, 48, 63.6],
      nonferusPricePropal: [1.2, 1.8, 2.4, 3, 3.6, 5.4, 7.2, 9.6, 12],
    };

    const value = controlsValue(form, controls);

    const valueToPricePerMeter = {
      1: valueForPrice.steelPriceMeter[value.thickness],
      2: valueForPrice.nonferusPriceMeter[value.thickness],
    };

    const valueToPricePerPropal = {
      1: valueForPrice.steelPricePropal[value.thickness],
      2: valueForPrice.nonferusPricePropal[value.thickness],
    };

    const price = (
      valueToPricePerMeter[value.typeOfMetal] * value.cuttingLength +
      valueToPricePerPropal[value.typeOfMetal] * value.numberOfPieces
    ).toFixed(2);

    form.querySelector('#costOfCutting').textContent =
      price === 'NaN' ? 0 : price;
  });
}

function controlsValue(form, controls) {
  const formControls = {};

  Object.keys(controls).forEach((control) => {
    isValid(form, control);
    formControls[control] = parseFloat(form[control].value);
  });

  return formControls;
}
