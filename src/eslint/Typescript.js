function initTsconfig(config) {
  config.files.tsConfig = {
    compilerOptions: {
      target: "esnext",
      module: "esnext",
      moduleResolution: "node",
      strict: true,
      forceConsistentCasingInFileNames: true,
      allowSyntheticDefaultImports: true,
      strictFunctionTypes: false,
      jsx: "preserve",
      baseUrl: ".",
      allowJs: true,
      sourceMap: true,
      esModuleInterop: true,
      resolveJsonModule: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      experimentalDecorators: true,
      lib: ["dom", "esnext"],
      typeRoots: ["./node_modules/@types/"],
      noImplicitAny: false,
      skipLibCheck: true,
      paths: {
        "@/*": ["src/*"],
      },
    },
    include: ["src/**/*.ts", "src/**/*.tsx"],
    exclude: ["node_modules", "dist"],
  };
}

function initTypescriptESlint(config) {
  const { eslint, files } = config;
  const { eslintrc } = files;
  if (eslint.Typescript) {
    eslintrc.parserOptions.project = ["./tsconfig.json"];
    let devDependencies = {};
    if (!eslintrc.overrides) {
      eslintrc.overrides = [];
    }
    eslintrc.overrides.push({
      files: ["src/**/*.ts", "src/**/*.tsx"],
      extends: ["plugin:jsdoc/recommended", "plugin:@typescript-eslint/recommended", "prettier"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {
        "no-shadow": 0,
        "@typescript-eslint/no-shadow": 2,
        "@typescript-eslint/no-explicit-any": 2,
        "@typescript-eslint/adjacent-overload-signatures": 2,
        "@typescript-eslint/explicit-function-return-type": 1,
        "@typescript-eslint/no-unsafe-return": 1,
        "@typescript-eslint/ban-ts-comment": [
          "warn",
          {
            "ts-check": "allow-with-description",
          },
        ],
      },
    });
    devDependencies = {
      "@typescript-eslint/eslint-plugin": "^5.49.0",
      "@typescript-eslint/parser": "^5.49.0",
    };

    Object.assign(config.files.pkg.devDependencies, devDependencies);
    initTsconfig(config);
  }
}

module.exports = { initTypescriptESlint };
