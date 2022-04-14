import { SegmentTranslation } from "@core/domain/segment/entities/SegmentTranslation";
import { SegmentTranslation as TypeOrmSegmentTranslation } from "../entities/SegmentTranslation";

export class TypeOrmSegmentTranslationMapper {
  public static toDomainEntity(
    ormSegmentTranslation: TypeOrmSegmentTranslation
  ): SegmentTranslation {
    const domainSegment: SegmentTranslation = new SegmentTranslation({
      id: ormSegmentTranslation.id,
      lang: ormSegmentTranslation.lang,
      text: ormSegmentTranslation.text,
      category: ormSegmentTranslation.category,
    });

    return domainSegment;
  }

  public static toDomainEntities(
    ormSegmentsTranslation: TypeOrmSegmentTranslation[]
  ): SegmentTranslation[] {
    return ormSegmentsTranslation.map((ormSegmentTranslation) =>
      this.toDomainEntity(ormSegmentTranslation)
    );
  }
}
