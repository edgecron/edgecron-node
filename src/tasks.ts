import type { CreateTaskRequest, Task, TaskList } from "./types.js";
import { Transport } from "./transport.js";

export class TasksService {
  constructor(private readonly transport: Transport) {}

  create(request: CreateTaskRequest): Promise<Task> {
    return this.transport.requestJSON("POST", "/v1/tasks", undefined, request);
  }

  get(id: number): Promise<Task> {
    return this.transport.requestJSON("GET", `/v1/tasks/${id}`);
  }

  list(
    page = 1,
    pageSize = 20,
    status?: string,
    scheduleId?: number,
    eventId?: number,
  ): Promise<TaskList> {
    const q: Record<string, string> = {
      page: String(page > 0 ? page : 1),
      page_size: String(pageSize <= 0 ? 20 : Math.min(pageSize, 100)),
    };
    if (status) q.status = status;
    if (scheduleId !== undefined) q.schedule_id = String(scheduleId);
    if (eventId !== undefined) q.event_id = String(eventId);
    return this.transport.requestJSON("GET", "/v1/tasks", q);
  }

  cancel(id: number): Promise<void> {
    return this.transport.requestJSON("POST", `/v1/tasks/${id}/cancel`);
  }
}
