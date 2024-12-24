export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/modules/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
}
