import { env } from "./env.js";

console.log(`Worker ${env.WORKER_NAME} is ready and running in ${env.NODE_ENV} mode.`);