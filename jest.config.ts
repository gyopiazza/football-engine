import type { Config } from '@jest/types'

// Sync object
const config: Config.InitialOptions = {
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // collectCoverage: true,
}
export default config
