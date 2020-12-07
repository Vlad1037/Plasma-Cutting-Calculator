import 'bootswatch/dist/litera/bootstrap.min.css';
import {plasmaCuttingCalc} from './js/plasmaCalculator';
import {metalCalculator} from './js/metalCalculator';

window.addEventListener('DOMContentLoaded', () => {
  plasmaCuttingCalc(document.getElementById('plasmaCuttingCalc'));
  metalCalculator(document.getElementById('metalCalculator'));
});
