# Tests for GAD application

## GAD Application

Repository: https://github.com/czyzyk29/gad-tests

Follow instructions in app README

## Prepare

### Local recommended tools:

- VS Code
- Git
- Node.js (version >16)

### Installation and setup

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- setup husky with: `npx husky`
- env file to prepare: `cp .env-template .env`
- add credentials to copied file `.env` - example from db tools in gad

## Use

Run all tests:

```
npx playwright test
```

For more usage cases look in `package.json` scripts section.
