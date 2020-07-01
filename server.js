const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const Cors = require("cors");

const app = express();

// bodyParser Middleware, incluso no Express
app.use(express.json());
app.use(Cors());

// Configuração do DB
const db = config.get("mongoURI");

// Conectando ao Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Usando os Routes
app.use("/api/entries", require("./routes/api/entries"));
app.use("/api/users", require("./routes/api/adms"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use("/static", express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
