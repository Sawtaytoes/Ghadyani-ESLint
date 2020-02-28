/**
 * @fileoverview Rule to require parens in arrow function body expressions.
 * @author Berkeley Martinez
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const astUtils = require('eslint/lib/rules/utils/ast-utils.js');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const rule = module.exports = {
  meta: {
    docs: {
      description:
        'require parens around multiline arrow function body expressions',
      category: 'ECMAScript 6',
      recommended: true,
    },

    schema: {},

    fixable: 'code',
  },

  __errors: {
    noParensFound: 'Unwrapped multiline arrow body expression',
    parensOnWrongLine: 'Opening parens must be on the same line as the arrow token',
  },
  __ignoredBodyTypes: [
    'ArrayExpression',
    'BlockStatement',
  ],

  create(context) {
    const sourceCode = context.getSourceCode();

    /**
    * Determines whether a arrow function body needs parens
    * @param {ASTNode} node The arrow function node.
    * @returns {void}
    */
    function ArrowFunctionExpression(node) {
      const arrowBody = node.body;

      if (
        // ignore block statements
        rule.__ignoredBodyTypes.some(type => type === arrowBody.type) ||
        // ignore single line arrow functions
        astUtils.isTokenOnSameLine(node, node)
      ) {
        return;
      }

      const tokenBefore = sourceCode.getTokenBefore(arrowBody);
      const tokenAfter = sourceCode.getTokenAfter(arrowBody);
      const arrowToken = astUtils.isArrowToken(tokenBefore) ?
        tokenBefore :
        sourceCode.getTokenBefore(tokenBefore);

      if (
        !astUtils.isOpeningParenToken(tokenBefore) ||
        !astUtils.isClosingParenToken(tokenAfter)
      ) {
        if (astUtils.isFunction(arrowBody)) {
          return;
        }

        const isClosingParenToken = astUtils.isClosingParenToken(tokenAfter);

        context.report({
          node,
          loc: tokenBefore.loc.start,
          message: rule.__errors.noParensFound,
          fix(fixer) {
            const fixes = [];

            if (!astUtils.isOpeningParenToken(tokenBefore)) {
              fixes.push(fixer.insertTextAfter(tokenBefore, ' ('));
            }

            if (!isClosingParenToken) {
              fixes.push(fixer.insertTextAfter(arrowBody, '\n)'));
            }

            return fixes;
          },
        });
        return;
      }

      const openingParens = tokenBefore;
      const closingParens = tokenAfter;

      if (
        astUtils.isArrowToken(arrowToken) &&
        arrowToken.loc.start.line !== openingParens.loc.start.line ||
        astUtils.isTokenOnSameLine(openingParens, arrowBody) ||
        (arrowBody.loc.start.line - openingParens.loc.end.line) > 1 ||
        astUtils.isTokenOnSameLine(arrowBody, closingParens) ||
        (closingParens.loc.start.line - arrowBody.loc.end.line) > 1
      ) {
        context.report({
          node,
          loc: arrowToken.loc.start,
          message: rule.__errors.parensOnWrongLine,
          fix(fixer) {
            const fixes = [];

            if (arrowToken.loc.start.line !== openingParens.loc.start.line) {
              fixes.push(
                fixer.replaceTextRange(
                  [
                    arrowToken.range[1],
                    openingParens.range[1],
                  ],
                  ' (',
                )
              );
            }

            if (astUtils.isTokenOnSameLine(openingParens, arrowBody)) {
              fixes.push(
                fixer.replaceTextRange(
                  [
                    openingParens.range[1],
                    arrowBody.range[0],
                  ],
                  '\n',
                )
              );
            }

            if ((arrowBody.loc.start.line - openingParens.loc.end.line) > 1) {
              fixes.push(
                fixer.removeRange(
                  [
                    openingParens.range[1],
                    arrowBody.range[0],
                  ],
                )
              );
            }

            if (astUtils.isTokenOnSameLine(arrowBody, closingParens)) {
              fixes.push(
                fixer.replaceTextRange(closingParens.range, '\n)')
              );
            }

            if ((closingParens.loc.start.line - arrowBody.loc.end.line) > 1) {
              fixes.push(
                fixer.removeRange(
                  [
                    arrowBody.range[1],
                    closingParens.range[0],
                  ],
                )
              );
            }

            return fixes;
          },
        });

        return;
      }
    }

    /**
    * Determines whether a variable expression body needs parens
    * @param {ASTNode} node The arrow function node.
    * @returns {void}
    */
    function VariableDeclarator(node) {
      const body = node.init;

      if (!body) {
        return;
      }

      if (
        // ignore block statements
        rule.__ignoredBodyTypes.some(type => type === body.type) ||
        // ignore single line arrow functions
        astUtils.isTokenOnSameLine(node, node)
      ) {
        return;
      }

      const tokenBefore = sourceCode.getTokenBefore(body);
      const tokenAfter = sourceCode.getTokenAfter(body);

      if (!astUtils.isParenthesised(sourceCode, body)) {
        context.report({
          node,
          loc: tokenBefore.loc.start,
          message: rule.__errors.noParensFound,
          fix(fixer) {
            const fixes = [];

            fixes.push(fixer.insertTextAfter(tokenBefore, ' ('));
            fixes.push(fixer.insertTextAfter(body, '\n)'));

            return fixes;
          },
        });

        return;
      }

      const openingParens = tokenBefore;
      const closingParens = tokenAfter;

      if (
        !astUtils.isTokenOnSameLine(openingParens, node) ||
        astUtils.isTokenOnSameLine(openingParens, body) ||
        (body.loc.start.line - openingParens.loc.end.line) > 1 ||
        astUtils.isTokenOnSameLine(body, closingParens) ||
        (closingParens.loc.start.line - body.loc.end.line) > 1
      ) {
        context.report({
          node,
          loc: node.loc.start,
          message: rule.__errors.parensOnWrongLine,
          fix(fixer) {
            const fixes = [];

            if (!astUtils.isTokenOnSameLine(openingParens, node)) {
              fixes.push(
                fixer.replaceTextRange(
                  [
                    sourceCode.getTokenBefore(openingParens).range[1],
                    openingParens.range[1],
                  ],
                  ' (',
                )
              );
            }

            if (astUtils.isTokenOnSameLine(openingParens, body)) {
              fixes.push(
                fixer.replaceTextRange(
                  [
                    sourceCode.getTokenBefore(openingParens).range[1],
                    openingParens.range[1],
                  ],
                  ' (\n',
                )
              );
            }

            if ((body.loc.start.line - openingParens.loc.end.line) > 1) {
              fixes.push(
                fixer.removeRange(
                  [
                    openingParens.range[1],
                    body.range[0],
                  ],
                )
              );
            }

            if (astUtils.isTokenOnSameLine(body, closingParens)) {
              fixes.push(
                fixer.replaceTextRange(closingParens.range, '\n)')
              );
            }

            if ((closingParens.loc.start.line - body.loc.end.line) > 1) {
              fixes.push(
                fixer.removeRange(
                  [
                    body.range[1],
                    closingParens.range[0],
                  ],
                )
              );
            }

            return fixes;
          },
        });

        return;
      }
    }

    return {
      VariableDeclarator,
      'ArrowFunctionExpression:exit': ArrowFunctionExpression,
    };
  },
};
