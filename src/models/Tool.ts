import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import Tag from './Tag';
import User from './User';

@Entity('tools')
class Tool {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    link: string;

    @OneToMany(() => Tag, tag => tag.tool, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'tools_id' })
    tags: Tag[];

    @ManyToOne(() => User, user => user.id, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'user_id' })
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Tool;
