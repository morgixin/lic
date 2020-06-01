const express = require("express");
// const exphbs = require("express-handlebars");
const app = express();

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome Page",
  });
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`logged on port ${PORT} :D`));
