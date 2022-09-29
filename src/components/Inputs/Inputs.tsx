import React from 'react';

import './Inputs.scss';

const Inputs = () => {
  return (
    <div className="inputs">
      <Input labelText="Стоимость автомобиля" id="car-price" unit="₽"/>
      <Input labelText="Первоначальный взнос" id="payment" unit="13%"/>
      <Input labelText="Срок лизинга" id="period" unit="мес."/>
    </div>
  );
};

const Input = ({ id, labelText, unit }: { id: string, labelText: string, unit: string }) => {
  return (
    <div className="input__container">
      <label htmlFor={id} className="input__label">{labelText}</label>
      <div className="input__wrapper">
        <div
          className={"input__unit " + ((id === 'payment') ? "input__unit_filled" : '')}
        >{unit}</div>
        <input type="text" id={id} className="input"/>
      </div>
    </div>
  )
}

export default Inputs;