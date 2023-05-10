import { MigrationInterface, QueryRunner } from "typeorm";

export class addPublicIdInImages1683662913002 implements MigrationInterface {
    name = 'addPublicIdInImages1683662913002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagePoster" ADD "public_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "imagePoster" DROP COLUMN "public_id"`);
    }

}
