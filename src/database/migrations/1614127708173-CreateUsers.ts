import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1614127708173 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            isPrimary: true,
            isUnique: true,
            name: 'id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            isUnique: true,
            name: 'email',
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
    await queryRunner.dropTable('users');
  }
}
