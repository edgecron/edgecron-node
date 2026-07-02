import type { CreateScheduleRequest, Schedule, ScheduleList, UpdateScheduleRequest } from "./types.js";
import { Transport } from "./transport.js";

export class SchedulesService {
  constructor(private readonly transport: Transport) {}

  create(request: CreateScheduleRequest): Promise<Schedule> {
    return this.transport.requestJSON("POST", "/v1/schedules", undefined, request);
  }

  get(id: number): Promise<Schedule> {
    return this.transport.requestJSON("GET", `/v1/schedules/${id}`);
  }

  update(id: number, request: UpdateScheduleRequest): Promise<Schedule> {
    return this.transport.requestJSON("PATCH", `/v1/schedules/${id}`, undefined, request);
  }

  list(page = 1, pageSize = 20, status?: string): Promise<ScheduleList> {
    const q: Record<string, string> = {
      page: String(page > 0 ? page : 1),
      page_size: String(pageSize <= 0 ? 20 : Math.min(pageSize, 100)),
    };
    if (status) q.status = status;
    return this.transport.requestJSON("GET", "/v1/schedules", q);
  }

  delete(id: number): Promise<void> {
    return this.transport.requestJSON("DELETE", `/v1/schedules/${id}`);
  }

  pause(id: number): Promise<void> {
    return this.transport.requestJSON("POST", `/v1/schedules/${id}/pause`);
  }

  resume(id: number): Promise<void> {
    return this.transport.requestJSON("POST", `/v1/schedules/${id}/resume`);
  }
}
