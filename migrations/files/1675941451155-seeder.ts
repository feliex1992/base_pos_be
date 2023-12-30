import { MigrationInterface, QueryRunner } from "typeorm"

export class seeder1675941451155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "user_category" 
                ("id", "code", "description", "privilege") 
            VALUES
                ('a01fe7f8-653b-4eb8-a054-9f266740470b', 'ADM', 'Administrator', true)`);
        await queryRunner.query(`INSERT INTO "user"
                ("id", "user_id", "user_name", "password", "salt", "user_category_id")
            VALUES
                ('945a5715-f683-4c93-bff5-3f28028f896b', 'admin', 'Administrator', '$2b$10$.ONMjUHAHiyiKd70LBWk6ei8iQcF/bbp.7IkwGi9lJ.PhnZ855co.',
                '$2b$10$.ONMjUHAHiyiKd70LBWk6e', 'a01fe7f8-653b-4eb8-a054-9f266740470b')
        `);
        await queryRunner.query(`UPDATE "user_category" SET "created_id" = '945a5715-f683-4c93-bff5-3f28028f896b'
            WHERE "id" = 'a01fe7f8-653b-4eb8-a054-9f266740470b'
        `);
        await queryRunner.query(`UPDATE "user" SET "created_id" = '945a5715-f683-4c93-bff5-3f28028f896b'
            WHERE "id" = '945a5715-f683-4c93-bff5-3f28028f896b'
        `);

        await queryRunner.query(`INSERT INTO "product_category"
                ("id", "code", "description", "created_id")
            VALUES ('caf32569-8111-4923-b863-21b8200f3213', 'MKN', 'Makanan', '945a5715-f683-4c93-bff5-3f28028f896b')`)
        await queryRunner.query(`INSERT INTO "product_category"
                ("id", "code", "description", "created_id")
            VALUES ('ee075935-c284-485e-a67b-12d39b3d4494', 'MNM', 'Minuman', '945a5715-f683-4c93-bff5-3f28028f896b')`)
        await queryRunner.query(`INSERT INTO "product_category"
                ("id", "code", "description", "created_id")
            VALUES ('04f80fc7-471c-48ca-b5c9-d55274987ccb', 'PRB', 'Perabot', '945a5715-f683-4c93-bff5-3f28028f896b')`)

        await queryRunner.query(`INSERT INTO "product_type"
                ("id", "code", "description", "created_id", "product_category_id")
            VALUES ('7fdf9dc1-1b48-4b0e-b654-f9d3ff3cadde', 'RTI', 'Roti & Kue', '945a5715-f683-4c93-bff5-3f28028f896b', 'caf32569-8111-4923-b863-21b8200f3213')`)
        await queryRunner.query(`INSERT INTO "product_type"
                ("id", "code", "description", "created_id", "product_category_id")
            VALUES ('88fe333f-e69c-4982-8aeb-c0568feb3a97', 'SBK', 'Sembako', '945a5715-f683-4c93-bff5-3f28028f896b', 'caf32569-8111-4923-b863-21b8200f3213')`)
        await queryRunner.query(`INSERT INTO "product_type"
                ("id", "code", "description", "created_id", "product_category_id")
            VALUES ('0f2d62d3-6a5e-4bf0-a69b-7f32a5dea113', 'JJN', 'Jajanan', '945a5715-f683-4c93-bff5-3f28028f896b', 'caf32569-8111-4923-b863-21b8200f3213')`)

        await queryRunner.query(`INSERT INTO "uom"
                ("id", "code", "description", "created_id")
            VALUES ('85342540-8884-4786-a5e8-922d8bc5d6ee', 'PCS', 'pcs', '945a5715-f683-4c93-bff5-3f28028f896b')`);
        await queryRunner.query(`INSERT INTO "uom"
                ("id", "code", "description", "created_id")
            VALUES ('7f27744c-a585-4ed3-86cf-7eeebe2f8d17', 'LSN', 'lusin', '945a5715-f683-4c93-bff5-3f28028f896b')`);

        await queryRunner.query(`INSERT INTO "warehouse"
                ("id", "code", "description", "status_transaction", "created_id")
            VALUES ('bc6eb8bc-90bb-4d23-8a3c-bfc45d0dac50', 'TST', 'Display', true, '945a5715-f683-4c93-bff5-3f28028f896b')`);

        await queryRunner.query(`INSERT INTO "province"
                (id, name)
            VALUES ('42407c60-993a-4ca7-a437-da963a6f2942', 'jawa barat')`);
        await queryRunner.query(`INSERT INTO "district"
                (id, name, province_id)
            VALUES ('c77a1d4c-6f7d-4aa6-93d9-711fdf08559a', 'bandung barat', '42407c60-993a-4ca7-a437-da963a6f2942')`);
        await queryRunner.query(`INSERT INTO "sub_district"
                (id, name, district_id)
            VALUES ('9b265c44-881a-4ff2-ae9d-e36fc742d24b', 'batujajar', 'c77a1d4c-6f7d-4aa6-93d9-711fdf08559a')`);
        await queryRunner.query(`INSERT INTO "village"
                (id, name, sub_district_id)
            VALUES ('a7eabcb0-8be3-412c-997b-34e6f6381c4d', 'selacau', '9b265c44-881a-4ff2-ae9d-e36fc742d24b')`);
        
        await queryRunner.query(`INSERT INTO "supplier"
                (id, code, description, created_id)
            VALUES ('575ea0c2-d6d4-4fd0-9887-2602f0d8ea2a', 'UMUM', 'Supplier Umum', '945a5715-f683-4c93-bff5-3f28028f896b')`);
        await queryRunner.query(`INSERT INTO "customer"
                (id, code, name, nik, place_birth, date_birth, street, religion, martial_status, job, village_id, created_id)
            VALUES ('57c3c2a6-5aba-4653-964d-fb7ee7852824', 'CUS00000001', 'Regular', '3217090101010001', 'bandung', '2001-01-01',
                '-', 'islam', 'belum kawin', 'karyawan swasta', 'a7eabcb0-8be3-412c-997b-34e6f6381c4d', '945a5715-f683-4c93-bff5-3f28028f896b')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
