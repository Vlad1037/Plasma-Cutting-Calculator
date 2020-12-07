import {controlsValue, toCurrency} from './utils';
import {isValid, inputsValidation, controlsValidation} from './validations';

export function plasmaCuttingCalc(form) {
  const controls = {
    typeOfMetal: [],
    thickness: [],
    cuttingLength: [isValid, inputsValidation],
    numberOfPieces: [isValid, inputsValidation],
  };
  const textFields = ['#costOfCutting'];

  calcPrice(form, controls, textFields);
  controlsValidation(form, controls, textFields);
}

function calcPrice(form, controls, textFields) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const valueForPrice = {
      steelPriceMeter: [7, 9, 12, 14, 16, 21, 28, 40, 53],
      steelPricePropal: [1, 1.5, 2, 2.5, 3, 4.5, 6, 8, 10],
      nonferusPriceMeter: [8.4, 10.8, 14.4, 16.8, 19.2, 25.2, 33.6, 48, 63.6],
      nonferusPricePropal: [1.2, 1.8, 2.4, 3, 3.6, 5.4, 7.2, 9.6, 12],
    };

    const values = controlsValue(form, controls, textFields);

    const valueToPricePerMeter = {
      1: valueForPrice.steelPriceMeter[values.thickness],
      2: valueForPrice.nonferusPriceMeter[values.thickness],
    };

    const valueToPricePerPropal = {
      1: valueForPrice.steelPricePropal[values.thickness],
      2: valueForPrice.nonferusPricePropal[values.thickness],
    };

    const price =
      valueToPricePerMeter[values.typeOfMetal] * values.cuttingLength +
      valueToPricePerPropal[values.typeOfMetal] * values.numberOfPieces;

    form.querySelector('#costOfCutting').textContent = isNaN(price)
      ? 0
      : toCurrency(price);
  });
}
