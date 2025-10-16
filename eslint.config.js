const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const prettier = require("eslint-config-prettier");

module.exports = [
    {
        ignores: ["benchmark/*.js", "dist/**", "coverage/**", "node_modules/**"]
    },
    {
        files: ["**/*.ts", "**/*.js"],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                sourceType: "module",
                ecmaFeatures: {
                    modules: true
                },
                project: "./tsconfig.json"
            },
            globals: {
                console: "readonly",
                process: "readonly",
                Buffer: "readonly",
                __dirname: "readonly",
                __filename: "readonly",
                module: "readonly",
                require: "readonly",
                exports: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
                setImmediate: "readonly",
                clearImmediate: "readonly",
                global: "readonly",
                window: "readonly",
                document: "readonly",
                navigator: "readonly",
                fetch: "readonly"
            }
        },
        plugins: {
            "@typescript-eslint": tseslint
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    args: "none"
                }
            ],
            "prefer-const": "warn"
        }
    },
    prettier
];
