import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1671020604518 implements MigrationInterface {
  name = 'init1671020604518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "genres" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "UQ_b37dce0f06a1eeb5195e5045175" UNIQUE ("title"), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" SERIAL NOT NULL, "kinopoisk_id" integer NOT NULL, "name_en" character varying, "name_ru" character varying, "year" integer, "poster_url" character varying, "poster_url_preview" character varying, "duration" integer, "premiere_ru" character varying, CONSTRAINT "UQ_a6bcd03661794dab39c5f8e1f71" UNIQUE ("kinopoisk_id"), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "UQ_f0ab39b0865e4939e37308fe0a7" UNIQUE ("title"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movies_countries_countries" ("movies_id" integer NOT NULL, "countries_id" integer NOT NULL, CONSTRAINT "PK_3193ee08f406dc3aa637e83946f" PRIMARY KEY ("movies_id", "countries_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_66f7af12300498ee1ded6bbf5e" ON "movies_countries_countries" ("movies_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_104453373193652e7dee80eb86" ON "movies_countries_countries" ("countries_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movies_genres_genres" ("movies_id" integer NOT NULL, "genres_id" integer NOT NULL, CONSTRAINT "PK_93814319ed89dcb286f2963aded" PRIMARY KEY ("movies_id", "genres_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dde180b138f14fdf83e85ff91d" ON "movies_genres_genres" ("movies_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eb008ac2ce8c01eaa06e36f59f" ON "movies_genres_genres" ("genres_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_countries_countries" ADD CONSTRAINT "FK_66f7af12300498ee1ded6bbf5ea" FOREIGN KEY ("movies_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_countries_countries" ADD CONSTRAINT "FK_104453373193652e7dee80eb86f" FOREIGN KEY ("countries_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_genres_genres" ADD CONSTRAINT "FK_dde180b138f14fdf83e85ff91d3" FOREIGN KEY ("movies_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_genres_genres" ADD CONSTRAINT "FK_eb008ac2ce8c01eaa06e36f59f9" FOREIGN KEY ("genres_id") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies_genres_genres" DROP CONSTRAINT "FK_eb008ac2ce8c01eaa06e36f59f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_genres_genres" DROP CONSTRAINT "FK_dde180b138f14fdf83e85ff91d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_countries_countries" DROP CONSTRAINT "FK_104453373193652e7dee80eb86f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies_countries_countries" DROP CONSTRAINT "FK_66f7af12300498ee1ded6bbf5ea"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_eb008ac2ce8c01eaa06e36f59f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dde180b138f14fdf83e85ff91d"`,
    );
    await queryRunner.query(`DROP TABLE "movies_genres_genres"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_104453373193652e7dee80eb86"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_66f7af12300498ee1ded6bbf5e"`,
    );
    await queryRunner.query(`DROP TABLE "movies_countries_countries"`);
    await queryRunner.query(`DROP TABLE "countries"`);
    await queryRunner.query(`DROP TABLE "movies"`);
    await queryRunner.query(`DROP TABLE "genres"`);
  }
}
