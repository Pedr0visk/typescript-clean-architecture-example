import { v4 } from "uuid";

export class Attribute {
  public readonly id: string;
  public account_id: number;
  public name: string;
  public value: string;

  constructor(props: Omit<Attribute, "id">, id?: number) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
  }
}
