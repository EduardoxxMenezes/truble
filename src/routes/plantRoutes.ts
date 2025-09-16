import { PlantController } from "../controller/plantController";
import { Router } from "express";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";

const router:Router = Router();
const plantController = new PlantController();

router.post('/plant',plantController.createPlant);
router.get('/plant/:id', plantController.getPlantById);
router.get('/plant',  plantController.getAllPlants);
router.put('/plant/:id', plantController.updatePlant);
router.delete('/plant/:id', plantController.deletePlant);

export default router;