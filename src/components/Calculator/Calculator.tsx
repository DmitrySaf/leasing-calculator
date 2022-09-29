import React from 'react';

import Inputs from "../Inputs/Inputs";
import Results from "../Results/Results";

import './Calculator.scss';

const Calculator = () => {
  return (
    <div className="calculator">
      <h1 className="calculator__title">Рассчитайте стоимость автомобиля в лизинг</h1>
      <Inputs />
      <Results />
    </div>
  );
};

export default Calculator;