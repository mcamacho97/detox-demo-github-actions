module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./jest-setup-after-env.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': require.resolve('babel-jest'),
  },
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.svg': '<rootDir>/src/app/core/__mocks__/svgMock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(?:.pnpm/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@sentry/react-native))'
  ],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/ios/',
    '/android/',
    '/coverage/',
    '/e2e/',
    '\\.d\\.ts$',
    'index.ts',
  ],
};
