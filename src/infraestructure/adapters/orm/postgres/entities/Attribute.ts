import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("attributes")
export class Attribute {
  @PrimaryColumn()
  id: string;

  @Column()
  account_id: number;

  @Column()
  name: string;

  @Column()
  value: string;
}
