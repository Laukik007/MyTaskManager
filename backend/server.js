const express = require("express");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const path = require('path');
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// --------------------------deployment------------------------------
// const __dirname = path.resolve();
console.log('path = ',__dirname,path.join(__dirname, "/frontend/build"),path.resolve())
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(path.resolve(), "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("api is running");
});

app.get("/api/Tasks", (req, res) => {
  res.json(Tasks);
});

app.get("/api/Tasks/:id", (req, res) => {
  const Task = Tasks.find((n) => n._id === req.params.id);
  res.send(Task);
});

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
