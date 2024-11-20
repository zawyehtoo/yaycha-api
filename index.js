const express = require('express');
const app = express();

const cors =  require('cors');
const prisma = require('./prismaClient');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const {contentRouter } = require("./routers/content");
app.use("/content",contentRouter);

const {userRouter} = require("./routers/user");
app.use("/",userRouter)

const server = app.listen(8000,()=>{
    console.log("Social media Api started at 8000...")
});

const gracefulShutdown = async()=>{
    await prisma.$disconnect();
    server.close(()=>{
        console.log("Social Api closed");
        process.exit(0);
    })
}

process.on("SIGTERM",gracefulShutdown);
process.on("SIGINT",gracefulShutdown);