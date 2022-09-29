import React from 'react';

import './Results.scss';

const Results = () => {
  return (
    <div className="results">
      <div className="results__column">
        <div className="results__label">Сумма договора лизинга</div>
        <div className="results__value">4 467 313<div className="results__value-ruble"> ₽</div></div>
      </div>
      <div className="results__column">
        <div className="results__label">Ежемесячный платеж от</div>
        <div className="results__value">114 455<div className="results__value-ruble"> ₽</div></div>
      </div>
      <div className="results__column">
        <button type="submit" className="results__button">Оставить заявку</button>
      </div>
    </div>
  );
};

export default Results;