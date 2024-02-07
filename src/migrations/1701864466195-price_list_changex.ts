import { MigrationInterface, QueryRunner } from "typeorm"

export class PriceListChangex1701864466195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "price_list" ADD "store_id" character varying`);
        await queryRunner.query(`CREATE INDEX "PriceListStoreId" ON "price_list" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."PriceListStoreId"`);
        await queryRunner.query(`ALTER TABLE "price_list" DROP COLUMN "store_id"`);

    }

}
