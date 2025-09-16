import { UserController } from "../controller/userController";
import { Router } from "express";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";


const router:Router = Router();
const userController = new UserController();


router.post('/user', userController.register);
router.post('/user/login', userController.login);
router.put('/user/reset-password', userController.resetPassword);

router.get('/user/:id', AuthMiddleware, userController.getById);
router.get('/user', AuthMiddleware, userController.getAll);
router.put('/user/:id', AuthMiddleware, userController.update);
router.put('/user/senha/:id', AuthMiddleware, userController.updatePassword);
router.delete('/user/:id', AuthMiddleware, userController.delete);

export default router;