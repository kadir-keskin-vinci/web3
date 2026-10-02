
import express from "express";
import type { Expense, NewExpense } from "../types/expense.ts";
import { ExpensesService } from "../services/expenses.service.ts";
import { isValidNewExpense } from "../guards/expenses.guard.ts";

const expensesRouter = express.Router();
expensesRouter.get("/", async (req, res) => {
  try {
    const expenses = [];

    for await (const expense of ExpensesService.getExpenses()) {
      expenses.push(expense);
    }

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
expensesRouter.post("/", async (req, res) => {
  try {
    const expense: NewExpense = req.body;

    if (!isValidNewExpense(expense)) {
      return res.status(400).json({ error: "Invalid expense" });
    }

    const createdExpense = await ExpensesService.addExpense(expense);

    res.status(201).json(createdExpense);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

expensesRouter.post("/reset", (req, res) => {
  try {
    const expenses = ExpensesService.resetExpenses();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default expensesRouter;