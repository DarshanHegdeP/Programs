const express=require("express")
const app=express()
const port=3000

const data=require("./data")
const books = require("./data")

app.use(express.json())


app.get("/books",(req,res)=>{
    res.status(200).json(books);
})

app.post("/books/:id",(req,res)=>{
    const newbook={
        id:books.length+1
        ,title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        quantity:req.body.quantity
    }

    books.push(newbook);
    res.status(200).json(newbook);
})

app.put("/books/:id",(req,res)=>{
    const book=books.find(b=>b.id===parseInt(req.params.id))
    if(!book) return res.status(404).send("Book not found")

    book.title = req.body.title;
    book.author = req.body.author;
    book.price = req.body.price;
    book.quantity = req.body.quantity;
    res.status(200).json(book)
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);       

})