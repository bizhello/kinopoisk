import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeMovieId1671020986332 implements MigrationInterface {
  name = 'changeMovieId1671020986332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" ALTER COLUMN "kinopoisk_id" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" ALTER COLUMN "kinopoisk_id" SET NOT NULL`,
    );
  }
}
