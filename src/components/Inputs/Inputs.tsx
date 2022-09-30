import {
  useRef,
  useState
} from 'react';

import { InitialValues, IUnformattedState, IAction, IFormattedState } from "../interfaces";

import './Inputs.scss';

interface Event {
  target: {
    value: string
  },
  preventDefault: () => void
}

interface PointerEvent {
  target: any;
  pageX: number,
  currentTarget: HTMLDivElement,
  preventDefault: () => void
}

interface InputsProps {
  initialValues: InitialValues,
  handleChange: (values: IFormattedState) => void
}

const Inputs = ({initialValues, handleChange}: InputsProps) => {
  const firstPaymentRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<IFormattedState>({
    carPrice: initialValues.carPrice.value,
    firstPayment: initialValues.firstPayment.value,
    period: initialValues.period.value
  });

  const onBlur = (e: Event, name: string) => {
    setState({...state, [name]: valuesValidation(e, name)});
    handleChange({...state, [name]: valuesValidation(e, name)});
  };

  const onChange = (e: Event, name: string) => {
    setState({...state, [name]: +e.target.value.replace(/\s+/g, '')});
  }

  const bringToFormat = (number: number) => {
    return (+number.toFixed(0)).toLocaleString();
  }

  const valuesValidation = (e: Event, name: string) => {
    const value = +e.target.value.replace(/\s+/g, '');
    const { max, min } = initialValues[name];

    if (value > max) return max;
    if (value < min) return min;
    return value;
  }

  const valueToPercent = (name: string) => {
    const { max, min } = initialValues[name];

    if (state[name] > max) return 100;
    if (state[name] < min) return 1;
    return ((+state[name] - min) / (max - min)) * 100;
  }

  const onMouseDown = (event: PointerEvent, name: string) => {
    event.preventDefault();

    const { max, min } = initialValues[name];
    const slider = event.target.offsetParent;
    const sliderWidth = slider.offsetWidth;

    const pointermove = (e: { pageX: number }) => {
      const leftValue = e.pageX - slider.getBoundingClientRect().left;
      const value = Math.round((leftValue / sliderWidth) * (max - min) + min);
      if (value > max) return setState({...state, [name]: max});
      if (value < min) return setState({...state, [name]: min});
      setState({...state, [name]: value});
    };
    
    const pointerup = () => {
      document.removeEventListener('pointermove', pointermove);
      document.removeEventListener('pointerup', pointerup);
      handleChange(state);
    };
    document.addEventListener('pointermove', pointermove);
    document.addEventListener('pointerup', pointerup);
  }

  return (
    <div className="inputs">
      <div className="input__container">
        <label htmlFor="car-price" className="input__label">Стоимость автомобиля</label>
        <div className="input__wrapper">
          <input
            name="car-price"
            type="text"
            id="car-price"
            value={bringToFormat(state.carPrice)}
            onBlur={e => onBlur(e, 'carPrice')}
            onChange={e => onChange(e, 'carPrice')}
            className="input"
            autoComplete="off"
          />
          <div className="input__unit">₽</div>
          <div className="input__range-slider">
            <div className="input__range-slider-bar" style={{"width": `${valueToPercent('carPrice')}%`}}></div>
            <div
              className="input__range-slider-circle"
              style={{"left": `${valueToPercent('carPrice')}%`}}
              onPointerDown={(e) => onMouseDown(e, 'carPrice')}
            ></div>
          </div>
        </div>
      </div>
      <div className="input__container">
        <label htmlFor="payment" className="input__label">Первоначальный взнос</label>
        <div className="input__wrapper">
          <div onClick={() => firstPaymentRef.current?.focus()} className="input">
            {bringToFormat(state.firstPayment * state.carPrice / 100)}
            <div className="input__unit_aligned"> ₽</div>
          </div>
          <div className="input__wrapper_theme_percent">
            <input
              name="firstPayment"
              type="text"
              id="firstPayment"
              ref={firstPaymentRef}
              value={bringToFormat(state.firstPayment)}
              onBlur={e => onBlur(e, 'firstPayment')}
              onChange={e => onChange(e, 'firstPayment')}
              className="input_theme_percent"
              autoComplete="off"
            />
            <div className="input__unit_hidden">{state.firstPayment.toFixed(0)}</div>
            <div className="input__unit input__unit_theme_percent">%</div>
          </div>
          <div className="input__range-slider">
            <div className="input__range-slider-bar" style={{"width": `${valueToPercent('firstPayment')}%`}}></div>
            <div
              className="input__range-slider-circle"
              style={{"left": `${valueToPercent('firstPayment')}%`}}
              onPointerDown={(e) => onMouseDown(e, 'firstPayment')}
            ></div>
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
            value={state.period}
            onBlur={e => onBlur(e, 'period')}
            onChange={e => onChange(e, 'period')}
            className="input"
            autoComplete="off"
          />
          <div className="input__unit">мес.</div>
          <div className="input__range-slider">
            <div className="input__range-slider-bar" style={{"width": `${valueToPercent('period')}%`}}></div>
            <div
              className="input__range-slider-circle"
              style={{"left": `${valueToPercent('period')}%`}}
              onPointerDown={(e) => onMouseDown(e, 'period')}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inputs;