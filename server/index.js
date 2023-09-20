const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json());
app.use(cors());

const db = require("./models")

//routers
const postRouter = require('./routes/Elements')
app.use("/elements", postRouter);
const usersRouter = require('./routes/Users')
app.use("/auth", usersRouter);

db.sequelize.sync().then(() =>{
    app.listen(3001, () =>{
        console.log("server running on port 3001")
    });
})


