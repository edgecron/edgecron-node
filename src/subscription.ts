import type { ResourceLimits, SubscriptionQuota, UsageRecords } from "./types.js";
import { Transport } from "./transport.js";

export class SubscriptionService {
  constructor(private readonly transport: Transport) {}

  quota(): Promise<SubscriptionQuota> {
    return this.transport.requestJSON("GET", "/v1/subscription/quota");
  }

  usage(period?: string): Promise<UsageRecords> {
    const q: Record<string, string> = {};
    if (period) q.period = period;
    return this.transport.requestJSON("GET", "/v1/subscription/usage", q);
  }

  resourceLimits(): Promise<ResourceLimits> {
    return this.transport.requestJSON("GET", "/v1/subscription/resource-limits");
  }
}
