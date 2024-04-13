import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserNameToUserTable1712881436008 implements MigrationInterface {
  name = 'AddUserNameToUserTable1712881436008';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
  }
}
