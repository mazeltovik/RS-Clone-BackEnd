import * as fs from 'fs'
import path from "path"
console.log(path);
export const createUser = (req,res)=>{
    let name = req.body.name;
    let findElem = users.find(v=>{
        return v.name === name;
    })
    if(!findElem){
        users.push(req.body);
        res.status(201).json({created:true});  
    }
    else {
        res.status(400).json({created:false});
    }
}


