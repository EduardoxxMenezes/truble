import { Plants } from "../Model/plants";
import AppDataSource from "../dataBase/AppDataSource";

export class PlantRepository {
  private reposit = AppDataSource.getRepository(Plants);

  async createPlant(plantName: string, plantScientificName: string, plantPicture: string, description: string) {
    const newPlant = new Plants(plantName, plantScientificName, plantPicture, description);
    return await this.reposit.save(newPlant);
  }

  async findPlantById(id: number) {
    return await this.reposit.findOne({ where: { id } });
  }

    async findPlantByName(plantName: string) {
    return await this.reposit.findOne({ where: { plantName} });
  }

  async findAllPlants() {
    return await this.reposit.find();
  }
  

 async updatePlant(id: number, fields: Partial<Plants>) {
    const existingPlant = await this.findPlantById(id);
    if (!existingPlant) return null;
    Object.assign(existingPlant, fields);
    return await this.reposit.save(existingPlant);
  }

    async deletePlant(id: number) {
    const existingPlant = await this.findPlantById(id);
    if (!existingPlant) return null;
    return await this.reposit.remove(existingPlant);
  }

}


















































