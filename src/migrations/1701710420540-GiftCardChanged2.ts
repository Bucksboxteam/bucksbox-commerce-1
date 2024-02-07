import { MigrationInterface, QueryRunner } from "typeorm"

export class GiftCardChanged21701710420540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gift_card" ADD "store_id" character varying`);
        await queryRunner.query(`CREATE INDEX "GiftcardStoreId" ON "gift_card" ("store_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."GiftcardStoreId"`);
        await queryRunner.query(`ALTER TABLE "gift_card" DROP COLUMN "store_id"`);
    }

}
