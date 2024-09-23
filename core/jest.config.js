module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^application/(.*)$': '<rootDir>/application/$1',
      '^domain/(.*)$': '<rootDir>/domain/$1',
    },
    roots: ['<rootDir>/test'], // Asegúrate de que Jest busque en esta carpeta
  };
  