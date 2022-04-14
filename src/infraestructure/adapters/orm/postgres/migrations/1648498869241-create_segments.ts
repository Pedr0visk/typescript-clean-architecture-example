import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createSegments1648498869241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "segments",
        columns: [
          {
            name: "id",
            type: "int4",
            isPrimary: true,
          },
          {
            name: "parent_id",
            type: "int4",
            isNullable: true,
          },
          {
            name: "category",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("segments");
  }
}
