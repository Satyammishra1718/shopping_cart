require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(express.json());
app.use('/api',require("./routes/DisplayData.js"))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});