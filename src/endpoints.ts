import type { CreateEndpointRequest, EndpointList, UpdateEndpointRequest, WebhookEndpoint } from "./types.js";
import { Transport } from "./transport.js";

export class EndpointsService {
  constructor(private readonly transport: Transport) {}

  create(request: CreateEndpointRequest): Promise<WebhookEndpoint> {
    return this.transport.requestJSON("POST", "/v1/endpoints", undefined, request);
  }

  get(id: number): Promise<WebhookEndpoint> {
    return this.transport.requestJSON("GET", `/v1/endpoints/${id}`);
  }

  update(id: number, request: UpdateEndpointRequest): Promise<WebhookEndpoint> {
    return this.transport.requestJSON("PATCH", `/v1/endpoints/${id}`, undefined, request);
  }

  list(page = 1, pageSize = 20, status?: string): Promise<EndpointList> {
    const q: Record<string, string> = {
      page: String(page > 0 ? page : 1),
      page_size: String(pageSize <= 0 ? 20 : Math.min(pageSize, 100)),
    };
    if (status) q.status = status;
    return this.transport.requestJSON("GET", "/v1/endpoints", q);
  }

  delete(id: number): Promise<void> {
    return this.transport.requestJSON("DELETE", `/v1/endpoints/${id}`);
  }

  enable(id: number): Promise<void> {
    return this.transport.requestJSON("POST", `/v1/endpoints/${id}/enable`);
  }

  disable(id: number): Promise<void> {
    return this.transport.requestJSON("POST", `/v1/endpoints/${id}/disable`);
  }
}
