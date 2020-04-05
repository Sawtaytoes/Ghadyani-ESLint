"use strict";

module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Control the kind and depth of nesting allowed with ternary/conditional expressions",
            category: "Best Practices",
            url: "https://github.com/getify/eslint-plugin-proper-ternary/#rule-nested",
        },
        schema: [
            {
                type: "object",
                properties: {
                    test: {
                        type: "boolean",
                    },
                    then: {
                        type: "boolean",
                    },
                    else: {
                        type: "boolean",
                    },
                    depth: {
                        type: "integer",
                        min: 1,
                    },
                },
            },
        ],
        messages: {
            tooDeep: "Ternary expression nested too deeply",
            notHere: "Ternary expression cannot be nested in another ternary expression '{{whichClause}}' clause ({{pattern}})",
        },
    },

    create(context) {
        var defaultsOnly = context.options.length == 0;
        var extraOptions = (!defaultsOnly) ? context.options[0] : null;
        var clauseTest = (!defaultsOnly && extraOptions && extraOptions.test === true);
        var clauseThen = (!defaultsOnly && extraOptions && extraOptions.then === true);
        var clauseElse = (!defaultsOnly && extraOptions && extraOptions.else === true);
        var depthLimit = (defaultsOnly || !("depth" in extraOptions)) ? 1 : extraOptions.depth;

        var ternaryStack = new Map();

        return {
            "ConditionalExpression": function enter(node) {
                var ancestors = context.getAncestors();
                var parentTernary = getOutermostTernary(ancestors);
                if (parentTernary) {
                    if (!ternaryStack.has(parentTernary)) {
                        ternaryStack.set(parentTernary,[]);
                    }
                    let stack = ternaryStack.get(parentTernary);
                    stack.push(node);

                    // handle nested "depth" mode
                    if (
                        !stack.depthReported &&
                        stack.length > depthLimit
                    ) {
                        stack.depthReported = true;
                        context.report({
                            node: stack[depthLimit],
                            messageId: "tooDeep",
                        });
                    }

                    // handle "test" / "then" / "else" clause mode
                    let whichClause = identifyParentClause(node,ancestors);
                    if (
                        (whichClause == "test" && !clauseTest) ||
                        (whichClause == "then" && !clauseThen) ||
                        (whichClause == "else" && !clauseElse)
                    ) {
                        let pattern =
                            (whichClause == "test") ? "▁ ? ░░ : ░░" :
                            (whichClause == "then") ? "░░ ? ▁ : ░░" :
                            "░░ ? ░░ : ▁";

                        context.report({
                            node: node,
                            messageId: "notHere",
                            data: {
                                whichClause,
                                pattern,
                            },
                        });
                    }
                }
            },
        };
    },
};
