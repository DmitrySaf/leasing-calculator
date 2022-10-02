import spinner from './img/spinner.svg';

import './Results.scss';

interface ResultProps {
  totalSum: string,
  monthPayment: string,
  loading: boolean,
  error: boolean
}

const Results = ({ totalSum, monthPayment, loading, error }: ResultProps) => {
  return (
    <div className="results">
      <div className="results__column">
        <div className="results__label">Сумма договора лизинга</div>
        <div className="results__value">{totalSum}<div className="results__value-ruble"> ₽</div></div>
      </div>
      <div className="results__column">
        <div className="results__label">Ежемесячный платеж от</div>
        <div className="results__value">{monthPayment}<div className="results__value-ruble"> ₽</div></div>
      </div>
      <div className="results__column">
        <button type="submit" disabled={loading || error} className="results__button">
          {loading && <img src={spinner} alt="spinner" className="spinner" />}
          {error && 'Произошла ошибка'}
          {!(loading || error) && 'Оставить заявку'}
        </button>
      </div>
    </div>
  );
};

export default Results;
