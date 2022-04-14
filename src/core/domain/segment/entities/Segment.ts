import { SegmentTranslation } from "./SegmentTranslation";

export class Segment {
  public readonly id: number;
  public parent_id?: number;
  public category: string;
  public readonly translations?: SegmentTranslation[];

  constructor(props: Segment) {
    Object.assign(this, props);
  }
}
