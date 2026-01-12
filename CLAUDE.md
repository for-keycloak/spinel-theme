# Project Guidelines

## Commands

- Always use `just` to run commands (see `justfile` for available recipes)
- Use `yarn` instead of `npm` for package management
- Run commands via Docker: `just shell` then run yarn commands inside

## CSS

- Use simple selectors. Prefer class selectors (`.input`) over complex attribute chains
- Avoid chained negations like `input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"])`
- Target keycloakify's class names defined in `src/login/KcPage.tsx` (e.g., `.input`, `.form-group`, `.label`)
