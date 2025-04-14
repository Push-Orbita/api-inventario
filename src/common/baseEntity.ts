import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: 'created_date',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_date',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_date',
    })
    deletedAt: Date;
}