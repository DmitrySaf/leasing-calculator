interface IUnformattedState {
  carPrice: string,
  firstPayment: string,
  period: string
}

interface IFormattedState {
  carPrice: number,
  firstPayment: number,
  period: number
}

interface IAction {
  type: string,
  payload: number
}

interface InitialValues {
  [i: string]: Input,
  carPrice: Input,
  firstPayment: Input,
  period: Input
}

interface Input {
  min: number,
  max: number,
  value: number
}

export type {
  IUnformattedState,
  IFormattedState,
  IAction,
  InitialValues
}
