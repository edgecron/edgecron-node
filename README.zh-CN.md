# EdgeCron Node.js SDK

EdgeCron Node.js SDK 是 EdgeCron Webhook 调度与回调投递平台的官方 TypeScript / Node.js 客户端。

调度延迟 HTTP 请求，可靠投递 Webhook，自动重试失败调用 — 完整执行历史，确保不遗漏。

English README: [README.md](README.md)

## 安装

```bash
npm install edgecron-node
```

也可使用：

```bash
yarn add edgecron-node
pnpm add edgecron-node
```

要求：

- Node.js `>= 20`

## 快速开始

```ts
import { EdgeCron, APIError } from "edgecron-node";

const client = new EdgeCron("ak_xxx", "sk_xxx");

try {
  const schedule = await client.schedules.create({
    name: "my-schedule",
    cron_expr: "*/5 * * * *",
  });
  console.log(schedule.id);
} catch (error) {
  if (error instanceof APIError) {
    console.log(error.code, error.message, error.requestId);
  }
}
```

## 模块说明

| 客户端方法                  | 说明                         |
|----------------------------|-----------------------------|
| `client.schedules.*`       | Cron 调度器 CRUD、暂停、恢复   |
| `client.tasks.*`           | 任务执行实例、取消             |
| `client.events.*`          | 事件发布与管理                |
| `client.endpoints.*`       | Webhook 端点配置              |
| `client.deliveries.*`      | 投递记录与手动重试             |
| `client.retries.*`         | 重试策略与任务                |
| `client.subscription.*`    | 配额、用量与资源限制           |

## 配置项

- `baseURL`：覆盖 API 地址
- `timeoutMs`：超时时间，单位毫秒
- `fetchImpl`：自定义 `fetch` 实现

## 错误处理

服务端业务错误会抛出 `APIError`。

```ts
import { APIError } from "edgecron-node";

try {
  await client.schedules.get(123);
} catch (error) {
  if (error instanceof APIError) {
    console.log(error.code, error.message, error.requestId);
  }
}
```

## 安全说明

这是服务端 SDK，不要在浏览器、移动端或不可信客户端暴露 `secret`。
