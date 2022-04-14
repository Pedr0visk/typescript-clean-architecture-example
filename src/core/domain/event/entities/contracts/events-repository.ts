import { Event } from "../Event";

export interface IEventsRepository {
  create(data: Event): Promise<void>;
  findEvent(by: { account_id?: number; code?: string }): Promise<Event | null>;
  findEvents(by: { account_id?: number; code?: string }): Promise<Event[]>;
}
