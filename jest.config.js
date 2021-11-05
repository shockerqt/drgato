/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  preset: 'ts-jest',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testEnvironment: 'node',
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.ts"
  },
  moduleDirectories: ['node_modules'],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts'
  ],
  testEnvironment: 'jsdom',
};
