import { Segment } from "@core/domain/segment/entities/Segment";
import { Segment as TypeOrmSegment } from "../entities/Segment";
import { TypeOrmSegmentTranslationMapper } from "./type-orm-segments-translations-mapper";

export class TypeOrmSegmentMapper {
  public static toDomainEntity(ormSegment: TypeOrmSegment): Segment {
    const domainSegment: Segment = new Segment({
      id: ormSegment.id,
      parent_id: ormSegment?.parent_id,
      category: ormSegment.category,
      translations: TypeOrmSegmentTranslationMapper.toDomainEntities(
        ormSegment.translations
      ),
    });

    return domainSegment;
  }

  public static toDomainEntities(ormSegments: TypeOrmSegment[]): Segment[] {
    return ormSegments.map((ormSegment) => this.toDomainEntity(ormSegment));
  }
}
