# EdgeCron Node.js SDK

Official TypeScript SDK for the EdgeCron webhook scheduling and callback delivery platform.

Schedule delayed HTTP requests, deliver webhooks reliably, and automatically retry failed calls — with full execution history so nothing gets lost.

中文文档：[README.zh-CN.md](README.zh-CN.md)

## Install

```bash
npm install edgecron-node
```

## Quick Start

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

## Modules

| Client method                | Description                        |
|------------------------------|------------------------------------|
| `client.schedules.*`         | Cron schedule CRUD, pause, resume  |
| `client.tasks.*`             | Task execution instances, cancel   |
| `client.events.*`            | Event publishing and management    |
| `client.endpoints.*`         | Webhook endpoint configuration     |
| `client.deliveries.*`        | Delivery attempt records and retry |
| `client.retries.*`           | Retry policies and jobs            |
| `client.subscription.*`      | Quota, usage, and resource limits  |

## Configuration

- `baseURL` — override API base URL
- `timeoutMs` — HTTP client timeout in milliseconds
- `fetchImpl` — custom `fetch` implementation

## Error Handling

Service-side business errors throw `APIError`.

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

## Security Notice

This is a server-side SDK. Do not expose `secret` in browsers or mobile apps.
