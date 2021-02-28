import { type } from "os";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysUsers1614461864912 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'surveys_users',
      columns: [
        {
          isPrimary: true,
          isGenerated: true,
          name: 'id',
          type: 'uuid',
        },
        {
          name: 'user_id',
          type: 'uuid',
        },
        {
          name: 'survey_id',
          type: 'uuid',
        },
        {
          name: 'value',
          type: 'number',
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
      foreignKeys: [
        {
          name: 'FKUser',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        {
          name: 'FKSurvey',
          referencedTableName: 'surveys',
          referencedColumnNames: ['id'],
          columnNames: ['survey_id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('surveys_users');
  }
}
