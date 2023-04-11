import { MigrationInterface, QueryRunner } from "typeorm";

export class createImagePoster1681161524292 implements MigrationInterface {
    name = 'createImagePoster1681161524292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "imagePoster" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "posterId" uuid, CONSTRAINT "PK_e1d774a1438e6fab6e7bcea8a21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "imagePoster" ADD CONSTRAINT "FK_1877100865c1401877dbc139533" FOREIGN KEY ("posterId") REFERENCES "poster"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagePoster" DROP CONSTRAINT "FK_1877100865c1401877dbc139533"`);
        await queryRunner.query(`DROP TABLE "imagePoster"`);
    }

}
