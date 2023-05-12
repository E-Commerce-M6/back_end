import { MigrationInterface, QueryRunner } from "typeorm";

export class createPoster1681152172551 implements MigrationInterface {
    name = 'createPoster1681152172551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."poster_fuel_type_enum" AS ENUM('diesel', 'flex', 'híbrido', 'elétrico')`);
        await queryRunner.query(`CREATE TABLE "poster" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(50) NOT NULL, "model" character varying(50) NOT NULL, "year" character varying(4) NOT NULL, "fuel_type" "public"."poster_fuel_type_enum" NOT NULL, "kilometers" numeric(6,3) NOT NULL, "color" character varying(50) NOT NULL, "fipe_price" integer NOT NULL, "description" character varying NOT NULL, "is_published" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_653af1301e69e557fc1375ced90" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "poster"`);
        await queryRunner.query(`DROP TYPE "public"."poster_fuel_type_enum"`);
    }

}
