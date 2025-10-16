# Contributing to OdonTools

Thanks for your interest in contributing to OdonTools! This document will guide you through the contribution process.

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- Git
- Basic knowledge of React

### Development Environment Setup

1. Fork the repository
2. Clone your fork:

```bash
git clone https://github.com/YOUR-USERNAME/Odontools.git
cd Odontools/odoontools
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

## 📝 Style Guidelines

### JavaScript/React Code

- Use ES6+ features
- Functional components with hooks
- camelCase naming for variables and functions
- PascalCase naming for components
- Use JSX for templates

### CSS

- Use descriptive class names
- Follow BEM methodology when appropriate
- Mobile-first responsive design
- Avoid !important unless absolutely necessary

### Commits

Use the Conventional Commits format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting changes
- `refactor`: Code refactoring
- `test`: Add or modify tests
- `chore`: Build or auxiliary tool changes

## 🐛 Reporting Bugs

Before reporting a bug:

1. Verify that a similar issue doesn't already exist
2. Try to reproduce the problem
3. Gather information about your environment

Include in your report:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if relevant
- Environment information (OS, browser, etc.)

## ✨ Requesting Features

To request new features:

1. Clearly describe the functionality
2. Explain why it would be useful
3. Consider how it would integrate with the current project

## 🔄 Pull Request Process

1. Create a branch for your feature:

```bash
git checkout -b feature/descriptive-name
```

2. Make your changes
3. Ensure code meets standards
4. Run tests:

```bash
npm run lint
```

5. Commit your changes
6. Push to your fork
7. Open a Pull Request

### PR Checklist

- [ ] Code is well documented
- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Functionality is complete
- [ ] Documentation updated if necessary

## 📚 Component Structure

### New Component

```
src/components/NewComponent/
├── NewComponent.jsx
├── NewComponent.css
└── index.js (optional)
```

### Component Template

```jsx
import "./NewComponent.css";

export default function NewComponent({ prop1, prop2 }) {
  return <div className="new-component">{/* JSX here */}</div>;
}
```

## 🧪 Testing

### Run tests

```bash
npm run test
```

### Writing tests

- Use Jest and React Testing Library
- Cover success and error cases
- Mock external dependencies

## 📖 Documentation

- Document complex functions
- Update README if you change functionalities
- Include usage examples
- Document APIs and component props

## ❓ Need Help?

- Open an issue with "question" label
- Review existing documentation
- Check similar closed issues

## 🎉 Recognition

Contributors will be added to the project README. Thanks for making OdonTools better!
