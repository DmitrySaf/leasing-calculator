import { useRef, useReducer, useState } from 'react';

import './Inputs.scss';

interface IState {
  carPrice: number,
  payment: number,
  period: number
}

interface IAction {
  type: string,
  payload: number
}

/* const reducer = (state: IState, action: IAction) => {

  return state
} */

const Inputs = () => {
  const paymentRef = useRef<HTMLInputElement>(null);
  const initialState = {
    carPrice: '3300000',
    payment: '13',
    period: '60'
  };
  const [carPrice, setCarPrice] = useState(initialState.carPrice);
  const [payment, setPayment] = useState(initialState.payment);
  const [period, setPeriod] = useState(initialState.period);
  const [inputFocused, setInputFocused] = useState(false);
  //const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <div className="inputs">
      <div className="input__container">
        <label htmlFor="car-price" className="input__label">Стоимость автомобиля</label>
        <div className="input__wrapper">
          <input
            name="car-price"
            type="text"
            id="car-price"
            value={carPrice}
            onChange={(e) => setCarPrice(e.target.value)}
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
            {payment}
            <div className="input__unit_aligned"> ₽</div>
          </div>
          <div className={'input__wrapper_theme_percent ' + (inputFocused ? 'input__wrapper_focused' : '')}>
            <input
              name="payment"
              type="text"
              id="payment"
              ref={paymentRef}
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="input_theme_percent"
              autoComplete="off"
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
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
            onChange={(e) => setPeriod(e.target.value)}
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