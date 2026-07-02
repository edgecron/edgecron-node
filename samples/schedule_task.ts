import { EdgeCron } from "edgecron-node";

const keyId = process.env.EDGECRON_KEY_ID!;
const secret = process.env.EDGECRON_SECRET!;
const client = new EdgeCron(keyId, secret, { baseURL: "http://localhost:8888" });

async function main() {
  const endpoint = await client.endpoints.create({
    name: "my-webhook",
    url: "https://httpbin.org/post",
  });
  console.log("Endpoint:", endpoint.id);

  const task = await client.tasks.create({
    endpoint_id: endpoint.id,
    payload: '{"order_id": "ord_9102"}',
  });
  console.log("Task:", task.id);
}
main().catch(console.error);
