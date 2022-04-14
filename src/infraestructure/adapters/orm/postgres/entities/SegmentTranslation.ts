import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  PrimaryColumn,
} from "typeorm";
import { Segment } from "./Segment";

@Entity("segments_translations")
export class SegmentTranslation {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Segment, (segment) => segment.translations)
  @JoinColumn({ name: "segment_id" })
  @Index()
  segment: Segment;

  @Column()
  @Index()
  lang: string;

  @Column()
  @Index()
  category: string;

  @Column()
  text: string;
}
