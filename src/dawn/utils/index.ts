export * from './status.ts'
export function removeBackSlash(path: string) {
  if (path.endsWith('/')) {
    return path.substring(0, path.length - 1)
  }

  return path
}
