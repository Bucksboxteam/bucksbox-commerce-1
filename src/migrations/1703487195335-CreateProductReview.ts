import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateProductReview1703487195335 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "product_review" (
                "id" varchar PRIMARY KEY NOT NULL,
                "title" character varying NOT NULL,
                "content" character varying NOT NULL,
                "rating" integer NOT NULL, 
                "product_id" character varying,
                "full_name" character varying,
                CONSTRAINT "FK_product_review_product" FOREIGN KEY ("product_id") REFERENCES "product"("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "product_review"
        `);
    }

}
