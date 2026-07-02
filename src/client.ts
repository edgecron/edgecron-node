import { DeliveriesService } from "./deliveries.js";
import { EndpointsService } from "./endpoints.js";
import { EventsService } from "./events.js";
import { RetriesService } from "./retries.js";
import { SchedulesService } from "./schedules.js";
import { SubscriptionService } from "./subscription.js";
import { TasksService } from "./tasks.js";
import { DEFAULT_BASE_URL, Transport, VERSION } from "./transport.js";
import type { EdgeCronOptions } from "./types.js";

const KEY_ID_RE = /^ak_[0-9a-zA-Z_]+$/;

export class EdgeCron {
  static readonly version = VERSION;

  readonly schedules: SchedulesService;
  readonly tasks: TasksService;
  readonly events: EventsService;
  readonly endpoints: EndpointsService;
  readonly deliveries: DeliveriesService;
  readonly retries: RetriesService;
  readonly subscription: SubscriptionService;

  constructor(keyId: string, secret: string, options: EdgeCronOptions = {}) {
    if (!KEY_ID_RE.test(keyId)) {
      throw new TypeError(`edgecron: keyId must match ak_<hex>, got: ${keyId}`);
    }
    if (!secret) {
      throw new TypeError("edgecron: secret must not be empty");
    }
    const transport = new Transport(keyId, secret, {
      baseURL: options.baseURL ?? DEFAULT_BASE_URL,
      timeoutMs: options.timeoutMs,
      fetchImpl: options.fetchImpl,
    });
    this.schedules = new SchedulesService(transport);
    this.tasks = new TasksService(transport);
    this.events = new EventsService(transport);
    this.endpoints = new EndpointsService(transport);
    this.deliveries = new DeliveriesService(transport);
    this.retries = new RetriesService(transport);
    this.subscription = new SubscriptionService(transport);
  }
}
