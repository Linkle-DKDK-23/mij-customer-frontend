// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,         // ✅ 配列展開しない
  ...tseslint.configs.recommended, // ✅ こっちは展開してOK
  {
    ignores: ['dist', 'node_modules'],
  },
];
