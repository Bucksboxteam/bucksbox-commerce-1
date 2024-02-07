import { MigrationInterface, QueryRunner } from "typeorm";

export class StoreImageImage1707110362907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE store_image_image ( 
                store_id character varying ,
                image_id character varying 
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE store_image_image;
    `);
    }

}
