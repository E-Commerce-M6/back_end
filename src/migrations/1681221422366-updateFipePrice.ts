import { MigrationInterface, QueryRunner } from "typeorm";

export class updateFipePrice1681221422366 implements MigrationInterface {
    name = 'updateFipePrice1681221422366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poster" DROP COLUMN "fipe_price"`);
        await queryRunner.query(`ALTER TABLE "poster" ADD "fipe_price" numeric(8,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poster" DROP COLUMN "fipe_price"`);
        await queryRunner.query(`ALTER TABLE "poster" ADD "fipe_price" integer NOT NULL`);
    }

}
