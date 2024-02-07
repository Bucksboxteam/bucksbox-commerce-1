import { MigrationInterface, QueryRunner } from "typeorm"

export class Dis1111701840419155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE UNIQUE INDEX "discount_storeid_code_unique_constraint" 
        ON "discount" ("store_id", "code")
        WHERE "deleted_at" IS NULL
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP INDEX "discount_storeid_code_unique_constraint"
    `)
    }

}
