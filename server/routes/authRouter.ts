import { Request, Response, Router } from "express";
import { AuthCtrl } from '../controllers/AuthCtrl';

const AuthRouter: Router = Router();
const authCtrl:AuthCtrl = new AuthCtrl();

AuthRouter.get('/test',authCtrl.test);
AuthRouter.post('/authorize',authCtrl.authorize);
AuthRouter.post('/access_token',authCtrl.access_token);
AuthRouter.post('/authenticate',authCtrl.authenticate);
AuthRouter.post('/register',authCtrl.register);


export { AuthRouter }