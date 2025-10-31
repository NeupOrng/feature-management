import { pgEnum } from "drizzle-orm/pg-core";

export const status = pgEnum('status', ['active', 'delete']);

export enum Status {
  Active = 'active',
  Delete = 'delete',
}

export type StatusType = 'active' | 'delete';
