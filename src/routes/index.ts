// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// Toda rota que comece com "/appointments" será direcionada para o "appointments.routes.ts"
routes.use('/appointments', appointmentsRouter);

export default routes;
