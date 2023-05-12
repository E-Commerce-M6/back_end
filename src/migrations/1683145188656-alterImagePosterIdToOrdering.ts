import { MigrationInterface, QueryRunner } from "typeorm";

export class alterImagePosterIdToOrdering1683145188656 implements MigrationInterface {
    name = 'alterImagePosterIdToOrdering1683145188656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "posterId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "imagePoster" DROP CONSTRAINT "PK_e1d774a1438e6fab6e7bcea8a21"`);
        await queryRunner.query(`ALTER TABLE "imagePoster" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "imagePoster" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "imagePoster" ADD CONSTRAINT "PK_e1d774a1438e6fab6e7bcea8a21" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_8f64ee593d3709eee7775f9c462" FOREIGN KEY ("posterId") REFERENCES "poster"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_8f64ee593d3709eee7775f9c462"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "imagePoster" DROP CONSTRAINT "PK_e1d774a1438e6fab6e7bcea8a21"`);
        await queryRunner.query(`ALTER TABLE "imagePoster" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "imagePoster" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "imagePoster" ADD CONSTRAINT "PK_e1d774a1438e6fab6e7bcea8a21" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
