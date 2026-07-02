import type { Event, EventList, PublishEventRequest, PublishEventResult } from "./types.js";
import { Transport } from "./transport.js";

export class EventsService {
  constructor(private readonly transport: Transport) {}

  publish(request: PublishEventRequest): Promise<PublishEventResult> {
    return this.transport.requestJSON("POST", "/v1/events", undefined, request);
  }

  get(id: number): Promise<Event> {
    return this.transport.requestJSON("GET", `/v1/events/${id}`);
  }

  list(page = 1, pageSize = 20, eventName?: string, status?: string): Promise<EventList> {
    const q: Record<string, string> = {
      page: String(page > 0 ? page : 1),
      page_size: String(pageSize <= 0 ? 20 : Math.min(pageSize, 100)),
    };
    if (eventName) q.event_name = eventName;
    if (status) q.status = status;
    return this.transport.requestJSON("GET", "/v1/events", q);
  }

  enable(id: number): Promise<void> {
    return this.transport.requestJSON("POST", `/v1/events/${id}/enable`);
  }

  disable(id: number): Promise<void> {
    return this.transport.requestJSON("POST", `/v1/events/${id}/disable`);
  }

  delete(id: number): Promise<void> {
    return this.transport.requestJSON("DELETE", `/v1/events/${id}`);
  }
}
