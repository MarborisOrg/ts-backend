import { Matrix, Network } from './matrix.types'

export const createMatrix = (rows: number, columns: number): Matrix => {
  const matrix: Matrix = new Array(rows)
    .fill(0)
    .map(() => new Array(columns).fill(0))
  return matrix
}

export const columns = (matrix: Matrix): number => {
  return matrix[0].length
}

export const randomMatrix = (rows: number, columns: number): Matrix => {
  const matrix: Matrix = new Array(rows)
    .fill(0)
    .map(() => new Array(columns).fill(0).map(() => Math.random() * 2 - 1))
  return matrix
}

export const rows = (matrix: Matrix): number => {
  return matrix.length
}

export const createNetwork = (
  locale: string,
  rate: number,
  input: Matrix,
  output: Matrix,
  ...hiddensNodes: number[]
): Network => {
  input = [new Array(input[0].length).fill(0), ...input]
  output = [new Array(output[0].length).fill(0), ...output]

  const inputMatrix = input
  const layers: Matrix[] = [inputMatrix] // let

  for (const hiddenNodes of hiddensNodes) {
    layers.push(createMatrix(input.length, hiddenNodes))
  }

  layers.push(output)

  const weightsNumber = layers.length - 1
  const weights: Matrix[] = []
  const biases: Matrix[] = []

  for (let i = 0; i < weightsNumber; i++) {
    const cols = columns(layers[i + 1])
    weights.push(randomMatrix(columns(layers[i]), cols))
    biases.push(randomMatrix(rows(layers[i]), cols))
  }

  return {
    Layers: layers,
    Weights: weights,
    Biases: biases,
    Output: output,
    Rate: rate,
    Locale: locale,
  }
}

export const dotProduct = (matrix: Matrix, matrix2: Matrix): Matrix => {
  if (columns(matrix) !== rows(matrix2)) {
    throw new Error('Cannot make dot product between these two matrix.')
  }

  return applyFunctionWithIndex(
    createMatrix(rows(matrix), columns(matrix2)),
    (i, j, x) => {
      let sum = 0

      for (let k = 0; k < columns(matrix); k++) {
        sum += matrix[i][k] * matrix2[k][j]
      }

      return sum
    }
  )
}

export const errorNotSameSize = (matrix: Matrix, matrix2: Matrix): void => {
  if (rows(matrix) !== rows(matrix2) || columns(matrix) !== columns(matrix2)) {
    throw new Error('These two matrices must have the same dimension.')
  }
}

export const applyFunctionWithIndex = (
  matrix: Matrix,
  fn: (i: number, j: number, x: number) => number
): Matrix => {
  for (let i = 0; i < rows(matrix); i++) {
    for (let j = 0; j < columns(matrix); j++) {
      matrix[i][j] = fn(i, j, matrix[i][j])
    }
  }

  return matrix
}

export const sum = (matrix: Matrix, matrix2: Matrix): Matrix => {
  errorNotSameSize(matrix, matrix2)

  const resultMatrix = createMatrix(rows(matrix), columns(matrix))

  return applyFunctionWithIndex(resultMatrix, (i, j, x) => {
    return matrix[i][j] + matrix2[i][j]
  })
}

export const applyFunction = (
  matrix: Matrix,
  fn: (x: number) => number
): Matrix => {
  return applyFunctionWithIndex(matrix, (i, j, x) => {
    return fn(x)
  })
}

export const difference = (matrix: Matrix, matrix2: Matrix): Matrix => {
  errorNotSameSize(matrix, matrix2)

  const resultMatrix = createMatrix(rows(matrix), columns(matrix))

  return applyFunctionWithIndex(resultMatrix, (i, j, x) => {
    return matrix[i][j] - matrix2[i][j]
  })
}

export const multiplication = (matrix: Matrix, matrix2: Matrix): Matrix => {
  errorNotSameSize(matrix, matrix2)

  const resultMatrix = createMatrix(rows(matrix), columns(matrix))

  return applyFunctionWithIndex(resultMatrix, (i, j, x) => {
    return matrix[i][j] * matrix2[i][j]
  })
}

export const transpose = (matrix: Matrix): Matrix => {
  const resultMatrix = createMatrix(columns(matrix), rows(matrix))

  for (let i = 0; i < rows(matrix); i++) {
    for (let j = 0; j < columns(matrix); j++) {
      resultMatrix[j][i] = matrix[i][j]
    }
  }

  return resultMatrix
}

export const applyRate = (matrix: Matrix, rate: number): Matrix => {
  return applyFunction(matrix, (x) => rate * x)
}
