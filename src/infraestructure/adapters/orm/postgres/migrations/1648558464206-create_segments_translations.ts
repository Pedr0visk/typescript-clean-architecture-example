import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createSegmentsTranslations1648558464206
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "segments_translations",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "segment_id",
            type: "int4",
          },
          {
            name: "lang",
            type: "varchar",
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "text",
            type: "varchar",
          },
        ],
        foreignKeys: [
          {
            name: "fk_segments_translations_segment",
            columnNames: ["segment_id"],
            referencedTableName: "segments",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("segments_translations");
  }
}
