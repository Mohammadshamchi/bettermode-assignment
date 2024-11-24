export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@types/(.*)$": "<rootDir>/src/types/$1",
    "^@graphql/(.*)$": "<rootDir>/src/graphql/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
