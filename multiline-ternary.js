/**
 * @fileoverview Enforce newlines between operands of ternary expressions
 * @author Kai Cataldo
 */

"use strict";

const astUtils = require("./utils/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "layout",

        docs: {
            description: "enforce newlines between operands of ternary expressions",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://eslint.org/docs/rules/multiline-ternary"
        },

        schema: [
            {
                enum: ["always", "always-multiline", "never"],
            },
        ],
        messages: {
            expectedTestCons: "Expected newline between test and consequent of ternary expression.",
            expectedConsAlt: "Expected newline between consequent and alternate of ternary expression.",
            unexpectedTestCons: "Unexpected newline between test and consequent of ternary expression.",
            unexpectedConsAlt: "Unexpected newline between consequent and alternate of ternary expression."
        },

        fixable: 'code',
    },

    create(context) {
        const option = context.options[0];
        const multiline = option !== "never";
        const allowSingleLine = option === "always-multiline";

        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------

        /**
         * Tests whether node is preceded by supplied tokens
         * @param {ASTNode} node node to check
         * @param {ASTNode} parentNode parent of node to report
         * @param {boolean} expected whether newline was expected or not
         * @returns {void}
         * @private
         */
        function reportSingleLineError(node, parentNode, expected) {
            context.report({
                node,
                messageId: `${expected ? "expected" : "unexpected"}${node === parentNode.test ? "TestCons" : "ConsAlt"}`,
                fix: fixer => ([
                    !astUtils.isTokenOnSameLine(parentNode.test, parentNode.consequent) &&
                    fixer.replaceTextRange(
                        [
                            parentNode.test.range[1],
                            parentNode.consequent.range[0],
                        ],
                        ' ? ',
                    ),
                    !astUtils.isTokenOnSameLine(parentNode.consequent, parentNode.alternate) &&
                    fixer.replaceTextRange(
                        [
                            parentNode.consequent.range[1],
                            parentNode.alternate.range[0],
                        ],
                        ' : ',
                    ),
                ]),
            });
        }

        /**
         * Tests whether node is preceded by supplied tokens
         * @param {ASTNode} node node to check
         * @param {ASTNode} parentNode parent of node to report
         * @param {boolean} expected whether newline was expected or not
         * @returns {void}
         * @private
         */
        function reportMultilineError(node, parentNode, expected) {
            context.report({
                node,
                messageId: `${expected ? "expected" : "unexpected"}${node === parentNode.test ? "TestCons" : "ConsAlt"}`,
                fix: fixer => ([
                    astUtils.isTokenOnSameLine(parentNode.test, parentNode.consequent) &&
                    fixer.replaceTextRange(
                        [
                            parentNode.test.range[1],
                            parentNode.consequent.range[0],
                        ],
                        '\n? ',
                    ),
                    astUtils.isTokenOnSameLine(parentNode.consequent, parentNode.alternate) &&
                    fixer.replaceTextRange(
                        [
                            parentNode.consequent.range[1],
                            parentNode.alternate.range[0],
                        ],
                        '\n: ',
                    ),
                ]),
            });
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            ConditionalExpression(node) {
                const areTestAndConsequentOnSameLine = astUtils.isTokenOnSameLine(node.test, node.consequent);
                const areConsequentAndAlternateOnSameLine = astUtils.isTokenOnSameLine(node.consequent, node.alternate);

                if (!multiline) {
                    if (!areTestAndConsequentOnSameLine) {
                        reportSingleLineError(node.test, node, false);
                    }

                    if (!areConsequentAndAlternateOnSameLine) {
                        reportSingleLineError(node.consequent, node, false);
                    }
                } else {
                    if (allowSingleLine && node.loc.start.line === node.loc.end.line) {
                        return;
                    }

                    if (areTestAndConsequentOnSameLine) {
                        reportMultilineError(node.test, node, true);
                    }

                    if (areConsequentAndAlternateOnSameLine) {
                        reportMultilineError(node.consequent, node, true);
                    }
                }
            }
        };
    }
};
