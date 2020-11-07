import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTagTools1604503608479 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tags',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'tag',
                        type: 'varchar',
                    },
                    {
                        name: 'tools_id',
                        type: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'TagToolsFK',
                        columnNames: ['tools_id'],
                        referencedTableName: 'tools',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tags');
    }
}
