// import globals from "globals";
// import pluginJs from "@eslint/js";
// import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


// export default [
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   pluginReactConfig,
// ];

import globals from "globals";

export default {
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      parser: "@babel/eslint-parser", // 使用 Babel 解析器
      parserOptions: {
        ecmaVersion: 2021, // 使用的 ECMAScript 版本
        sourceType: "module", // 使用的模块类型
        ecmaFeatures: {
          jsx: true // 启用 JSX
        }
      },
      env: {
        browser: true, // 指定代码运行环境为浏览器
        node: true, // 指定代码运行环境为 Node.js
        es2021: true // 指定使用 ES2021 语法特性
      },
      globals: globals.browser, // 使用全局变量
      extends: ["plugin:@babel/recommended"], // 继承的配置
      rules: {
        // 自定义规则
        "no-unused-vars": "warn", // 未使用的变量警告而不是错误
        "no-console": "off", // 允许使用 console
        // 可以继续添加其他规则
      }
    }
  ]
};
