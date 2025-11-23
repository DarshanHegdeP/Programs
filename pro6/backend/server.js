const express =require ('express');
const cors =require('cors')

const app= express()

app.use(cors())
app.use(express.json())

const inventory=[
    {id:1,name:"prod1",qty:12,price:12},
    {id:2,name:"prod1",qty:12,price:12},
    {id:3,name:"prod1",qty:12,price:12},
    {id:4,name:"prod1",qty:12,price:12}
]

app.get('/',(req,res,err)=>{
    res.json(inventory)

})

app.post('/add',(req,res)=>{
    console.log(req.body.id);
    const invent={id:req.body.id,
        name:req.body.name,
        qty:req.body.qty,
        price:req.body.price
    }
    inventory.push(invent)
    res.json(inventory);
})

app.listen(8000,()=>{
    console.log(`Server running at http://localhost:8000`)

})