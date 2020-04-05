Various rules both custom and modified from various sources.

# @ghadyani-eslint/eslint-plugin-rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-arrow-body-parens`:

```
$ npm install @ghadyani-eslint/eslint-plugin-rules --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-arrow-body-parens` globally.

## Usage

Add `@ghadyani-eslint/rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "@ghadyani-eslint/rules"
  ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@ghadyani-eslint/rules/proper-ternary-nesting": [ "error" ],
    "@ghadyani-eslint/rules/proper-ternary-parens": [ "error" ]
  }
}
```

## Supported Rules

* [proper-ternary-nesting](/docs/lib/rules/proper-ternary-nesting)
* [proper-ternary-parens](/docs/lib/rules/proper-ternary-parens)
