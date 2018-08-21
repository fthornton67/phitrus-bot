import { Request, Response, Router } from "express";
import { Device } from '../models/device';
import { DeviceCtrl } from '../controllers/DeviceCtrl';

var jwt = require('jsonwebtoken');

const DeviceRouter: Router = Router();
const deviceCtrl:DeviceCtrl = new DeviceCtrl();


DeviceRouter.get('/',deviceCtrl.getAll);
DeviceRouter.post('/add',deviceCtrl.add);
DeviceRouter.get('/add',deviceCtrl.add);
DeviceRouter.get('/count',deviceCtrl.count);
DeviceRouter.post('/userHasPhitrAccount',deviceCtrl.userHasPhitrAccount);


export { DeviceRouter };
