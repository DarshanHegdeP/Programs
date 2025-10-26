const express = require('express');
const app=express()
const port=3000
const path=require("path")

app.use(express.static(path.join(__dirname)))

app.use(express.urlencoded({extended:true}))

app.get("/submit-get",(req,res)=>{
    const name=req.query.name;
    const branch=req.query.branch;
    const semester=req.query.semester;

    const htmlResponse=`<h2>Student Information(Get)</h2>
        <p>Name: <b>${name}</b></p>
         <p>Branch: <b>${branch}</b></p>
          <p>Semester: <b>${semester}</b></p>
          <br><a href="/">Go back</a>
    `;
    res.send(htmlResponse);
})


app.post("/submit-post",(req,res)=>{
    const name=req.body.name;
    const branch=req.body.branch;
    const semester=req.body.semester;

    const htmlResponse=`<h2>Student Information(Get)</h2>
        <p>Name: <b>${name}</b></p>
         <p>Branch: <b>${branch}</b></p>
          <p>Semester: <b>${semester}</b></p>
          <br><a href="/">Go back</a>
    `;
    res.send(htmlResponse);
})

app.listen(port,()=>{
    console.log(`Server is listening on http://localhost:${port}`)
    console.log("open browser and navigate to http://localhost:3000/index.html")
})


