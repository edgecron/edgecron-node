import { EdgeCron } from "edgecron-node";

const keyId = process.env.EDGECRON_KEY_ID!;
const secret = process.env.EDGECRON_SECRET!;
const client = new EdgeCron(keyId, secret, { baseURL: "http://localhost:8888" });

async function main() {
  const schedule = await client.schedules.create({
    name: "daily-report",
    cron_expr: "0 8 * * *",
    timezone: "Asia/Shanghai",
    payload: '{"task": "report"}',
  });
  console.log("Created schedule:", schedule.id, schedule.status);

  const got = await client.schedules.get(schedule.id);
  console.log("Got schedule:", got.name, got.cron_expr);

  const updated = await client.schedules.update(schedule.id, {
    name: "daily-report-v2",
    cron_expr: "0 9 * * *",
  });
  console.log("Updated schedule:", updated.name, updated.cron_expr);

  const list = await client.schedules.list(1, 10);
  console.log("Schedules total:", list.total);

  await client.schedules.pause(schedule.id);
  console.log("Paused schedule");

  await client.schedules.resume(schedule.id);
  console.log("Resumed schedule");

  await client.schedules.delete(schedule.id);
  console.log("Deleted schedule");
}
main().catch(console.error);
