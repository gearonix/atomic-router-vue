const { configure, presets } = require('eslint-kit')

module.exports = configure({
    presets: [
        presets.imports(),
        presets.typescript(),
        presets.prettier({
                arrowParens: "always",
                endOfLine: "lf",
                printWidth: 100,
                tabWidth: 2,
                useTabs: false
            }
        ),
        presets.node(),
        presets.vue()
    ],
    extend: {
        ignorePatterns: ['dist', 'playground']
    }
})