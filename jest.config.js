export default {
  roots:['<rootDir>'],
  transform: {
    "^.+\\.(js)$": "babel-jest",
  },
  modulePathIgnorePatterns: ['__tests__'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/jest-setup.js'],
  testEnvironment: 'jsdom',
  verbose: true
}
