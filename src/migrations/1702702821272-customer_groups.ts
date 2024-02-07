import { MigrationInterface, QueryRunner } from "typeorm"

export class CustomerGroups1702702821272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_group" ADD "store_id" character varying`);
        await queryRunner.query(`CREATE INDEX "CustomerGroupStoreId" ON "customer_group" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."CustomerGroupStoreId"`);
        await queryRunner.query(`ALTER TABLE "customer_group" DROP COLUMN "store_id"`);
    }

}
