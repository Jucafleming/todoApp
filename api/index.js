var Express = require("express");

var Mongoclient = require("mongodb").MongoClient;

var cors = require("cors");

const multer = require("multer")


var app = Express()
app.use(cors());




var DATABASENAME = "todoappbd";
var database;

app.listen(5038,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error, client) =>{
        database = client.db(DATABASENAME)
        console.log("Mongo Connected");
    });
})

app.get('/api/todoapp/GetNotes', (request, response )=>{
    database.collection("todoappcollection").find().toArray((error, result)=>{
        response.send(result)
    });
})

app.post('/api/todoapp/AddNotes',multer().none(), (rquest, response)=>{
    database.collection("todoappcollection").count({}, function(error, numOfDocs){
        database.collection("todoappcollection").insertOne({
            id:(numOfDocs +1).toString(),
            description: rquest.body.newNotes
        });
        response.json("add success");
    })
})


app.delete('/api/todoapp/DeleteNotes',(request, response)=>{
    database.collection("todoappcollection").deleteOne({
        id: request.query.id
    });
    response.json("delete success")
})