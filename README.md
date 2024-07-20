## Installation

Development environment requirements:
- [Docker](https://www.docker.com) >= 17.06
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/package-manager) >= 20

## Project initialization

### 1. Setup Environment Variables:
```shell
  cp .env.example .env
```
### 2. Run Services with Docker Compose:
```shell
  docker compose up -d --build
```

### 3. Run Services without Docker:
```shell
  npm run start
```

## Notes
### 1. Enable Git hooks

```shell
  npx husky install
  npx husky add .husky/commit-msg 'npm run commit-msg'
  npx husky add .husky/pre-commit 'npm run pre-commit'
```

### 2. Why is my git pre-commit hook not executable by default?

- Because files are not executable by default; they must be set to be executable.

```shell
  chmod ug+x .husky/*
  chmod ug+x .git/hooks/*
```

### 3. Project Structure

| Name                   | Description                                                 |
|------------------------|-------------------------------------------------------------|
| **src/**               | Main source code directory                                  |
| **src/common/**        | Shared code across different parts of the application       |
| **src/config/**        | Configuration files                                         |
| **src/core/**          | Core logic or main parts of the application                 |
| **src/modules/**       | Self-contained parts of the application                     |
| **src/providers/**     | Service provider code (data fetching, helper functions)     |
| **src/utils/**         | Common utility functions                                    |
| **tests/**             | Test cases                                                  |
| **tests/unit/**        | Unit tests for individual code units                        |
| **tests/integration/** | Integration tests checking if different parts work together |
