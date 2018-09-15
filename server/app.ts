import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";
import * as mongoose from 'mongoose';

import { feedRouter } from "./routes/feed";
import { loginRouter } from "./routes/login";
import { protectedRouter } from "./routes/protected";
import { publicRouter } from "./routes/public";
import { AlexaRouter } from "./routes/alexaRouter";
import { DeviceRouter } from "./routes/deviceRouter";
import { SvgRouter } from './routes/svgRouter';
import { AuthRouter } from './routes/authRouter'; 
import * as dotenv from 'dotenv';


const app: express.Application = express();

var cors = require('cors');

app.use(cors());

app.disable("x-powered-by");

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/api/secure", protectedRouter);
app.use("/api/login", loginRouter);
app.use("/api/public", publicRouter);
app.use("/api/feed", feedRouter);
app.use("/api/alexa",AlexaRouter);
app.use("/api/svg",SvgRouter);
app.use('/api/devices',DeviceRouter);// secure api
app.use ('/oauth',AuthRouter);


if(!process.env.MONGODB_URI){
  console.log('using dotenv config');
  dotenv.config();
   console.log(process.env.environment=='development');
}

const options = {
  useNewUrlParser: true,
  autoIndex: (process.env.environment=='development'), // Don't build indexes
};
mongoose.connect(process.env.MONGODB_URI,options);
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

});

console.log(process.env.NODE_ENV);
if (app.get("env") === "production") {
  console.log('using '+ path.join(__dirname, "/../dist/client"))
  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, "/../dist/client")));
}

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error("Express Not Found");
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {err},
    message: "Express error:" + err.message,
    url:req.url
  });
});

export { app };
