# WDIO + Cucumber E2E Tests

This project uses **WebdriverIO**, **Cucumber**, and **Gherkin** to run UI tests against [https://practicesoftwaretesting.com](https://practicesoftwaretesting.com), a demo tool shop website.

Linting tools like **Prettier** and **ESLint** are also included, with helpful npm scripts provided.

Some of the tests require environment variables to work. Make sure you set a valid login password for the site under the `VALID_LOGIN_PASSWORD` environment variable.

You can run the tests by using npm scripts after installing the dependencies.

## Setup

First, you'll need to install the dependencies. you can do it by running

```bash
npm install
```

After that, you can run the tests with

```bash
npm test
```

Check package.json for additional script options.

## Linting and formatting

You can run the following commands:

```bash
npx npm run lint         # Check for linting issues
npx npm run lint-fix     # Auto-fix lint issues
npx npm run prettier     # Format code with Prettier
```

Target site: [https://practicesoftwaretesting.com](https://practicesoftwaretesting.com)
