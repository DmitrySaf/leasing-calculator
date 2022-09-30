import { useState } from 'react';

import Inputs from "../Inputs/Inputs";
import Results from "../Results/Results";

import { IFormattedState } from "../interfaces";

import './Calculator.scss';

const Calculator = () => {
  const INITIAL_VALUES = {
    carPrice: {
      min: 1000000,
      max: 6000000,
      value: 3000000
    },
    firstPayment: {
      min: 10,
      max: 60,
      value: 13
    },
    period: {
      min: 1,
      max: 60,
      value: 60
    }
  };
  const INTEREST_RATE = 0.035;
  const [state, setState] = useState({
    carPrice: INITIAL_VALUES.carPrice.value,
    firstPayment: INITIAL_VALUES.firstPayment.value,
    period: INITIAL_VALUES.period.value
  });
  const { carPrice, firstPayment, period } = state;

  const getMonthPayment = () => {
    return (
      (carPrice * (1 - (firstPayment / 100)))
        * ((INTEREST_RATE * Math.pow(1 + INTEREST_RATE, period))
        / (Math.pow(1 + INTEREST_RATE, period) - 1))
    );
  };

  const getTotalSum = () => {
    return (
      firstPayment + period * getMonthPayment()
    );
  }

  const handleChange = (values: IFormattedState) => {
    setState(values);
  }

  return (
    <div className="calculator">
      <h1 className="calculator__title">Рассчитайте стоимость автомобиля в лизинг</h1>
      <form className="calculator__form">
        <Inputs
          initialValues={INITIAL_VALUES}
          handleChange={handleChange}
        />
        <Results
          totalSum={getTotalSum()}
          monthPayment={getMonthPayment()}
        />
      </form>
    </div>
  );
};

export default Calculator;