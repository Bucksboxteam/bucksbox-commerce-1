import { MigrationInterface, QueryRunner } from "typeorm"

export class CustomerStores671701779412072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `CREATE TABLE "customer_stores_store" ("store_id" character varying NOT NULL, "customer_id" character varying NOT NULL, CONSTRAINT "PK_store_customer" PRIMARY KEY ("store_id", "customer_id"))`
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer_stores"`);
      }

}
