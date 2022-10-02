import React, { useState, useRef } from 'react';

import { Input } from "../interfaces";

import './Input.scss';

type EventOfDot = {
  pageX: number
}

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

interface IHOCProps {
  name: string,
  label: string,
  unit: string,
  initialValues: Input,
  handleBlur: (value: number, name: string) => void,
  handleChange?: (value: number) => void,
  carPrice?: number
}

interface IHOC {
  name: string,
  unit: string,
  value: number,
  carPrice?: number,
  bringToFormat?: (a: number) => void,
  onBlur: (e: Event) => void
  onChange: (e: Event) => void
}

const withInput = (BaseComponent: React.ComponentType<IHOC>) => {
  return ({ name, label, unit, initialValues, handleBlur, handleChange, carPrice }: IHOCProps) => {
    const [inputValue, setInputValue] = useState(initialValues.value);
    const { min, max } = initialValues;
  
    const onBlur = (e: Event) => {
      setInputValue(valuesValidation(e));
      handleBlur(valuesValidation(e), name);
    };
  
    const onChange = (e: Event) => {
      const value = +e.target.value.replace(/\s+/g, '');
  
      if (isNaN(value)) return;
      setInputValue(value);
      if (handleChange) handleChange(value);
    }
  
    const bringToFormat = (number: number) => {
      return (+number.toFixed(0)).toLocaleString();
    }
  
    const valuesValidation = (e: Event) => {
      const value = +e.target.value.replace(/\s+/g, '');
  
      if (value > max) return max;
      if (value < min) return min;
      return value;
    }
  
    const valueToPercent = () => {
      if (inputValue > max) return 100;
      if (inputValue < min) return 1;
      return ((inputValue - min) / (max - min)) * 100;
    }
  
    const onPointerDown = (event: PointerEvent) => {
      event.preventDefault();
  
      const slider = event.target.offsetParent;
      const sliderWidth = slider.offsetWidth;
  
      const pointermove = (e: EventOfDot) => {
        const value = getValueOfCoords(e);
  
        setInputValue(value);
        if (handleChange) handleChange(value);
      };
      
      const getValueOfCoords = (e: EventOfDot) => {
        const leftValue = e.pageX - slider.getBoundingClientRect().left;
        const calculatedValue =  Math.round((leftValue / sliderWidth) * (max - min) + min);
  
        if (calculatedValue > max) return max;
        if (calculatedValue < min) return min;
        return calculatedValue;
      }
  
      const pointerup = (e: EventOfDot) => {
        const value = getValueOfCoords(e);
    
        document.removeEventListener('pointermove', pointermove);
        document.removeEventListener('pointerup', pointerup);
        handleBlur(value, name);
        if (handleChange) handleChange(value);
      };
      document.addEventListener('pointermove', pointermove);
      document.addEventListener('pointerup', pointerup);
    }
  
    return (
      <div className="input__container">
        <label htmlFor={name} className="input__label">{label}</label>
        <div className="input__wrapper">
          <BaseComponent
            name={name}
            unit={unit}
            value={inputValue}
            carPrice={carPrice}
            bringToFormat={bringToFormat}
            onBlur={onBlur}
            onChange={onChange}
          />
          <div className="input__range-slider">
            <div className="input__range-slider-bar" style={{width: `${valueToPercent()}%`}}></div>
            <div
              className="input__range-slider-circle"
              style={{left: `${valueToPercent()}%`}}
              onPointerDown={onPointerDown}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

const BaseInput = ({ name, value, unit, onBlur, onChange, bringToFormat }: any) => {
  return (
    <>
      <input
        name={name}
        type="text"
        id={name}
        value={bringToFormat(value)}
        onBlur={onBlur}
        onChange={onChange}
        className="input"
        autoComplete="off"
      />
      <div className="input__unit">{unit}</div>
    </>
  )
}

const ThemePercentInput = ({ name, value, unit, carPrice, onBlur, onChange, bringToFormat }: any) => {
  const firstPaymentRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div onClick={() => firstPaymentRef.current?.focus()} className="input">
        {bringToFormat(value * carPrice / 100)}
        <div className="input__unit_aligned"> {unit}</div>
      </div>
      <div className="input__wrapper_theme_percent">
        <input
          name={name}
          type="text"
          id={name}
          ref={firstPaymentRef}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          className="input_theme_percent"
          autoComplete="off"
        />
        <div className="input__unit_hidden">{value.toFixed(0)}</div>
        <div className="input__unit input__unit_theme_percent">%</div>
      </div>
    </>
  )
}

const WithBaseInput = withInput(BaseInput);
const WithThemedInput = withInput(ThemePercentInput);

export { 
  WithBaseInput,
  WithThemedInput
};
