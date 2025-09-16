import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Plants")
export class Plants {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    plantName: string;
    @Column({ type: "varchar", length: 255, nullable: false })
    plantScientificName: string;
    @Column({ type: "longtext", nullable: false })
    plantPicture: string;
    @Column({ type: "text", nullable: false })
    description: string;
    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    constructor(plantName: string, plantScientificName: string, plantPicture: string, description: string, createdAt?: Date) {
        this.plantName = plantName;
        this.plantScientificName = plantScientificName;
        this.plantPicture = plantPicture;
        this.description = description;
        this.createdAt = createdAt || new Date();
    }
}


