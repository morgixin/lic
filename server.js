const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

// bodyParser Middleware, incluso no Express
app.use(express.json());

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
app.use("/api/adms", require("./routes/api/adms"));
// app.use("/entrar", require("./client/src/components/auth/Entrar"));

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));
