import { MigrationInterface, QueryRunner } from "typeorm";

export class fixPosterEntity1681392087399 implements MigrationInterface {
    name = 'fixPosterEntity1681392087399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poster" ADD "price" numeric(9,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "poster" ALTER COLUMN "kilometers" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "poster" ALTER COLUMN "kilometers" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "poster" ALTER COLUMN "fipe_price" TYPE numeric(9,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poster" ALTER COLUMN "fipe_price" TYPE numeric(8,2)`);
        await queryRunner.query(`ALTER TABLE "poster" ALTER COLUMN "kilometers" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "poster" ALTER COLUMN "kilometers" TYPE numeric(6,3)`);
        await queryRunner.query(`ALTER TABLE "poster" DROP COLUMN "price"`);
    }

}
