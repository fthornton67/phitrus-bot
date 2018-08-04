import { Request, Response, Router } from "express";
import * as fs from 'fs';
import * as path from 'path'
var pug = require('pug');


class SvgCtrl {
 root = (req, res) => {
    //alexaRequestCtrl.insert(req);
    res.status(200).send('done')
  };

  attendee = (req,res) =>{
     var pFile = fs.readFile(path.join(__dirname.replace('/dist',''),'svgpug.xml'),'utf8',(error,data)=>{
       res.type('xml');
       var pugTest = pug.render(data,{ id:21212121,name:'Fredrick'});

       res.send(pugTest);
       res.status(200);
     }); 
     /*var f = fs.readFile(path.join(__dirname.replace('/dist',''),'test.html'),'utf8',(error,data)=>{
       res.type('xml');
       
       var test =  pug.render('p Hello world!');
       
       res.send(test);
       res.status(200);
     });  */   
  };
}

export { SvgCtrl };
