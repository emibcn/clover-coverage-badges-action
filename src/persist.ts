import {writeFile} from 'fs'
import path from 'path'

export async function persist(
  content: string,
  directory: string,
  label?: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const fileName = label ? `coverage-${label}.svg` : `coverage.svg`
    const fullPath = path.join(directory, fileName)
    writeFile(fullPath, content, error => {
      if (error === null) {
        resolve()
      } else {
        reject(error)
      }
    })
  })
}
