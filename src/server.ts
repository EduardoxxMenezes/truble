import express, {Application} from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AppDataSource from "./dataBase/AppDataSource";
import plantRoutes from "./routes/plantRoutes";


dotenv.config();

const app: Application = express();

app.use( 
    cors({
        origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
        credentials: true,
    })
)

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(express.static('view'));
app.use('/api', plantRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando!");
      console.log("Porta: localhost:3000");
    });
  })
  .catch((error) => {
    console.error("Erro ao inicializar o banco de dados:", error);
  });