import { Segment } from "../Segment";

export interface ISegmentsRepository {
  findSegments(by: { lang?: string }): Promise<Segment[]>;
}
