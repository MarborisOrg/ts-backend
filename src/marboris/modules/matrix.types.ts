export type Matrix = number[][]

export interface Network {
  Layers: Matrix[]
  Weights: Matrix[]
  Biases: Matrix[]
  Output: Matrix
  Rate: number
  Errors?: number[]
  Time?: number
  Locale: string
}

export interface Derivative {
  Delta: Matrix
  Adjustment: Matrix
}
