import { Request, Response, Router } from "express";
import { AuthCtrl } from '../controllers/AuthCtrl';

const AuthRouter: Router = Router();
const authCtrl:AuthCtrl = new AuthCtrl();


AuthRouter.param('id', function (req, res, next, id) {
req.body.clientId = id;
 next();
});
AuthRouter.param('username', function (req, res, next, username) {
req.body.username = username;
 next();
});

AuthRouter.get('/test',authCtrl.test);
AuthRouter.post('/authorize',authCtrl.authorize);
AuthRouter.post('/authenticate',authCtrl.authenticate);
AuthRouter.post('/register',authCtrl.register);
AuthRouter.post('/linkaccount',authCtrl.link_account);
AuthRouter.post('/linkaccount/:username',authCtrl.get_link_account)
AuthRouter.post('/token',authCtrl.token);
AuthRouter.post('/client',authCtrl.add_client);
AuthRouter.get('/clients/',authCtrl.get_clients);
AuthRouter.get('/client/:id',authCtrl.get_client);
AuthRouter.post('/verify_client',authCtrl.verify_client);
AuthRouter.post('/access_token',authCtrl.access_token);



export { AuthRouter }