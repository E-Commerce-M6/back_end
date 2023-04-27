import { MigrationInterface, QueryRunner } from "typeorm";

export class userResetTokenDate1682604251924 implements MigrationInterface {
    name = 'userResetTokenDate1682604251924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "reset_token_date" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_token_date"`);
    }

}
