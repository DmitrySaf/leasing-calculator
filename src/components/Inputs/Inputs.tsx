import { useRef } from 'react';

import './Inputs.scss';

const Inputs = () => {
  const paymentRef = useRef<HTMLInputElement>(null);

  

  return (
    <div className="inputs">
      <div className="input__container">
        <label htmlFor="car-price" className="input__label">Стоимость автомобиля</label>
        <div className="input__wrapper">
          <input
            name="car-price"
            type="text"
            id="car-price"
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
            420 000
            <div className="input__unit_aligned"> ₽</div>
          </div>
          <input
            name="payment"
            type="text"
            id="payment"
            ref={paymentRef}
            className="input__unit input__unit_theme_payment"
            autoComplete="off" 
          />
        </div>
      </div>
      <div className="input__container">
        <label htmlFor="period" className="input__label">Срок лизинга</label>
        <div className="input__wrapper">
          <input
            name="period"
            type="text"
            id="period"
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