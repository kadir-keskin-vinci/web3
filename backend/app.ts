import express from "express";
import logger from "morgan";
import cors from "cors";
import expensesRouter from "./routes/expenses.router.ts";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", /\.onrender\.com$/],
  }),
);
app.get("/ping", (req, res) => {
  res.sendStatus(204);
});

app.use("/api/expenses", expensesRouter);

app.listen(PORT, () => {
  console.log("Server listening on http://localhost:" + PORT);
});

export default app;
