export interface APIEnvelope<T> {
  code: number;
  message: string;
  request_id: string;
  data: T;
}

export interface EdgeCronOptions {
  baseURL?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export interface Schedule {
  id: number;
  app_id: string;
  name: string;
  cron_expr: string;
  timezone: string;
  payload: string | null;
  status: string;
  next_run_at: number | null;
  endpoint_ids?: number[];
  endpoint_names?: Record<number, string>;
  created_at: number;
  updated_at: number;
}

export interface CreateScheduleRequest {
  name: string;
  cron_expr: string;
  timezone?: string;
  payload?: string | null;
  endpoint_ids?: number[];
}

export interface UpdateScheduleRequest {
  name?: string;
  cron_expr?: string;
  timezone?: string;
  payload?: string | null;
  endpoint_ids?: number[];
}

export interface ScheduleList {
  total: number;
  list: Schedule[];
}

export interface Task {
  id: number;
  app_id: string;
  schedule_id: number | null;
  event_id: number | null;
  endpoint_id: number;
  task_type: string;
  payload: string | null;
  status: string;
  run_at: number | null;
  created_at: number;
  updated_at: number;
}

export interface CreateTaskRequest {
  endpoint_id: number;
  payload?: string | null;
  run_at?: number | null;
}

export interface TaskList {
  total: number;
  list: Task[];
}

export interface Event {
  id: number;
  app_id: string;
  event_name: string;
  event_key: string;
  payload: string | null;
  status: string;
  created_at: number;
}

export interface PublishEventRequest {
  event_name: string;
  event_key: string;
  payload?: string | null;
}

export interface PublishEventResult {
  id: number;
  app_id: string;
  event_name: string;
  event_key: string;
  payload: string | null;
  status: string;
  fanout_count: number;
  created_at: number;
}

export interface EventList {
  total: number;
  list: Event[];
}

export interface WebhookEndpoint {
  id: number;
  app_id: string;
  name: string;
  url: string;
  method: string;
  headers: string | null;
  secret: string | null;
  timeout_ms: number;
  retry_policy_id: number | null;
  filter_events?: string | null;
  status: string;
  created_at: number;
  updated_at: number;
}

export interface CreateEndpointRequest {
  name: string;
  url: string;
  method?: string;
  headers?: string | null;
  secret?: string | null;
  timeout_ms?: number;
  retry_policy_id?: number | null;
  filter_events?: string | null;
}

export interface UpdateEndpointRequest {
  name?: string;
  url?: string;
  method?: string;
  headers?: string | null;
  secret?: string | null;
  timeout_ms?: number;
  retry_policy_id?: number | null;
  filter_events?: string | null;
}

export interface EndpointList {
  total: number;
  list: WebhookEndpoint[];
}

export interface Delivery {
  id: number;
  app_id: string;
  task_id: number;
  endpoint_id: number;
  attempt: number;
  status: string;
  http_status: number | null;
  latency_ms: number;
  request_body_hash: string;
  error_message: string | null;
  next_retry_at: number | null;
  created_at: number;
  updated_at: number;
}

export interface DeliveryList {
  total: number;
  list: Delivery[];
}

export interface RetryDeliveryResult {
  delivery_id: number;
  retry_job_id: number;
  status: string;
}

export interface RetryPolicy {
  id: number;
  app_id: string;
  name: string;
  max_attempts: number;
  backoff_type: string;
  initial_delay_sec: number;
  max_delay_sec: number;
  status: string;
  created_at: number;
  updated_at: number;
}

export interface CreateRetryPolicyRequest {
  name: string;
  max_attempts?: number;
  backoff_type?: string;
  initial_delay_sec?: number;
  max_delay_sec?: number;
}

export interface UpdateRetryPolicyRequest {
  name?: string;
  max_attempts?: number;
  backoff_type?: string;
  initial_delay_sec?: number;
  max_delay_sec?: number;
  status?: string;
}

export interface RetryPolicyList {
  total: number;
  list: RetryPolicy[];
}

export interface RetryJob {
  id: number;
  app_id: string;
  delivery_id: number;
  attempt: number;
  status: string;
  run_at: number | null;
  locked_until: number | null;
  last_error: string | null;
  created_at: number;
  updated_at: number;
}

export interface RetryJobList {
  total: number;
  list: RetryJob[];
}

export interface SubscriptionQuota {
  plan_code: string;
  billing_cycle: string;
  quota: number;
  used: number;
  remaining: number;
  exceeded: boolean;
  current_period_start: number;
  current_period_end: number;
  usage_percent: number;
}

export interface UsageRecordItem {
  event_type: string;
  period: string;
  count: number;
}

export interface UsageRecords {
  period: string;
  total_events: number;
  items: UsageRecordItem[];
}

export interface ResourceLimits {
  max_cron_jobs: number;
  current_cron_jobs: number;
  max_endpoints: number;
  current_endpoints: number;
  log_retention_days: number;
}
