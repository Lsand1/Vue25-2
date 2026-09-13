# 华夏智游

华夏智游是一个 AI 与中华传统文化融合的数字体验平台。网站围绕中华文化、传统节日、非物质文化遗产和文化名胜展开，通过文化内容浏览、全站搜索、AI 问答和 AI 导游，让用户以更轻松的方式理解中华文化。

## 项目信息

- 网站主题：AI +中华传统文化数字体验
- 学生姓名：李新阳
- 学号：20250371060
- 开发框架：Vue 3 和 Vite

## 主要功能模块

1. 华夏首页：故宫沉浸式首屏、文化内容推荐和非遗展示。
2. 中华文化：从礼序、艺术和器物三个方向介绍中华文明。
3. 传统节日：介绍春节、端午节、中秋节及相关民俗。
4. 非遗文化：展示京剧、苏绣、剪纸等非遗项目。
5. 文化详情：提供故宫、京剧和中秋节的专题内容。
6. AI 文化助手：调用 DeepSeek 接口回答文化问题，并结合当前页面提供讲解。
7. 全站搜索：搜索故宫、京剧、剪纸、节日等文化内容并跳转。
8. 用户系统：提供本地登录、注册、会话恢复和账户中心。

## Vue 核心知识点

| 课程要求 | 项目实现 |
| --- | --- |
| 组合式 API | 所有页面采用 `script setup`、`ref`、`reactive`、`computed` 和生命周期函数 |
| 路由 | Vue Router 管理首页、专题页、详情页、AI 页面和账户页 |
| 导航守卫 | `router.beforeEach` 设置页面标题并保护账户中心 |
| 插槽 | `ContentSection.vue` 使用默认插槽和多个具名插槽构建可复用内容版块 |
| 组件库 | Element Plus 提供标签、按钮、骨架屏、消息提示和警告组件 |
| 状态管理 | Pinia 的 `useAuthStore` 管理用户资料与登录状态 |
| 网络请求 | Axios 服务实例请求文化推荐数据，并使用响应拦截器统一处理结果 |
| 模拟接口 | Mock.js 模拟 `/api/mock/culture-highlights` 文化推荐接口及网络延迟 |

## 运行方式

```bash
npm install
npm run dev
```

浏览器访问 `http://127.0.0.1:5173/`。

生产构建：

```bash
npm run build
npm run preview
```

## AI 环境配置

复制 `.env.example` 为 `.env.local`，填写服务端环境变量：

```env
DEEPSEEK_API_KEY=你的密钥
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
```

`.env.local` 已被 Git 忽略，API Key 不会提交到仓库。浏览器通过 `/api/ai/chat` 请求 Vite 服务端代理。

## 作业材料

- AI 协作日志：`AI协作日志_李新阳.docx`
- 页面截图：`docs/screenshots/`
- Git 提交记录：使用 `git log --oneline` 查看

## 团队成员

| 姓名 | 学号 | 分工 |
| --- | --- | --- |
| 李新阳 | 20250371060 | 需求设计、页面开发、AI 接入、功能测试与文档整理 |
