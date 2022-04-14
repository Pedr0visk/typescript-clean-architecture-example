export class SegmentTranslation {
  public readonly id: string;
  public text: string;
  public segment_id?: number;
  public category: string;
  public lang: string;

  constructor(props: SegmentTranslation) {
    Object.assign(this, props);
  }
}
