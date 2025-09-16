import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate }  from "typeorm";
import bcrypt from 'bcryptjs';

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

   
    @Column({ type: "varchar", length: 255, nullable: false })
    userName: string;

    @Column({ type: 'longtext', nullable: true })
    profilePic: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    userEmail: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    userPassword: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    resetPasswordToken: string | null;

    @Column({ type: "datetime", nullable: true })
    resetPasswordExpires: Date | null;

    oldPassword?: string;


    constructor(
        userName: string,
        userEmail: string,
        userPassword: string,
        profilePic: string
    ) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.profilePic = profilePic;
        this.resetPasswordToken = null;
        this.resetPasswordExpires = null;
    }

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        const salt = await bcrypt.genSalt(10);
        this.userPassword = await bcrypt.hash(this.userPassword, salt);
    }
    
    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
        if (this.oldPassword && this.userPassword !== this.oldPassword) {
            const salt = await bcrypt.genSalt(10);
            this.userPassword = await bcrypt.hash(this.userPassword, salt);
        }
    }

    setPreviousPassword(password: string) {
        this.oldPassword = password;
    }
}
