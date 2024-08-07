const express = require('express');
const cors = require('cors');
const booksData = require('./data/books.json');
//imports

const app = express();

app.use(cors()); //to avoid error

app.get('/random-book',(req,res)=>{
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    res.json(randomBook);
});

const port = process.env.PORT || 4000 ;
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
