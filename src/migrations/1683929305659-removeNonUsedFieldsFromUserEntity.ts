import { MigrationInterface, QueryRunner } from "typeorm";

export class removeNonUsedFieldsFromUserEntity1683929305659 implements MigrationInterface {
    name = 'removeNonUsedFieldsFromUserEntity1683929305659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_token"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_token_date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "reset_token_date" date`);
        await queryRunner.query(`ALTER TABLE "user" ADD "reset_token" character varying`);
    }

}
