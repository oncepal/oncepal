# OP UI 贡献指南

hi！很高兴你有兴趣为 OP UI 做贡献👏🏻👏🏻

OP UI 遵守 Android 和 IOS 设计规范，巧妙的进行令人惊叹的样式设计，合理的组件分类，提供丰富的常用功能，以及顶级的开发者体验。所以一些哲学和项目结构所也许和你熟悉的不一样，在提交您的贡献之前，请务必花点时间阅读以下指南:

- [开发设置](#开发设置)
- [项目结构](#项目结构)
- [测试](#测试)
- [脚本](#脚本)
- [问题报告指南](#问题报告指南)
- [拉取请求指南](#拉取请求指南)
- [财务捐款](#财务捐款)

## 开发设置

首先运行环境需要 [Node.js](https://nodejs.org) **version 16+**.
编辑器我们一般使用 vscode , 不过这个不做限制，确保环境一切就绪并克隆 repo 后，运行以下命令:

```bash
$ cd opui # 进入根目录
$ npm i # 安装根目录依赖
$ npm run dev # 成功运行项目并见监听端口：5137
```

如果成功，打开的是我们的文档网站，项目会自动监听组件或文档的更改。

## 项目结构

项目采用[monorepo](https://en.wikipedia.org/wiki/Monorepo) 的结构。包括一个组件库和文档项目分别包括在 packages 目录下，现在让我们为你一一解释应该关注的主要目录和作用，当然，没提及到的文件就是你目前还不需要修改的文件，如果有需要，欢迎联系我们，ok 先来看看组件库也就是`packages/opui-react`有些什么需要关注的：

- `test`: 主要用于存放用组件测试的文件夹，因为组件正在迭代，所目前留了几个案例文件，等第一批组件全部迭代新版本完成后再补测试代码，基于 `@testing-library/react`。

- `src/components`: 主要用于存放组件，目前均以一个组件一个 index.ts 的方式存放单个组件的所有相关代码，如果有必要，将会分离对应逻辑的代码，但目前还没必要。每个组件通用的一些类型在同级目录下的`prop.ts`文件里，如果你不知道标准化的组件结构是怎么样的，请查看 Button 和 Tabs 的代码结构，前者提供了基本的组件实现模板，后者提供了有复杂子组件时可以参考的父子组件通信和 api 设计。

- `src/styles`: 所有 css utils 和样式系统的实现，包括组件常用的 css, 全局的 css reset 和主题系统。

- `src/utils`: 常用 web 功能函数的实现。

## 开发指南

任何组件的开发都需要从真正的开发者角度去考虑，首先想好如果你是install了这个lib的开发者，xx组件你希望这个组件的使用代码怎么写起来最顺手，需要怎么样的层次结构，从这个角度出发，写下你希望你开发时候写下的代码，去倒推源码实现和props设计。

参考`Button`组件，去到`opui-react`目录下的`src/components`里面找到`Button`文件夹查看源码可以发现一个组件的代码有以下几个关键因素：

- 文件头声明：`/** @jsxImportSource @emotion/react */` 这一段是使用emotion必须要的一个声明。

- 类型定义：`ButtonProps`由`components/.props.ts`提供的类型组合在一起声明，这里面维护了大量通用声明代码，即大多数组件都需要的一些`props`定义。

- 使用注释：包含`@param`在内的jsdoc标准化注释，以帮助用户在使用的时候可以快速知道核心哲学，字段含义和直接复制粘贴用例！

- 函数式组件主体：`Omit<ComponentPropsWithoutRef<'button'>, 'color'>`这样的类型声明用于消除默认标签类型定义中的冲突属性，这里意思是color用我们`ButtonProps`里面定义的类型而不采用html标准定义，包含样式生成，主题获取和事件监听等内容，并在最后返回一个带有css attribute的html标签作为最终渲染组件挂载点，这个`css`属性由`useCSS`生成。

- CSS样式：`src/styles`下的函数帮助组件主题获得动态样式监听，例如 `useCSS`、`useTheme`，以及最终用于提供外部最终复写能力的`...useThemedCSS(theme, css)`，这将允许使用者传入一个`css`属性覆盖我们所有计算好的属性最终控制组件样式

所以在做新组件时，复制整个Button文件夹保持大框架不动的情况下缝缝补补！并别忘了在根目录下的index.ts里引入并导出不然没办法使用测试。

在对组件的设计有建议和或者是组件的问题做反馈时，请花一点时间先参考 👇🏻 的两个文档中对应的组件定义，了解组件的背景，应用场景和大致功能:

**移动端设计参考:**

- [Material Design](https://m3.material.io/)
- [Ios Design](https://developer.apple.com/design/human-interface-guidelines/components/all-components)

一旦你确定了解了你所要针对的这个组件“该有”的“较为正确”的样子了，具体的 api 设计，代码编写和样式实现，则推荐去借鉴 👇🏻 的优质的“前辈”们:

**组件结构参考:**

- [Radix](https://www.radix-ui.com/)
- [React Aria](https://react-spectrum.adobe.com/react-aria/index.html)

**组件库实现参考:**

- [Vuetify](https://next.vuetifyjs.com/)
- [Vant](https://react-vant-gitee.3lang.dev/)
- [Ionic](https://ionicframework.com/docs/components)
- [Antd Mobile](https://mobile.ant.design/zh)
- [Vuesax](https://vuesax.com/)
- [Mui](https://mui.com/)
- [Next UI](https://nextui.org/docs/components/link#)

最后，也许你可能对我们所使用的技术栈不太了解，这里是对应的各个文档:

- [TypeScript](https://www.typescriptlang.org/)
- [React TypeScript](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/) React 类型指南
- [Emotion](https://emotion.sh/docs/introduction) css 库
- [Rollup](https://rollupjs.org) 打包工具
- [Jest](https://jestjs.io/) 组件测试

修改一个组件的同时还得更新使用文档，这部分尝试过dumi、docusaurus、storybook、vitepress之后还是觉得自己起一个网站来写比较好。尝试在`opui-doc`里面引入你新增的组件做实际使用测试吧

## 测试

单元测试与每个包中被测试的代码并置在名为 tests 的文件夹里. 查阅 Jest 和 @testing-library/react 文档和现有测试用例了解如何编写新的测试规范，但有几个点需要注意：

- 使用测试用例所需的最少 API。例如，如果可以在不涉及反应系统或组件的情况下编写测试，则应该这样编写。这限制了测试暴露于不相关部分的变化，并使其更加稳定。
- 如果测试断言特定于平台的行为，则仅使用特定于平台的运行时。
- 欢迎提高测试覆盖率的 PR，但通常应将测试覆盖率用作查找未被测试覆盖的 API 用例的指南。我们不建议添加仅提高覆盖率但未实际测试有意义用例的测试。

## 脚本

### `npm run dev`

`dev`脚本执行根目录的`build:dev`创建运行时监听项目。

```bash
npm run dev
```

### `npm run build`

`build`脚本构建所有的公共软件包（在其`package.json`中没有`private: true`的软件包）。

```bash
# 打基本测试包
npm run build:dev

# 打生产包，包括一系列 Rollup 中间件的处理
npm run build:prod
```

### `npm run test`

`test`脚本只是调用`jest`二进制文件，所以可以使用所有的[Jest CLI 选项](https://jestjs.io/docs/en/cli)。一些例子。

```bash
# run all tests
$ npm run test
```

默认的`test`脚本包括`--runInBand`的 jest 标志，以提高测试的稳定性，特别是对 CSS 过渡相关的测试。当你测试特定的测试规格时，你也可以直接运行`npx jest`与标志，以加快测试速度（jest 默认是并行运行）。

### `npm run size`

`size`脚本调用`size-limit`库去获取包大小和占比分析

```bash
# 获取包总体大小
$ npm run size

# 获取各个具体文件大小分析
$ npm run analyze
```

### `npm run lint`

`lint`脚本调用`es-lint`库去做代码规范检查，并自动修复它，无法处理的内容会报错中断生产包的构建，需要人工修复。

```bash
# run all tests
$ npm run lint
```

## 问题报告指南

- 首先，如果你想让尽可能多的人能够看懂你的 issue，就请尽量用英文，当然其他语言现在是没问题的。目前 issue 列表只接受 bug 报告或是新功能请求。这意味着我们不接受用法问题。如果你开的 issue 不符合规定，它将会被立刻关闭。

- 如果是新功能请求：

  - 请尽可能详尽地说明这个需求的用例和场景。最重要的是：解释清楚是怎样的用户体验需求催生了这个功能上的需求。
  - 一个重要设计原则是保持 API 的简洁和直接。通常来说，我们只考虑添加在现有的 API 下无法轻松实现的功能。
  - 新功能的用例也应当足够常见。
  - 当然，最好描述一下你期望这个新功能的 API 是如何使用的，并提供一些代码示例。

- 如果是 bug:

  - 请描述清晰遇到这个 bug 的业务场景、上下文，以及我们需要执行哪些操作才能让 bug 出现.
  - 最好能附带上你认为这个业务场景下的操作预期正确的结果是什么，因为简洁清晰的重现步骤能够帮助我们更迅速地定位问题所在.

- 对于使用中遇到的问题，请先使用搜索引擎找找看~ 在开 issue 前，可以先搜索一下以往的旧 issue 因为你遇到的问题可能已经有人提了，也可能已经在最新版本中被修正。注意：如果你发现一个已经关闭的旧 issue 在最新版本中仍然存在，请不要在旧 issue 下面留言，而应该用下面的表单开一个新的 issue。

## 拉取请求指南

- 从基础分支（例如 "main"）签出一个主题分支，并将其合并到该分支。

- [请确保勾选 "允许来自维护者的编辑 "这一选项](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork).这使我们能够直接进行小的编辑/重构，并节省了大量的时间。

- 如果增加一个新的功能:

  - 增加配套的测试案例.
  - 提供一个令人信服的理由来增加这个功能。理想情况下，你应该先打开一个建议问题，并在工作前得到批准

- 如果修复一个 bug:

  - 如果你正在解决一个特殊的问题, 添加 `(fix #xxxx[,#xxxx])` (#xxxx 是问题的 id) 在你的 PR 标题中，为了更好地发布日志, 例如 `update entities encoding/decoding (fix #3899)`.
  - 在 PR 中提供关于该错误的详细描述。最好有现场演示。
  - 如果适用的话，添加适当的测试覆盖率。你可以通过运行`npm test`来检查你增加的代码的覆盖率。

- 当你在 PR 上工作时，有多个小的提交是可以的--GitHub 可以在合并前自动压制它们。

- 确保测试通过!

- 提交信息必须遵循[commit message convention](./commit-convention.md)，这样才能自动生成更新日志。提交信息会在提交前自动验证（通过[simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)调用[Git Hooks](https://git-scm.com/docs/githooks)）。

- 只要你安装了 dev 依赖，就不需要担心代码风格--修改的文件在提交时自动用 Prettier 格式化（通过调用[simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)的方式）。

### 高级拉动请求技巧

- PR 应该只修复预定的错误，而不是引入不相关的变化。这包括不必要的重构--PR 应该专注于修复，而不是代码风格，这使得在未来更容易追踪变化。

- 考虑变化对性能/大小的影响，以及被修复的 bug 是否能证明其代价。如果被修复的 bug 是一个非常小众的边缘案例，我们应该尽量减少尺寸/性能成本，以使其物有所值。

  - 代码是否对性能敏感（如组件更新或动画功能？）

  - 如果该分支是仅用于开发的，性能就不那么令人担忧了。

## 最后

感谢所有已经为 OP UI 做出贡献的人！虽然目前暂时只有曾经的一些同事！非常期待收到你的 PR！
