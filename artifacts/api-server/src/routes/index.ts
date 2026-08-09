import { Router, type IRouter } from "express";
import healthRouter from "./health";
import clientRouter from "./client";

const router: IRouter = Router();

router.use(healthRouter);
router.use(clientRouter);

export default router;
