import React from 'react';

import { InitialValues } from '../interfaces';

import './Results.scss';

interface ResultProps {
  totalSum: number,
  monthPayment: number
}

const Results = ({ totalSum, monthPayment }: ResultProps) => {
  
  const bringToFormat = (number: number) => {
    return (+number.toFixed(0)).toLocaleString();
  }

  return (
    <div className="results">
      <div className="results__column">
        <div className="results__label">Сумма договора лизинга</div>
        <div className="results__value">{bringToFormat(totalSum)}<div className="results__value-ruble"> ₽</div></div>
      </div>
      <div className="results__column">
        <div className="results__label">Ежемесячный платеж от</div>
        <div className="results__value">{bringToFormat(monthPayment)}<div className="results__value-ruble"> ₽</div></div>
      </div>
      <div className="results__column">
        <button type="submit" className="results__button">Оставить заявку</button>
      </div>
    </div>
  );
};

export default Results;
