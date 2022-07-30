/**
 * @fileoverview Rule to require parens in arrow function body expressions.
 * @author Berkeley Martinez
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const {
  ASTUtils,
} = require("@typescript-eslint/utils");

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
    'ObjectExpression',
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
        ASTUtils.isTokenOnSameLine(node, node)
      ) {
        return;
      }

      const tokenBefore = sourceCode.getTokenBefore(arrowBody);
      const tokenAfter = sourceCode.getTokenAfter(arrowBody);
      const arrowToken = ASTUtils.isArrowToken(tokenBefore) ?
        tokenBefore :
        sourceCode.getTokenBefore(tokenBefore);

      if (
        !ASTUtils.isOpeningParenToken(tokenBefore) ||
        !ASTUtils.isClosingParenToken(tokenAfter)
      ) {
        if (ASTUtils.isFunction(arrowBody)) {
          return;
        }

        const isClosingParenToken = ASTUtils.isClosingParenToken(tokenAfter);

        context.report({
          node,
          loc: tokenBefore.loc.start,
          message: rule.__errors.noParensFound,
          fix(fixer) {
            const fixes = [];

            if (!ASTUtils.isOpeningParenToken(tokenBefore)) {
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
        ASTUtils.isArrowToken(arrowToken) &&
        arrowToken.loc.start.line !== openingParens.loc.start.line ||
        ASTUtils.isTokenOnSameLine(openingParens, arrowBody) ||
        (arrowBody.loc.start.line - openingParens.loc.end.line) > 1 ||
        ASTUtils.isTokenOnSameLine(arrowBody, closingParens) ||
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

            if (ASTUtils.isTokenOnSameLine(openingParens, arrowBody)) {
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

            if (ASTUtils.isTokenOnSameLine(arrowBody, closingParens)) {
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
        ASTUtils.isTokenOnSameLine(node, node)
      ) {
        return;
      }

      const tokenBefore = sourceCode.getTokenBefore(body);
      const tokenAfter = sourceCode.getTokenAfter(body);

      if (!ASTUtils.isParenthesized(node, sourceCode, body)) {
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
        !ASTUtils.isTokenOnSameLine(openingParens, node) ||
        ASTUtils.isTokenOnSameLine(openingParens, body) ||
        (body.loc.start.line - openingParens.loc.end.line) > 1 ||
        ASTUtils.isTokenOnSameLine(body, closingParens) ||
        (closingParens.loc.start.line - body.loc.end.line) > 1
      ) {
        context.report({
          node,
          loc: node.loc.start,
          message: rule.__errors.parensOnWrongLine,
          fix(fixer) {
            const fixes = [];

            if (!ASTUtils.isTokenOnSameLine(openingParens, node)) {
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

            if (ASTUtils.isTokenOnSameLine(openingParens, body)) {
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

            if (ASTUtils.isTokenOnSameLine(body, closingParens)) {
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
      'ArrowFunctionExpression:exit': ArrowFunctionExpression,
      'VariableDeclarator:exit': VariableDeclarator,
    };
  },
};
