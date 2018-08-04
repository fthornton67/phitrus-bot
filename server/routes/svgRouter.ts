import { Request, Response, Router } from "express";
import { SvgCtrl } from "../controllers/SvgCtrl";
 

const SvgRouter: Router = Router();
const svgCtrl:SvgCtrl = new SvgCtrl();

SvgRouter.get("/",svgCtrl.root);
SvgRouter.get("/attendee",svgCtrl.attendee);

export { SvgRouter };