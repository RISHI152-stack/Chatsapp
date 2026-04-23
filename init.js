const mongoose =require("mongoose");
const Chat=require("./models/chat.js");
mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
  .then(() => console.log('Connected!')) 
  .catch((err) => console.log(err)
);
let allChats=[
    {
        from:"neha",
        to:"sneha",
        msg:"Hi send me your notes please",
        created_at:new Date(),
    },
    {
        from:"amit",
        to:"sumit",
        msg:"what is syllabus machaaa",
        created_at:new Date(),
    },
    {
        from:"Mahesh",
        to:"Devesh",
        msg:"ALL THE BEST RAA give your best",
        created_at:new Date(),
    },
    {
        from:"rishi",
        to:"Thingari",
        msg:"Good morning",
        created_at:new Date(),
    },
    {
        from:"vinay",
        to:"Ruthvik",
        msg:"Nannu odilesaru ra meeru nannu pilavandi raa isari",
        created_at:new Date(),
    },
];
Chat.insertMany(allChats);
