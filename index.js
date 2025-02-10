import express, { urlencoded } from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./src/db/index.js";
dotenv.config();
const port = process.env.PORT;
import userRoutes from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/task.routes.js";
import cookieParser from "cookie-parser";
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use("/user", userRoutes);
app.use("/api/v1", taskRouter);
app.get("/", (req, res) => {
  res.send("Hello GoNext");
});

connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server Is Running At Port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
