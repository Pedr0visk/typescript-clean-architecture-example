import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAttributes1648146107937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "attributes",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "account_id",
            type: "int4",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "value",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("attributes");
  }
}
