import {Request, Response} from "express";
import { PlantRepository } from "../repositories/plantRepository";


const repo = new PlantRepository();

export class PlantController {
    async createPlant(req: Request, res: Response) {
    try{
    const { plantName, plantScientificName, plantPicture, description } = req.body;
    if (!plantName || !plantScientificName || !plantPicture) {
      res.status(400).json({ message: "Dados incompletos para adicionar a planta ao herbario." });
      return;
    }
    const existingPlant = await repo.findPlantByName(plantName);
    if (existingPlant) {
      res.status(409).json({ message: "Planta já cadastrada no herbario." });
      return;
    }
    const newPlant = await repo.createPlant(plantName, plantScientificName, plantPicture, description);
    if(newPlant){
        console.log("Planta adicionada ao herbario:", newPlant);
            res.status(201).json(newPlant);
    }
}
catch(error){
    res.status(500).json({ error: "Erro ao adicionar planta ao herbario" });
    console.error("Erro ao adicionar planta ao herbario", error);
    return;
}
  }

  async getAllPlants(req: Request, res: Response) {
    try {
      const plants = await repo.findAllPlants();
      res.status(200).json(plants);
    }
     catch (error) {
      res.status(500).json({ error: "Erro ao buscar plantas no herbario" });
      console.error("Erro ao buscar plantas no herbario", error);
      return;
    }
}
    async getPlantById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
        const plant = await repo.findPlantById(id);
        if (!plant) {
            res.status(404).json({ message: "Planta não encontrada no herbario." });
            return;
        }
        res.status(200).json(plant);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar planta no herbario" });
      console.error("Erro ao buscar planta no herbario", error);
      return;
    }
}
async updatePlant(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { plantName, plantScientificName, plantPicture, description } = req.body;
        const fieldsToUpdate: any = {};
        if (plantName) fieldsToUpdate.plantName = plantName;
        if (plantScientificName) fieldsToUpdate.plantScientificName = plantScientificName;
        if (plantPicture) fieldsToUpdate.plantPicture = plantPicture;
        if(description) fieldsToUpdate.description = description;
        const updated = await repo.updatePlant(id, fieldsToUpdate);
        if (!updated) {
            res.status(404).json({ message: "Planta não encontrada no herbario." });
            return;
        }
        res.status(200).json({ message: "Planta atualizada com sucesso.", updated });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar planta no herbario" });
        console.error("Erro ao atualizar planta no herbario", error);
        return;
    }
}
    async deletePlant(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
        const deleted = await repo.deletePlant(id);
        if (!deleted) {
            res.status(404).json({ message: "Planta não encontrada no herbario." });
            return;
        }
        res.status(200).json({ message: "Planta removida do herbario com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover planta do herbario" });
        console.error("Erro ao remover planta do herbario", error);
        return;
    }
}

}


























































    