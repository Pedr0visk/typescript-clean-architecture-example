import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { SegmentTranslation } from "./SegmentTranslation";

@Entity("segments")
export class Segment {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true })
  parent_id: number;

  @Column()
  category: string;

  @OneToMany(() => SegmentTranslation, (translation) => translation.segment)
  translations: SegmentTranslation[];
}
