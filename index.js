const express = require("express");
const app = express();
const path= require("path");
const mongoose =require("mongoose");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");

mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
  .then(() => console.log('Connected!')) 
  .catch((err) => console.log(err)
);
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/",(req,res) => {
    res.send("working");
});

app.get("/chats", async (req,res) => {
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
});
app.get("/chats/new",(req,res) => {
    res.render("new.ejs");
});
app.post("/chats",(req,res) => {
    let {from,msg,to}=req.body;
    let newChat=new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date(),
    });
    newChat.save().then((res) => {
        console.log(res);
    }) .catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
});
app.get("/chats/:id/edit",async (req,res) => {
    let {id}= req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
app.put("/chats/:id/", async (req,res) => {
    let {id}= req.params;
    let {msg : newmsg} = req.body;
    let updatedchat= await Chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true,new:true});
    res.redirect("/chats");
});
app.delete("/chats/:id",async (req,res) => {
    let {id}=req.params;
    let delchat=await Chat.findByIdAndDelete(id);
    console.log(delchat);
    res.redirect("/chats");
})
app.listen(8080 , () => {
    console.log("server is listening");
});