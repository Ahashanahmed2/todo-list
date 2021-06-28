//depenpendence
const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("./modules/todo");

const app = express();
const port = 3000;

//server Connected
mongoose
    .connect("mongodb://localhost:27017/Todo", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Server connected");
    });

//middelwars
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());

//delete route
app.get("/:id/delete", async(req, res) => {
    const todos = await todoSchema.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

//index route
app.get("/", async (req, res) => {
    //get todo
    const todos = await todoSchema.find({}).sort("-date");

    res.render("index", { todos });
});

app.post("/", async (req, res) => {
    const text = req.body.text.trim();
    if (text == "") {
        return res.redirect("/");
    } else {
        let newTodo = new todoSchema({
            text,
        });
        await newTodo.save();
        res.redirect("/");

    }
});


//About route
app.get("/about", (req, res) => {
    res.render("about");
});

//Server
app.listen(port, () => {
    console.log(`Server is live on port : ${port}`);
});

