export type paths = Record<string, never>;
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /**
     * AgentModelCharacteristics
     * @description The agent's context policy, layered over what the model declares.
     */
    AgentModelCharacteristics: {
      /**
       * Compact Threshold
       * @default 0.9
       */
      compact_threshold?: number;
      /**
       * Context Window Tokens
       * @default null
       */
      context_window_tokens?: number | null;
      /**
       * Proactive Context Management Threshold
       * @default 0.65
       */
      proactive_context_management_threshold?: number | null;
    };
    /**
     * AgentOverride
     * @description What one run changes of its revision's configuration; an omitted or null field keeps the revision's.
     *
     *     `toolsets` replaces whole toolsets; `retries` and each subagent edge replace the fields they set, and a null
     *     edge removes it; every other field replaces the revision's value.
     */
    AgentOverride: {
      /**
       * Builtin Skills
       * @default null
       */
      builtin_skills?: "platform-operations"[] | null;
      /**
       * Client Tools
       * @default null
       */
      client_tools?: components["schemas"]["ClientToolDefinition"][] | null;
      /**
       * Connection Tools
       * @default null
       */
      connection_tools?: components["schemas"]["ConnectionSelection"][] | null;
      /**
       * Instructions
       * @default null
       */
      instructions?: string | null;
      /**
       * Lazy Environment
       * @default null
       */
      lazy_environment?: boolean | null;
      /** @default null */
      media_understanding?:
        components["schemas"]["MediaUnderstandingSelection"] | null;
      /**
       * Model
       * @default null
       */
      model?: string | null;
      /** @default null */
      model_characteristics?:
        components["schemas"]["AgentModelCharacteristics"] | null;
      /**
       * Model Settings
       * @default null
       */
      model_settings?: {
        [key: string]: components["schemas"]["JsonValue"];
      } | null;
      /** @default null */
      output_spec?: components["schemas"]["OutputSpec"] | null;
      /**
       * Plugins
       * @default null
       */
      plugins?: components["schemas"]["PluginSelection"][] | null;
      /** @default null */
      retries?: components["schemas"]["RetryOverride"] | null;
      /** @default null */
      reviewer?: components["schemas"]["AgentReviewer"] | null;
      /**
       * Skill Sync
       * @default null
       */
      skill_sync?:
        | (
            | components["schemas"]["SharedSkillSync"]
            | components["schemas"]["IsolatedSkillSync"]
          )
        | null;
      /**
       * Skills
       * @default null
       */
      skills?: components["schemas"]["SkillSelection"][] | null;
      /**
       * Subagents
       * @default null
       */
      subagents?: {
        [key: string]: components["schemas"]["SubagentOverride"] | null;
      } | null;
      /** @default null */
      tool_search?: components["schemas"]["ToolSearch"] | null;
      /**
       * Toolsets
       * @default null
       */
      toolsets?: {
        [key: string]: components["schemas"]["ToolsetSelection"];
      } | null;
    };
    /**
     * AgentReviewer
     * @description The model reviewing calls whose permission is `review`, selected by model key.
     */
    AgentReviewer: {
      /**
       * Instruction
       * @default null
       */
      instruction?: string | null;
      /** Model */
      model: string;
      /**
       * Model Settings
       * @default null
       */
      model_settings?: {
        [key: string]: components["schemas"]["JsonValue"];
      } | null;
      /**
       * On Error
       * @default approval_required
       * @enum {string}
       */
      on_error?: "deny" | "approval_required" | "allow";
      /**
       * On Flagged
       * @default deny
       * @enum {string}
       */
      on_flagged?: "deny" | "approval_required";
      /** @default extra_high */
      risk_threshold?: components["schemas"]["ToolRiskLevel"];
      /** Rules */
      rules?: {
        [key: string]: components["schemas"]["ToolReviewRule"];
      };
      /**
       * Shell Instruction
       * @default null
       */
      shell_instruction?: string | null;
      /**
       * Timeout Seconds
       * @default 120
       */
      timeout_seconds?: number;
    };
    ApprovalDecision:
      components["schemas"]["Approve"] | components["schemas"]["Deny"];
    /** Approve */
    Approve: {
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      action: "approve";
      reason?: never;
    };
    /** AssetPart */
    AssetPart: {
      /** Asset Id */
      asset_id: string;
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      type: "asset";
      text?: never;
      url?: never;
      value?: never;
    };
    CallResult:
      components["schemas"]["Returned"] | components["schemas"]["Failed"];
    /**
     * ChildEnvironmentPolicy
     * @description What a child run mounts: no environment, the parent's, or a new one from `template_id`.
     */
    ChildEnvironmentPolicy: {
      /**
       * Mode
       * @default shared
       * @enum {string}
       */
      mode?: "none" | "shared" | "dedicated";
      /**
       * Template Id
       * @default null
       */
      template_id?: string | null;
    };
    /**
     * ClientToolDefinition
     * @description Portable model guidance for one externally executed client tool.
     */
    ClientToolDefinition: {
      /** Description */
      description: string;
      /**
       * Instruction
       * @default null
       */
      instruction?: string | null;
      /** Metadata */
      metadata?: {
        [key: string]: components["schemas"]["JsonValue"];
      };
      /** Name */
      name: string;
      /** Parameters Json Schema */
      parameters_json_schema: {
        [key: string]: components["schemas"]["JsonValue"];
      };
      /**
       * Permission
       * @default inherit
       * @enum {string}
       */
      permission?: "inherit" | "allow" | "deny";
    };
    /** Configuration */
    Configuration: {
      /** Id */
      id: string;
      /** Max Lateness Seconds */
      max_lateness_seconds: number;
      /** Name */
      name: string;
      /** Pause Reason */
      pause_reason: string | null;
      /** Principal Id */
      principal_id: string;
      schedule: components["schemas"]["ScheduleRule"];
      /** Session Id */
      session_id: string;
      state: components["schemas"]["ScheduleState"];
      /** Version */
      version: number;
    };
    /**
     * ConnectionSelection
     * @description An agent's use of one connection: all the tools it exposes, or a subset, and their permissions.
     */
    ConnectionSelection: {
      /** Connection Id */
      connection_id: string;
      /**
       * Defer Loading
       * @default false
       */
      defer_loading?: boolean;
      /** @default inherit */
      permission?: components["schemas"]["ToolPermissionSetting"];
      /** Permissions */
      permissions?: {
        [key: string]: components["schemas"]["ToolPermissionSetting"];
      };
      /**
       * Tools
       * @default null
       */
      tools?: string[] | null;
    };
    /**
     * ContentRef
     * @description An immutable Host-owned value, loaded through that Host's authorized content API.
     */
    ContentRef: {
      /** Id */
      id: string;
      /**
       * Media Type
       * @enum {string}
       */
      media_type: "text/plain" | "application/json";
      /** Preview */
      preview: string;
      /** Size Bytes */
      size_bytes: number;
      /**
       * Truncated
       * @default false
       */
      truncated?: boolean;
    };
    /** CronSchedule */
    CronSchedule: {
      /** Expression */
      expression: string;
      /** Timezone */
      timezone: string;
      /**
       * Type
       * @default cron
       * @constant
       */
      type?: "cron";
    };
    /** DelegationContextPolicy */
    DelegationContextPolicy: {
      /**
       * History
       * @default none
       * @enum {string}
       */
      history?: "none" | "summary" | "selected";
      /**
       * Include Task
       * @default true
       */
      include_task?: boolean;
      /**
       * Task State
       * @default shared
       * @enum {string}
       */
      task_state?: "shared" | "isolated";
    };
    /** @enum {string} */
    Delivery: "steer" | "next_run";
    /**
     * Delta
     * @description One raw AG-UI event, sequenced by the producer and correlated to its display item.
     */
    Delta: {
      /** Attempt */
      attempt: number;
      /** Event */
      event: {
        [key: string]: unknown;
      };
      item: components["schemas"]["ItemRef"] | null;
      /** Run Id */
      run_id: string;
      /** Sequence */
      sequence: number;
      /** Thread Id */
      thread_id: string;
    };
    /** Deny */
    Deny: {
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      action: "deny";
      /**
       * Reason
       * @default null
       */
      reason?: string | null;
    };
    /**
     * DisplayContinuation
     * @description Parsing state at a semantic cut; Host paging may retire only immutable items.
     */
    DisplayContinuation: {
      /** @default null */
      arguments?: components["schemas"]["_Arguments"] | null;
      fragments?: components["schemas"]["FragmentState"];
      /**
       * Full Content
       * @default false
       */
      full_content?: boolean;
      /** Memory Sources */
      memory_sources?: {
        [key: string]: components["schemas"]["MemorySource"][];
      };
      /** Next Ordinal */
      next_ordinal: number;
      observer?: components["schemas"]["ObserverContinuation"];
      position: components["schemas"]["StreamPosition"];
      /** Response Groups */
      response_groups?: {
        [key: string]: string;
      };
      /** Run Id */
      run_id: string;
    };
    /** @enum {string} */
    EntryStatus: "pending" | "assigned" | "consumed" | "failed" | "withdrawn";
    /** EntryView */
    EntryView: {
      /** Agent Id */
      agent_id: string | null;
      /** Agent Revision Id */
      agent_revision_id: string | null;
      /** Assigned Run Id */
      assigned_run_id: string | null;
      /** Child Run Id */
      child_run_id: string | null;
      /**
       * Created At
       * Format: date-time
       */
      created_at: string;
      delivery: components["schemas"]["Delivery"];
      failure: components["schemas"]["Failure"] | null;
      /** Finished At */
      finished_at: string | null;
      /** Id */
      id: string;
      /** Incorporated Checkpoint Seq */
      incorporated_checkpoint_seq: number | null;
      /**
       * Kind
       * @enum {string}
       */
      kind: "message" | "child_result";
      options: components["schemas"]["RunOptions"];
      /** Origin Run Id */
      origin_run_id: string | null;
      /** Payload */
      payload: {
        [key: string]: components["schemas"]["JsonValue"];
      };
      /** Position */
      position: number;
      /** Principal Id */
      principal_id: string;
      status: components["schemas"]["EntryStatus"];
      /** Thread Id */
      thread_id: string;
    };
    /**
     * EnvironmentAction
     * @description Exact authorization values in the locked first-party catalog.
     * @enum {string}
     */
    EnvironmentAction:
      | "environment.file.stat"
      | "environment.file.read_text"
      | "environment.file.read_bytes"
      | "environment.file.write_text"
      | "environment.file.patch_text"
      | "environment.file.list"
      | "environment.file.query"
      | "environment.file.search_text"
      | "environment.file.mkdir"
      | "environment.file.move"
      | "environment.file.remove"
      | "environment.file.write_bytes"
      | "environment.file.copy_source"
      | "environment.file.copy_destination"
      | "environment.shell.exec"
      | "environment.process.list"
      | "environment.process.start"
      | "environment.process.inspect"
      | "environment.process.read_output"
      | "environment.process.write_stdin"
      | "environment.process.close_stdin"
      | "environment.process.signal"
      | "environment.process.wait"
      | "environment.process.kill"
      | "environment.process.release"
      | "environment.output.read"
      | "environment.output.release"
      | "environment.port.inspect"
      | "environment.port.wait"
      | "environment.state.export"
      | "environment.state.restore"
      | "environment.computer.describe"
      | "environment.computer.observe"
      | "environment.computer.zoom"
      | "environment.computer.click"
      | "environment.computer.move"
      | "environment.computer.drag"
      | "environment.computer.scroll"
      | "environment.computer.type_text"
      | "environment.computer.press_keys"
      | "environment.computer.read_clipboard"
      | "environment.computer.write_clipboard";
    /** EnvironmentMount */
    EnvironmentMount: {
      /** Environment Id */
      environment_id: string;
      /** Name */
      name: string;
      /**
       * @default {
       *       "operations": [
       *         "environment.file.copy_destination",
       *         "environment.file.copy_source",
       *         "environment.file.list",
       *         "environment.file.mkdir",
       *         "environment.file.move",
       *         "environment.file.patch_text",
       *         "environment.file.query",
       *         "environment.file.read_bytes",
       *         "environment.file.read_text",
       *         "environment.file.remove",
       *         "environment.file.search_text",
       *         "environment.file.stat",
       *         "environment.file.write_bytes",
       *         "environment.file.write_text",
       *         "environment.output.read",
       *         "environment.output.release",
       *         "environment.port.inspect",
       *         "environment.port.wait",
       *         "environment.process.close_stdin",
       *         "environment.process.inspect",
       *         "environment.process.kill",
       *         "environment.process.list",
       *         "environment.process.read_output",
       *         "environment.process.release",
       *         "environment.process.signal",
       *         "environment.process.start",
       *         "environment.process.wait",
       *         "environment.process.write_stdin",
       *         "environment.shell.exec",
       *         "environment.state.export",
       *         "environment.state.restore"
       *       ]
       *     }
       */
      permission_ceiling?: components["schemas"]["EnvironmentPermissionSet"];
      /**
       * Working Directory
       * @default null
       */
      working_directory?: string | null;
    };
    /** EnvironmentPermissionSet */
    EnvironmentPermissionSet: {
      /** Operations */
      operations?: components["schemas"]["EnvironmentAction"][];
    };
    /**
     * Failed
     * @description An explicit external tool failure, including an intentional unanswered question.
     */
    Failed: {
      /** Message */
      message: string;
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      status: "failed";
      value?: never;
    };
    /** Failure */
    Failure: {
      /** Code */
      code: string;
      /** Message */
      message: string;
    };
    /** FileSource */
    FileSource: {
      /** Bytes */
      bytes: number;
      /** Path */
      path: string;
      /** Sha256 */
      sha256: string;
      /**
       * Truncated
       * @default false
       */
      truncated?: boolean;
    };
    /**
     * FragmentState
     * @description Incomplete custom payloads, not a journal of completed events.
     */
    FragmentState: {
      /**
       * Gap
       * @default false
       */
      gap?: boolean;
      /**
       * Max Bytes
       * @default 67108864
       */
      max_bytes?: number;
      /**
       * Max Pending
       * @default 8
       */
      max_pending?: number;
      /** Pending */
      pending?: {
        [key: string]: components["schemas"]["_Assembly"];
      };
    };
    /**
     * FrozenMemoryMount
     * @description Host-resolved Space identity and roots, never accepted from a mount request.
     */
    FrozenMemoryMount: {
      access: components["schemas"]["MemoryAccess"];
      /** Memory Id */
      memory_id: string;
      /** Name */
      name: string;
      /**
       * Recall
       * @default true
       */
      recall?: boolean;
      /**
       * Roots
       * @default []
       */
      roots?: string[];
      /**
       * Space Id
       * @default null
       */
      space_id?: string | null;
    };
    /**
     * Gap
     * @description Output of a followed run was lost: its deltas are held until an `items` frame repairs it.
     */
    Gap: {
      /** Run Id */
      run_id: string;
      /** Thread Id */
      thread_id: string;
    };
    /** InitialRun */
    InitialRun: {
      /** Id */
      id: string;
      status: components["schemas"]["RunStatus"];
    };
    /**
     * IsolatedSkillSync
     * @description Reuse immutable package directories, with a soft count budget.
     */
    IsolatedSkillSync: {
      /**
       * Cache Count
       * @default 128
       */
      cache_count?: number;
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      mode: "isolated";
    };
    /** Item */
    Item: {
      /** Content */
      content: {
        [key: string]: components["schemas"]["JsonValue"];
      };
      /** Content Refs */
      content_refs?: {
        [key: string]: components["schemas"]["ContentRef"];
      };
      /**
       * Ended At
       * @default null
       */
      ended_at?: string | null;
      /** First Stream Id */
      first_stream_id: string;
      /** Id */
      id: string;
      kind: components["schemas"]["ItemKind"];
      /** Last Stream Id */
      last_stream_id: string;
      /** Ordinal */
      ordinal: number;
      /**
       * Started At
       * Format: date-time
       */
      started_at: string;
      state: components["schemas"]["ItemState"];
    };
    /** @enum {string} */
    ItemKind:
      "text_message" | "reasoning_message" | "tool_call" | "observation";
    /**
     * ItemRef
     * @description The item a live event changed, and its state after the event.
     */
    ItemRef: {
      /**
       * Failure
       * @default null
       */
      failure?: {
        [key: string]: components["schemas"]["JsonValue"];
      } | null;
      /** Id */
      id: string;
      kind: components["schemas"]["ItemKind"];
      /**
       * Memory Sources
       * @default null
       */
      memory_sources?: components["schemas"]["MemorySource"][] | null;
      /**
       * Ordinal
       * @default null
       */
      ordinal?: number | null;
      /**
       * Response Group
       * @default null
       */
      response_group?: string | null;
      state: components["schemas"]["ItemState"];
    };
    /** @enum {string} */
    ItemState: "in_progress" | "completed" | "interrupted" | "failed";
    /** JsonPart */
    JsonPart: {
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      type: "json";
      value: components["schemas"]["JsonValue"];
      text?: never;
      asset_id?: never;
      url?: never;
    };
    JsonValue: unknown;
    /** @enum {string} */
    Lineage: "root" | "continue" | "fork";
    /**
     * MediaUnderstandingSelection
     * @description The model, by key, describing each media kind a model cannot read; a kind without one is unavailable.
     */
    MediaUnderstandingSelection: {
      /**
       * Audio
       * @default null
       */
      audio?: string | null;
      /**
       * Image
       * @default null
       */
      image?: string | null;
      /**
       * Video
       * @default null
       */
      video?: string | null;
    };
    /** @enum {string} */
    MemoryAccess: "read" | "write";
    /**
     * MemoryMount
     * @description A memory under the name the model addresses it by, exposing the tools its access allows. `recall` lets a
     *     record memory recall records into each run's first input; file memories ignore it.
     */
    MemoryMount: {
      access: components["schemas"]["MemoryAccess"];
      /** Memory Id */
      memory_id: string;
      /** Name */
      name: string;
      /**
       * Recall
       * @default true
       */
      recall?: boolean;
    };
    /**
     * MemorySource
     * @description One automatic delivery in this Run; content remains in the memory or execution archive.
     */
    MemorySource: {
      /**
       * Cursor
       * @default null
       */
      cursor?: string | null;
      /**
       * Files
       * @default []
       */
      files?: components["schemas"]["FileSource"][];
      /**
       * Kind
       * @enum {string}
       */
      kind: "record" | "file";
      /** Memory */
      memory: string;
      /**
       * Memory Id
       * @default null
       */
      memory_id?: string | null;
      /**
       * Records
       * @default []
       */
      records?: components["schemas"]["RecordSource"][];
      /**
       * Sources Truncated
       * @default false
       */
      sources_truncated?: boolean;
      /**
       * Status
       * @enum {string}
       */
      status:
        | "recalled"
        | "failed"
        | "timeout"
        | "full"
        | "changes"
        | "unchanged"
        | "omitted"
        | "unavailable";
    };
    /** MessagePayload */
    MessagePayload: {
      /** Content */
      content: components["schemas"]["Part"][];
    };
    /**
     * NativeToolSearchConfig
     * @description Provider-native discovery; omitted strategy uses the provider default.
     */
    NativeToolSearchConfig: {
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      mode: "native";
      /**
       * Strategy
       * @default null
       */
      strategy?: ("bm25" | "regex") | null;
      call_name?: never;
      max_results?: never;
      max_search_bytes?: never;
      search_name?: never;
    };
    /**
     * ObserverContinuation
     * @description Native conversion cursors required to resume mid-part, without raw history.
     */
    ObserverContinuation: {
      /**
       * Run Id
       * @default null
       */
      run_id?: string | null;
      state?: components["schemas"]["_ObserverState"];
      /**
       * Thread Id
       * @default null
       */
      thread_id?: string | null;
    };
    /** OccurrenceEvent */
    OccurrenceEvent: {
      occurrence: components["schemas"]["OccurrenceSummary"];
      /** Schedule Id */
      schedule_id: string;
      /** Session Id */
      session_id: string;
    };
    /**
     * OccurrenceExecution
     * @description Current execution observations alongside the durable occurrence completion facts.
     */
    OccurrenceExecution: {
      /** Has Unfinished Work */
      has_unfinished_work: boolean;
      initial_entry_status: components["schemas"]["EntryStatus"] | null;
      initial_run: components["schemas"]["InitialRun"] | null;
      /**
       * Observed At
       * Format: date-time
       */
      observed_at: string;
    };
    /** @enum {string} */
    OccurrenceStatus:
      | "pending"
      | "submitted"
      | "completed"
      | "skipped"
      | "failed"
      | "cancelled";
    /** OccurrenceSummary */
    OccurrenceSummary: {
      /**
       * Completed At
       * @default null
       */
      completed_at?: string | null;
      /**
       * Completion Run Id
       * @default null
       */
      completion_run_id?: string | null;
      /** Covered From At */
      covered_from_at: string | null;
      /**
       * Created At
       * Format: date-time
       */
      created_at: string;
      /**
       * Deadline At
       * Format: date-time
       */
      deadline_at: string;
      /** Dispatch Attempts */
      dispatch_attempts: number;
      /** Entry Id */
      entry_id: string | null;
      /** @default null */
      execution?: components["schemas"]["OccurrenceExecution"] | null;
      /**
       * Execution Outcome
       * @default null
       */
      execution_outcome?: ("succeeded" | "failed" | "cancelled") | null;
      /** Finished At */
      finished_at: string | null;
      /** Id */
      id: string;
      /** Last Error */
      last_error: string | null;
      /** Next Attempt At */
      next_attempt_at: string | null;
      /** Reason */
      reason: string | null;
      /** Schedule Id */
      schedule_id: string;
      /** Schedule Version */
      schedule_version: number;
      /** Scheduled At */
      scheduled_at: string | null;
      /** Session Id */
      session_id: string;
      status: components["schemas"]["OccurrenceStatus"];
      /** Thread Id */
      thread_id: string | null;
      trigger: components["schemas"]["ScheduleTrigger"];
      /**
       * Updated At
       * Format: date-time
       */
      updated_at: string;
      /** Version */
      version: number;
    };
    /** OnceSchedule */
    OnceSchedule: {
      /**
       * Run At
       * Format: date-time
       */
      run_at: string;
      /**
       * Type
       * @constant
       */
      type: "once";
    };
    /**
     * OutputSpec
     * @description Plain text without a schema, one structured output, or at least two named variants.
     *
     *     `resources` are the schemas `$ref`s may name besides the schema's own definitions.
     */
    OutputSpec: {
      /**
       * Description
       * @default null
       */
      description?: string | null;
      /**
       * Name
       * @default null
       */
      name?: string | null;
      /** Resources */
      resources?: {
        [key: string]: {
          [key: string]: components["schemas"]["JsonValue"];
        };
      };
      /**
       * Schema
       * @default null
       */
      schema?: {
        [key: string]: components["schemas"]["JsonValue"];
      } | null;
      /**
       * Variants
       * @default null
       */
      variants?: components["schemas"]["OutputVariant"][] | null;
    };
    /** OutputVariant */
    OutputVariant: {
      /**
       * Description
       * @default null
       */
      description?: string | null;
      /** Name */
      name: string;
      /** Resources */
      resources?: {
        [key: string]: {
          [key: string]: components["schemas"]["JsonValue"];
        };
      };
      /** Schema */
      schema: {
        [key: string]: components["schemas"]["JsonValue"];
      };
    };
    Part:
      | components["schemas"]["TextPart"]
      | components["schemas"]["AssetPart"]
      | components["schemas"]["UrlPart"]
      | components["schemas"]["JsonPart"];
    /**
     * Pending
     * @description Public projection; complete native requests and private metadata stay in the checkpoint.
     */
    Pending: {
      /** Approvals */
      approvals: components["schemas"]["PendingCall"][];
      /** Calls */
      calls: components["schemas"]["PendingCall"][];
      /**
       * Desktop Control Id
       * @default null
       */
      desktop_control_id?: string | null;
    };
    /** PendingCall */
    PendingCall: {
      /** Arguments */
      arguments: {
        [key: string]: components["schemas"]["JsonValue"];
      };
      /**
       * Presentation
       * @default null
       */
      presentation?: {
        [key: string]: components["schemas"]["JsonValue"];
      } | null;
      tool_call_id: components["schemas"]["ToolCallId"];
      /** Tool Name */
      tool_name: string;
    };
    /** @enum {string} */
    PlatformGroup:
      | "agents"
      | "models"
      | "connections"
      | "skills"
      | "environment_templates"
      | "providers"
      | "execution";
    /**
     * PluginSelection
     * @description One instance of a Harness plugin factory the deployment installed.
     */
    PluginSelection: {
      /** Config */
      config?: {
        [key: string]: components["schemas"]["JsonValue"];
      };
      /** Instance Name */
      instance_name: string;
      /** Plugin Key */
      plugin_key: string;
    };
    /** Progress */
    Progress: {
      /** Last Occurrence Id */
      last_occurrence_id: string | null;
      /** Next Fire At */
      next_fire_at: string | null;
      /** Pending Occurrence Id */
      pending_occurrence_id: string | null;
    };
    /**
     * ProxyToolSearchConfig
     * @description Names and bounded discovery settings for one Agent's proxy surface.
     */
    ProxyToolSearchConfig: {
      /**
       * Call Name
       * @default call_proxy_tool
       */
      call_name?: string;
      /**
       * Max Results
       * @default 10
       */
      max_results?: number;
      /**
       * Max Search Bytes
       * @default 32768
       */
      max_search_bytes?: number;
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      mode: "proxy";
      /**
       * Search Name
       * @default search_proxy_tools
       */
      search_name?: string;
      strategy?: never;
    };
    /** RecordSource */
    RecordSource: {
      /** Id */
      id: string;
      /** Sha256 */
      sha256: string;
    };
    /**
     * Resume
     * @description The complete result batch, submitted and stored on the successor without omission defaults.
     */
    Resume: {
      /** Approvals */
      approvals: {
        [key: string]: components["schemas"]["ApprovalDecision"];
      };
      /** Calls */
      calls: {
        [key: string]: components["schemas"]["CallResult"];
      };
      /** @default null */
      input?: components["schemas"]["MessagePayload"] | null;
    };
    /** RetryOverride */
    RetryOverride: {
      /**
       * Output
       * @default null
       */
      output?: number | null;
      /**
       * Tools
       * @default null
       */
      tools?: number | null;
    };
    /**
     * Returned
     * @description A JSON tool result. Built-in question values are validated by the Harness.
     */
    Returned: {
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      status: "returned";
      value: components["schemas"]["JsonValue"];
      message?: never;
    };
    /**
     * RunConfiguration
     * @description An accepted snapshot, independent of Agent definitions and Capability configuration.
     *
     *     Consumers explicitly opt into namespaced extensions and own their validation.
     *     Extension lookups return detached values, not mutable shared state.
     */
    RunConfiguration: {
      /**
       * Allowed Hosts
       * @description Allowed normalized hostnames/IP literals or regex:<Python pattern> rules matched against the entire normalized hostname. Null is unrestricted; an empty array denies all.
       */
      allowed_hosts?: string[] | null;
      /** Extensions */
      extensions?: {
        [key: string]: components["schemas"]["JsonValue"];
      };
    };
    /**
     * RunOptions
     * @description What a message may choose for the run it starts. A steer joins a run with the defaults or equal options.
     */
    RunOptions: {
      /** @default null */
      configuration?: components["schemas"]["RunConfiguration"] | null;
      /** Labels */
      labels?: {
        [key: string]: string;
      };
      /** @default null */
      max_usage?: components["schemas"]["UsageLimit"] | null;
      /** @default null */
      overrides?: components["schemas"]["AgentOverride"] | null;
    };
    /**
     * RunSnapshot
     * @description A run's committed items from ordinal `first` on. The receiver deletes the items it holds from `first` on and
     *     inserts these; earlier items are final. `complete` marks the run's final display.
     */
    RunSnapshot: {
      /** Complete */
      complete: boolean;
      continuation: components["schemas"]["DisplayContinuation"] | null;
      /** First */
      first: number;
      /** Items */
      items: components["schemas"]["Item"][];
      /** Run Id */
      run_id: string;
      /** Thread Id */
      thread_id: string;
    };
    /** @enum {string} */
    RunStatus:
      "accepted" | "running" | "waiting" | "completed" | "failed" | "cancelled";
    /** RunView */
    RunView: {
      /** Agent Id */
      agent_id: string;
      /** Agent Revision Id */
      agent_revision_id: string;
      /** Attempts */
      attempts: number;
      /** Cancel Requested At */
      cancel_requested_at: string | null;
      /**
       * Created At
       * Format: date-time
       */
      created_at: string;
      /** Current Attempt Id */
      current_attempt_id: string | null;
      /** Environment Mounts */
      environment_mounts: components["schemas"]["EnvironmentMount"][];
      failure: components["schemas"]["Failure"] | null;
      /** Id */
      id: string;
      /**
       * Input
       * @default null
       */
      input?: {
        [key: string]: components["schemas"]["JsonValue"];
      } | null;
      /** Labels */
      labels: {
        [key: string]: string;
      };
      lineage: components["schemas"]["Lineage"];
      /** Max Attempts */
      max_attempts: number;
      /** Memory Mounts */
      memory_mounts: (
        | components["schemas"]["MemoryMount"]
        | components["schemas"]["FrozenMemoryMount"]
      )[];
      options: components["schemas"]["RunOptions"];
      output: components["schemas"]["JsonValue"] | null;
      /** Parent Run Id */
      parent_run_id: string | null;
      pending: components["schemas"]["Pending"] | null;
      /** Principal Id */
      principal_id: string;
      resume: components["schemas"]["Resume"] | null;
      /** Resumed By Id */
      resumed_by_id: string | null;
      /**
       * Revision Selection
       * @enum {string}
       */
      revision_selection: "pinned" | "default" | "inherited";
      /** @default null */
      schedule_origin?: components["schemas"]["ScheduleOrigin"] | null;
      /** Sealed At */
      sealed_at: string | null;
      /** Session Id */
      session_id: string;
      /** Source Entry Id */
      source_entry_id: string | null;
      /** Started At */
      started_at: string | null;
      status: components["schemas"]["RunStatus"];
      /** Thread Id */
      thread_id: string;
      trigger: components["schemas"]["Trigger"];
      /**
       * Updated At
       * Format: date-time
       */
      updated_at: string;
      /** Usage At Seal */
      usage_at_seal: {
        [key: string]: components["schemas"]["JsonValue"];
      } | null;
      /** Version */
      version: number;
      wait_reason: components["schemas"]["WaitReason"] | null;
      /** Workspace Id */
      workspace_id: string;
    };
    /** ScheduleEvent */
    ScheduleEvent: {
      configuration: components["schemas"]["Configuration"];
      progress: components["schemas"]["Progress"];
      /** Schedule Id */
      schedule_id: string;
      /** Session Id */
      session_id: string;
    };
    /** ScheduleOrigin */
    ScheduleOrigin: {
      /** Occurrence Id */
      occurrence_id: string;
      /** Schedule Id */
      schedule_id: string;
    };
    ScheduleRule:
      | components["schemas"]["CronSchedule"]
      | components["schemas"]["OnceSchedule"];
    /** @enum {string} */
    ScheduleState: "paused" | "enabled" | "completed" | "archived";
    /** @enum {string} */
    ScheduleTrigger: "scheduled" | "manual";
    /**
     * SharedSkillSync
     * @description Publish mutable conventional names; the last completed publication wins.
     */
    SharedSkillSync: {
      /**
       * Cleanup
       * @default false
       */
      cleanup?: boolean;
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      mode: "shared";
      /**
       * Overwrite
       * @default true
       */
      overwrite?: boolean;
    };
    /** SkillSelection */
    SkillSelection: {
      /**
       * Revision Id
       * @default null
       */
      revision_id?: string | null;
      /** Skill Id */
      skill_id: string;
    };
    /** StreamPosition */
    StreamPosition: {
      /** Attempt */
      attempt: number;
      /** Sequence */
      sequence: number;
    };
    /**
     * SubagentOverride
     * @description Replaces the fields it sets of an edge; an edge the revision lacks sets at least `agent_id`.
     */
    SubagentOverride: {
      /**
       * Agent Id
       * @default null
       */
      agent_id?: string | null;
      /** @default null */
      context?: components["schemas"]["DelegationContextPolicy"] | null;
      /**
       * Description
       * @default null
       */
      description?: string | null;
      /** @default null */
      environment?: components["schemas"]["ChildEnvironmentPolicy"] | null;
      /**
       * Revision Id
       * @default null
       */
      revision_id?: string | null;
      /** @default null */
      usage_limits?: components["schemas"]["UsageLimits"] | null;
    };
    /** TextPart */
    TextPart: {
      /** Text */
      text: string;
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      type: "text";
      asset_id?: never;
      url?: never;
      value?: never;
    };
    /**
     * ThreadState
     * @description A thread's current state: the thread, the runs its pointers name and its open inbox entries.
     */
    ThreadState: {
      current_run: components["schemas"]["RunView"] | null;
      /** Entries */
      entries: components["schemas"]["EntryView"][];
      last_run: components["schemas"]["RunView"] | null;
      thread: components["schemas"]["ThreadView"];
    };
    /** ThreadView */
    ThreadView: {
      /** Archived At */
      archived_at: string | null;
      /**
       * Created At
       * Format: date-time
       */
      created_at: string;
      /** Current Run Id */
      current_run_id: string | null;
      /** Id */
      id: string;
      /** Labels */
      labels: {
        [key: string]: string;
      };
      /** Last Run Id */
      last_run_id: string | null;
      /** Mcp Headers */
      mcp_headers: {
        [key: string]: {
          [key: string]: string;
        };
      };
      /**
       * Origin
       * @enum {string}
       */
      origin: "new" | "fork" | "child";
      /** Origin Run Id */
      origin_run_id: string | null;
      /** Origin Thread Id */
      origin_thread_id: string | null;
      /** Origin Tool Call Id */
      origin_tool_call_id: string | null;
      /**
       * Purpose
       * @default conversation
       * @enum {string}
       */
      purpose?: "conversation" | "memory_organization";
      /**
       * Schedule Occurrence Id
       * @default null
       */
      schedule_occurrence_id?: string | null;
      /** Session Id */
      session_id: string;
      /** Subagent */
      subagent: string | null;
      /**
       * Updated At
       * Format: date-time
       */
      updated_at: string;
      /** Version */
      version: number;
      /** Workspace Id */
      workspace_id: string;
    };
    ToolCallId: string;
    /** @enum {string} */
    ToolPermissionMode: "allow" | "deny" | "ask" | "review";
    ToolPermissionSetting:
      components["schemas"]["ToolPermissionMode"] | "inherit";
    /**
     * ToolReviewRule
     * @description A matching rule overrides the supplied fields of the global policy.
     */
    ToolReviewRule: {
      /**
       * On Flagged
       * @default null
       */
      on_flagged?: ("deny" | "approval_required") | null;
      /** @default null */
      risk_threshold?: components["schemas"]["ToolRiskLevel"] | null;
    };
    /**
     * ToolRiskLevel
     * @enum {string}
     */
    ToolRiskLevel: "low" | "medium" | "high" | "extra_high";
    /**
     * ToolSearch
     * @description Presentation of already-selected sources, composed by Harness once per agent.
     */
    ToolSearch: {
      config?: components["schemas"]["ToolSearchConfig"];
      /** Groups */
      groups?: {
        [key: string]: components["schemas"]["ToolSearchGroup"];
      };
    };
    ToolSearchConfig:
      | components["schemas"]["ProxyToolSearchConfig"]
      | components["schemas"]["NativeToolSearchConfig"];
    /** ToolSearchGroup */
    ToolSearchGroup: {
      /**
       * Connections
       * @default []
       */
      connections?: string[];
      /** Description */
      description: string;
      /**
       * Platform
       * @default false
       */
      platform?: boolean;
      /**
       * Plugins
       * @default []
       */
      plugins?: string[];
    };
    /** ToolSelection */
    ToolSelection: {
      /** Config */
      config?: {
        [key: string]: components["schemas"]["JsonValue"];
      };
      /**
       * Enabled
       * @default true
       */
      enabled?: boolean;
      /** @default inherit */
      permission?: components["schemas"]["ToolPermissionSetting"];
    };
    ToolsetKey:
      | ("files" | "shell" | "computer" | "web" | "memory" | "assets")
      | components["schemas"]["PlatformGroup"];
    /** ToolsetSelection */
    ToolsetSelection: {
      /** Config */
      config?: {
        [key: string]: components["schemas"]["JsonValue"];
      };
      /**
       * Enabled
       * @default true
       */
      enabled?: boolean;
      /** Tools */
      tools?: {
        [key: string]: components["schemas"]["ToolSelection"];
      };
    };
    /** @enum {string} */
    Trigger: "input" | "queued" | "resume" | "child_result" | "spawned";
    /** UrlPart */
    UrlPart: {
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      type: "url";
      /** Url */
      url: string;
      text?: never;
      asset_id?: never;
      value?: never;
    };
    /** UsageLimit */
    UsageLimit: {
      /** Requests */
      requests: number;
    };
    /**
     * UsageLimits
     * @description Limits on model usage.
     *
     *     The request count is tracked by Pydantic AI, and the request limit is checked at the start of each step of the
     *     agent loop. Token counts are provided in responses from the model, and the token limits are checked after each response.
     *
     *     Each of the limits can be set to `None` to disable that limit.
     */
    UsageLimits: {
      /**
       * Cost Limit
       * @default null
       */
      cost_limit?: string | null;
      /**
       * Count Tokens Before Request
       * @default false
       */
      count_tokens_before_request?: boolean;
      /**
       * Input Tokens Limit
       * @default null
       */
      input_tokens_limit?: number | null;
      /**
       * Output Tokens Limit
       * @default null
       */
      output_tokens_limit?: number | null;
      /**
       * Per Request Input Tokens Limit
       * @default null
       */
      per_request_input_tokens_limit?: number | null;
      /**
       * Request Limit
       * @default 50
       */
      request_limit?: number | null;
      /**
       * Tool Calls Limit
       * @default null
       */
      tool_calls_limit?: number | null;
      /**
       * Total Tokens Limit
       * @default null
       */
      total_tokens_limit?: number | null;
    };
    /** @enum {string} */
    WaitReason: "approval" | "call" | "multiple" | "desktop_control";
    /**
     * _Arguments
     * @description A tool-call part's streamed arguments so far and the one observation item that holds them.
     */
    _Arguments: {
      /**
       * At
       * Format: date-time
       */
      at: string;
      /** Event */
      event: {
        [key: string]: unknown;
      } | null;
      /** Key */
      key: string;
      /** Sequence */
      sequence: number;
      /** Size */
      size: number;
      stream: components["schemas"]["JsonValue"];
    };
    /** _Assembly */
    _Assembly: {
      /** Count */
      count: number;
      /** Parts */
      parts?: string[];
      /**
       * Size
       * @default 0
       */
      size?: number;
    };
    /** _ObserverState */
    _ObserverState: {
      /** Children */
      children?: {
        [key: string]: components["schemas"]["_ObserverState"];
      };
      /** Parts */
      parts?: {
        [key: string]: components["schemas"]["_PartCursor"];
      };
      /**
       * Request Index
       * @default 0
       */
      request_index?: number;
      /** Threads */
      threads?: {
        [key: string]: string;
      };
    };
    /** _PartCursor */
    _PartCursor: {
      /**
       * Emitted Content
       * @default false
       */
      emitted_content?: boolean;
      /**
       * Emitted Signature
       * @default false
       */
      emitted_signature?: boolean;
      /**
       * Kind
       * @enum {string}
       */
      kind: "text" | "reasoning" | "tool_call";
      /** Part Id */
      part_id: string;
      /**
       * Tool Name
       * @default null
       */
      tool_name?: string | null;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;

export type SessionStreamSchemas = components["schemas"];
export type SessionStreamFrame =
  | { type: "delta"; data: components["schemas"]["Delta"] }
  | { type: "gap"; data: components["schemas"]["Gap"] }
  | { type: "items"; data: components["schemas"]["RunSnapshot"] }
  | { type: "occurrence"; data: components["schemas"]["OccurrenceEvent"] }
  | { type: "schedule"; data: components["schemas"]["ScheduleEvent"] }
  | { type: "thread"; data: components["schemas"]["ThreadState"] };
