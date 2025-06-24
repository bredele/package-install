# package-install

Fast and programmatic npm install based on runtime engine

## Installation

```sh
npm install @bredele/package-install
```

## Usage

```ts
import install from '@bredele/package-install';

// install dependency
await install('react');

// install dev dependencies
await install('typescript', { dev: true });

// install in specific directory
await install('react', { cwd: './my-project' });

// install dev dependencies in specific directory
await install('typescript', { dev: true, cwd: './my-project' });

// install multiple dependencies
await install('react react-dom');
```
