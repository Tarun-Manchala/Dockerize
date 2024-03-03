const express = require("express")
const mongoose = require("mongoose")
const {  MONGO_IP,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASSWORD,
    REDIS_URL, SESSION_SECRET,
    REDIS_PORT,
    } = require("./config/config.js");

const session = require("express-session");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);  // (session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
});


const postRouter = require("./routes/postRoutes.js")
const userRouter = require("./routes/userRoutes.js")

const app = express()

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
// const mongoURL = `mongodb://name:mypassword@mongo:27017/?authSource=admin`

const connectWithRetry = () =>{
mongoose.connect(mongoURL)
    .then(() => console.log("mongo is Connected succesfully"))
    .catch((e) => {
        console.log(e);
        setTimeout(connectWithRetry,5000)
    });
};
connectWithRetry();


app.use(session)({
    store: new RedisStore({client: redisClient}),  // new
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httponly: true,
        maxAge: 30000
    }
})

app.use(express.json());  // middle ware

app.get("/",(req,res)=>{
    res.send("\
    <h2>Hi there, How are you? you are No more in prod role</h2>\
    ");
});

// localhosts:3000/:id
app.use("/api/v1/posts",postRouter)
app.use("/api/v1/users",userRouter)

const port = process.env.PORT || 3000; // if default port is busy, it will go to port 3000

app.listen(port,()=> console.log(`listening on port ${port}`));

