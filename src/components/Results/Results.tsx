import React from 'react';

import { InitialValues } from '../interfaces';

import spinner from './img/spinner.svg';

import './Results.scss';

interface ResultProps {
  totalSum: number,
  monthPayment: number,
  loading: boolean
}

interface Event {
  currentTarget: HTMLButtonElement,
  preventDefault: () => void
}

const Results = ({ totalSum, monthPayment, loading }: ResultProps) => {
  
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
        <button type="submit" disabled={loading} className="results__button">
          {
          loading 
            ? <img src={spinner} alt="spinner" className="spinner" />
            : 'Оставить заявку'
          }
        </button>
      </div>
    </div>
  );
};

export default Results;
