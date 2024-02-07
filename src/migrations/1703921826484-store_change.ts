import { MigrationInterface, QueryRunner } from "typeorm"

export class StoreChange1703921826484 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "store" ADD "description" character varying,
        ADD "store_image" character varying;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "store" 
            DROP COLUMN IF EXISTS "description",
            DROP COLUMN IF EXISTS "store_image";
        `);
    }

}
