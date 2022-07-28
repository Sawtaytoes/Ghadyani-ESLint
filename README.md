# Ghadyani-ESLint

## Prerequisites
To use this package, you need ESLint installed:

```sh
yarn add eslint
```

## Usage
To pull these into your projects, there are two versions which can be used in tandem, but have different requirements:

**Node.js**

```sh
yarn add -D @ghadyani-eslint/eslint-config-node eslint-plugin-import eslint-plugin-sort-destructure-keys
```

**React**

_**NOTE:** You also need `react` installed to use this version of Ghadyani ESLint._
```sh
yarn add -D @ghadyani-eslint/eslint-config-web @babel/eslint-parser eslint-plugin-compat eslint-plugin-react eslint-plugin-import eslint-plugin-sort-destructure-keys
```
