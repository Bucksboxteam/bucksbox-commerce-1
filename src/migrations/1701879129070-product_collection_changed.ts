import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductCollectionChanged1701879129070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "product_collection" ADD "store_id" character varying`);
        await queryRunner.query(`CREATE INDEX "ProductCollectionStoreId" ON "product_collection" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."ProductCollectionStoreId"`);
        await queryRunner.query(`ALTER TABLE "product_collection" DROP COLUMN "store_id"`);

    }

}
