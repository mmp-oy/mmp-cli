## todo

- create-mmp project-name template 命令参数解析
  - project-name 没名称则要求输入，默认 mmp-project
  - 模板
    - 指定模板参数如：vue3、react，则直接使用模板，结束
    - 没指定模板，则进入选择
      - template 模板选择
        - vue3、react
          - default 默认
          - 自定义
            - baseflow
            - vueflow or reactflow
      - no 无框架模板，自行选择
        - baseflow
      - 无框架模板，且一切用最新的，直接安装（不保证能用）
        - baseflow
- 最终选择是否直接安装
  - yes
  - no

_注_

- baseflow

  - eslint
  - typescript
  - stylelint
    - less
    - scss
    - less & scss
    - no
  - prettier
  - vscode
  - git

- vueflow

  - vuex or pinia
  - jsx
  - router
  - i18n

- reactflow
  - reactdux
  - router
  - i18n
