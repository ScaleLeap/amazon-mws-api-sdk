// eslint-disable-next-line import/no-extraneous-dependencies
import isCi from 'is-ci'

/**
 * Runs `it` conditionally.
 */
export const itif = (condition: boolean) => (condition ? it : it.skip)

/**
 * Runs test only in CI.
 */
export const itci = itif(isCi)
