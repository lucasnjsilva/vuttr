import {
    Entity,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';
import Tool from './Tool';

@Entity('tags')
class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tag: string;

    @Column()
    tools_id: string;

    @ManyToOne(() => Tool, tool => tool.tags)
    @JoinColumn({ name: 'tools_id' })
    tool: Tool;
}

export default Tag;
