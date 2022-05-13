import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Message } from "./Message"

@Entity()
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status_name: string

    @OneToMany(() => Message, (message) => message.status)
    messages: Message[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
