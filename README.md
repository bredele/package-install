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
await install('typescript', true);

// install multiple dependencies
await install('react react-dom');
```
