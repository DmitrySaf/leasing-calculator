import { useRef, useReducer, useState } from 'react';

import { IValues, IValuesMinMax } from "../interfaces";

import './Inputs.scss';



/* const reducer = (state: IState, action: IAction) => {

  return state
} */

const Inputs = ({initialValues, valuesMinMax}: {initialValues: IValues, valuesMinMax: IValuesMinMax}) => {
  const paymentRef = useRef<HTMLInputElement>(null);
  const [carPrice, setCarPrice] = useState(initialValues.carPrice);
  const [payment, setPayment] = useState(initialValues.payment);
  const [period, setPeriod] = useState(initialValues.period);

  return (
    <div className="inputs">
      <div className="input__container">
        <label htmlFor="car-price" className="input__label">Стоимость автомобиля</label>
        <div className="input__wrapper">
          <input
            name="car-price"
            type="text"
            id="car-price"
            value={carPrice.toLocaleString()}
            onChange={(e) => setCarPrice(+e.target.value)}
            className="input"
            autoComplete="off"
          />
          <div className="input__unit">₽</div>
        </div>
      </div>
      <div className="input__container">
        <label htmlFor="payment" className="input__label">Первоначальный взнос</label>
        <div className="input__wrapper">
          <div onClick={() => paymentRef.current?.focus()} className="input">
            {(payment * carPrice / 100).toLocaleString()}
            <div className="input__unit_aligned"> ₽</div>
          </div>
          <div className="input__wrapper_theme_percent">
            <input
              name="payment"
              type="text"
              id="payment"
              ref={paymentRef}
              value={payment}
              onChange={(e) => setPayment(+e.target.value)}
              className="input_theme_percent"
              autoComplete="off"
            />
            <div className="input__unit_hidden">{payment}</div>
            <div className="input__unit input__unit_theme_percent">%</div>
          </div>
        </div>
      </div>
      <div className="input__container">
        <label htmlFor="period" className="input__label">Срок лизинга</label>
        <div className="input__wrapper">
          <input
            name="period"
            type="text"
            id="period"
            value={period}
            onChange={(e) => setPeriod(+e.target.value)}
            className="input"
            autoComplete="off"
          />
          <div className="input__unit">мес.</div>
        </div>
      </div>
    </div>
  );
};

export default Inputs;