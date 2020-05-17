module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/*.{ts,tsx}'],
  coverageReporters: ['json', 'json-summary', 'lcov', 'text', 'clover'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  preset: 'ts-jest',
  rootDir: process.cwd(),
  roots: ['<rootDir>/test'],
  setupFilesAfterEnv: ['<rootDir>/scripts/jest/setupJest.ts'],
  testMatch: ['<rootDir>/test/*.spec.ts?(x)'],
  transform: { '^.+\\.(js|tsx?)$': 'ts-jest' }
}
