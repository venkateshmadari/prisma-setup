import express from "express";
import dotenv from "dotenv";
import prisma from "./src/config/prisma";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend working Working");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send({
    data: users,
    count: users.length,
    message: "Users found successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
