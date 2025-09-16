import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";

let dataSourceOptions: DataSourceOptions;
dotenv.config();


    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  dataSourceOptions = {
    type: "mysql",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [__dirname + "/../Model/*.ts"], 
    migrations: [__dirname + "/../migrations/*.ts"],
    synchronize: false,
    logging: true,
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;