import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

export const multipliesByTwo = (x: number): number => 2 * x

export const subtractsOne = (x: number): number => x - 1

export const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x))

export const index = (slice: string[], text: string): number => {
  for (let i = 0; i < slice.length; i++) {
    if (slice[i] === text) {
      return i
    }
  }
  return 0
}

export const difference = (slice: string[], slice2: string[]): string[] => {
  const difference: string[] = [] // let
  for (let i = 0; i < 2; i++) {
    for (const s1 of slice) {
      let found = false
      for (const s2 of slice2) {
        if (s1 === s2) {
          found = true
          break
        }
      }
      if (!found) {
        difference.push(s1)
      }
    }
    if (i === 0) {
      ;[slice, slice2] = [slice2, slice]
    }
  }
  return difference
}

export const readFile = (filePath: string): Buffer => {
  let bytes: Buffer
  try {
    bytes = fs.readFileSync(filePath)
  } catch (_err) {
    try {
      bytes = fs.readFileSync(path.join('..', filePath))
    } catch (err: any) {
      throw new Error(err)
    }
  }
  return bytes
}

export const contains = (slice: string[], text: string): boolean => {
  for (const item of slice) {
    if (item === text) {
      return true
    }
  }
  return false
}

export const getResDir = (
  dir: string,
  file: string,
  ...dir2: string[]
): string => {
  const homeDir = os.homedir()
  if (dir2.length === 0 || dir2[0] === '') {
    return path.join(homeDir, '.marboris', 'res', dir, file)
  }
  return path.join(homeDir, '.marboris', 'res', dir, dir2[0], file)
}
