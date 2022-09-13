import { Router } from 'express';
import { showProcessInfo } from '../controllers/info.js';

export const routerInfo = new Router();

routerInfo.get('/info', showProcessInfo)
