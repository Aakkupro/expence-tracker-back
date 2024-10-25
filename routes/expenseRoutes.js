// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// POST: Add a new expense
router.post('/', async (req, res) => {
    const { name, amount, category, date } = req.body;
    const expense = new Expense({
        name,
        amount,
        category,
        date: new Date(date), // Convert incoming date string to Date object
    });

    try {
        await expense.save();
        res.status(201).json(expense);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// GET route to retrieve all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve expenses', error });
    }
});



// PUT route to update an expense
router.put('/:id', async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update expense', error });
    }
});

// DELETE route to remove an expense
router.delete('/:id', async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete expense', error });
    }
});

module.exports = router;
