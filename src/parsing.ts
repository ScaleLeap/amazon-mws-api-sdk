/** A collection of parsing utils */

export const ensureArray = <T>(x: T | T[]): T[] => (Array.isArray(x) ? x : [x])

export const parseBoolean = (x: 'Yes' | 'No'): boolean => {
  switch (x) {
    case 'Yes':
      return true
    case 'No':
      return false
    default:
      throw new Error('TODO, but should be library-specific error')
  }
}
