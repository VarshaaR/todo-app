# 📝 Todo App

A modern Todo application built with Vite, React, TypeScript, and Yarn.

---

## Demo

A live demo of the Todo App is available at:  
[https://varshaar.github.io/todo-app/](https://varshaar.github.io/todo-app/)



## 🚀 Installation

This project uses [Vite](https://vitejs.dev/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and is managed with [Yarn](https://classic.yarnpkg.com/).

### ✅ Prerequisites

- **Node.js**: v22.9.0 or higher  
- **Yarn (Classic)**: v1.22.22 or higher

---

## Environment Requirements

- Node.js version: >= 16.x (recommended)
- Yarn version: >= 1.22.x (recommended)

---

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/VarshaaR/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Run the development server:
   ```bash
   yarn dev
   ```

4. Build the project for production:
   ```bash
   yarn build
   ```

5. Preview the production build:
   ```bash
   yarn preview
   ```

---

## Repository Structure

- `src/` - Source files including components, assets, constants, styles, types, and utilities.
- `public/` - Static assets served directly.
- `.github/` - GitHub workflows and configurations.
- `.husky/` - Husky git hooks configuration.
- `dist/` - Production build output.
- Configuration files for ESLint, Prettier, Tailwind, TypeScript, Vite, Jest, etc.

---

## Technologies Used

- Tailwind CSS for utility-first styling.
- Material UI for React component design.
- i18next for internationalization with support for French and German languages.
- Vite, React, TypeScript, and Yarn as core technologies.

---
## Git Hooks and Commit Linting

This project uses [Husky](https://typicode.github.io/husky/#/) to manage Git hooks.

- Husky is configured to run pre-commit and commit-msg hooks to ensure code quality and commit message standards.
- Commit messages are validated using [commitlint](https://commitlint.js.org/#/) to help maintain consistent and meaningful commit history.

Make sure to write commit messages following the configured commitlint rules to avoid commit rejections.

Example commit message format:
```
<type>(<scope>): <subject>
```
Where `<type>` can be `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, etc.

---