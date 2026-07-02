import type { DeliveryList, RetryDeliveryResult } from "./types.js";
import { Transport } from "./transport.js";

export class DeliveriesService {
  constructor(private readonly transport: Transport) {}

  list(
    page = 1,
    pageSize = 20,
    status?: string,
    taskId?: number,
    endpointId?: number,
  ): Promise<DeliveryList> {
    const q: Record<string, string> = {
      page: String(page > 0 ? page : 1),
      page_size: String(pageSize <= 0 ? 20 : Math.min(pageSize, 100)),
    };
    if (status) q.status = status;
    if (taskId !== undefined) q.task_id = String(taskId);
    if (endpointId !== undefined) q.endpoint_id = String(endpointId);
    return this.transport.requestJSON("GET", "/v1/deliveries", q);
  }

  retry(id: number): Promise<RetryDeliveryResult> {
    return this.transport.requestJSON("POST", `/v1/deliveries/${id}/retry`);
  }
}
