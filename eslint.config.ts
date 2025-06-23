/**
 * Minecraft Monitor
 * Copyright (C) 2025-Present  Kevin Traini
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pluginCypress from 'eslint-plugin-cypress/flat';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

export default defineConfig([
    globalIgnores(['**/dist/*', 'site/**']),
    {
        extends: [
            eslint.configs.recommended,
            tseslint.configs.strict,
            tseslint.configs.stylistic,
            pluginVue.configs['flat/recommended'],
            pluginVitest.configs.recommended,
            pluginCypress.configs.recommended,
        ],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                extraFileExtensions: ['.vue'],
            },
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'array-callback-return': 'error',
            'no-await-in-loop': 'warn',
            'no-constructor-return': 'error',
            'no-self-compare': 'warn',
            'no-template-curly-in-string': 'error',
            'no-unassigned-vars': 'error',
            'no-unmodified-loop-condition': 'error',
            'no-unreachable-loop': 'error',
            'no-useless-assignment': 'error',
            'consistent-return': 'error',
            'consistent-this': 'error',
            curly: 'error',
            'dot-notation': 'warn',
            eqeqeq: 'error',
            'no-console': 'error',
            'no-else-return': 'warn',
            'no-multi-assign': 'error',
            'no-nested-ternary': 'error',
            'no-new-func': 'error',
            'no-new-wrappers': 'error',
            'no-proto': 'error',
            'no-throw-literal': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            radix: 'warn',
            'require-await': 'error',
            'require-yield': 'warn',
            '@typescript-eslint/consistent-type-imports': 'error',
            'vue/component-api-style': ['error', ['script-setup']],
            'vue/html-indent': ['error', 4],
            'vue/max-attributes-per-line': 'off',
            'vue/singleline-html-element-content-newline': 'off',
        },
    },
]);
