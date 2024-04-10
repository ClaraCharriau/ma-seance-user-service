module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['src', 'test'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/*', '**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    'node_modules',
    '.module.ts',
    '.entity.ts',
    '<rootDir>/src/main.ts',
    '.json',
    '.*__snapshots__/.*',
    '<rootDir>/test/*',
  ],
  coverageReporters: ['html', 'lcov', 'json-summary', 'json'],
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'node',
};
