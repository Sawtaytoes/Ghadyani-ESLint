Originally copied straight from https://github.com/eslint/eslint and modified.

# @ghadyani-eslint/eslint-plugin-eslint-overrides

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-arrow-body-parens`:

```
$ npm install @ghadyani-eslint/eslint-plugin-eslint-overrides --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-arrow-body-parens` globally.

## Usage

Add `@ghadyani-eslint/eslint-overrides` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "@ghadyani-eslint/eslint-overrides"
  ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@ghadyani-eslint/eslint-overrides/indent": [ "error" ]
    "@ghadyani-eslint/eslint-overrides/multiline-ternary": [ "error" ]
    "@ghadyani-eslint/eslint-overrides/newline-per-chained-call": [ "error" ]
  }
}
```

## Supported Rules

* [indent](/docs/lib/rules/indent)
* [multiline-ternary](/docs/lib/rules/multiline-ternary)
* [newline-per-chained-call](/docs/lib/rules/newline-per-chained-call)
