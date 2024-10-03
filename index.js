//b1 import lib express

import express from 'express'




//b2 tao object express 
const app = express();
//buoc 3 define  port  cho backamd chay 
//param  1 :define port backand
//param 2 :la 1 callback function 

//them middleware
app.use(express.json())


app.get("/",(req,res)=>{

    res.send("hello node44")
})
app.get("/test",(req,res)=>{
    res.send("test api ")

})
//demo get params tu URL
app.post("/users/:id/:hoten",(req,res)=>{

    let params = req.params;

    let{id,hoten} = params;
    let body = req.body;
 res.send({
    id,
    hoten
 })
})

//demo get query tu URL
    app.get('/test-query',(req,res)=>{
let query = req.query;
res.send(query)
    })


    //demo get  header from request

    app.get('/test-header',(req,res)=>{
let headers = req.headers;
res.send(headers);
    })
 app.listen(8080,()=>{
    console.log("Server is starting with port 8080")
 })