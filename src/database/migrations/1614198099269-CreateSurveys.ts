import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveys1614198099269 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'surveys',
        columns: [
          {
            isUnique: true,
            isGenerated: true,
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('surveys');
  }
}
