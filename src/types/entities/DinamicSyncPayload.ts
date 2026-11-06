// src/types/entities/DinamicSyncPayload.ts
export type PushRowSuccess = { uuid: string; status: "created" | "updated" | "ignored" };
export type PushRowError = { error: string };
export type PushRowResult = PushRowSuccess | PushRowError;
export type PushTableResult = PushRowResult[];
export type PushResponse = Record<string, PushTableResult>;
export type DynamicSyncPayload = { tables: Record<string, any[]>; };








export type PullResponse = Record<string, any[]>;
