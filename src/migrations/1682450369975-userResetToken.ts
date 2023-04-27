import { MigrationInterface, QueryRunner } from "typeorm";

export class userResetToken1682450369975 implements MigrationInterface {
    name = 'userResetToken1682450369975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "reset_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_token"`);
    }

}
