"use strict";

function parensSurrounding(sourceCode,node) {
    var before = sourceCode.getTokenBefore(node);
    var after = sourceCode.getTokenAfter(node);

    return (
        before &&
        before.type == "Punctuator" &&
        before.value == "(" &&
        after &&
        after.type == "Punctuator" &&
        after.value == ")"
    );
}

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Require ( .. ) parentheses delimiting for ternary clauses based on the type of expression",
            category: "Best Practices",
            url: "https://github.com/getify/eslint-plugin-proper-ternary/#rule-parens",
        },
        schema: [
            {
                type: "object",
                properties: {
                    ternary: {
                        type: "boolean",
                    },
                    comparison: {
                        type: "boolean",
                    },
                    logical: {
                        type: "boolean",
                    },
                    call: {
                        type: "boolean",
                    },
                    func: {
                        type: "boolean",
                    },
                    object: {
                        type: "boolean",
                    },
                    simple: {
                        type: "boolean",
                    },
                    addParensOnSameLine: {
                        type: "boolean",
                    },
                },
            },
        ],
        messages: {
            needParens: "Ternary clause expression requires enclosing ( .. )",
        },
        fixable: "code",
    },
    create(context) {
        var defaultsOnly = context.options.length == 0;
        var extraOptions = (!defaultsOnly) ? context.options[0] : null;
        var ternaryMode = defaultsOnly || !("ternary" in extraOptions) || extraOptions.ternary === true;
        var comparisonMode = defaultsOnly || !("comparison" in extraOptions) || extraOptions.comparison === true;
        var logicalMode = defaultsOnly || !("logical" in extraOptions) || extraOptions.logical === true;
        var callMode = defaultsOnly || !("call" in extraOptions) || extraOptions.call === true;
        var funcMode = defaultsOnly || !("func" in extraOptions) || extraOptions.func === false;
        var objectMode = defaultsOnly || !("object" in extraOptions) || extraOptions.object === true;
        var simpleMode = (!defaultsOnly && extraOptions && extraOptions.simple === true);

        var sourceCode = context.getSourceCode();

        return {
            "ConditionalExpression": function enter(node) {
                for (let clause of [node.test,node.consequent,node.alternate,]) {
                    let exprType =
                        (clause.type == "ConditionalExpression") ? "ternary" :
                        (clause.type == "BinaryExpression" && ["==","===","!=","!==","<",">","<=",">=","in","instanceof",].includes(clause.operator)) ? "comparison" :
                        (clause.type == "LogicalExpression") ? "logical" :
                        (clause.type == "UnaryExpression" && clause.operator == "!") ? "logical" :
                        (["CallExpression","NewExpression",].includes(clause.type)) ? "call" :
                        (["FunctionExpression","ArrowFunctionExpression",].includes(clause.type)) ? "func" :
                        (["ArrayExpression","ObjectExpression",].includes(clause.type)) ? "object" :
                        (["Identifier","MemberExpression","Literal","TemplateLiteral",].includes(clause.type)) ? "simple" :
                        "complex";

                    if (
                        (
                            (ternaryMode && exprType == "ternary") ||
                            (comparisonMode && exprType == "comparison") ||
                            (logicalMode && exprType == "logical") ||
                            (callMode && exprType == "call") ||
                            (funcMode && exprType == "func") ||
                            (objectMode && exprType == "object") ||
                            (simpleMode && exprType == "simple") ||
                            exprType == "complex"
                        ) &&
                        !parensSurrounding(sourceCode,clause)
                    ) {
                        context.report({
                            node: clause,
                            messageId: "needParens",
                            fix: fixer => {
                                const fixes = [];

                                const isSingleLine = (
                                    clause.loc.start.line === clause.loc.end.line
                                );

                                const tokenBefore = sourceCode.getTokenBefore(clause);
                                const tokenAfter = sourceCode.getTokenAfter(clause);

                                if (isSingleLine || extraOptions.addParensOnSameLine) {
                                    fixes.push(fixer.insertTextBefore(clause, '('))
                                    fixes.push(fixer.insertTextAfter(clause, ')'))
                                }
                                else {
                                    if (clause.loc.start.line === tokenBefore.loc.start.line) {
                                        fixes.push(
                                            fixer.replaceTextRange(
                                                [
                                                    tokenBefore.range[1],
                                                    clause.range[0],
                                                ],
                                                ' (\n',
                                            )
                                        );
                                    }
                                    else {
                                        fixes.push(fixer.insertTextAfter(tokenBefore, ' (\n'));
                                    }

                                    if (clause.loc.end.line === tokenAfter.loc.end.line) {
                                        fixes.push(
                                            fixer.replaceTextRange(
                                                [
                                                    clause.range[1],
                                                    tokenAfter.range[0],
                                                ],
                                                '\n)\n',
                                            )
                                        );
                                    }
                                    else {
                                        fixes.push(fixer.insertTextBefore(tokenAfter, ')\n'));
                                    }
                                }

                                return fixes;
                            },
                        });
                    }
                }
            },
        };
    },
};
