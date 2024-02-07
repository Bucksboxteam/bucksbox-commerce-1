import { MigrationInterface, QueryRunner } from "typeorm"

export class DiscountChanged21701688932525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discount" ADD "store_id" character varying`);
        await queryRunner.query(`CREATE INDEX "DiscountStoreId" ON "discount" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."DiscountStoreId"`);
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "store_id"`);
    }

}
