import { v4 } from "uuid";

export class Event {
  public readonly id: string;
  public account_id: number;
  public code: string;
  public name: string;

  constructor(props: Omit<Event, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
  }
}
