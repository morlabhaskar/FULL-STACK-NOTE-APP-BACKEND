const express = require("express");
const cors = require("cors");
const app = express();
const dotEnv = require('dotenv');
const mongoose = require("mongoose");
// const Routes = require('./routes/routes')

dotEnv.config();
app.use(express.json());

app.use(cors({ origin: "*" }));

app.get("/",(req,res) => {
    res.send("NOTE-APP")
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server Started at Port ${PORT}`)
})

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
    .then(()=>console.log("MongoDB Connected Successfully"))
    .catch((error)=>console.log(error))

// app.use('/', Routes);

const { authenticateToken } = require("./utilities");
const { userRegister, userLogin, getUser, getAllUsers, getUserById } = require("./controllers/userController");
const { addNote, editNote, getAllNotes, deleteNote, editIsPinned } = require("./controllers/noteController");

//User
app.post('/register',userRegister)
app.post('/login',userLogin)
app.get('/get-all-users',getAllUsers)
app.get('/get-user/:id',authenticateToken,getUserById);

//Note
app.post('/add-note',authenticateToken,addNote)
app.put('/edit-note/:noteId',authenticateToken,editNote)
app.get('/get-all-notes',getAllNotes)
app.delete('/delete-note/:noteId',authenticateToken,deleteNote)
app.put('/isPinned-note/:noteId',authenticateToken,editIsPinned)
