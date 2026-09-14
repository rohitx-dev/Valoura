import express from "express";
import { env } from "./env.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) =>{
    res.status(200).json({
        status: "ok",
        service: "valoura-api"
    });
});


app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});