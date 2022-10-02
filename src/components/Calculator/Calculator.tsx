import React, { useState } from 'react';

import Inputs from "../Inputs/Inputs";
import Results from "../Results/Results";

import { IFormattedState } from "../interfaces";

import './Calculator.scss';

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

const Calculator = () => {
  const [state, setState] = useState({
    carPrice: INITIAL_VALUES.carPrice.value,
    firstPayment: INITIAL_VALUES.firstPayment.value,
    period: INITIAL_VALUES.period.value
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { carPrice, firstPayment, period } = state;

  const getMonthPayment = () => {
    return Math.round(
      (carPrice * (1 - (firstPayment / 100)))
        * ((INTEREST_RATE * Math.pow(1 + INTEREST_RATE, period))
        / (Math.pow(1 + INTEREST_RATE, period) - 1))
    );
  };

  const getTotalSum = () => {
    return Math.round(firstPayment + period * getMonthPayment());
  }

  const handleChange = (values: IFormattedState) => {
    setState(values);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        totalSum: getTotalSum(),
        monthPayment: getMonthPayment(),
        firstPayment: firstPayment * carPrice / 100,
        carPrice,
        period
      })
    })
    .then(() => setLoading(false))
    .catch(() => {
      setError(true);
      setLoading(false);
    });
    
  }

  const bringToFormat = (number: number) => {
    return (+number.toFixed(0)).toLocaleString();
  }

  return (
    <div className="calculator">
      <h1 className="calculator__title">Рассчитайте стоимость автомобиля в лизинг</h1>
      <form onSubmit={onSubmit} className="calculator__form">
        <Inputs
          initialValues={INITIAL_VALUES}
          handleChange={handleChange}
        />
        <Results
          totalSum={bringToFormat(getTotalSum())}
          monthPayment={bringToFormat(getMonthPayment())}
          loading={loading}
          error={error}
        />
      </form>
    </div>
  );
};

export default Calculator;