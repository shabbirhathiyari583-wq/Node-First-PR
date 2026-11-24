import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/myData").then(() => {
    console.log("mongodb connect");
}).catch((error) => {
    console.log("server error", error);
});

const movieSchema = mongoose.Schema({
    title: String,
    genre: String,
    producer: String
});

const movie = mongoose.model("movie", movieSchema);

app.get("/", (req, res) => {
    res.json({
        msg: "Home page"
    });
});

app.post("/AddMovie", async (req, res) => {
    const Data = await movie.create(req.body);
    res.json({
        msg: "Movie added",
        data: Data
    });
});

app.get("/GetAllMovies", async (req, res) => {
    const Data = await movie.find();
    res.json({
        msg: "Movies found",
        data: Data
    });
});

app.get("/GetMovie", async (req, res) => {
    const Data = await movie.findOne(req.body);

    if (!Data) {
        return res.json({
            msg: "Movie is not found"
        });
    }

    res.json({
        msg: "Movie found",
        data: Data
    });
});

app.put("/UpdateMovie", async (req, res) => {
    const Data = await movie.findByIdAndUpdate(
        req.body.id,
        req.body.newData,
        { new: true }
    );

    if (!Data) {
        return res.json({
            msg: "Movie is not found"
        });
    }

    res.json({
        msg: "Movie updated",
        data: Data
    });
});

app.delete("/DeleteMovie", async (req, res) => {
    const Data = await movie.findByIdAndDelete(req.body.id);

    if (!Data) {
        return res.json({
            msg: "Movie is not found"
        });
    }

    res.json({
        msg: "Movie deleted",
        data: Data
    });
});

app.listen(3000);



