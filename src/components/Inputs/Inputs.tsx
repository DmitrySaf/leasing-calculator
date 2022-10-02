import { useState } from 'react';

import { InitialValues, IFormattedState } from "../interfaces";
import { WithBaseInput, WithThemedInput } from "../Input/Input";

import './Inputs.scss';

interface InputsProps {
  initialValues: InitialValues,
  handleChange: (values: IFormattedState) => void
}

const Inputs = ({initialValues, handleChange}: InputsProps) => {
  const [state, setState] = useState<IFormattedState>({
    carPrice: initialValues.carPrice.value,
    firstPayment: initialValues.firstPayment.value,
    period: initialValues.period.value
  });

  const handleInputChange = (value: number) => {
    setState({...state, carPrice: value});
  }

  const handleBlur = (value: number, name: string) => {
    setState({...state, [name]: value});
    handleChange({...state, [name]: value});
  }

  return (
    <div className="inputs">
      <WithBaseInput
        name="carPrice"
        label="Стоимость автомобиля"
        unit="₽"
        initialValues={initialValues.carPrice}
        handleBlur={handleBlur}
        handleChange={handleInputChange}
      />
      <WithThemedInput
        name="firstPayment"
        label="Первоначальный взнос"
        unit="₽"
        initialValues={initialValues.firstPayment}
        handleBlur={handleBlur}
        carPrice={state.carPrice}
      />
      <WithBaseInput
        name="period"
        label="Срок лизинга"
        unit="мес."
        initialValues={initialValues.period}
        handleBlur={handleBlur}
      />
    </div>
  );
};

export default Inputs;
