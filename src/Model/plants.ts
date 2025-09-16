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

    @Column({ type: "varchar", length: 255, nullable: false })
    plantFamily: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    origin: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    medicalUses: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    usedPart: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    mainActives: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    preparationMethod: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    counterIndications: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    constructor(
        plantName: string,
        plantScientificName: string, 
        plantPicture: string, 
        description: string,
        createdAt?: Date, 
        plantFamily: string, 
        origin: string,
        medicalUses: string, 
        usedPart: string, 
        mainActives: string, 
        preparationMethod: string,
        counterIndications: string) {
        this.plantName = plantName;
        this.plantScientificName = plantScientificName;
        this.plantPicture = plantPicture;
        this.description = description;
        this.plantFamily = plantFamily;
        this.origin = origin;
        this.medicalUses = medicalUses;
        this.usedPart = usedPart;
        this.mainActives = mainActives;
        this.preparationMethod = preparationMethod;
        this.counterIndications = counterIndications;
        this.createdAt = createdAt || new Date();
    }
}


