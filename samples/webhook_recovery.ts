import { EdgeCron } from "edgecron-node";

const keyId = process.env.EDGECRON_KEY_ID!;
const secret = process.env.EDGECRON_SECRET!;
const client = new EdgeCron(keyId, secret, { baseURL: "http://localhost:8888" });

async function main() {
  const policy = await client.retries.createPolicy({
    name: "exponential-backoff",
    max_attempts: 5,
    backoff_type: "exponential",
    initial_delay_sec: 10,
    max_delay_sec: 600,
  });
  console.log("Retry policy:", policy.id);

  const policies = await client.retries.listPolicies();
  console.log("Policies:", policies.total);

  const endpoint = await client.endpoints.create({
    name: "critical-webhook",
    url: "https://httpbin.org/post",
    retry_policy_id: policy.id,
    timeout_ms: 5000,
  });
  console.log("Endpoint with retry:", endpoint.id);

  const deliveries = await client.deliveries.list(1, 10, "failed", undefined, endpoint.id);
  console.log("Failed deliveries:", deliveries.total);

  if (deliveries.list.length > 0) {
    const retried = await client.deliveries.retry(deliveries.list[0].id);
    console.log("Retry job:", retried.retry_job_id);

    const jobs = await client.retries.listJobs(1, 10, "pending", retried.retry_job_id);
    console.log("Retry jobs:", jobs.total);
  }

  await client.retries.deletePolicy(policy.id);
  await client.endpoints.delete(endpoint.id);
  console.log("Cleaned up");
}
main().catch(console.error);
