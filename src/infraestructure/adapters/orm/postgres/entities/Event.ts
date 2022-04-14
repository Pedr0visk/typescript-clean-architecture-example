import { Entity, Column, PrimaryColumn, Unique, Index } from "typeorm";

@Entity("events")
export class Event {
  @PrimaryColumn()
  id: string;

  @Column()
  account_id: number;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true })
  code: string;
}
