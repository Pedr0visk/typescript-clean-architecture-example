import { ISegmentsRepository } from "@core/domain/segment/entities/contracts/segments-repository";
import { Segment } from "@core/domain/segment/entities/Segment";
import { getRepository } from "typeorm";
import { Segment as TypeOrmSegment } from "../entities/Segment";
import { TypeOrmSegmentMapper } from "../mappers/type-orm-segments-mapper";

export class SegmentsRepository implements ISegmentsRepository {
  async findSegments(by: { lang?: string }): Promise<Segment[]> {
    const repo = getRepository(TypeOrmSegment);
    const query = repo
      .createQueryBuilder("segments")
      .leftJoinAndSelect("segments.translations", "segments_translations");

    if (by.lang) {
      query.andWhere("segments_translations.lang = :lang", { lang: by.lang });
    }

    const ormSegments: TypeOrmSegment[] = await query.getMany();
    const domainSegments = TypeOrmSegmentMapper.toDomainEntities(ormSegments);
    return domainSegments;
  }
}
