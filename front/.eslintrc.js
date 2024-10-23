module.exports = {
    "root": true,
    "ignorePatterns": [
        "projects/**/*"
    ],
    "extends": [
		"eslint:recommended"
	],
    "parser": "@typescript-eslint/parser",
    "overrides": [
        {
            "files": [
                "*.ts"
            ],
            "parserOptions": {
                "project": [
                    "tsconfig.json"
                ],
                "createDefaultProgram": true
            },
            "extends": [
                "plugin:@angular-eslint/recommended",
                "plugin:@angular-eslint/template/process-inline-templates"
            ],
            "rules": {
                "@angular-eslint/component-class-suffix": [
                    "error",
                    {
                        "suffixes": [
                            "Component"
                        ]
                    }
                ],
                "@angular-eslint/component-selector": [
                    "error",
                    {
                        "type": "element",
                        "prefix": "app",
                        "style": "kebab-case"
                    }
                ],
                "@angular-eslint/directive-selector": [
                    "error",
                    {
                        "type": "attribute",
                        "prefix": "app",
                        "style": "camelCase"
                    }
                ],
                "@angular-eslint/no-empty-lifecycle-method": "off",
                "@typescript-eslint/explicit-function-return-type": ["error", { "allowExpressions": true }],
                "@typescript-eslint/explicit-member-accessibility": "error",
                "@typescript-eslint/no-explicit-any": "warn",
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/no-unused-vars": "off",
                "@typescript-eslint/no-namespace": "off",
                "@typescript-eslint/prefer-readonly": "warn",

                "@stylistic/object-curly-spacing": ["warn", "always"],
                "@stylistic/no-whitespace-before-property": "error",
                "@stylistic/space-before-blocks": ["warn", "always"],
                "@stylistic/comma-spacing": [
                    "warn",
                    {
                        "before": false,
                        "after": true
                    }
                ],
                "@stylistic/block-spacing": ["warn", "always"],
                "@stylistic/brace-style": [
                    "error",
                    "stroustrup",
                    {
                        "allowSingleLine": true
                    }
                ],
                "@stylistic/function-call-spacing": ["error", "never"],
                "@stylistic/arrow-spacing": "error",
                "@stylistic/computed-property-spacing": "warn",
                "@stylistic/generator-star-spacing": "error",
                "@stylistic/indent": ["error", 4, { "SwitchCase": 1 }],
                "@stylistic/semi": [2, "always"],
                "@stylistic/no-extra-semi": "warn",
                "@stylistic/semi-spacing": "warn",
                "@stylistic/quotes": "off",
                "@stylistic/keyword-spacing": [
                    "warn",
                    {
                        "overrides": {
                            "if": { "after": false },
                            "for": { "after": false },
                            "catch": { "after": false },
                            "while": { "after": false },
                            "as": { "after": false },
                            "switch": { "after": false }
                        }
                    }
                ],

                "eqeqeq": "error",
                "no-duplicate-imports": "error",
                "no-empty": "off",
                "no-empty-function": "off",
                "no-extra-boolean-cast": "off",
                "no-inner-declarations": "off",
                "no-unsafe-finally": "off",
                "no-unsafe-optional-chaining": "error",
                "no-unused-vars": "off",
                "no-var": "error"
            }
        },
        {
            "files": [
                "*.html"
            ],
            "extends": [
                "plugin:@angular-eslint/template/recommended"
            ],
            "rules": {}
        }
    ]
}
