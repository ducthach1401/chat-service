import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1664440326581 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'socket_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner;
  }
}
