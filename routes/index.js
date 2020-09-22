const express=require('express');
const router=express.Router();
const db = require('../config/connection');
const to = require('../utils/to');

router.get('/', async (req,res) => {  //search route
    var term=req.query.term;
    let mobiles=[];
    if(term) {
    var keywords=term.split(" ");  //splitting individual keywords
    const n=keywords.length;
    var map= new Map();   
    var allMobiles=new Map();

    //combining results of individual keywords using maps
    for(var i=0; i<n; i++) {
        let key=keywords[i];
        let err,res;
        [err,res]= await to(db.query(`select * from mobile where brand like '%${key}%' or model like '%${key}%'
         or ram like '%${key}%' or color like '%${key}%'`));
        if(err) throw err;    
        for (var j=0; j<res.length; j++) {
            if(map.has(res[j].id)) {
                var num=map.get(res[j].id);
                map.delete(res[j].id);
                map.set(res[j].id,num+1);
            } else {
                map.set(res[j].id,1);
                allMobiles.set(res[j].id,res[j]);
            }
        }
    }
    let ids=[];
    map.forEach((value, key, map)=> {
        if(value==n) mobiles.push(allMobiles.get(key));
    });
    }
    
    res.render('search',{mobiles});
});



module.exports=router;