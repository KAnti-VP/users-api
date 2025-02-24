import express from "express";
import __dirname from "./util/rootpath.js"
import path from 'path'
import * as fileHandler from './util/filekezelo.js'

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.get("/users", (req, res) => {
    const users = fileHandler.getData()
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const users = fileHandler.getData()
    const id = req.params.id;
    if (id < 0 || id >= users.length) {
        return res.json({})
    }
    res.json(users[id]);
});

app.post("/users", (req, res) => {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
        return res.json({message: 'Missimg some data'})
    }
    const newUser = { firstName, lastName }
    const users = fileHandler.getData()
    users.push(newUser);
    fileHandler.saveData(users)
    res.json(newUser)
});

app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const users = fileHandler.getData()
    if (id < 0 || id >= users.length) {
        return res.json({ message: "User not found" })
    }
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
        return res.json({message: 'Missimg some data'})
    }
    users[id] = { firstName, lastName }
    fileHandler.saveData(users)
    res.json(users[id])
});

app.patch("/users/:id", (req, res) => {
    const id = req.params.id;
    const users = fileHandler.getData()
    if (id < 0 || id >= users.length) {
        return res.json({ message: "User not found" })
    }
    const { firstName, lastName } = req.body;
    users[id] = {
        firstName: firstName || users[id].firstName, 
        lastName: lastName || users[id].lastName
    }
    fileHandler.saveData(users)
    res.json(users[id])
});


app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const users = fileHandler.getData()
    if (id < 0 || id >= users.length) {
        return res.json({ message: "User not found" })
    }
    users.splice(id, 1)
    fileHandler.saveData(users)
    res.json({ message: "Delete succrssful" })
});

app.listen(3000, () => {
  console.log("Server runs on port 3000");
});
