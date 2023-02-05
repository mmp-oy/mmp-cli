function initVueESlintrc(config) {
  const { eslintrc, vue } = config;
  if (vue) {
    eslintrc.parserOptions.project = ["./tsconfig.json"];
    let devDependencies = {};
    if (!eslintrc.overrides) {
      eslintrc.overrides = [];
    }
    eslintrc.overrides.push({
      files: "**/*.vue",
      extends: ["plugin:vue/vue3-recommended", "prettier"],
      rules: {
        "no-unused-vars": "off",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-explicit-any": 2,
        "vue/multi-word-component-names": 0,
      },
      parserOptions: {
        sourceType: "module",
        parser: "@typescript-eslint/parser",
      },
      globals: {
        EffectScope: true,
        computed: true,
        createApp: true,
        customRef: true,
        defineAsyncComponent: true,
        defineComponent: true,
        effectScope: true,
        getCurrentInstance: true,
        getCurrentScope: true,
        h: true,
        inject: true,
        isProxy: true,
        isReactive: true,
        isReadonly: true,
        isRef: true,
        markRaw: true,
        nextTick: true,
        onActivated: true,
        onBeforeMount: true,
        onBeforeRouteLeave: true,
        onBeforeRouteUpdate: true,
        onBeforeUnmount: true,
        onBeforeUpdate: true,
        onDeactivated: true,
        onErrorCaptured: true,
        onMounted: true,
        onRenderTracked: true,
        onRenderTriggered: true,
        onScopeDispose: true,
        onServerPrefetch: true,
        onUnmounted: true,
        onUpdated: true,
        provide: true,
        reactive: true,
        readonly: true,
        ref: true,
        resolveComponent: true,
        resolveDirective: true,
        shallowReactive: true,
        shallowReadonly: true,
        shallowRef: true,
        toRaw: true,
        toRef: true,
        toRefs: true,
        triggerRef: true,
        unref: true,
        useAttrs: true,
        useCssModule: true,
        useCssVars: true,
        useLink: true,
        useRoute: true,
        useRouter: true,
        useSlots: true,
        watch: true,
        watchEffect: true,
        watchPostEffect: true,
        watchSyncEffect: true,
      },
    });
    devDependencies = {
      "@typescript-eslint/eslint-plugin": "^5.49.0",
      "@typescript-eslint/parser": "^5.49.0",
    };
    initTsconfig(config);

    Object.assign(config.files.pkg.devDependencies, devDependencies);
  }
}

module.exports = { initVueESlintrc };
