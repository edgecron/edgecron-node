import type {
  CreateRetryPolicyRequest,
  RetryJobList,
  RetryPolicy,
  RetryPolicyList,
  UpdateRetryPolicyRequest,
} from "./types.js";
import { Transport } from "./transport.js";

export class RetriesService {
  constructor(private readonly transport: Transport) {}

  createPolicy(request: CreateRetryPolicyRequest): Promise<RetryPolicy> {
    return this.transport.requestJSON("POST", "/v1/retries/policies", undefined, request);
  }

  getPolicy(id: number): Promise<RetryPolicy> {
    return this.transport.requestJSON("GET", `/v1/retries/policies/${id}`);
  }

  listPolicies(): Promise<RetryPolicyList> {
    return this.transport.requestJSON("GET", "/v1/retries/policies");
  }

  updatePolicy(id: number, request: UpdateRetryPolicyRequest): Promise<RetryPolicy> {
    return this.transport.requestJSON("PATCH", `/v1/retries/policies/${id}`, undefined, request);
  }

  deletePolicy(id: number): Promise<void> {
    return this.transport.requestJSON("DELETE", `/v1/retries/policies/${id}`);
  }

  listJobs(
    page = 1,
    pageSize = 20,
    status?: string,
    deliveryId?: number,
  ): Promise<RetryJobList> {
    const q: Record<string, string> = {
      page: String(page > 0 ? page : 1),
      page_size: String(pageSize <= 0 ? 20 : Math.min(pageSize, 100)),
    };
    if (status) q.status = status;
    if (deliveryId !== undefined) q.delivery_id = String(deliveryId);
    return this.transport.requestJSON("GET", "/v1/retries/jobs", q);
  }

  cancelJob(id: number): Promise<void> {
    return this.transport.requestJSON("POST", `/v1/retries/jobs/${id}/cancel`);
  }
}
