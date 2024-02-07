import { MigrationInterface, QueryRunner } from "typeorm"

export class ProcuctProdRevChanges1703840516770 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product_review"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6); 
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product_review"
            DROP COLUMN "created_at",
            DROP COLUMN "updated_at";
        `);
    }

}
