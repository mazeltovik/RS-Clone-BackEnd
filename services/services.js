
import * as fs from 'fs'
import path from "path"
import { dirname } from 'path';
import db from '../db/users.json' assert { type: "json" };
export const getAll = (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(db);
}


export const createUser = (req,res)=>{
    let findElem = db.find(v=>{
        return v.name === req.body.name;
    })
    if(!findElem){
        db.push(req.body);
        wrireDB(db);
        res.status(201).json({created:true});  
    }
    else {
        res.status(400).json({created:false});
    }
}

function wrireDB(user){
    fs.writeFile
    ('./db/users.json',
    JSON.stringify(user),
    'utf8',
    (err, data) => {
        if (err) throw err;
        console.log(data);
    })
}

export function getUser(req,res){
    let user = db.find(v=>{
        return v.id == req.params.id;
    });
    console.log(user);
    if(user){
        res.status(200).json(user);
    } else {
        res.status(400); 
    }
}

// function readDB(user){
//     fs.readFile(
//         './db/users.json',
//         'utf-8',
//         (err, data) => {
//             if (err) throw err;
//             let users = JSON.parse(data);
//             users.push(user);
//             fs.writeFile('./db/users.json',JSON.stringify(users),(err)=>{
//                 console.log(err);
//             })
//         }
//     );
// }

// readDB({name:'Alex'});
// wrireDB({name:'Richi'})



