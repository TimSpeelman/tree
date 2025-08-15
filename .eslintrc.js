module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        // "plugin:unused-imports/no-unused-imports-ts"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier",
        "unused-imports"
    ],
    "rules": {
        "indent": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "unused-imports/no-unused-imports": "warn",
        "sort-imports": [
            "warn",
            {
                "ignoreDeclarationSort": true
            }
        ],
        "unused-imports/no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "varsIgnorePattern": "^_",
                "args": "after-used",
                "argsIgnorePattern": "^_"
            }
        ],
        "react/prop-types": "off",
        "object-curly-newline": "off",
        "prettier/prettier": [
            "warn",
            {
                endOfLine: 'auto',
            },
        ],
        "comma-dangle": "off", // handled by prettier
    },
    "settings": {
        "react": { "version": "detect" }
    }
}